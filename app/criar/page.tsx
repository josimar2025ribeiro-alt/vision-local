// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Criar(){
const [f,setF]=useState({title:"LimaTecsun",slug:"limatecsun",logo:"",foto:"",capaTitulo:"Bem Vindo",capaDesc:"Energia Solar",corTitulo:"#FFFFFF",corDesc:"#AAAAAA",capaEstilo:"full",logoPos:"centro",wpp:"551999292812",pix:"44460221000118",wifi_ssid:"LimaTecsun",wifi:"12345678",loc:""})
const [tema,setTema]=useState(0)
const [up,setUp]=useState("")
const temas=[{btn:"#00E676",bg:"#0A0A0A",b1:"#00E676",b2:"#00B0FF"},{btn:"#FFC400",bg:"#0A0A0A",b1:"#FFC400",b2:"#FF6D00"}]
const t=temas[tema]

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
if(!f.title||!slugFinal){alert("Nome e slug");return}
setUp("Salvando...")
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,
whatsapp:f.wpp,pix_key:f.pix,
wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,
localizacao:f.loc,logo_url:f.logo,foto_url:f.foto,
capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,
cor_titulo:f.corTitulo,cor_desc:f.corDesc,
tema_idx:tema,capa_estilo:f.capaEstilo,logo_pos:f.logoPos
}],{onConflict:'slug'})
setUp("")
if(error){alert(error.message);return}
location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px'} as any
const pixQr=f.pix?`https://quickchart.io/qr?text=${encodeURIComponent(f.pix)}&size=300`:null
const wifiQr=f.wifi?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}&size=300`:null
const isVideo=f.foto&&f.foto.includes('mp4')

return (
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',borderRight:'1px solid #222'}}>
{up&&<div style={{background:t.btn,color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div>}
<input style={inp} placeholder="Nome" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',marginBottom:'8px'}}>
{[{id:'full',n:'Full'},{id:'quadrada',n:'Quadrada'},{id:'redonda',n:'Redonda'}].map(c=><button key={c.id} onClick={()=>setF({...f,capaEstilo:c.id})} style={{padding:'6px',borderRadius:'8px',background:f.capaEstilo===c.id?t.btn:'#222',color:f.capaEstilo===c.id?'black':'white',fontSize:'10px'}}>{c.n}</button>)}
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',marginBottom:'10px'}}>
{[{id:'centro',n:'Centro'},{id:'esquerda',n:'Esq'},{id:'direita',n:'Dir'}].map(p=><button key={p.id} onClick={()=>setF({...f,logoPos:p.id})} style={{padding:'6px',borderRadius:'8px',background:f.logoPos===p.id?t.btn:'#222',color:f.logoPos===p.id?'black':'white',fontSize:'10px'}}>{p.n}</button>)}
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px'}}>
<b style={{fontSize:'9px'}}>LOGO onde quiser no topo</b>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px'}}>
<b style={{fontSize:'9px'}}>CAPA VIDEO MP4 RODANDO ATRAS</b>
<input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u})}}}/>
<input style={{...inp,marginTop:'6px'}} placeholder="Titulo capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/>
<input style={inp} placeholder="Desc capa" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/>
</div>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="WiFi Nome" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="WiFi Senha" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>PIX QR CIMA - CHAVE BAIXO</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>WIFI QR CIMA - SENHA BAIXO</div><div style={{color:'black',fontSize:'10px',fontWeight:900}}>{f.wifi}</div></div>}
</div>
<button onClick={salvar} style={{background:t.btn,color:'black',padding:'16px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,marginTop:'12px'}}>SALVAR</button>
</div>
<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'12px'}}>
<div style={{width:'380px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto?(isVideo?<video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'260px',objectFit:'cover'}}/>:<div style={{height:'260px',background:`url(${f.foto}) center/cover`}}/>):<div style={{height:'120px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>}
{f.logo&&(f.logoPos==='esquerda'?<img src={f.logo} style={{width:'80px',height:'80px',borderRadius:'50%',border:'3px solid #121212',background:'white',margin:'-40px 0 0 16px',display:'block'}} alt="logo"/>:f.logoPos==='direita'?<img src={f.logo} style={{width:'80px',height:'80px',borderRadius:'50%',border:'3px solid #121212',background:'white',margin:'-40px 16px 0 auto',display:'block'}} alt="logo"/>:<img src={f.logo} style={{width:'80px',height:'80px',borderRadius:'50%',border:'3px solid #121212',background:'white',margin:'-40px auto 0',display:'block'}} alt="logo"/>)}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:f.corTitulo,fontWeight:900}}>{f.title}</h2>
<div style={{color:f.corDesc,fontSize:'12px'}}>{f.capaDesc}</div>
<div style={{marginTop:'12px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'12px',padding:'8px'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'8px'}}>PIX</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'12px',padding:'8px'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'8px'}}>WiFi {f.wifi}</div></div>}
</div>
</div>
</div>
</div>
</div>
)
}
