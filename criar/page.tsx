// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"
const TEMAS=[
{ name:"Preto Neon", btn:"#00FF88", bg:"#050505", b1:"#00FF88", b2:"#0066FF", txt:"#FFF" },
{ name:"Rosa", btn:"#FF006B", bg:"#0A0014", b1:"#FF006B", b2:"#8A2BE2", txt:"#FFF" },
{ name:"Ocean", btn:"#00D4FF", bg:"#00111A", b1:"#00D4FF", b2:"#0066FF", txt:"#FFF" },
{ name:"Laranja", btn:"#FF6B00", bg:"#1A0A00", b1:"#FF6B00", b2:"#FF006B", txt:"#FFF" },
{ name:"Branco", btn:"#000", bg:"#FFF", b1:"#DDD", b2:"#FFF", txt:"#000" },
{ name:"Gold", btn:"#FFD700", bg:"#1A1400", b1:"#FFD700", b2:"#FF6B00", txt:"#FFF" },
{ name:"Red", btn:"#FF1A1A", bg:"#1A0000", b1:"#FF1A1A", b2:"#FF6B00", txt:"#FFF" },
{ name:"Roxo", btn:"#8A2BE2", bg:"#0A001A", b1:"#8A2BE2", b2:"#FF006B", txt:"#FFF" },
{ name:"Lime", btn:"#CCFF00", bg:"#0A1400", b1:"#CCFF00", b2:"#00FF88", txt:"#FFF" },
{ name:"Ice", btn:"#000", bg:"#E8F4FF", b1:"#00D4FF", b2:"#FFF", txt:"#000" },
{ name:"Preto Total", btn:"#FFF", bg:"#000", b1:"#333", b2:"#111", txt:"#FFF" },
{ name:"Azul", btn:"#0066FF", bg:"#000A1A", b1:"#0066FF", b2:"#00D4FF", txt:"#FFF" },
]
export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",pix:"",pixValor:"",wifi_ssid:"",wifi:"",loc:"",logo:"",foto:"",capaTitulo:"",capaDesc:"",corTitulo:"#FFFFFF",corDesc:"#AAAAAA"})
const [servicos,setServicos]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [catalogo,setCatalogo]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [cols,setCols]=useState([{url:"",desc:"",type:"image"}])
const [temaIdx,setTemaIdx]=useState(0)
const [up,setUp]=useState("")
const t=TEMAS[temaIdx]
async function upload(file,pasta){setUp("Enviando...");const nome=pasta+"/"+Date.now()+"-"+file.name;const r=await supabase.storage.from("midias").upload(nome,file);setUp("");if(r.error){alert(r.error.message);return null}return {url:supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl,type:file.type.startsWith('video')?'video':'image'}}
async function salvar(){const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-").trim();if(!f.title||!slugFinal){alert("Nome e slug sem espaco! ex: pizzaria-holambra");return}setUp("Salvando...");const {error}=await supabase.from("biosites").upsert([{title:f.title,slug:slugFinal,whatsapp:f.wpp,instagram:f.insta,servicos:servicos.map(s=>s.nome).join(', '),catalogo:catalogo.map(c=>c.nome).join(', '),pix_key:f.pix,pix_qr_valor:f.pixValor,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,logo_url:f.logo,foto_url:f.foto,capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,cor_titulo:f.corTitulo,cor_desc:f.corDesc,tema_idx:temaIdx,colunas:cols,servicos_json:servicos,catalogo_json:catalogo}],{onConflict:'slug'});setUp("");if(error){alert(error.message);return}location.href="/"+slugFinal}
const inp={padding:'13px',background:'#111',border:'1px solid #333',borderRadius:'12px',color:'white',width:'100%',marginBottom:'8px',fontSize:'14px'}
const isVideo=f.foto&&(f.foto.includes('.mp4')||f.foto.includes('webm'))
const pixQr=f.pix?`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(f.pix)}`:null
const wifiQr=f.wifi_ssid&&f.wifi?`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}`:null
return(<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<style>{`@keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-20px)}}`}</style>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontSize:'11px',opacity:0.6}}>12 CORES - CLICA QUE SALVA NA FRENTE</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px',margin:'10px 0'}}>{TEMAS.map((tm,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{height:'48px',borderRadius:'12px',background:tm.bg,border:temaIdx===i?'3px solid white':'2px solid #333',position:'relative'}}><div style={{position:'absolute',inset:'4px',background:`linear-gradient(135deg,${tm.b1},${tm.b2})`,borderRadius:'8px'}}/><div style={{position:'absolute',bottom:'1px',fontSize:'6px',width:'100%',textAlign:'center',color:'white',fontWeight:900}}>{tm.name}</div></button>)}</div>
<div style={{display:'flex',gap:'8px',marginBottom:'10px'}}><div style={{flex:1}}><label style={{fontSize:'9px'}}>COR TITULO</label><input type="color" value={f.corTitulo} onChange={e=>setF({...f,corTitulo:e.target.value})} style={{width:'100%',height:'38px'}}/></div><div style={{flex:1}}><label style={{fontSize:'9px'}}>COR DESC</label><input type="color" value={f.corDesc} onChange={e=>setF({...f,corDesc:e.target.value})} style={{width:'100%',height:'38px'}}/></div></div>
{up&&<div style={{background:t.btn,color:'black',padding:'8px',borderRadius:'8px',marginBottom:'8px',fontWeight:900}}>{up}</div>}
<input style={inp} placeholder="Nome * RTR" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug * ex: pizzaria-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',marginBottom:'8px',border:'1px dashed #555'}}><b style={{fontSize:'10px'}}>LOGO</b><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u.url})}}}/></div>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',marginBottom:'8px',border:'1px dashed #555'}}><b style={{fontSize:'10px'}}>CAPA VIDEO/FOTO mp4</b><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u.url})}}}/><input style={{...inp,marginTop:'6px'}} placeholder="Titulo capa TRT" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/><input style={inp} placeholder="Descricao TRTTTR" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/></div>

<div style={{background:'#111',padding:'10px',borderRadius:'14px',marginBottom:'10px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'11px'}}>SERVICOS + FOTO/VIDEO</b><button onClick={()=>setServicos([...servicos,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,border:'none',borderRadius:'8px',padding:'4px 10px',fontWeight:900}}>+</button></div>
{servicos.map((s,i)=><div key={i} style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginTop:'8px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"servicos");const n=[...servicos];n[i]={...n[i],url:u.url,type:u.type};setServicos(n)}}}/>{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px',marginTop:'6px'}} muted/>:<img src={s.url} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px',marginTop:'6px'}}/>)}<input style={{...inp,marginTop:'6px'}} placeholder="Nome ex: Corte" value={s.nome} onChange={e=>{const n=[...servicos];n[i].nome=e.target.value;setServicos(n)}}/><div style={{display:'flex',gap:'6px'}}><input style={{...inp,flex:1}} placeholder="Preco R$30" value={s.preco} onChange={e=>{const n=[...servicos];n[i].preco=e.target.value;setServicos(n)}}/><input style={{...inp,flex:2}} placeholder="Descricao" value={s.desc} onChange={e=>{const n=[...servicos];n[i].desc=e.target.value;setServicos(n)}}/></div><button onClick={()=>setServicos(servicos.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',color:'white',borderRadius:'6px',padding:'4px 8px',width:'100%'}}>Remover</button></div>)}
</div>

<div style={{background:'#111',padding:'10px',borderRadius:'14px',marginBottom:'10px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'11px'}}>CATALOGO + FOTO/VIDEO</b><button onClick={()=>setCatalogo([...catalogo,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,border:'none',borderRadius:'8px',padding:'4px 10px',fontWeight:900}}>+</button></div>
{catalogo.map((c,i)=><div key={i} style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginTop:'8px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"catalogo");const n=[...catalogo];n[i]={...n[i],url:u.url,type:u.type};setCatalogo(n)}}}/>{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px',marginTop:'6px'}} muted/>:<img src={c.url} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px',marginTop:'6px'}}/>)}<input style={{...inp,marginTop:'6px'}} placeholder="Nome produto" value={c.nome} onChange={e=>{const n=[...catalogo];n[i].nome=e.target.value;setCatalogo(n)}}/><div style={{display:'flex',gap:'6px'}}><input style={{...inp,flex:1}} placeholder="Preco" value={c.preco} onChange={e=>{const n=[...catalogo];n[i].preco=e.target.value;setCatalogo(n)}}/><input style={{...inp,flex:2}} placeholder="Descricao" value={c.desc} onChange={e=>{const n=[...catalogo];n[i].desc=e.target.value;setCatalogo(n)}}/></div><button onClick={()=>setCatalogo(catalogo.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',color:'white',borderRadius:'6px',padding:'4px 8px',width:'100%'}}>Remover</button></div>)}
</div>

<input style={inp} placeholder="WhatsApp RT" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram TRTR" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>

<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'14px',marginBottom:'10px',border:'2px dashed #32BCAD'}}>
<b style={{fontSize:'11px',color:'#32BCAD'}}>PIX COM QR CODE</b>
<input style={inp} placeholder="Chave Pix TR" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="Valor opcional" value={f.pixValor} onChange={e=>setF({...f,pixValor:e.target.value})}/>
{pixQr&&<div style={{background:'white',padding:'10px',borderRadius:'12px',textAlign:'center',marginTop:'8px'}}><img src={pixQr} style={{width:'200px',height:'200px'}}/><div style={{color:'black',fontSize:'11px',wordBreak:'break-all',marginTop:'6px'}}>{f.pix}</div></div>}
</div>

<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'14px',marginBottom:'10px',border:'2px dashed #FF9500'}}>
<b style={{fontSize:'11px',color:'#FF9500'}}>WIFI QR CODE EM CIMA + SENHA EMBAIXO</b>
<input style={inp} placeholder="Nome rede ex: Pizzaria" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="Senha WiFi TRRT" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
{wifiQr&&<div style={{background:'white',padding:'12px',borderRadius:'14px',textAlign:'center',marginTop:'8px'}}><img src={wifiQr} style={{width:'200px',height:'200px'}}/><div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}><div style={{color:'black',fontSize:'12px'}}>Rede: <b>{f.wifi_ssid}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {f.wifi}</div></div></div>}
</div>

<input style={inp} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
<div style={{background:'#111',padding:'10px',borderRadius:'14px',margin:'10px 0'}}><b style={{fontSize:'11px'}}>COLUNAS EM BAIXO</b>{cols.map((c,i)=><div key={i} style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginTop:'8px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"colunas");const nc=[...cols];nc[i]={...nc[i],url:u.url,type:u.type};setCols(nc)}}}/><input style={{...inp,marginTop:'6px'}} placeholder="Descricao" value={c.desc} onChange={e=>{const nc=[...cols];nc[i].desc=e.target.value;setCols(nc)}}/><button onClick={()=>setCols(cols.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',color:'white',borderRadius:'6px',padding:'4px',width:'100%',marginTop:'4px'}}>Remover</button></div>)}<button onClick={()=>setCols([...cols,{url:"",desc:"",type:"image"}])} style={{background:'#222',border:'1px dashed #555',color:'white',width:'100%',padding:'10px',borderRadius:'8px',marginTop:'8px'}}>+ Coluna</button></div>

<button onClick={salvar} style={{background:t.btn,padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,fontSize:'16px',color:t.bg==='#FFF'?'black':'white'}}>SALVAR LOJA</button>
</div>

<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'16px',overflowY:'auto',height:'100vh',position:'relative'}}>
<div style={{position:'absolute',width:'300px',height:'300px',background:t.b1,borderRadius:'50%',filter:'blur(80px)',opacity:0.35,animation:'float1 6s infinite'}}/>
<div style={{width:'390px',position:'relative',zIndex:2}}>
<div style={{background:'rgba(20,20,20,0.9)',backdropFilter:'blur(20px)',borderRadius:'32px',overflow:'hidden',border:`1px solid ${t.btn}50`}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'260px',objectFit:'cover'}}/> : <div style={{height:'260px',background:`url(${f.foto}) center/cover`}}/>):<div style={{height:'120px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>}
<div style={{padding:'18px',marginTop:'-50px',textAlign:'center'}}>
{f.logo&&<img src={f.logo} style={{width:'88px',height:'88px',borderRadius:'50%',margin:'0 auto',display:'block',border:`4px solid ${t.bg}`,background:'white'}}/>}
<h1 style={{color:f.corTitulo,fontWeight:900,fontSize:'28px',margin:'10px 0 2px'}}>{f.title||'RTR'}</h1>
{f.capaTitulo&&<h3 style={{color:t.btn}}>{f.capaTitulo}</h3>}
{f.capaDesc&&<p style={{color:f.corDesc,fontSize:'13px'}}>{f.capaDesc}</p>}
<div style={{display:'flex',flexDirection:'column',gap:'14px',marginTop:'18px'}}>
{f.wpp&&<div style={{background:'#25D366',padding:'20px',borderRadius:'20px',fontWeight:900,fontSize:'18px',color:'white'}}>WhatsApp</div>}
{f.insta&&<div style={{background:'linear-gradient(45deg,#f09433,#bc1888)',padding:'20px',borderRadius:'20px',fontWeight:900,color:'white'}}>{f.insta}</div>}
{pixQr&&<div style={{background:'white',padding:'14px',borderRadius:'20px'}}><img src={pixQr} style={{width:'180px',height:'180px',margin:'0 auto',display:'block'}}/><div style={{color:'black',fontSize:'11px',marginTop:'6px'}}>Pix: {f.pix}</div></div>}
{wifiQr&&<div style={{background:'white',padding:'14px',borderRadius:'20px'}}><img src={wifiQr} style={{width:'180px',height:'180px',margin:'0 auto',display:'block'}}/><div style={{color:'black',fontWeight:900,marginTop:'6px'}}>WiFi: {f.wifi}</div><div style={{color:'black',fontSize:'11px'}}>Rede: {f.wifi_ssid}</div></div>}
{f.loc&&<div style={{background:'white',padding:'18px',borderRadius:'20px',fontWeight:900,color:'#1a73e8'}}>Ver no Maps</div>}
</div>
</div>
</div>
</div>
</div>
</div>)
}
