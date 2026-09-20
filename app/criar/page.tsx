// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"
export default function Criar(){
  const [f,setF]=useState({title:"",slug:"",wpp:"",serv:"",logo:"",foto:""})
  const [msg,setMsg]=useState("")
  async function upload(file:any,pasta:string){
    setMsg("Enviando...")
    const nome=pasta+"/"+Date.now()+"-"+file.name
    const r=await supabase.storage.from("midias").upload(nome,file)
    setMsg("")
    if(r.error){alert(r.error.message);return null}
    return supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl
  }
  async function salvar(){
    const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-").trim()
    if(!f.title||!slugFinal){alert("Preenche nome e slug sem espaco! Ex: barbearia-holambra");return}
    setMsg("Salvando...")
    const {error}=await supabase.from("biosites").upsert([{title:f.title,slug:slugFinal,whatsapp:f.wpp,servicos:f.serv,logo_url:f.logo,foto_url:f.foto}],{onConflict:'slug'})
    setMsg("")
    if(error){alert("ERRO BANCO: "+error.message+"\nRoda no SQL: ALTER TABLE biosites DISABLE ROW LEVEL SECURITY;");return}
    location.href="/"+slugFinal
  }
  const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'8px'} as any
  return(
    <div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
      <div style={{width:'50%',padding:'14px'}}>
        <h2>CRIAR LOJA - SEM ESPACO NO SLUG!</h2>
        {msg&&<div style={{background:'#00C851',padding:'8px',borderRadius:'8px',marginBottom:'8px'}}>{msg}</div>}
        <input style={inp} placeholder="Nome ex: Barbearia Style" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
        <input style={inp} placeholder="Slug SEM ESPACO ex: barbearia-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
        <div style={{background:'#1A1A1A',padding:'10px',borderRadius:'10px',marginBottom:'8px'}}><b>LOGO</b><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/></div>
        <div style={{background:'#1A1A1A',padding:'10px',borderRadius:'10px',marginBottom:'8px'}}><b>CAPA VIDEO OU FOTO</b><br/><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u})}}}/></div>
        <input style={inp} placeholder="Servicos" value={f.serv} onChange={e=>setF({...f,serv:e.target.value})}/>
        <input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
        <button onClick={salvar} style={{background:'#00C851',padding:'16px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,color:'white'}}>SALVAR LOJA</button>
      </div>
      <div style={{width:'50%',background:'#050505',display:'flex',justifyContent:'center',padding:'20px'}}>
        <div style={{width:'380px',background:'#111',borderRadius:'28px',overflow:'hidden',padding:'18px',textAlign:'center'}}>
          {f.foto? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'200px',objectFit:'cover'}}/> : <div style={{height:'110px',background:'#222'}}/>}
          {f.logo&&<img src={f.logo} style={{width:'78px',height:'78px',borderRadius:'50%',margin:'10px auto',display:'block'}}/>}
          <h2>{f.title||'NOME'}</h2><p>Slug final: {f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-")}</p>
        </div>
      </div>
    </div>
  )
}
