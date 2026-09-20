"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const TEMPLATES = [
{ id:"barbearia", label:"Barbearia", title:"Barbearia Style", capa:"Barbearia Premium", desc:"Corte na regua, barba e pigmentacao. 10 anos em Holambra.", serv:"Corte, Barba, Sobrancelha", tema:1 },
{ id:"salao", label:"Salao Feminino", title:"Studio Beleza", capa:"Salao - Beleza Completa", desc:"Escova, coloracao, mechas, unhas.", serv:"Escova, Coloracao, Mechas", tema:4 },
{ id:"moto", label:"Oficina Moto", title:"Oficina do Joao", capa:"Oficina de Motos", desc:"15 anos consertando motos em Holambra.", serv:"Revisao, Oleo, Motor", tema:1 },
{ id:"carro", label:"Oficina Carro", title:"Auto Center Silva", capa:"Auto Center", desc:"Mecanica, freio, suspensao.", serv:"Mecanica, Freio", tema:1 },
{ id:"lanche", label:"Lanchonete", title:"Lanches Top", capa:"Lanchonete & Hamburgueria", desc:"Melhores lanches artesanais.", serv:"Lanches, Porcoes", tema:3 },
{ id:"pizzaria", label:"Pizzaria", title:"Pizzaria Sabor", capa:"Pizzaria Forno a Lenha", desc:"Pizza grande borda recheada.", serv:"Pizzas Salgadas, Doces", tema:3 },
{ id:"roupa", label:"Loja Roupas", title:"Moda Feminina", capa:"Loja de Roupas", desc:"Moda atual toda semana.", serv:"Feminino, Masculino", tema:4 },
{ id:"pet", label:"Pet Shop", title:"Pet Shop Amigo", capa:"Pet Shop Banho e Tosa", desc:"Banho, tosa, racao.", serv:"Banho e Tosa", tema:0 },
];

const TEMAS = [
{ name:"Preto", bg:"#080808", card:"#1A1A1A", btn:"#00C851" },
{ name:"Vermelho", bg:"#1A0000", card:"#2A1010", btn:"#FF1A1A" },
{ name:"Azul", bg:"#000A1A", card:"#0A1A2A", btn:"#0066FF" },
{ name:"Laranja", bg:"#1A0A00", card:"#2A1A0A", btn:"#FF6A00" },
{ name:"Rosa", bg:"#1A0010", card:"#2A101A", btn:"#E91E63" },
];

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",serv:"",cat:"",agend:"",pix:"",wifi:"",loc:"",logo:"",foto:"",video:"",capaTitulo:"",capaDesc:""});
const [temaIdx,setTemaIdx]=useState(0); const [up,setUp]=useState("");
async function upload(file:any, pasta:string){setUp("Enviando..."); const nome=`${pasta}/${Date.now()}-${file.name}`; const {error}=await supabase.storage.from("midias").upload(nome,file); setUp(""); if(error){alert(error.message); return null} const {data}=supabase.storage.from("midias").getPublicUrl(nome); return data.publicUrl;}
function useTemplate(t:any){setF({...f,title:t.title,capaTitulo:t.capa, capaDesc:t.desc, serv:t.serv}); setTemaIdx(t.tema);}
async function salvar(){if(!f.title||!f.slug) return alert("Nome e slug"); const {error}=await supabase.from("biosites").upsert([{title:f.title, slug:f.slug.toLowerCase().replace(/\s+/g,"-"), whatsapp:f.wpp, instagram:f.insta, servicos:f.serv, catalogo:f.cat, agendamento:f.agend, pix_key:f.pix, wifi_password:f.wifi, localizacao:f.loc, logo_url:f.logo, foto_url:f.foto, video_url:f.video, capa_titulo:f.capaTitulo, capa_desc:f.capaDesc}],{onConflict:'slug'}); if(error) alert(error.message); else location.href="/"+f.slug;}
const tema=TEMAS[temaIdx]; const inp={padding:'11px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'7px',fontSize:'12px'} as any; const card={background:'#1A1A1A',border:'1px dashed #555',borderRadius:'12px',padding:'12px',marginBottom:'10px'} as any
return(<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontWeight:900,fontSize:'13px',marginBottom:'8px'}}>🎯 TEMPLATES PRONTOS - CLICA PRA USAR</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginBottom:'12px'}}>
{TEMPLATES.map((t:any,i:number)=><button key={i} onClick={()=>useTemplate(t)} style={{background:'#1A1A1A',border:'1px solid #333',borderRadius:'10px',padding:'12px',color:'white',fontWeight:900,fontSize:'11px'}}>{t.label}<br/><span style={{fontSize:'8px',opacity:0.5}}>Usar template</span></button>)}
</div>
{up && <div style={{background:'#00C851',padding:'6px',borderRadius:'6px',fontSize:'10px',marginBottom:'6px'}}>{up}</div>}
<input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{display:'flex',gap:'5px',marginBottom:'10px'}}>{TEMAS.map((t,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{padding:'6px 10px',borderRadius:'6px',border:temaIdx===i?'2px solid white':'1px solid #333',background:t.btn,color:'white',fontSize:'9px',fontWeight:900}}>{t.name}</button>)}</div>
<div style={card}><b style={{fontSize:'10px'}}>📸 LOGO</b><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const u=await upload(file,"logos"); if(u) setF({...f,logo:u})}}}/></div>
<div style={card}><b style={{fontSize:'10px'}}>🖼️ CAPA - FOTO ou VIDEO + NOME + DESCRICAO</b><br/><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const u=await upload(file,"capas"); if(u) setF({...f,foto:u})}}}/><input style={{...inp,marginTop:'8px'}} placeholder="Nome da Capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/><textarea style={{...inp,height:'50px'}} placeholder="Descricao" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/></div>
<div style={{background:'#111',padding:'10px',borderRadius:'10px',marginBottom:'10px'}}>
<input style={inp} placeholder="Servicos" value={f.serv} onChange={e=>setF({...f,serv:e.target.value})}/>
<input style={inp} placeholder="Catalogo" value={f.cat} onChange={e=>setF({...f,cat:e.target.value})}/>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
<input style={inp} placeholder="Link Google Maps" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
</div>
<button onClick={salvar} style={{background:'#00C851',padding:'14px',width:'100%',border:'none',borderRadius:'10px',fontWeight:900,color:'white'}}>SALVAR LOJA</button>
</div>
<div style={{width:'50%',background:'#050505',display:'flex',justifyContent:'center',padding:'16px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'360px'}}><div style={{fontSize:'9px',textAlign:'center',opacity:0.3,marginBottom:'8px'}}>PREVIEW AO VIVO</div>
<div style={{background:tema.bg,borderRadius:'24px',overflow:'hidden',border:`1px solid ${tema.card}`}}>
{f.foto? <div style={{height:'180px',background:`url(${f.foto}) center/cover`}}/> : <div style={{height:'100px',background:tema.card}}/>}
<div style={{padding:'16px',marginTop:'-36px'}}>
{f.logo? <img src={f.logo} style={{width:'68px',height:'68px',borderRadius:'50%',border:`3px solid ${tema.bg}`,margin:'0 auto',display:'block'}}/> : <div style={{width:'68px',height:'68px',borderRadius:'50%',background:tema.card,margin:'0 auto'}}/>}
<h2 style={{textAlign:'center',fontWeight:900,marginTop:'8px'}}>{f.title||'NOME DA LOJA'}</h2>
{f.capaTitulo && <h3 style={{textAlign:'center',fontSize:'12px',color:tema.btn}}>{f.capaTitulo}</h3>}
{f.capaDesc && <p style={{textAlign:'center',fontSize:'10px',opacity:0.6}}>{f.capaDesc}</p>}
<div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'7px'}}>
{f.serv && <div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>{f.serv}</div>}
<div style={{background:tema.btn,padding:'12px',borderRadius:'10px',fontWeight:900,textAlign:'center'}}>WhatsApp</div>
{f.wifi && <div style={{background:'#1A1A1A',border:'1px dashed orange',padding:'12px',borderRadius:'10px',textAlign:'center'}}>WiFi: {f.wifi}</div>}
{f.loc && <div style={{background:'#0A2A5A',padding:'12px',borderRadius:'10px',textAlign:'center'}}>📍 Localizacao</div>}
</div></div></div></div></div></div></div>)
}
