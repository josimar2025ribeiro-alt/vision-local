// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMAS=[
{btn:"#00E676",bg:"#0A0A0A",b1:"#00E676",b2:"#00B0FF"},
{btn:"#FFC400",bg:"#0A0A0A",b1:"#FFC400",b2:"#FF6D00"},
{btn:"#000",bg:"#FFF",b1:"#DDD",b2:"#FFF"},
]

export default function Criar(){
const [f,setF]=useState({title:"LimaTecsun",slug:"limatecsun",youtube:"https://www.youtube.com/watch?v=vMzKWhcSMCY",logo:"",foto:"",wpp:"551999292812",insta:"limatecsun",pix:"44460221000118",wifi_ssid:"LimaTecsun",wifi:"12345678",loc:"https://maps.google.com/?q=Engenheiro+Coelho"})
const [temaIdx,setTemaIdx]=useState(0)
const [up,setUp]=useState("")
const t=TEMAS[temaIdx]

async function upload(file,pasta){
setUp("Enviando "+file.name)
const nome=pasta+"/"+Date.now()+"-"+file.name
const r=await supabase.storage.from("midias").upload(nome,file)
setUp("")
if(r.error){alert(r.error.message);return null}
return supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl
}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
if(!f.title||!slugFinal){alert("Nome e slug!");return}
setUp("Salvando...")
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,
youtube_topo:f.youtube,whatsapp:f.wpp,instagram:f.insta,
pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,
logo_url:f.logo,foto_url:f.foto,
cor_titulo:"#FFF",cor_desc:"#AAA",tema_idx:temaIdx,
capa_estilo:"full",logo_pos:"centro",layout_tipo:2
}],{onConflict:'slug'})
setUp("")
if(error){alert(error.message);return}
location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px'} as any
const pixQr=f.pix?`https://quickchart.io/qr?text=${encodeURIComponent(f.pix)}&size=300`:null
const wifiQr=f.wifi?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}&size=300`:null

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
{up&&<div style={{background:t.btn,color:'black',padding:'8px',borderRadius:'8px',fontWeight:900}}>{up}</div>}
<input style={inp} placeholder="Nome" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug sem espaco" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<input style={inp} placeholder="YouTube link" value={f.youtube} onChange={e=>setF({...f,youtube:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px'}}>
<b style={{fontSize:'10px'}}>LOGO</b>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px'}}>
<b style={{fontSize:'10px'}}>CAPA</b>
<input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u})}}}/>
</div>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px solid #00E676',marginTop:'8px'}}>
<b style={{fontSize:'10px',color:'#00E676'}}>PIX QR CODE</b>
<input style={inp} placeholder="Chave Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
{pixQr&&<img src={pixQr} style={{width:'140px',height:'140px',margin:'8px auto',display:'block',background:'white',padding:'6px',borderRadius:'10px'}}/>}
</div>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px solid #FF9500',marginTop:'8px'}}>
<b style={{fontSize:'10px',color:'#FF9500'}}>WIFI QR - CIMA QR BAIXO SENHA</b>
<input style={inp} placeholder="Nome Rede" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="Senha WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
{wifiQr&&<div style={{background:'white',padding:'10px',borderRadius:'12px',textAlign:'center',marginTop:'6px'}}><img src={wifiQr} style={{width:'140px',height:'140px',margin:'0 auto',display:'block'}}/><div style={{color:'black',fontWeight:900,marginTop:'6px'}}>Senha: {f.wifi}</div></div>}
</div>
<input style={{...inp,marginTop:'8px'}} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
<button onClick={salvar} style={{background:t.btn,color:'black',padding:'16px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,marginTop:'12px'}}>SALVAR LOJA PREMIUM</button>
</div>

<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{height:'220px',background:'#000'}}>
{f.youtube&&<iframe src={`https://www.youtube.com/embed/${f.youtube.split('v=')[1]?.split('&')[0]||'vMzKWhcSMCY'}`} style={{width:'100%',height:'100%',border:'none'}} title="video"/>}
</div>
<div style={{padding:'16px',textAlign:'center',marginTop:'-30px',position:'relative',zIndex:2}}>
{f.logo&&<img src={f.logo} style={{width:'80px',height:'80px',borderRadius:'50%',margin:'0 auto',display:'block',border:'3px solid #121212',background:'white'}}/>}
<h2 style={{color:'white',fontWeight:900,marginTop:'10px'}}>{f.title}</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'16px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>PIX QR</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>WIFI QR</div><div style={{color:'black',fontSize:'8px'}}>Senha: {f.wifi}</div></div>}
</div>
<div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
<div style={{background:'#25D366',padding:'16px',borderRadius:'14px',color:'white',fontWeight:900}}>WhatsApp</div>
<div style={{background:'white',padding:'16px',borderRadius:'14px',color:'#1a73e8',fontWeight:900}}>Ver no Maps</div>
</div>
</div>
</div>
</div>
</div>
</div>
)
}
