import { supabase } from "../../lib/supabase";
import { notFound } from "next/navigation";

export default async function Page({params}:{params:{slug:string}}){
  const {data} = await supabase.from("sites").select("*").eq("slug",params.slug).single();
  if(!data) return notFound();
  return (
    <main style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:40,textAlign:'center'}}>
      <h1 style={{fontSize:48,fontWeight:800}}>{data.nome}</h1>
      <p style={{opacity:0.7,marginTop:12}}>/{data.slug}</p>
      <p style={{marginTop:24,padding:'12px 24px',background:'#111',borderRadius:999}}>Site criado com Visão Local</p>
    </main>
  );
}
