"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function BiositePage({params}:{params:{slug:string}}) {
  const [data,setData]=useState<any>(null);
  const [showPix,setShowPix]=useState(false);
  const [showWifi,setShowWifi]=useState(false);

  useEffect(()=>{(async()=>{
    const {data:s}=await supabase.from("biosites").select("*").eq("slug",params.slug).single();
    setData(s);
  })();},[params.slug]);

  const copy=(t:string)=>{navigator.clipboard.writeText(t);alert("Copiado! ✅");};
  if(!data) return <div style={{padding:'40px',textAlign:'center',background:'#0A0A0A',color:'white',minHeight:'100vh'}}>Carregando {params.slug}...</div>;
  const getId=(u:string)=>{const m=u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);return m?m[1]:null;};
  const ytId=data.video_url?getId(data.video_url):null;

  return(<div style={{minHeight:'100vh',background:'#0A0A0A',color:'white',maxWidth:'480px',margin:'0 auto',fontFamily:'system-ui'}}>
    {data.video_url && <div style={{width:'100%',aspectRatio:'16/9',background:'#111'}}>{ytId?<iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen/>:<video src={data.video_url} controls style={{width:'100%',height:'100%'}}/>}</div>}
    <div style={{padding:'24px',textAlign:'center'}}><div style={{width:'80px',height:'80px',borderRadius:'50%',background:'#1A1A1A',margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px'}}>🍕</div><h1 style={{fontSize:'24px',fontWeight:900,margin:0}}>{data.title}</h1><p style={{opacity:0.6,marginTop:'6px'}}>{data.bio}</p>{data.localizacao && <div style={{display:'inline-block',background:'#1A1A1A',padding:'6px 12px',borderRadius:'99px',fontSize:'12px',marginTop:'10px'}}>📍 {data.localizacao}</div>}</div>
    <div style={{padding:'0 16px',display:'flex',flexDirection:'column',gap:'12px'}}>
      <button onClick={()=>setShowWifi(true)} style={{background:'#111',padding:'18px',borderRadius:'16px',border:'1px solid #222',color:'white',display:'flex',justifyContent:'space-between',width:'100%'}}>📶 Wi-Fi Grátis <span>→</span></button>
      <a href={`https://wa.me/55${(data.whatsapp||"").replace(/\D/g,"")}`} target="_blank" style={{background:'#25D366',padding:'18px',borderRadius:'16px',display:'flex',justifyContent:'space-between',textDecoration:'none',color:'white',fontWeight:700}}>💬 WhatsApp <span>→</span></a>
      <button onClick={()=>setShowPix(true)} style={{background:'#00C851',padding:'18px',borderRadius:'16px',border:'none',color:'white',display:'flex',justifyContent:'space-between',width:'100%',fontWeight:700}}>💳 Pague com Pix <span>→</span></button>
      <a href={`https://maps.google.com/?q=${encodeURIComponent(data.localizacao||"")}`} target="_blank" style={{background:'#111',padding:'18px',borderRadius:'16px',border:'1px solid #222',display:'flex',justifyContent:'space-between',textDecoration:'none',color:'white'}}>📍 {data.localizacao||"Ver no Mapa"} <span>→</span></a>
    </div>
    {showPix && <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',zIndex:50}}><div style={{background:'#141414',borderRadius:'24px',padding:'24px',width:'100%',maxWidth:'400px'}}><h3>💳 Pix</h3><div style={{background:'#1A1A1A',padding:'16px',borderRadius:'12px',marginTop:'12px'}}>{data.pix_key}</div><button onClick={()=>copy(data.pix_key)} style={{marginTop:'16px',width:'100%',padding:'16px',borderRadius:'12px',border:'none',fontWeight:900}}>Copiar</button><button onClick={()=>setShowPix(false)} style={{marginTop:'12px',width:'100%',background:'transparent',color:'white',padding:'12px',border:'1px solid #333',borderRadius:'12px'}}>Fechar</button></div></div>}
    {showWifi && <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',zIndex:50}}><div style={{background:'#141414',borderRadius:'24px',padding:'24px',width:'100%',maxWidth:'400px'}}><h3>📶 Wi-Fi</h3><div style={{background:'#1A1A1A',padding:'16px',borderRadius:'12px',marginTop:'12px'}}><div>Rede: {data.wifi_ssid||"WIFI"}</div><div>Senha: {data.wifi_pass}</div></div><button onClick={()=>copy(data.wifi_pass||"")} style={{marginTop:'16px',width:'100%',padding:'16px',borderRadius:'12px',border:'none',fontWeight:900}}>Copiar Senha</button><button onClick={()=>setShowWifi(false)} style={{marginTop:'12px',width:'100%',background:'transparent',color:'white',padding:'12px',border:'1px solid #333',borderRadius:'12px'}}>Fechar</button></div></div>}
    <div style={{textAlign:'center',padding:'24px',opacity:0.3,fontSize:'11px'}}>Feito com Vision Local</div>
  </div>);
}
