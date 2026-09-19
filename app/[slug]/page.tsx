import { supabase } from "../../lib/supabase";
import { notFound } from "next/navigation";

export default async function Page({params}:{params:{slug:string}}){
  const {data} = await supabase.from("sites").select("*").eq("slug",params.slug).single();
  if(!data) return notFound();

  return (
    <div style={{minHeight:'100vh',background:'#0A0A0A',color:'white',fontFamily:'system-ui'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px',maxWidth:'1100px',margin:'0 auto'}}>
        <h1 style={{fontSize:'24px',fontWeight:900}}>🍕 Pizzaria Holambra</h1>
        <a href="https://wa.me/5519988887777?text=Quero%20pizza!" style={{background:'#FF4D00',padding:'12px 24px',borderRadius:'999px',fontWeight:700,textDecoration:'none',color:'white'}}>Peça Agora</a>
      </header>

      <main style={{maxWidth:'1100px',margin:'0 auto',padding:'24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center',padding:'48px 0'}}>
          <div>
            <div style={{background:'#1A1A1A',display:'inline-block',padding:'8px 16px',borderRadius:'999px',fontSize:'14px',marginBottom:'16px'}}>⭐ 4.9/5 - 1.200 avaliações</div>
            <h2 style={{fontSize:'64px',fontWeight:900,lineHeight:'0.9',margin:0}}>A Melhor<br/><span style={{color:'#FF4D00'}}>Pizza de</span><br/>Holambra</h2>
            <p style={{opacity:0.7,marginTop:'24px',fontSize:'20px'}}>Massa artesanal, ingredientes frescos da região. Entrega em 30min ou sua pizza é grátis!</p>
            <div style={{display:'flex',gap:'16px',marginTop:'32px'}}>
              <a href="https://wa.me/5519988887777?text=Quero%20pizza!" style={{background:'#FF4D00',padding:'16px 32px',borderRadius:'999px',fontWeight:700,color:'white',textDecoration:'none'}}>Pedir no WhatsApp</a>
              <a href="#cardapio" style={{border:'1px solid rgba(255,255,255,0.2)',padding:'16px 32px',borderRadius:'999px',fontWeight:700,color:'white',textDecoration:'none'}}>Ver Cardápio</a>
            </div>
          </div>
          <div style={{background:'linear-gradient(135deg,#FF4D00,#FF8A00)',borderRadius:'32px',padding:'8px'}}>
            <div style={{background:'#111',borderRadius:'24px',height:'400px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'120px'}}>🍕</div>
          </div>
        </div>

        <div id="cardapio" style={{marginTop:'80px'}}>
          <h3 style={{fontSize:'40px',fontWeight:900,textAlign:'center',marginBottom:'48px'}}>Nosso Cardápio</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px'}}>
            {[
              {nome:"Calabresa Especial",preco:"R$ 49",desc:"Calabresa artesanal, cebola, catupiry",emoji:"🔥"},
              {nome:"Portuguesa",preco:"R$ 52",desc:"Presunto, ovos, cebola, azeitona",emoji:"🇵🇹"},
              {nome:"Margherita",preco:"R$ 45",desc:"Mussarela, tomate fresco, manjericão",emoji:"🌿"},
              {nome:"Frango Catupiry",preco:"R$ 54",desc:"Frango desfiado, catupiry original",emoji:"🍗"},
              {nome:"4 Queijos",preco:"R$ 56",desc:"Mussarela, gorgonzola, parmesão",emoji:"🧀"},
              {nome:"Vegana Holambra",preco:"R$ 48",desc:"Legumes da colônia, molho especial",emoji:"🌸"},
            ].map(p=>(
              <div key={p.nome} style={{background:'#141414',padding:'24px',borderRadius:'20px',border:'1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>{p.emoji}</div>
                <h4 style={{fontWeight:700,fontSize:'20px',margin:0}}>{p.nome}</h4>
                <p style={{opacity:0.6,fontSize:'14px',marginTop:'4px'}}>{p.desc}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'16px'}}>
                  <span style={{color:'#FF4D00',fontWeight:900}}>{p.preco}</span>
                  <a href="https://wa.me/5519988887777" style={{background:'white',color:'black',padding:'8px 16px',borderRadius:'999px',fontSize:'14px',fontWeight:700,textDecoration:'none'}}>Pedir</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:'80px',background:'#141414',borderRadius:'24px',padding:'32px',textAlign:'center'}}>
          <p style={{opacity:0.6}}>📍 R. Rota dos Imigrantes, 123 - Centro, Holambra - SP</p>
          <p style={{opacity:0.6,marginTop:'8px'}}>⏰ Ter-Dom: 18h às 23h | WhatsApp: (19) 98888-7777</p>
          <p style={{marginTop:'16px',fontSize:'12px',opacity:0.3}}>Site criado com Visão Local • vision-local.vercel.app/{data.slug}</p>
        </div>
      </main>

      <a href="https://wa.me/5519988887777" style={{position:'fixed',bottom:'24px',right:'24px',background:'#25D366',width:'56px',height:'56px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',boxShadow:'0 8px 32px rgba(0,0,0,0.4)',textDecoration:'none'}}>💬</a>
    </div>
  );
}
