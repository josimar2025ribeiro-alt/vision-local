// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Criar(){
const [f,setF]=useState({title:"LimaTecsun",slug:"limatecsun",youtube:"vMzKWhcSMCY",logo:"",wpp:"551999292812",pix:"44460221000118",wifi_ssid:"LimaTecsun",wifi:"12345678",loc:""})
const [up,setUp]=useState("")

async function upload(file,pasta){
setUp("Enviando...")
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
title:f.title,slug:slugFinal,youtube_topo:f.youtube,whatsapp:f.wpp,
pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,logo_url:f.logo
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
<div style={{width:'50%',padding:'14px',borderRight:'1px solid #222'}}>
{up&&<div style={{background:'#00E676',color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div>}
<input style={inp} placeholder="Nome LimaTecsun" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug limatecsun" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<input style={inp} placeholder="YouTube ID vMzKWhcSMCY" value={f.youtube} onChange={e=>setF({...f,youtube:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px'}}>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/>
</div>
<input style={inp} placeholder="WhatsApp 551999292812" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Pix 44460221000118" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="WiFi Nome" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="WiFi Senha" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
<input style={inp} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
<button onClick={salvar} style={{background:'#00E676',color:'black',padding:'16px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,marginTop:'12px'}}>SALVAR</button>
</div>
<div style={{width:'50%',background:'#000',display:'flex',justifyContent:'center',padding:'12px'}}>
<div style={{width:'380px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{height:'220px',background:'#000'}}>
<iframe src={`https://www.youtube.com/embed/${f.youtube}`} style={{width:'100%',height:'100%',border:'none'}} title="yt"/>
</div>
<div style={{padding:'16px',textAlign:'center'}}>
{f.logo&&<img src={f.logo} style={{width:'80px',height:'80px',borderRadius:'50%',margin:'-40px auto 10px',display:'block',border:'3px solid #121212',background:'white'}} alt="logo"/>}
<h2 style={{color:'white',fontWeight:900}}>{f.title}</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'16px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>PIX QR</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>WIFI QR</div><div style={{color:'black',fontSize:'8px'}}>Senha: {f.wifi}</div></div>}
</div>
</div>
</div>
</div>
</div>
)
}
