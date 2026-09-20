// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMAS=[
{ name:"LimaTecsun Dark", btn:"#00E676", bg:"#0A0A0A", b1:"#00E676", b2:"#00B0FF" },
{ name:"Solar Gold", btn:"#FFC400", bg:"#0A0A0A", b1:"#FFC400", b2:"#FF6D00" },
{ name:"Branco Premium", btn:"#000", bg:"#FFFFFF", b1:"#EEEEEE", b2:"#FFFFFF" },
]

const LAYOUTS=[
{ id:1, nome:"LimaTecsun Original" },
{ id:2, nome:"Glass Premium" },
{ id:3, nome:"Minimal Clean" },
{ id:4, nome:"Neon Solar" },
]

export default function Criar(){
const [f,setF]=useState({title:"LimaTecsun",slug:"limatecsun",youtube:"https://www.youtube.com/watch?v=vMzKWhcSMCY",corTitulo:"#FFFFFF",corDesc:"#AAAAAA",capaEstilo:"full",logoPos:"centro",layoutTipo:1,logo:"",foto:"",wpp:"551999292812",insta:"limatecsun",pix:"44460221000118",pixValor:"",wifi_ssid:"LimaTecsun",wifi:"",loc:"https://maps.google.com/?q=Rua+Elvira+Martinati+Forner+143+Engenheiro+Coelho"})
const [produtos,setProdutos]=useState([
{cat:"🧼 Limpeza e Higienização",items:[{nome:"Perfume Frionel 120ml",img:"",link:"551999292812"},{nome:"Espuma Spazio 1L",img:"",link:""}]},
{cat:"🔥 Gases e Fluidos",items:[{nome:"Gás R32 3kg",img:"",link:""}]},
])
const [servVideos,setServVideos]=useState(["https://www.youtube.com/watch?v=2-AnlWN5U-Y","https://www.youtube.com/watch?v=a3nMCO-ej9I"])
const [etapas,setEtapas]=useState([
{t:"1 - Verificação de consumo",d:"Analisamos seu histórico de custo com energia"},
{t:"2 - Custo médio",d:"Enviamos proposta justa e irrecusável"},
{t:"3 - Confirmação",d:"Preparação de materiais e operários"},
{t:"4 - Instalação",d:"Integrações com rede e app"},
{t:"5 - Homologação",d:"Registro legal e regularizado"},
])
const [up,setUp]=useState("")
const [temaIdx,setTemaIdx]=useState(0)
const t=TEMAS[temaIdx]

async function upload(file,pasta){setUp("Enviando...");const nome=pasta+"/"+Date.now()+"-"+file.name;const r=await supabase.storage.from("midias").upload(nome,file);setUp("");if(r.error){alert(r.error.message);return null}return supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-")
setUp("Salvando...")
const sections={produtos,servVideos,etapas,youtube_topo:f.youtube}
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,youtube_topo:f.youtube,whatsapp:f.wpp,instagram:f.insta,
pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,
logo_url:f.logo,foto_url:f.foto,cor_titulo:f.corTitulo,cor_desc:f.corDesc,
tema_idx:temaIdx,capa_estilo:f.capaEstilo,logo_pos:f.logoPos,layout_tipo:f.layoutTipo,
sections_json:sections,servicos_json:[],catalogo_json:[],colunas:[]
}],{onConflict:'slug'})
setUp("");if(error){alert(error.message);return}location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px',fontSize:'13px'} as any
const pixQr=f.pix?`https://quickchart.io/qr?text=${encodeURIComponent(f.pix)}&size=300`:null
const wifiQr=f.wifi?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}&size=300`:null

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>

<div style={{display:'flex',gap:'6px',marginBottom:'10px'}}>{TEMAS.map((tm,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{flex:1,padding:'10px',borderRadius:'10px',background:temaIdx===i?tm.btn:'#222',color:temaIdx===i?'black':'white',border:'1px solid #444',fontWeight:900,fontSize:'10px'}}>{tm.name}</button>)}</div>

<input style={inp} placeholder="Nome ex: LimaTecsun" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug limatecsun" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<input style={inp} placeholder="YouTube topo ex: https://youtube.com/watch?v=..." value={f.youtube} onChange={e=>setF({...f,youtube:e.target.value})}/>

<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',border:'1px dashed #555'}}><b style={{fontSize:'9px'}}>LOGO</b><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/></div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',border:'1px dashed #555'}}><b style={{fontSize:'9px'}}>CAPA</b><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u})}}}/></div>
</div>

<div style={{marginTop:'10px'}}><b style={{fontSize:'10px'}}>PRODUTOS (igual seu bio.site - cards arrastáveis)</b>
{produtos.map((sec,idx)=><div key={idx} style={{background:'#111',padding:'8px',borderRadius:'10px',marginTop:'6px'}}>
<input style={inp} value={sec.cat} onChange={e=>{const n=[...produtos];n[idx].cat=e.target.value;setProdutos(n)}}/>
{sec.items.map((it,j)=><div key={j} style={{display:'flex',gap:'4px',marginTop:'4px'}}><input style={{...inp,flex:1}} placeholder="Nome produto" value={it.nome} onChange={e=>{const n=[...produtos];n[idx].items[j].nome=e.target.value;setProdutos(n)}}/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"produtos");const n=[...produtos];n[idx].items[j].img=u;setProdutos(n)}}}/></div>)}
<button onClick={()=>{const n=[...produtos];n[idx].items.push({nome:"Novo Produto",img:"",link:""});setProdutos(n)}} style={{background:'#222',border:'1px dashed #555',color:'white',width:'100%',padding:'6px',borderRadius:'6px',marginTop:'4px',fontSize:'10px'}}>+ Produto</button>
</div>)}
<button onClick={()=>setProdutos([...produtos,{cat:"Nova Categoria",items:[{nome:"Produto",img:"",link:""}]}])} style={{background:t.btn,color:'black',border:'none',borderRadius:'8px',padding:'8px',width:'100%',marginTop:'8px',fontWeight:900}}>+ Categoria</button>
</div>

<input style={{...inp,marginTop:'10px'}} placeholder="WhatsApp 551999292812" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>

<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px solid #00E676',marginTop:'8px'}}>
<b style={{fontSize:'10px',color:'#00E676'}}>PIX QR CODE (você adorou)</b>
<input style={inp} placeholder="Chave Pix CNPJ 44460221000118" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
{pixQr&&<img src={pixQr} style={{width:'140px',height:'140px',margin:'8px auto',display:'block',background:'white',padding:'6px',borderRadius:'10px'}}/>}
</div>

<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px solid #FF9500',marginTop:'8px'}}>
<b style={{fontSize:'10px',color:'#FF9500'}}>WIFI QR CODE (você adorou) - CIMA QR BAIXO SENHA</b>
<input style={inp} placeholder="Nome Rede" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="Senha WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
{wifiQr&&<img src={wifiQr} style={{width:'140px',height:'140px',margin:'8px auto',display:'block',background:'white',padding:'6px',borderRadius:'10px'}}/>}
</div>

<input style={{...inp,marginTop:'8px'}} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>

<button onClick={salvar} style={{background:t.btn,color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px',fontSize:'16px'}}>{up||'SALVAR CLONE PREMIUM LIMA'}</button>
</div>

<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'390px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
{/* VIDEO TOPO IGUAL BIO.SITE */}
<div style={{height:'220px',background:'#000',position:'relative'}}>
{f.youtube&&<iframe src={`https://www.youtube.com/embed/${f.youtube.split('v=')[1]?.split('&')[0]||'vMzKWhcSMCY'}`} style={{width:'100%',height:'100%',border:'none'}}/>}
</div>

<div style={{padding:'16px',textAlign:'center'}}>
{f.logo&&<img src={f.logo} style={{width:'80px',height:'80px',borderRadius:'50%',margin:'-40px auto 10px',display:'block',border:'3px solid #121212',background:'white'}}/>}
<h2 style={{color:'white',fontWeight:900}}>{f.title}</h2>

{/* PRODUTOS CARDS ARRASTÁVEIS IGUAL SEU BIO.SITE */}
<div style={{marginTop:'16px',textAlign:'left'}}>
{produtos.map((sec,i)=><div key={i} style={{marginBottom:'14px'}}>
<div style={{fontWeight:900,fontSize:'13px',color:t.btn,marginBottom:'8px'}}>{sec.cat}</div>
<div style={{display:'flex',gap:'10px',overflowX:'auto',paddingBottom:'8px'}}>
{sec.items.map((it,j)=><div key={j} style={{minWidth:'110px',background:'#1E1E1E',borderRadius:'14px',padding:'8px',textAlign:'center'}}>
{it.img?<img src={it.img} style={{width:'100%',height:'70px',objectFit:'cover',borderRadius:'8px'}}/>:<div style={{height:'70px',background:'#2A2A2A',borderRadius:'8px'}}/>}
<div style={{fontSize:'10px',marginTop:'6px',color:'white'}}>{it.nome}</div>
</div>)}
</div>
</div>)}
</div>

{/* QR CODES QUE VOCÊ AMOU */}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'16px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px',textAlign:'center'}}><img src={pixQr} style={{width:'100%'}}/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>PIX QR</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px',textAlign:'center'}}><img src={wifiQr} style={{width:'100%'}}/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>WIFI QR</div><div style={{color:'black',fontSize:'8px'}}>Senha: {f.wifi}</div></div>}
</div>

<div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
<div style={{background:'#25D366',padding:'16px',borderRadius:'14px',color:'white',fontWeight:900}}>WhatsApp</div>
<div style={{background:'white',padding:'16px',borderRadius:'14px',color:'#1a73e8',fontWeight:900}}>Ver no Maps</div>
</div>
</div>
</div>
</div>
</div>
</div>
)
}
