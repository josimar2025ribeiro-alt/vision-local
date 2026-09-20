// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMAS=[
{ name:"Preto Vivo", btn:"#00FF88", bg:"#050505", b1:"#00FF88", b2:"#0066FF", txt:"#FFFFFF" },
{ name:"Neon Rosa", btn:"#FF006B", bg:"#0A0014", b1:"#FF006B", b2:"#8A2BE2", txt:"#FFFFFF" },
{ name:"Ocean", btn:"#00D4FF", bg:"#00111A", b1:"#00D4FF", b2:"#0066FF", txt:"#FFFFFF" },
{ name:"Sunset", btn:"#FF6B00", bg:"#1A0A00", b1:"#FF6B00", b2:"#FF006B", txt:"#FFFFFF" },
{ name:"Branco Luxo", btn:"#000000", bg:"#F5F5F5", b1:"#E0E0E0", b2:"#FFFFFF", txt:"#000000" },
{ name:"White Neon", btn:"#00FF88", bg:"#FFFFFF", b1:"#00FF88", b2:"#00D4FF", txt:"#000000" },
{ name:"Lime", btn:"#CCFF00", bg:"#0A1400", b1:"#CCFF00", b2:"#00FF88", txt:"#FFFFFF" },
{ name:"Roxo", btn:"#8A2BE2", bg:"#0A001A", b1:"#8A2BE2", b2:"#FF006B", txt:"#FFFFFF" },
{ name:"Red Fire", btn:"#FF1A1A", bg:"#1A0000", b1:"#FF1A1A", b2:"#FF6B00", txt:"#FFFFFF" },
{ name:"Gold", btn:"#FFD700", bg:"#1A1400", b1:"#FFD700", b2:"#FF6B00", txt:"#FFFFFF" },
{ name:"Ice", btn:"#000000", bg:"#E8F4FF", b1:"#00D4FF", b2:"#FFFFFF", txt:"#000000" },
{ name:"Preto Total", btn:"#FFFFFF", bg:"#000000", b1:"#333", b2:"#111", txt:"#FFFFFF" },
]

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",pix:"",pixValor:"",wifi_ssid:"",wifi:"",loc:"",logo:"",foto:"",capaTitulo:"",capaDesc:"",corTitulo:"#FFFFFF",corDesc:"#AAAAAA"})
const [servicos,setServicos]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [catalogo,setCatalogo]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [cols,setCols]=useState([{url:"",desc:"",type:"image"},{url:"",desc:"",type:"image"}])
const [temaIdx,setTemaIdx]=useState(0)
const [up,setUp]=useState("")
const t=TEMAS[temaIdx]

async function upload(file:any,pasta:string){
setUp("Enviando "+file.name+"...")
const nome=pasta+"/"+Date.now()+"-"+file.name
const r=await supabase.storage.from("midias").upload(nome,file)
setUp("")
if(r.error){alert(r.error.message);return null}
return {url: supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl, type: file.type.startsWith('video')?'video':'image'}
}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-").trim()
if(!f.title||!slugFinal){alert("Preenche nome e slug sem espaco! Ex: moda-holambra");return}
setUp("Salvando...")
const servicosTxt=servicos.filter(s=>s.nome).map(s=>s.nome).join(', ')
const catalogoTxt=catalogo.filter(c=>c.nome).map(c=>c.nome).join(', ')
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,whatsapp:f.wpp,instagram:f.insta,servicos:servicosTxt,catalogo:catalogoTxt,
pix_key:f.pix,pix_qr_valor:f.pixValor,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,
logo_url:f.logo,foto_url:f.foto,capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,
cor_titulo:f.corTitulo,cor_desc:f.corDesc,tema_idx:temaIdx,
colunas:cols,servicos_json:servicos,catalogo_json:catalogo
}],{onConflict:'slug'})
setUp("")
if(error){alert("ERRO: "+error.message);return}
location.href="/"+slugFinal
}

const inp={padding:'14px',background:'#111',border:'1px solid #333',borderRadius:'12px',color:'white',width:'100%',marginBottom:'8px',fontSize:'14px'} as any
const isVideo=f.foto&&(f.foto.includes('.mp4')||f.foto.includes('video')||f.foto.includes('webm'))
const pixQrUrl=f.pix?`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(f.pixValor?`${f.pix}?valor=${f.pixValor}`:f.pix)}`:null
const wifiQrUrl=f.wifi_ssid&&f.wifi?`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}`:null

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<style>{`@keyframes float1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-30px) scale(1.1)}}@keyframes float2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,20px) scale(1.2)}}`}</style>

<div style={{width:'50%',padding:'16px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontSize:'11px',letterSpacing:'2px',opacity:0.6}}>12 TEMAS FLUTUANTES - CLIQUE</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px',margin:'10px 0'}}>
{TEMAS.map((tm,i)=><button key={i} onClick={()=>setTemaIdx(i)} title={tm.name} style={{height:'50px',borderRadius:'12px',background:tm.bg,border:temaIdx===i?'3px solid white':'2px solid #333',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',inset:'3px',background:`linear-gradient(135deg,${tm.b1},${tm.b2})`,borderRadius:'8px'}}/><div style={{position:'absolute',bottom:'2px',left:'0',right:'0',fontSize:'6px',color:'white',fontWeight:900,textAlign:'center',textShadow:'0 1px 2px black'}}>{tm.name}</div></button>)}
</div>

<div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
<div style={{flex:1}}><label style={{fontSize:'9px'}}>COR TITULO</label><input type="color" value={f.corTitulo} onChange={e=>setF({...f,corTitulo:e.target.value})} style={{width:'100%',height:'40px',borderRadius:'8px',border:'none'}}/></div>
<div style={{flex:1}}><label style={{fontSize:'9px'}}>COR DESCRICAO</label><input type="color" value={f.corDesc} onChange={e=>setF({...f,corDesc:e.target.value})} style={{width:'100%',height:'40px',borderRadius:'8px',border:'none'}}/></div>
</div>

{up&&<div style={{background:t.btn,color:'black',padding:'10px',borderRadius:'10px',marginBottom:'10px',fontWeight:900}}>{up}</div>}

<input style={inp} placeholder="Nome da Loja * ex: Moda Feminina" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug SEM ESPACO * ex: moda-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{fontSize:'10px',opacity:0.5,marginBottom:'8px'}}>Slug final: {f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-")}</div>

<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'12px',marginBottom:'8px',border:'1px dashed #555'}}>
<b style={{fontSize:'10px'}}>LOGO - Galeria celular</b><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u.url})}}}/>
</div>

<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'12px',marginBottom:'12px',border:'1px dashed #555'}}>
<b style={{fontSize:'10px'}}>CAPA FOTO OU VIDEO</b><br/><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u.url})}}}/>
<input style={{...inp,marginTop:'8px'}} placeholder="Titulo capa ex: Moda Atual" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/>
<input style={inp} placeholder="Descricao ex: Moda toda semana" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/>
</div>

<div style={{background:'#111',padding:'12px',borderRadius:'16px',marginBottom:'12px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
<b style={{fontSize:'12px'}}>SERVICOS - FOTO/VIDEO + DESCRICAO</b>
<button onClick={()=>setServicos([...servicos,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,color:'black',border:'none',borderRadius:'8px',padding:'8px 14px',fontWeight:900}}>+ Adicionar</button>
</div>
{servicos.map((s,i)=><div key={i} style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',marginBottom:'8px'}}>
<div style={{display:'flex',gap:'6px',marginBottom:'6px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"servicos");const n=[...servicos];n[i]={...n[i],url:u.url,type:u.type};setServicos(n)}}}/><button onClick={()=>setServicos(servicos.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',borderRadius:'8px',color:'white',padding:'0 12px'}}>X</button></div>
{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'90px',objectFit:'cover',borderRadius:'8px',marginBottom:'6px'}} muted/>:<img src={s.url} style={{width:'100%',height:'90px',objectFit:'cover',borderRadius:'8px',marginBottom:'6px'}}/>)}
<input style={{...inp,marginBottom:'6px'}} placeholder="Nome servico ex: Corte Degrade" value={s.nome} onChange={e=>{const n=[...servicos];n[i].nome=e.target.value;setServicos(n)}}/>
<div style={{display:'flex',gap:'6px'}}><input style={{...inp,marginBottom:'0',flex:1}} placeholder="Preco R$30" value={s.preco} onChange={e=>{const n=[...servicos];n[i].preco=e.target.value;setServicos(n)}}/><input style={{...inp,marginBottom:'0',flex:2}} placeholder="Descricao" value={s.desc} onChange={e=>{const n=[...servicos];n[i].desc=e.target.value;setServicos(n)}}/></div>
</div>)}
</div>

<div style={{background:'#111',padding:'12px',borderRadius:'16px',marginBottom:'12px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
<b style={{fontSize:'12px'}}>CATALOGO - FOTO/VIDEO + DESCRICAO</b>
<button onClick={()=>setCatalogo([...catalogo,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,color:'black',border:'none',borderRadius:'8px',padding:'8px 14px',fontWeight:900}}>+ Adicionar</button>
</div>
{catalogo.map((c,i)=><div key={i} style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',marginBottom:'8px'}}>
<div style={{display:'flex',gap:'6px',marginBottom:'6px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"catalogo");const n=[...catalogo];n[i]={...n[i],url:u.url,type:u.type};setCatalogo(n)}}}/><button onClick={()=>setCatalogo(catalogo.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',borderRadius:'8px',color:'white',padding:'0 12px'}}>X</button></div>
{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'90px',objectFit:'cover',borderRadius:'8px',marginBottom:'6px'}} muted/>:<img src={c.url} style={{width:'100%',height:'90px',objectFit:'cover',borderRadius:'8px',marginBottom:'6px'}}/>)}
<input style={{...inp,marginBottom:'6px'}} placeholder="Nome produto ex: Blusa Rosa" value={c.nome} onChange={e=>{const n=[...catalogo];n[i].nome=e.target.value;setCatalogo(n)}}/>
<div style={{display:'flex',gap:'6px'}}><input style={{...inp,marginBottom:'0',flex:1}} placeholder="Preco R$50" value={c.preco} onChange={e=>{const n=[...catalogo];n[i].preco=e.target.value;setCatalogo(n)}}/><input style={{...inp,marginBottom:'0',flex:2}} placeholder="Descricao Tamanho M" value={c.desc} onChange={e=>{const n=[...catalogo];n[i].desc=e.target.value;setCatalogo(n)}}/></div>
</div>)}
</div>

<input style={inp} placeholder="WhatsApp ex: 5519999999999" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram ex: @moda.holambra" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>

<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'12px',marginBottom:'10px',border:'1px dashed #32BCAD'}}>
<b style={{fontSize:'11px',color:'#32BCAD'}}>PIX - QR CODE PERSONALIZADO</b>
<input style={inp} placeholder="Chave Pix (CPF, email, telefone)" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="Valor opcional ex: 50.00" value={f.pixValor} onChange={e=>setF({...f,pixValor:e.target.value})}/>
{pixQrUrl&&<div style={{background:'white',padding:'12px',borderRadius:'12px',marginTop:'8px',textAlign:'center'}}><img src={pixQrUrl} style={{width:'160px',height:'160px',margin:'0 auto',display:'block'}}/><div style={{color:'black',fontSize:'11px',marginTop:'6px',wordBreak:'break-all'}}>{f.pix}</div></div>}
</div>

<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'16px',marginBottom:'10px',border:'1px dashed #FF9500'}}>
<b style={{fontSize:'11px',color:'#FF9500'}}>📶 WIFI - QR CODE EM CIMA + SENHA EMBAIXO</b>
<input style={inp} placeholder="Nome da rede WiFi ex: Moda_Feminina" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="Senha do WiFi ex: 12345678" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
{wifiQrUrl&&<div style={{background:'white',padding:'14px',borderRadius:'16px',marginTop:'10px',textAlign:'center'}}><div style={{fontSize:'10px',color:'black',fontWeight:900,letterSpacing:'1px'}}>ESCANEIE PARA CONECTAR</div><img src={wifiQrUrl} style={{width:'180px',height:'180px',margin:'10px auto',display:'block'}}/><div style={{background:'#FFF3E0',padding:'10px',borderRadius:'10px'}}><div style={{fontSize:'12px',color:'black'}}>Rede: <b>{f.wifi_ssid}</b></div><div style={{fontSize:'14px',color:'black',fontWeight:900}}>Senha: {f.wifi}</div></div></div>}
</div>

<input style={inp} placeholder="Link Google Maps" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>

<div style={{background:'#111',padding:'12px',borderRadius:'16px',margin:'12px 0',border:'1px solid #333'}}>
<b style={{fontSize:'12px'}}>COLUNAS EXTRAS EM BAIXO - IMAGENS/VIDEOS</b>
{cols.map((c,i)=><div key={i} style={{background:'#1A1A1A',padding:'10px',borderRadius:'10px',marginTop:'10px'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'10px'}}>COLUNA {i+1}</b><button onClick={()=>setCols(cols.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',color:'white',borderRadius:'6px',padding:'2px 8px'}}>X</button></div>
<input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"colunas");const nc=[...cols];nc[i]={...nc[i],url:u.url,type:u.type};setCols(nc)}}}/>
<input style={{...inp,marginTop:'6px'}} placeholder="Descricao da coluna" value={c.desc} onChange={e=>{const nc=[...cols];nc[i].desc=e.target.value;setCols(nc)}}/>
{c.url&&<div style={{marginTop:'6px'}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px'}} muted/>:<img src={c.url} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px'}}/>}</div>}
</div>)}
<button onClick={()=>setCols([...cols,{url:"",desc:"",type:"image"}])} style={{background:'#222',border:'1px dashed #555',color:'white',width:'100%',padding:'12px',borderRadius:'10px',marginTop:'8px'}}>+ Adicionar Coluna</button>
</div>

<button onClick={salvar} style={{background:t.btn,padding:'20px',width:'100%',border:'none',borderRadius:'16px',fontWeight:900,fontSize:'18px',color:t.bg==='#FFF'||t.bg==='#F5F5F5'?'black':'white'}}>SALVAR LOJA COMPLETA</button>
</div>

<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'20px',overflowY:'auto',height:'100vh',position:'relative'}}>
<div style={{position:'absolute',width:'320px',height:'320px',background:t.b1,borderRadius:'50%',filter:'blur(80px)',opacity:0.4,top:'10%',left:'10%',animation:'float1 6s ease-in-out infinite'}}/>
<div style={{position:'absolute',width:'420px',height:'420px',background:t.b2,borderRadius:'50%',filter:'blur(100px)',opacity:0.3,bottom:'10%',right:'5%',animation:'float2 8s ease-in-out infinite'}}/>
<div style={{width:'400px',position:'relative',zIndex:2}}>
<div style={{background:t.card,backdropFilter:'blur(20px)',borderRadius:'32px',overflow:'hidden',border:`1px solid ${t.btn}40`,boxShadow:`0 20px 60px ${t.b1}40`}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'280px',objectFit:'cover'}}/> : <div style={{height:'280px',background:`url(${f.foto}) center/cover`}}/>):<div style={{height:'120px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>}
<div style={{padding:'20px',marginTop:'-50px',textAlign:'center'}}>
{f.logo? <img src={f.logo} style={{width:'92px',height:'92px',borderRadius:'50%',border:`4px solid ${t.bg}`,margin:'0 auto',display:'block',background:'white',objectFit:'cover'}}/> : <div style={{width:'92px',height:'92px',borderRadius:'50%',background:t.btn,margin:'0 auto'}}/>}
<h1 style={{color:f.corTitulo,fontWeight:900,fontSize:'28px',margin:'12px 0 4px',letterSpacing:'-1px'}}>{f.title||'NOME DA LOJA'}</h1>
{f.capaTitulo&&<h3 style={{color:t.btn,fontSize:'15px',margin:'4px 0'}}>{f.capaTitulo}</h3>}
{f.capaDesc&&<p style={{color:f.corDesc,fontSize:'13px'}}>{f.capaDesc}</p>}

<div style={{display:'flex',flexDirection:'column',gap:'16px',marginTop:'20px'}}>
{servicos.filter(s=>s.nome||s.url).map((s,i)=><div key={i} style={{background:t.card,borderRadius:'20px',overflow:'hidden',textAlign:'left',border:`1px solid ${t.btn}20`}}>{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'150px',objectFit:'cover'}} muted/>:<img src={s.url} style={{width:'100%',height:'150px',objectFit:'cover'}}/>)}<div style={{padding:'14px'}}><div style={{fontWeight:900,color:t.txt,fontSize:'16px'}}>{s.nome} {s.preco&&<span style={{color:t.btn}}> - {s.preco}</span>}</div>{s.desc&&<div style={{fontSize:'13px',opacity:0.7,color:t.txt,marginTop:'4px'}}>{s.desc}</div>}</div></div>)}

{catalogo.filter(c=>c.nome||c.url).map((c,i)=><div key={i} style={{background:t.card,borderRadius:'20px',overflow:'hidden',textAlign:'left',border:`1px solid ${t.btn}20`}}>{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'150px',objectFit:'cover'}} muted/>:<img src={c.url} style={{width:'100%',height:'150px',objectFit:'cover'}}/>)}<div style={{padding:'14px'}}><div style={{fontWeight:900,color:t.txt,fontSize:'16px'}}>{c.nome} {c.preco&&<span style={{color:t.btn}}> - {c.preco}</span>}</div>{c.desc&&<div style={{fontSize:'13px',opacity:0.7,color:t.txt,marginTop:'4px'}}>{c.desc}</div>}</div></div>)}

{f.wpp&&<a href={`https://wa.me/${f.wpp.replace(/\D/g,'')}`} style={{background:'#25D366',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'20px',display:'flex',gap:'12px',justifyContent:'center',alignItems:'center',color:'white',textDecoration:'none',boxShadow:'0 10px 30px #25D36660'}}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width:'30px'}}/> WhatsApp</a>}
{f.insta&&<a href={`https://instagram.com/${f.insta.replace('@','')}`} style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'19px',color:'white',textDecoration:'none',display:'flex',gap:'10px',justifyContent:'center',alignItems:'center'}}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" style={{width:'26px',background:'white',borderRadius:'6px'}}/> {f.insta}</a>}

{f.pix&&<div style={{background:'white',padding:'18px',borderRadius:'22px'}}><b style={{color:'black',fontSize:'13px'}}>PIX QR CODE</b><img src={pixQrUrl} style={{width:'200px',height:'200px',margin:'12px auto',display:'block'}}/><div style={{color:'black',fontSize:'12px',wordBreak:'break-all'}}>{f.pix} {f.pixValor&&`- R$ ${f.pixValor}`}</div></div>}

{f.wifi_ssid&&f.wifi&&<div style={{background:'white',padding:'18px',borderRadius:'22px',textAlign:'center'}}><div style={{fontSize:'11px',color:'black',fontWeight:900}}>WIFI QR CODE</div><img src={wifiQrUrl} style={{width:'200px',height:'200px',margin:'12px auto',display:'block'}}/><div style={{background:'#FFF3E0',padding:'12px',borderRadius:'12px'}}><div style={{color:'black',fontSize:'13px'}}>Rede: <b>{f.wifi_ssid}</b></div><div style={{color:'black',fontWeight:900,fontSize:'16px'}}>Senha: {f.wifi}</div></div></div>}

{f.loc&&<a href={f.loc} style={{background:'white',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'19px',color:'#1a73e8',textDecoration:'none',display:'flex',gap:'10px',justifyContent:'center',alignItems:'center',boxShadow:'0 10px 30px rgba(0,0,0,0.2)'}}><img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg" style={{width:'26px'}}/> Ver no Maps</a>}

{cols.filter(c=>c.url).length>0&&<div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>{cols.filter(c=>c.url).map((c,i)=><div key={i} style={{background:t.card,borderRadius:'18px',overflow:'hidden',border:`1px solid ${t.btn}20`}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} muted/>:<img src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}}/>}{c.desc&&<div style={{padding:'10px',fontSize:'12px',color:t.txt}}>{c.desc}</div>}</div>)}</div></div>}

</div>
</div>
</div>
</div>
</div>
</div>
</div>
)
}
