import Link from "next/link";
export default function Home(){
  return (
    <main style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:40,textAlign:'center'}}>
      <h1 style={{fontSize:48,fontWeight:800,letterSpacing:-1}}>Visão Local</h1>
      <p style={{opacity:0.7,marginTop:12}}>Plataforma profissional de microsites inteligentes</p>
      <Link href="/criar" style={{marginTop:24,background:'#fff',color:'#000',padding:'12px 24px',borderRadius:999,fontWeight:600,textDecoration:'none'}}>Criar meu site agora</Link>
      <p style={{marginTop:40,opacity:0.4,fontSize:12}}>Deploy corrigido ✅</p>
    </main>
  );
}
