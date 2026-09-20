"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

function getYouTubeId(url:string){
if(!url) return null
try{
const u = new URL(url)
if(u.hostname.includes('youtu.be')) return u.pathname.slice(1)
if(u.searchParams.get('v')) return u.searchParams.get('v')
return u.pathname.split('/').pop() || null
}catch{return null}
}

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",whatsapp:"",localizacao:"",video_url:"",pix_key:"",wifi_password:"",catalogo:"",instagram:"",servicos:"",agendamento:"",logo_url:"",foto_url:""});
const [saving,setSaving]=useState(false)
const ytId = getYouTubeId(f.video_url)

async function salvar(){
if(!f.slug||!f.title) return alert("Preencha NOME e SLUG!");
setSaving(true)
const {error}=await supabase.from("biosites").upsert([{
title:f.title,
slug:f.slug.toLowerCase().replace(/\s+/g,"-"),
whatsapp:f.whatsapp,
localizacao:f.localizacao,
video_url:f.video_url,
pix_key:f.pix_key,
wifi_password:f.wifi_password,
catalogo:f.catalogo,
instagram:f.instagram,
servicos:f.servicos,
agendamento:f.agendamento,
logo_url:f.logo_url,
foto_url:f.foto_url,
}],{onConflict:'slug'});
setSaving(false)
if(error) alert(error.message)
else {alert("✅ Salvo! Abrindo página..."); location.href="/"+f.slug}
}

const inputStyle = {padding:'12px 14px',background:'#1A1A1A',border:'1px solid #2A2A2A',borderRadius:'10px',color:'white',width:'100%',fontSize:'14px'} as any
const labelStyle = {fontSize:'11px',opacity:0.5,marginBottom:'4px',display:'block',textTransform:'uppercase',letterSpacing:'1px'} as any
const btnBase = {display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',background:'#111',border:'1px solid #222',borderRadius:'14px',color:'white',marginBottom:'10px',fontSize:'14px',fontWeight:600} as any
const btnGreen = {...btnBase,background:'#00C851',border:'none',fontWeight:800}

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white',fontFamily:'system-ui'}}>
{/* ESQUERDA - EDITOR */}
<div style={{width:'55%',padding:'30px',overflowY:'auto',borderRight:'1px solid #1A1A1A'}}>
<h1 style={{fontSize:'22px',fontWeight:900,marginBottom:'20px'}}>EDITOR VISION LOCAL</h1>

<div style={{display:'grid',gap:'16px'}}>
<div><span style={labelStyle}>Nome da Loja *</span><input style={inputStyle} placeholder="OFICINA DE MOTOS" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/></div>
<div><span style={labelStyle}>Slug (link) * ex: oficina-de-motos</span><input style={inputStyle} placeholder="oficina-de-motos" value={f.slug} onChange={e=>setF({...f,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')})}/></div>

<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
<div><span style={labelStyle}>Logo URL</span><input style={inputStyle} placeholder="https://..." value={f.logo_url} onChange={e=>setF({...f,logo_url:e.target.value})}/></div>
<div><span style={labelStyle}>Foto Capa URL</span><input style={inputStyle} placeholder="https://..." value={f.foto_url} onChange={e=>setF({...f,foto_url:e.target.value})}/></div>
</div>

<div><span style={labelStyle}>YouTube URL</span><input style={inputStyle} placeholder="https://youtube.com/watch?v=..." value={f.video_url} onChange={e=>setF({...f,video_url:e.target.value})}/></div>

<div><span style={labelStyle}>Instagram</span><input style={inputStyle} placeholder="https://instagram.com/loja" value={f.instagram} onChange={e=>setF({...f,instagram:e.target.value})}/></div>
<div><span style={labelStyle}>WhatsApp (só número)</span><input style={inputStyle} placeholder="19999999999" value={f.whatsapp} onChange={e=>setF({...f,whatsapp:e.target.value})}/></div>
<div><span style={labelStyle}>Link Nossos Serviços</span><input style={inputStyle} placeholder="https://..." value={f.servicos} onChange={e=>setF({...f,servicos:e.target.value})}/></div>
<div><span style={labelStyle}>Link Agendar Horário</span><input style={inputStyle} placeholder="https://wa.me/..." value={f.agendamento} onChange={e=>setF({...f,agendamento:e.target.value})}/></div>
<div><span style={labelStyle}>Chave Pix / Link</span><input style={inputStyle} placeholder="Pix" value={f.pix_key} onChange={e=>setF({...f,pix_key:e.target.value})}/></div>
<div><span style={labelStyle}>Senha Wi-Fi</span><input style={inputStyle} placeholder="98765677" value={f.wifi_password} onChange={e=>setF({...f,wifi_password:e.target.value})}/></div>
<div><span style={labelStyle}>Localização</span><input style={inputStyle} placeholder="Holambra SP" value={f.localizacao} onChange={e=>setF({...f,localizacao:e.target.value})}/></div>

<button onClick={salvar} disabled={saving} style={{background:'#00C851',padding:'18px',borderRadius:'12px',border:'none',color:'white',fontWeight:900,fontSize:'16px',marginTop:'10px',cursor:'pointer'}}>{saving?'SALVANDO...':'💾 SALVAR E VER PÁGINA'}</button>
</div>
</div>

{/* DIREITA - PREVIEW AO VIVO */}
<div style={{width:'45%',background:'#050505',display:'flex',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
<div style={{width:'100%',maxWidth:'380px',background:'#080808',borderRadius:'24px',border:'1px solid #1A1A1A',overflow:'hidden',height:'fit-content',minHeight:'700px'}}>
{f.foto_url && <div style={{width:'100%',height:'180px',background:`url(${f.foto_url}) center/cover`}}/>}
<div style={{padding:'20px',marginTop:f.foto_url?'-50px':'' as any,position:'relative'}}>
{f.logo_url ? <img src={f.logo_url} style={{width:'80px',height:'80px',borderRadius:'50%',border:'4px solid #080808',objectFit:'cover',margin:'0 auto',display:'block'}}/> : <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'#1A1A1A',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',fontSize:'30px'}}>🏪</div>}
<h2 style={{textAlign:'center',fontWeight:900,fontSize:'18px',marginTop:'12px'}}>{f.title || 'NOME DA LOJA'}</h2>
<p style={{textAlign:'center',opacity:0.5,fontSize:'11px',margin:'8px 0 16px'}}>Toque nos botões abaixo 👇</p>

{ytId && <div style={{width:'100%',aspectRatio:'16/9',borderRadius:'12px',overflow:'hidden',marginBottom:'14px',background:'#111'}}><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" style={{border:'none'}}/></div>}

<div style={btnBase}><span>📸 Instagram</span><span>→</span></div>
<div style={btnGreen}><span>💬 WhatsApp</span><span>→</span></div>
<div style={btnBase}><span>⭐ Nossos Serviços</span><span>→</span></div>
<div style={btnBase}><span>📅 Agendar Horário</span><span>→</span></div>
<div style={btnGreen}><span>💳 Pague com Pix</span><span>→</span></div>
<div style={btnBase}><span>📶 Wi-Fi Grátis - Senha: {f.wifi_password||'...'}</span><span>→</span></div>
<div style={btnBase}><span>📍 Ver no Mapa</span><span>→</span></div>
<p style={{textAlign:'center',opacity:0.3,fontSize:'9px',marginTop:'20px'}}>FEITO COM VISION LOCAL</p>
</div>
</div>
</div>
</div>
</div>
)
}
