"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",whatsapp:"",localizacao:"",video_url:"",pix_key:"",wifi_password:"",instagram:"",servicos:"",agendamento:"",logo_url:"",foto_url:""});
const [saving,setSaving]=useState(false)

function getId(url:string){
try{
if(!url) return null
const u=new URL(url)
if(u.hostname.includes('youtu.be')) return u.pathname.slice(1)
if(u.searchParams.get('v')) return u.searchParams.get('v')!
return u.pathname.split('/').pop()||null
}catch{return null}
}
const ytId=getId(f.video_url)

async function salvar(){
if(!f.slug||!f.title) return alert("Nome e slug obrigatórios");
setSaving(true)
const {error}=await supabase.from("biosites").upsert([{
title:f.title,
slug:f.slug.toLowerCase().replace(/\s+/g,"-"),
whatsapp:f.whatsapp,
localizacao:f.localizacao,
video_url:f.video_url,
pix_key:f.pix_key,
wifi_password:f.wifi_password,
instagram:f.instagram,
servicos:f.servicos,
agendamento:f.agendamento,
logo_url:f.logo_url,
foto_url:f.foto_url,
}],{onConflict:'slug'})
setSaving(false)
if(error) alert(error.message)
else {alert("Salvo!"); location.href="/"+f.slug}
}

const inp={padding:'12px',background:'#1A1A1A',border:'1px solid #2A2A2A',borderRadius:'10px',color:'white',width:'100%',fontSize:'14px',marginBottom:'10px'} as any

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'24px',borderRight:'1px solid #222',overflowY:'auto'}}>
<h1 style={{fontWeight:900,marginBottom:'16px'}}>EDITOR VISION LOCAL</h1>
<input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="slug ex: oficina-de-motos *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<input style={inp} placeholder="Logo URL https://..." value={f.logo_url} onChange={e=>setF({...f,logo_url:e.target.value})}/>
<input style={inp} placeholder="Foto Capa URL https://..." value={f.foto_url} onChange={e=>setF({...f,foto_url:e.target.value})}/>
<input style={inp} placeholder="YouTube https://..." value={f.video_url} onChange={e=>setF({...f,video_url:e.target.value})}/>
<input style={inp} placeholder="Instagram https://..." value={f.instagram} onChange={e=>setF({...f,instagram:e.target.value})}/>
<input style={inp} placeholder="WhatsApp 19999999999" value={f.whatsapp} onChange={e=>setF({...f,whatsapp:e.target.value})}/>
<input style={inp} placeholder="Link Serviços https://..." value={f.servicos} onChange={e=>setF({...f,servicos:e.target.value})}/>
<input style={inp} placeholder="Link Agendar https://..." value={f.agendamento} onChange={e=>setF({...f,agendamento:e.target.value})}/>
<input style={inp} placeholder="Pix" value={f.pix_key} onChange={e=>setF({...f,pix_key:e.target.value})}/>
<input style={inp} placeholder="Senha WiFi" value={f.wifi_password} onChange={e=>setF({...f,wifi_password:e.target.value})}/>
<input style={inp} placeholder="Localização" value={f.localizacao} onChange={e=>setF({...f,localizacao:e.target.value})}/>
<button onClick={salvar} style={{background:'#00C851',padding:'16px',borderRadius:'10px',width:'100%',border:'none',color:'white',fontWeight:900}}>{saving?'SALVANDO...':'SALVAR'}</button>
</div>
<div style={{width:'50%',display:'flex',justifyContent:'center',padding:'20px',background:'#050505'}}>
<div style={{width:'340px',background:'#080808',borderRadius:'20px',border:'1px solid #222',overflow:'hidden',height:'fit-content'}}>
{f.foto_url && <div style={{height:'160px',background:`url(${f.foto_url}) center/cover`}}/>}
<div style={{padding:'16px',marginTop:f.foto_url?'-40px':'0',position:'relative'}}>
{f.logo_url?<img src={f.logo_url} style={{width:'70px',height:'70px',borderRadius:'50%',border:'3px solid #080808',margin:'0 auto',display:'block',objectFit:'cover'}}/>:<div style={{width:'70px',height:'70px',borderRadius:'50%',background:'#1A1A1A',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center'}}>🏪</div>}
<h2 style={{textAlign:'center',fontWeight:900,marginTop:'10px',fontSize:'16px'}}>{f.title||'NOME DA LOJA'}</h2>
{ytId && <div style={{aspectRatio:'16/9',borderRadius:'10px',overflow:'hidden',margin:'12px 0',background:'#111'}}><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0"/></div>}
<div style={{background:'#111',padding:'12px',borderRadius:'10px',marginBottom:'8px',fontSize:'12px'}}>📸 Instagram</div>
<div style={{background:'#00C851',padding:'12px',borderRadius:'10px',marginBottom:'8px',fontSize:'12px'}}>💬 WhatsApp</div>
<div style={{background:'#111',padding:'12px',borderRadius:'10px',marginBottom:'8px',fontSize:'12px'}}>⭐ Serviços</div>
<div style={{background:'#111',padding:'12px',borderRadius:'10px',marginBottom:'8px',fontSize:'12px'}}>📅 Agendar</div>
<div style={{background:'#00C851',padding:'12px',borderRadius:'10px',marginBottom:'8px',fontSize:'12px'}}>💳 Pix - {f.wifi_password||'...'}</div>
</div>
</div>
</div>
</div>
)
}
