"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Criar(){
  const [slug,setSlug]=useState("");
  const [nome,setNome]=useState("");
  const [loading,setLoading]=useState(false);

  async function criar(){ 
    if(!slug||!nome) return alert("Preencha slug e nome");
    setLoading(true);
    const {error}=await supabase.from("sites").insert({slug,nome}); 
    setLoading(false);
    if(error) alert(error.message); 
    else { alert("Criado! Acesse /"+slug); window.location.href="/"+slug; }
  }

  return (
    <main style={{padding:40,maxWidth:480,margin:"0 auto"}}>
      <h1 style={{fontSize:32,fontWeight:800}}>Criar Site</h1>
      <input placeholder="slug (ex: minha-loja)" value={slug} onChange={e=>setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))} style={{width:'100%',padding:12,marginTop:20,borderRadius:8,border:'1px solid #333',background:'#111',color:'#fff'}}/>
      <input placeholder="Nome do negócio" value={nome} onChange={e=>setNome(e.target.value)} style={{width:'100%',padding:12,marginTop:12,borderRadius:8,border:'1px solid #333',background:'#111',color:'#fff'}}/>
      <button onClick={criar} disabled={loading} style={{marginTop:16,padding:12,width:'100%',background:'#fff',color:'#000',fontWeight:700,borderRadius:8,border:0,cursor:'pointer'}}>{loading?"Criando...":"Criar"}</button>
    </main>
  );
}
