"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function BiositePage({params}:{params:{slug:string}}) {
  const [data, setData] = useState<any>(null);
  const [showPix, setShowPix] = useState(false);
  const [showWifi, setShowWifi] = useState(false);

  useEffect(()=>{
    (async()=>{
      const {data: site} = await supabase.from("biosites").select("*").eq("slug", params.slug).single();
      if(site) setData(site);
      else {
        const {data: site2} = await supabase.from("sites").select("*").eq("slug", params.slug).single();
        setData(site2);
      }
    })();
  },[params.slug]);

  const copy = (txt:string, label:string)=>{
    navigator.clipboard.writeText(txt);
    alert(`${label} copiado! ✅`);
  };

  if(!data) return <div style={{padding:'40px', textAlign:'center', background:'#0A0A0A', color:'white', minHeight:'100vh'}}>Carregando biosite...<br/><br/>Slug: {params.slug}</div>;

  const videoUrl = data.video_url || "";
  const getYoutubeId = (url:string)=>{
    const reg = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const m = url.match(reg);
    return m ? m[1] : null;
  };
  const ytId = videoUrl ? getYoutubeId(videoUrl) : null;

  return (
    <div style={{minHeight:'100vh', background:'#0A0A0A', color:'white', fontFamily:'system-ui', maxWidth:'480px', margin:'0 auto'}}>
      {videoUrl && (
        <div style={{width:'100%', aspectRatio:'16/9', background:'#111', overflow:'hidden'}}>
          {ytId ? (
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen></iframe>
          ) : (
            <video src={videoUrl} controls style={{width:'100%', height:'100%', objectFit:'cover'}} />
          )}
        </div>
      )}

      <div style={{padding:'24px', textAlign:'center'}}>
        <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#1A1A1A', margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>🍕</div>
        <h1 style={{fontSize:'24px', fontWeight:900, margin:0}}>{data.title || "Seu Negócio"}</h1>
        <p style={{opacity:0.6, marginTop:'6px', fontSize:'14px'}}>{data.bio || ""}</p>
        {data.localizacao && <div style={{display:'inline-block', background:'#1A1A1A', padding:'6px 12px', borderRadius:'99px', fontSize:'12px', marginTop:'10px'}}>📍 {data.localizacao}</div>}
      </div>

      <div style={{padding:'0 16px', display:'flex', flexDirection:'column', gap:'12px'}}>
        <button onClick={()=>setShowWifi(true)} style={{background:'#111', color:'white', padding:'18px', borderRadius:'16px', border:'1px solid #222', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', width:'100%'}}>
          <span>📶 Wi-Fi Grátis</span><span>→</span>
        </button>
        <a href={`https://wa.me/55${(data.whatsapp||"19999999999").replace(/\D/g,"")}`} target="_blank" style={{background:'#25D366', color:'white', padding:'18px', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', textDecoration:'none', fontWeight:700}}>
          <span>💬 Fale no WhatsApp</span><span>→</span>
        </a>
        <button onClick={()=>setShowPix(true)} style={{background:'#00C851', color:'white', padding:'18px', borderRadius:'16px', border:'none', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', width:'100%', fontWeight:700}}>
          <span>💳 Pague com Pix</span><span>→</span>
        </button>
        {data.localizacao && (
          <a href={`https://maps.google.com/?q=${encodeURIComponent(data.localizacao)}`} target="_blank" style={{background:'#111', color:'white', padding:'18px', borderRadius:'16px', border:'1px solid #222', display:'flex', alignItems:'center', justifyContent:'space-between', textDecoration:'none'}}>
            <span>📍 {data.localizacao}</span><span>→</span>
          </a>
        )}
      </div>

      {data.catalogo && Array.isArray(data.catalogo) && (
        <div style={{padding:'24px 16px'}}>
          <h3 style={{margin:'0 0 12px 0'}}>📦 Catálogo</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            {data.catalogo.map((item:any, i:number)=>(
              <div key={i} style={{background:'#141414', padding:'14px', borderRadius:'14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><div style={{fontWeight:700}}>{item.foto} {item.nome}</div></div>
                <div style={{fontWeight:900, color:'#00C851'}}>R$ {item.preco}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPix && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', zIndex:50}}>
          <div style={{background:'#141414', borderRadius:'24px', padding:'24px', maxWidth:'400px', width:'100%'}}>
            <h3 style={{margin:0}}>💳 Pagar com Pix</h3>
            <div style={{marginTop:'16px', background:'#1A1A1A', padding:'16px', borderRadius:'12px'}}>
              <div style={{fontSize:'12px', opacity:0.6}}>Chave Pix</div><div style={{fontWeight:800, fontSize:'18px'}}>{data.pix_key || "19999999999"}</div>
              <div style={{fontSize:'12px', opacity:0.6, marginTop:'8px'}}>Nome</div><div>{data.pix_nome || data.title}</div>
            </div>
            <button onClick={()=>copy(data.pix_key || "", "Chave Pix")} style={{marginTop:'16px', width:'100%', background:'white', color:'black', padding:'16px', borderRadius:'12px', border:'none', fontWeight:900, cursor:'pointer'}}>Copiar Chave Pix</button>
            <button onClick={()=>setShowPix(false)} style={{marginTop:'12px', width:'100%', background:'transparent', color:'white', padding:'12px', border:'1px solid #333', borderRadius:'12px', cursor:'pointer'}}>Fechar</button>
          </div>
        </div>
      )}

      {showWifi && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', zIndex:50}}>
          <div style={{background:'#141414', borderRadius:'24px', padding:'24px', maxWidth:'400px', width:'100%'}}>
            <h3 style={{margin:0}}>📶 Wi-Fi Grátis</h3>
            <div style={{marginTop:'16px', background:'#1A1A1A', padding:'16px', borderRadius:'12px'}}>
              <div style={{fontSize:'12px', opacity:0.6}}>Rede</div><div style={{fontWeight:800}}>{data.wifi_ssid || "WiFi"}</div>
              <div style={{fontSize:'12px', opacity:0.6, marginTop:'8px'}}>Senha</div><div style={{fontWeight:800}}>{data.wifi_pass || ""}</div>
            </div>
            <button onClick={()=>copy(data.wifi_pass || "", "Senha Wi-Fi")} style={{marginTop:'16px', width:'100%', background:'white', color:'black', padding:'16px', borderRadius:'12px', border:'none', fontWeight:900, cursor:'pointer'}}>Copiar Senha</button>
            <button onClick={()=>setShowWifi(false)} style={{marginTop:'12px', width:'100%', background:'transparent', color:'white', padding:'12px', border:'1px solid #333', borderRadius:'12px', cursor:'pointer'}}>Fechar</button>
          </div>
        </div>
      )}

      <div style={{textAlign:'center', padding:'24px', opacity:0.3, fontSize:'12px'}}>Feito com Vision Local</div>
    </div>
  );
}
