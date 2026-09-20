"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const TEMAS=[
{name:"Preto",bg:"#080808",card:"#1A1A1A",btn:"#00C851"},
{name:"Vermelho",bg:"#1A0000",card:"#2A1010",btn:"#FF1A1A"},
{name:"Azul",bg:"#000A1A",card:"#0A1A2A",btn:"#0066FF"},
{name:"Roxo",bg:"#0F001A",card:"#1A0A2A",btn:"#9C27B0"},
{name:"Laranja",bg:"#1A0A00",card:"#2A1A0A",btn:"#FF6A00"},
{name:"Rosa Salão",bg:"#1A0010",card:"#2A101A",btn:"#E91E63"},
]

const TEMPLATES=[
{ nicho:"💈 Barbearia", icon:"💈", title:"Barbearia Style", capaTitulo:"Barbearia Premium - Cortes & Barba", capaDesc:"Corte na régua, barba, pigmentação. Atendimento com hora marcada. 10 anos em Holambra.", serv:"Corte Masculino, Barba, Sobrancelha", cat:"Catálogo de Cortes", wpp:"", insta:"", pix:"", wifi:"barber123", loc:"" },
{ nicho:"💇 Salão Feminino", icon:"💇‍♀️", title:"Studio Beleza", capaTitulo:"Salão Feminino - Beleza Completa", capaDesc:"Escova, coloração, mechas, alisamento, unhas e maquiagem. Agende seu horário!", serv:"Escova, Coloração, Mechas, Unhas", cat:"Tabela de Preços", wpp:"", insta:"", pix:"", wifi:"salao123", loc:"" },
{ nicho:"🏍️ Oficina Moto", icon:"🏍️", title:"Oficina do João", capaTitulo:"Oficina de Motos - Especialista", capaDesc:"Mais de 15 anos consertando motos em Holambra. Revisão, motor, freio, elétrica.", serv:"Revisão Geral, Troca Óleo, Motor", cat:"Peças e Acessórios", wpp:"", insta:"", pix:"", wifi:"oficina123", loc:"" },
{ nicho:"🚗 Oficina Carro", icon:"🚗", title:"Auto Center Silva", capaTitulo:"Auto Center - Mecânica Completa", capaDesc:"Mecânica, suspensão, freio, ar condicionado. Orçamento grátis!", serv:"Mecânica, Freio, Suspensão", cat:"Serviços", wpp:"", insta:"", pix:"", wifi:"auto123", loc:"" },
{ nicho:"🍔 Lanchonete", icon:"🍔", title:"Lanches Top", capaTitulo:"Lanchonete & Hamburgueria", capaDesc:"Os melhores lanches artesanais de Holambra. Delivery rápido!", serv:"Cardápio Lanches, Porções", cat:"Cardápio Completo", wpp:"", insta:"", pix:"", wifi:"lanche123", loc:"" },
{ nicho:"💅 Manicure", icon:"💅", title:"Espaço das Unhas", capaTitulo:"Manicure e Pedicure", capaDesc:"Alongamento, esmaltação em gel, decoração. Unhas perfeitas!", serv:"Manicure, Pedicure, Gel", cat:"Modelos de Unhas", wpp:"", insta:"", pix:"", wifi:"unhas123", loc:"" },
{ nicho:"👗 Loja Roupas", icon:"👗", title:"Moda Feminina", capaTitulo:"Loja de Roupas - Moda Atual", capaDesc:"Roupas femininas, masculinas, infantil. Novidades toda semana!", serv:"Feminino, Masculino, Infantil", cat:"Coleção Nova", wpp:"", insta:"", pix:"", wifi:"moda123", loc:"" },
{ nicho:"🍕 Pizzaria", icon:"🍕", title:"Pizzaria Sabor", capaTitulo:"Pizzaria - Forno a Lenha", capaDesc:"Pizza grande com borda recheada. Entrega em 30 min!", serv:"Pizzas Salgadas, Doces", cat:"Cardápio Pizzas", wpp:"", insta:"", pix:"", wifi:"pizza123", loc:"" },
{ nicho:"💪 Academia", icon:"💪", title:"Academia Fit", capaTitulo:"Academia - Treino Personalizado", capaDesc:"Musculação, funcional, personal. Plano mensal a partir de R$79", serv:"Musculação, Funcional, Personal", cat:"Planos", wpp:"", insta:"", pix:"", wifi:"fit123", loc:"" },
{ nicho:"🐶 Pet Shop", icon:"🐶", title:"Pet Shop Amigo", capaTitulo:"Pet Shop - Banho e Tosa", capaDesc:"Banho, tosa, ração, veterinário. Seu pet em boas mãos!", serv:"Banho e Tosa, Veterinário", cat:"Produtos Pet", wpp:"", insta:"", pix:"", wifi:"pet123", loc:"" },
]

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",serv:"",cat:"",agend:"",pix:"",wifi:"",loc:"",logo:"",foto:"",video:"",capaTitulo:"",capaDesc:""});
const [temaIdx,setTemaIdx]=useState(0); const [up,setUp]=useState("");
async function upload(file:File, pasta:string){
setUp("Enviando..."); const nome=`${pasta}/${Date.now()}-${file.name}`;
const {error}=await supabase.storage.from("midias").upload(nome,file);
setUp(""); if(error){alert(error.message); return null}
const {data}=supabase.storage.from("midias").getPublicUrl(nome); return data.publicUrl;
}
function aplicarTemplate(t:any){
setF({...f, title:t.title, capaTitulo:t.capaTitulo, capaDesc:t.capaDesc, serv:t.serv, cat:t.cat, wpp:t.wpp, insta:t.insta, pix:t.pix, wifi:t.wifi, loc:t.loc});
if(t.nicho.includes("Barbearia")||t.nicho.includes("Moto")) setTemaIdx(1);
else if(t.nicho.includes("Salão")||t.nicho.includes("Manicure")||t.nicho.includes("Roupas")) setTemaIdx(5);
else if(t.nicho.includes("Lanchonete")||t.nicho.includes("Pizzaria")) setTemaIdx(4);
else setTemaIdx(0);
window.scrollTo(0,0);
}
async function salvar(){
if(!f.title||!f.slug) return alert("Nome e slug");
const {error}=await supabase.from("biosites").upsert([{
title:f.title, slug:f.slug.toLowerCase().replace(/\s+/g,"-"), whatsapp:f.wpp, instagram:f.insta, servicos:f.serv, catalogo:f.cat, agendamento:f.agend, pix_key:f.pix, wifi_password:f.wifi, localizacao:f.loc, logo_url:f.logo, foto_url:f.foto, video_url:f.video, capa_titulo:f.capaTitulo, capa_desc:f.capaDesc
}],{onConflict:'slug'}); if(error) alert(error.message); else location.href="/"+f.slug;
}
const tema=TEMAS[temaIdx]
const inp={padding:'11px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'7px',fontSize:'12px'} as any
const card={background:'#1A1A1A',border:'1px dashed #555',borderRadius:'12px',padding:'12px',marginBottom:'10px'} as any

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontWeight:900,fontSize:'13px'}}>🎯 ESCOLHA SEU NICHO - CLICA E JÁ EDITA</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',margin:'10px 0'}}>
{TEMPLATES.map((t,i)=><button key={i} onClick={()=>aplicarTemplate(t)} style={{background:'#111',border:'1px solid #333',borderRadius:'10px',padding:'10px',textAlign:'left',color:'white',cursor:'pointer'}}>
<div style={{fontSize:'14px'}}>{t.icon}</div><div style={{fontSize:'10px',fontWeight:900,marginTop:'2px'}}>{t.nicho}</div><div style={{fontSize:'8px',opacity:0.5}}>Clique pra usar</div>
</button>)}
</div>

{up && <div style={{background:'#00C851',padding:'6px',borderRadius:'6px',fontSize:'10px',marginBottom:'6px'}}>{up}</div>}
<input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'10px'}}>
{TEMAS.map((t,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{padding:'5px 8px',borderRadius:'6px',border: temaIdx===i?'2px solid white':'1px solid #333',background:t.btn,color:'white',fontSize:'9px',fontWeight:900}}>{t.name}</button>)}
</div>
<div style={card}><b style={{fontSize:'10px'}}>📸 LOGO - Clique pra galeria do celular</b><br/><input type="file" accept="image/*" onChange={async e=>{const f2=e.target.files?.[0]; if(f2){const u=await upload(f2,"logos"); if(u) setF({...f,logo:u})}}}/>{f.logo && <img src={f.logo} style={{width:'50px',height:'50px',borderRadius:'50%',marginTop:'6px'}}/>}</div>
<div style={card}><b style={{fontSize:'10px'}}>🖼️ CAPA - FOTO ou VÍDEO da galeria + NOME + DESCRIÇÃO</b><br/><input type="file" accept="image/*,video/*" onChange={async e=>{const f2=e.target.files?.[0]; if(f2){const u=await upload(f2,"capas"); if(u) setF({...f,foto:u})}}}/><input style={{...inp,marginTop:'8px'}} placeholder="Nome da Capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/><textarea style={{...inp,height:'50px'}} placeholder="Descrição" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/></div>
<div style={{background:'#111',padding:'10px',borderRadius:'10px',marginBottom:'10px'}}>
<b style={{fontSize:'10px'}}>🔗 BOTÕES</b>
<input style={inp} placeholder="🛠️ Nossos Serviços" value={f.serv} onChange={e=>setF({...f,serv:e.target.value})}/>
<input style={inp} placeholder="📚 Catálogo" value={f.cat} onChange={e=>setF({...f,cat:e.target.value})}/>
<input style={inp} placeholder="📅 Agendamento" value={f.agend} onChange={e=>setF({...f,agend:e.target.value})}/>
<input style={inp} placeholder="💬 WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="📸 Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<input style={inp} placeholder="💳 Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="📶 Senha WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
<input style={inp} placeholder="📍 Link Google Maps" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
</div>
<div style={card}><b style={{fontSize:'10px'}}>🎥 VÍDEO EXTRA</b><br/><input type="file" accept="video/*" onChange={async e=>{const f2=e.target.files?.[0]; if(f2){const u=await upload(f2,"videos"); if(u) setF({...f,video:u})}}}/></div>
<button onClick={salvar} style={{background:'#00C851',padding:'14px',width:'100%',border:'none',borderRadius:'10px',fontWeight:900,color:'white'}}>💾 SALVAR LOJA</button>
</div>

<div style={{width:'50%',background:'#050505',display:'flex',justifyContent:'center',padding:'16px',overflowY:'auto',height:'100vh'}}>
<div style={{
