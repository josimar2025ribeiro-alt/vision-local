"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
const TEMAS=[{name:"Preto",bg:"#080808",card:"#1A1A1A",btn:"#00C851"},{name:"Vermelho",bg:"#1A0000",card:"#2A1010",btn:"#FF1A1A"},{name:"Azul",bg:"#000A1A",card:"#0A1A2A",btn:"#0066FF"},{name:"Laranja",bg:"#1A0A00",card:"#2A1A0A",btn:"#FF6A00"},{name:"Rosa",bg:"#1A0010",card:"#2A101A",btn:"#E91E63"}]
const TEMPLATES=[
{ nicho:"💈 Barbearia", icon:"💈", title:"Barbearia Style", capaTitulo:"Barbearia Premium - Cortes & Barba", capaDesc:"Corte na régua, barba, pigmentação. 10 anos em Holambra.", serv:"Corte, Barba, Sobrancelha", cat:"Catálogo de Cortes", wifi:"barber123" },
{ nicho:"💇 Salão", icon:"💇‍♀️", title:"Studio Beleza", capaTitulo:"Salão Feminino - Beleza Completa", capaDesc:"Escova, coloração, mechas, unhas e maquiagem.", serv:"Escova, Coloração, Mechas", cat:"Tabela de Preços", wifi:"salao123" },
{ nicho:"🏍️ Oficina Moto", icon:"🏍️", title:"Oficina do João", capaTitulo:"Oficina de Motos - Especialista", capaDesc:"15 anos consertando motos em Holambra. Revisão, motor, freio.", serv:"Revisão, Óleo, Motor", cat:"Peças", wifi:"oficina123" },
{ nicho:"🚗 Oficina Carro", icon:"🚗", title:"Auto Center Silva", capaTitulo:"Auto Center - Mecânica Completa", capaDesc:"Mecânica, suspensão, freio, ar condicionado.", serv:"Mecânica, Freio, Suspensão", cat:"Serviços", wifi:"auto123" },
{ nicho:"🍔 Lanchonete", icon:"🍔", title:"Lanches Top", capaTitulo:"Lanchonete & Hamburgueria", capaDesc:"Melhores lanches artesanais de Holambra.", serv:"Lanches, Porções", cat:"Cardápio Completo", wifi:"lanche123" },
{ nicho:"💅 Manicure", icon:"💅", title:"Espaço das Unhas", capaTitulo:"Manicure e Pedicure", capaDesc:"Alongamento, gel, decoração.", serv:"Manicure, Pedicure, Gel", cat:"Modelos", wifi:"unhas123" },
{ nicho:"👗 Loja Roupas", icon:"👗", title:"Moda Feminina", capaTitulo:"Loja de Roupas - Moda Atual", capaDesc:"Roupas femininas, masculinas, infantil.", serv:"Feminino, Masculino", cat:"Coleção Nova", wifi:"moda123" },
{ nicho:"🍕 Pizzaria", icon:"🍕", title:"Pizzaria Sabor", capaTitulo:"Pizzaria - Forno a Lenha", capaDesc:"Pizza grande com borda recheada.", serv:"Pizzas Salgadas, Doces", cat:"Cardápio Pizzas", wifi:"pizza123" },
{ nicho:"💪 Academia", icon:"💪", title:"Academia Fit", capaTitulo:"Academia - Treino Personalizado", capaDesc:"Musculação, funcional, personal.", serv:"Musculação, Funcional", cat:"Planos", wifi:"fit123" },
{ nicho:"🐶 Pet Shop", icon:"🐶", title:"Pet Shop Amigo", capaTitulo:"Pet Shop - Banho e Tosa", capaDesc:"Banho, tosa, ração, veterinário.", serv:"Banho e Tosa, Vet", cat:"Produtos Pet", wifi:"pet123" },
]
export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",serv:"",cat:"",agend:"",pix:"",wifi:"",loc:"",logo:"",foto:"",video:"",capaTitulo:"",capaDesc:""});
const [temaIdx,setTemaIdx]=useState(0); const [up,setUp]=useState("");
async function upload(file:File, pasta:string){setUp("Enviando..."); const nome=`${pasta}/${Date.now()}-${file.name}`; const {error}=await supabase.storage.from("midias").upload(nome,file); setUp(""); if(error){alert(error.message); return null} const {data}=supabase.storage.from("midias").getPublicUrl(nome); return data.publicUrl;}
function aplicarTemplate(t:any){setF({...f, title:t.title, capaTitulo:t.capaTitulo, capaDesc:t.capaDesc, serv:t.serv, cat:t.cat, wifi:t.wifi}); if(t.nicho.includes("Moto")) setTemaIdx(1); else if(t.nicho.includes("Salão")||t.nicho.includes("Manicure")) setTemaIdx(4); else setTemaIdx(0); window.scrollTo(0,0);}
async function salvar(){if(!f.title||!f.slug) return alert("Nome e slug"); const {error}=await supabase.from("biosites").upsert([{title:f.title, slug:f.slug.toLowerCase().replace(/\s+/g,"-"), whatsapp:f.wpp, instagram:f.insta, servicos:f.serv, catalogo:f.cat, agendamento:f.agend, pix_key:f.pix, wifi_password:f.wifi, localizacao:f.loc, logo_url:f.logo, foto_url:f.foto, video_url:f.video, capa_titulo:f.capaTitulo, capa_desc:f.capaDesc}],{onConflict:'slug'}); if(error) alert(error.message); else location.href="/"+f.slug;}
const tema=TEMAS[temaIdx]; const inp={padding:'11px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'7px',fontSize:'12px'} as any; const card={background:'#1A1A1A',border:'1px dashed #555',borderRadius:'12px',padding:'12px',marginBottom:'10px'} as any
return(<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontWeight:900,fontSize:'13px'}}>🎯 ESCOLHA SEU NICHO - CLICA E JÁ EDITA</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',margin:'10px 0'}}>
{TEMPLATES.map((t,i)=><button key={i} onClick={()=>aplicarTemplate(t)} style={{background:'#111',border:'1px solid #333',borderRadius:'10px',padding:'10px',textAlign:'left',color:'white',cursor:'pointer'}}>
<div style={{fontSize:'16px'}}>{t.icon}</div><div style={{fontSize:'11px',fontWeight:900,marginTop:'2px'}}>{t.nicho}</div><div style={{fontSize:'8px',opacity:0.5}}>Clique pra usar</div>
</button>)}
</div>
{up && <div style={{background:'#00C851',padding:'6px',borderRadius:'6px',fontSize:'10px',marginBottom:'6px'}}>{up}</div>}
<input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'10px'}}>
{TEMAS.map((t,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{padding:'5px 8px',borderRadius:'6px',border: temaIdx===i?'2px solid white':'1px solid #333',background:t.btn,color:'white',fontSize:'9px',fontWeight:900}}>{t.name}</button>)}
</div>
<div style={card}><b style={{fontSize:'10px'}}>📸 LOGO</b><br/><input type="file" accept="image/*" onChange={async e=>{const f2=e.target.files?.[0]; if(f2){const u=await upload(f2,"logos"); if(u) setF({...f,logo:u})}}}/></div>
<div style={card}><b style={{fontSize:'10px'}}>🖼️ CAPA - FOTO ou VÍDEO + NOME + DESCRIÇÃO</b><br/><input type="file" accept="image/*,video/*" onChange={async e=>{const f2=e.target.files?.[0]; if(f2){const u=await upload(f2,"capas"); if(u) setF({...f,foto:u})}}}/><input style={{...inp,marginTop:'8px'}} placeholder="Nome da Capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/><textarea style={{...inp,height:'50px'}} placeholder="Descrição" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/></div>
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
<div style={{width:'360px'}}><div style={{fontSize:'9px',textAlign:'center',opacity:0.3,marginBottom:'8px'}}>👁️ PREVIEW AO VIVO</div>
<div style={{background:tema.bg,borderRadius:'24px',overflow:'hidden',border:`1px solid ${tema.card}`}}>
{f.foto? (f.foto.includes('videos')||f.foto.endsWith('.mp4')? <video src={f.foto} autoPlay muted loop style={{width:'100%',height:'180px',objectFit:'cover'}}/> : <div style={{height:'180px',background:`url(${f.foto}) center/cover`}}/>) : <div style={{height:'100px',background:tema.card}}/>}
<div style={{padding:'16px',marginTop:'-36px'}}>
{f.logo? <img src={f.logo} style={{width:'68px',height:'68px',borderRadius:'50%',border:`3px solid ${tema.bg}`,margin:'0 auto',display:'block',objectFit:'cover'}}/> : <div style={{width:'68px',height:'68px',borderRadius:'50%',background:tema.card,margin:'0 auto'}}/>}
<h2 style={{textAlign:'center',fontWeight:900,marginTop:'8px',fontSize:'16px'}}>{f.title||'NOME DA LOJA'}</h2>
{f.capaTitulo && <h3 style={{textAlign:'center',fontSize:'12px',color:tema.btn,marginTop:'4px'}}>{f.capaTitulo}</h3>}
{f.capaDesc && <p style={{textAlign:'center',fontSize:'10px',opacity:0.6,marginTop:'4px'}}>{f.capaDesc}</p>}
<div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'7px'}}>
{f.serv && <div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>🛠️ {f.serv}</div>}
{f.cat && <div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>📚 {f.cat}</div>}
{f.agend && <div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>📅 {f.agend}</div>}
<div style={{background:tema.btn,padding:'12px',borderRadius:'10px',fontSize:'12px',fontWeight:900,textAlign:'center'}}>💬 WhatsApp</div>
<div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>📸 Instagram</div>
{f.pix && <div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>💳 Pix: {f.pix}</div>}
{f.wifi && <div style={{background:'#1A1A1A',border:'1px dashed #FFA500',padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>📶 WiFi: {f.wifi}</div>}
{f.loc && <div style={{background:'#0A2A5A',padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center',fontWeight:900}}>📍 Localização no Maps</div>}
</div></div></div></div></div></div></div>)
}
