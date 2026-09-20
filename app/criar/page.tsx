"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",whatsapp:"",localizacao:"",video_url:"",pix_key:"",wifi_password:"",catalogo:""});

async function salvar(){
if(!f.slug||!f.title) return alert("Preencha nome e slug!");
const {error}=await supabase.from("biosites").insert([{
title:f.title,
slug:f.slug.toLowerCase().replace(/\s/g,"-"),
whatsapp:f.whatsapp,
localizacao:f.localizacao,
video_url:f.video_url,
pix_key:f.pix_key,
wifi_password:f.wifi_password,
catalogo:f.catalogo
}]);
if(error) alert(error.message); else {alert("Criado!"); location.href="/"+f.slug}
}

return(<div style={{background:'#0A0A0A',minHeight:'100vh',color:'white',padding:'20px'}}><h1>Criar Biosite</h1>
<div style={{display:'flex',flexDirection:'column',gap:'10px',maxWidth:'400px',marginTop:'20px'}}>
<input placeholder="Nome ex: Pizzaria Holambra" value={f.title} onChange={e=>setF({...f,title:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="slug ex: pizzaria-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value.toLowerCase().replace(/\s/g,'-')})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="WhatsApp" value={f.whatsapp} onChange={e=>setF({...f,whatsapp:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="Local" value={f.localizacao} onChange={e=>setF({...f,localizacao:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="YouTube" value={f.video_url} onChange={e=>setF({...f,video_url:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="Pix" value={f.pix_key} onChange={e=>setF({...f,pix_key:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="Wi-Fi" value={f.wifi_password} onChange={e=>setF({...f,wifi_password:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<input placeholder="Catálogo" value={f.catalogo} onChange={e=>setF({...f,catalogo:e.target.value})} style={{padding:'12px',background:'#1A1A1A',color:'white'}}/>
<button onClick={salvar} style={{background:'#00C851',padding:'16px',color:'white',fontWeight:900}}>CRIAR</button>
</div></div>)
}
