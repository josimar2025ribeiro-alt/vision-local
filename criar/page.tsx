"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CriarBiosite() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("Pizzaria Holambra");
  const [bio, setBio] = useState("A Melhor Pizza de Holambra - Massa artesanal");
  const [video, setVideo] = useState("");
  const [whatsapp, setWhatsapp] = useState("19999999999");
  const [pixKey, setPixKey] = useState("19999999999");
  const [wifiSsid, setWifiSsid] = useState("PizzariaHolambra_WiFi");
  const [wifiPass, setWifiPass] = useState("holambra123");
  const [localizacao, setLocalizacao] = useState("Holambra - SP");
  const [catalogo, setCatalogo] = useState([
    {nome: "Calabresa Especial", preco: "49,90", foto: "🍕"},
    {nome: "Portuguesa", preco: "52,90", foto: "🍕"},
    {nome: "Frango Catupiry", preco: "54,90", foto: "🍕"},
  ]);
  const [salvando, setSalvando] = useState(false);

  const salvar = async () => {
    if(!slug) { alert("Coloca o nome do link! Ex: pizzaria-holambra"); return; }
    setSalvando(true);
    const { error } = await supabase.from("biosites").upsert({
      slug: slug.toLowerCase().replace(/\s+/g,'-'),
      title,
      bio,
      video_url: video,
      pix_key: pixKey,
      wifi_ssid: wifiSsid,
      wifi_pass: wifiPass,
      whatsapp,
      localizacao,
      catalogo: catalogo,
      blocks: [
        {type: "whatsapp", label: "Fale no WhatsApp", value: whatsapp, icon: "💬"},
        {type: "pix", label: "Pague com Pix", value: pixKey, icon: "💳"},
        {type: "wifi", label: "Wi-Fi Grátis", value: `${wifiSsid} / ${wifiPass}`, icon: "📶", ssid: wifiSsid, pass: wifiPass},
        {type: "local", label: localizacao, value: localizacao, icon: "📍"},
      ]
    }, {onConflict: "slug"});
    
    setSalvando(false);
    if(error) { alert("Erro: " + error.message); }
    else {
      alert("Biosite criado! ✅");
      router.push(`/${slug.toLowerCase().replace(/\s+/g,'-')}`);
    }
  };

  return (
    <div style={{minHeight:'100vh', background:'#0A0A0A', color:'white', fontFamily:'system-ui'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto', display:'flex', flexWrap:'wrap'}}>
        <div style={{flex:'1 1 600px', padding:'24px'}}>
          <h1 style={{fontSize:'28px', fontWeight:900, marginBottom:'8px'}}>🎨 Criar seu Biosite</h1>
          <p style={{opacity:0.6, marginBottom:'24px'}}>Preencha abaixo, tudo aparece ao vivo no celular ao lado</p>

          <div style={{background:'#141414', borderRadius:'16px', padding:'20px', marginBottom:'16px'}}>
            <label style={{fontSize:'12px', opacity:0.6}}>LINK DO SEU BIOSITE *</label>
            <div style={{display:'flex', gap:'8px', marginTop:'8px'}}>
              <span style={{background:'#1A1A1A', padding:'14px', borderRadius:'12px 0 0 12px'}}>vision-local.vercel.app/</span>
              <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="pizzaria-holambra" style={{flex:1, background:'#1A1A1A', border:'1px solid #222', padding:'14px', borderRadius:'0 12px 12px 0', color:'white'}}/>
            </div>
          </div>

          <div style={{background:'#141414', borderRadius:'16px', padding:'20px', marginBottom:'16px'}}>
            <label style={{fontSize:'12px', opacity:0.6}}>NOME DO NEGÓCIO</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%', background:'#1A1A1A', border:'1px solid #222', padding:'14px', borderRadius:'12px', color:'white', marginTop:'8px'}}/>
            <label style={{fontSize:'12px', opacity:0.6, marginTop:'12px', display:'block'}}>BIO (descrição curta)</label>
            <input value={bio} onChange={e=>setBio(e.target.value)} style={{width:'100%', background:'#1A1A1A', border:'1px solid #222', padding:'14px', borderRadius:'12px', color:'white', marginTop:'8px'}}/>
          </div>

          <div style={{background:'#141414', borderRadius:'16px', padding:'20px', marginBottom:'16px'}}>
            <label style={{fontSize:'12px', opacity:0.6}}>🎬 VÍDEO NO TOPO (YouTube, TikTok, Instagram)</label>
            <input value={video} onChange={e=>setVideo(e.target.value)} placeholder="https://youtube.com/..." style={{width:'100%', background:'#1A1A1A', border:'1px solid #222', padding:'14px', borderRadius:'12px', color:'white', marginTop:'8px'}}/>
          </div>

          <div style={{background:'#141414', borderRadius:'16px', padding:'20px', marginBottom:'16px'}}>
            <h3 style={{margin:'0 0 12px 0'}}>🔘 Botões (clique para editar)</h3>
            <div style={{background:'#1A1A1A', padding:'12px', borderRadius:'12px', marginBottom:'10px', display:'flex', justifyContent:'space-between'}}>
              <span>💬 WhatsApp</span>
              <input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} style={{background:'#0A0A0A', border:'1px solid #222', padding:'8px', borderRadius:'8px', color:'white', width:'140px'}}/>
            </div>
            <div style={{background:'#1A1A1A', padding:'12px', borderRadius:'12px', marginBottom:'10px', display:'flex', justifyContent:'space-between'}}>
              <span>💳 Chave Pix</span>
              <input value={pixKey} onChange={e=>setPixKey(e.target.value)} style={{background:'#0A0A0A', border:'1px solid #222', padding:'8px', borderRadius:'8px', color:'white', width:'140px'}}/>
            </div>
            <div style={{background:'#1A1A1A', padding:'12px', borderRadius:'12px', marginBottom:'10px'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><span>📶 Wi-Fi Nome</span>
              <input value={wifiSsid} onChange={e=>setWifiSsid(e.target.value)} style={{background:'#0A0A0A', border:'1px solid #222', padding:'8px', borderRadius:'8px', color:'white', width:'140px'}}/></div>
              <div style={{display:'flex', justifyContent:'space-between'}}><span>🔑 Wi-Fi Senha</span>
              <input value={wifiPass} onChange={e=>setWifiPass(e.target.value)} style={{background:'#0A0A0A', border:'1px solid #222', padding:'8px', borderRadius:'8px', color:'white', width:'140px'}}/></div>
            </div>
            <div style={{background:'#1A1A1A', padding:'12px', borderRadius:'12px', display:'flex', justifyContent:'space-between'}}>
              <span>📍 Localização</span>
              <input value={localizacao} onChange={e=>setLocalizacao(e.target.value)} style={{background:'#0A0A0A', border:'1px solid #222', padding:'8px', borderRadius:'8px', color:'white', width:'140px'}}/>
            </div>
          </div>

          <button onClick={salvar} disabled={salvando} style={{width:'100%', background:'#00C851', color:'white', padding:'18px', borderRadius:'16px', border:'none', fontWeight:900, fontSize:'18px', cursor:'pointer'}}>
            {salvando ? "Salvando..." : "💾 Salvar e Publicar Biosite"}
          </button>
        </div>

        <div style={{flex:'0 0 360px', padding:'24px', position:'sticky', top:0, height:'100vh', overflow:'auto'}}>
          <div style={{background:'#1A1A1A', borderRadius:'32px', padding:'12px', border:'4px solid #222'}}>
            <div style={{background:'#0A0A0A', borderRadius:'24px', overflow:'hidden', minHeight:'600px'}}>
              <div style={{height:'200px', background:'#111', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {video ? <div style={{padding:'12px', fontSize:'12px', wordBreak:'break-all'}}>🎬 {video}</div> : <span style={{fontSize:'40px'}}>🎬<div style={{fontSize:'12px', opacity:0.5}}>Seu vídeo aqui</div></span>}
              </div>
              <div style={{padding:'16px', textAlign:'center'}}>
                <h2 style={{margin:0, fontSize:'20px'}}>{title}</h2>
                <p style={{opacity:0.6, fontSize:'13px'}}>{bio}</p>
                <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'10px'}}>
                  <div style={{background:'#25D366', padding:'14px', borderRadius:'12px'}}>💬 WhatsApp</div>
                  <div style={{background:'#00C851', padding:'14px', borderRadius:'12px'}}>💳 Pix - {pixKey}</div>
                  <div style={{background:'#111', border:'1px solid #222', padding:'14px', borderRadius:'12px'}}>📶 {wifiSsid}</div>
                  <div style={{background:'#111', border:'1px solid #222', padding:'14px', borderRadius:'12px'}}>📍 {localizacao}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
