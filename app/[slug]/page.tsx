import { supabase } from "../../lib/supabase"

const LOGOS={
wpp:"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
insta:"https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
maps:"https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg",
}

export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-")
const { data } = await supabase.from("biosites").select("*").eq("slug", slug).single()
if (!data) return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'10px'}}><div>Loja {slug} nao encontrada</div><a href="/criar" style={{color:'#00FF88'}}>Criar loja</a></div>

const isVideo = data.foto_url?.includes('.mp4')||data.foto_url?.includes('webm')
const pixQr = data.pix_key?`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(data.pix_qr_valor?`${data.pix_key} valor ${data.pix_qr_valor}`:data.pix_key)}`:null
const wifiQr = data.wifi_password?`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(`WIFI:T:WPA;S:${data.wifi_ssid||data.title};P:${data.wifi_password};;`)}`:null
const servicosJson = data.servicos_json || []
const catalogoJson = data.catalogo_json || []
const colunas = data.colunas || []

return (
<div style={{minHeight:'100vh',background:'#050505',display:'flex',justifyContent:'center',padding:'16px',position:'relative',overflow:'hidden'}}>
<div style={{position:'fixed',width:'350px',height:'350px',background:'#00FF8840',borderRadius:'50%',filter:'blur(80px)',top:'10%',left:'10%'}}/>
<div style={{position:'fixed',width:'450px',height:'450px',background:'#0066FF30',borderRadius:'50%',filter:'blur(100px)',bottom:'10%',right:'5%'}}/>

<div style={{width:'420px',position:'relative',zIndex:2}}>
<div style={{background:'rgba(20,20,20,0.85)',backdropFilter:'blur(24px)',borderRadius:'32px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 20px 60px rgba(0,0,0,0.5)'}}>
{data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'300px',objectFit:'cover'}}/> : <div style={{height:'300px',background:`url(${data.foto_url}) center/cover`}}/>):<div style={{height:'120px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}

<div style={{padding:'22px',marginTop:'-56px',textAlign:'center'}}>
{data.logo_url&&<img src={data.logo_url} style={{width:'96px',height:'96px',borderRadius:'50%',margin:'0 auto',display:'block',border:'4px solid #050505',background:'white',objectFit:'cover'}}/>}
<h1 style={{color:data.cor_titulo||'white',fontWeight:900,fontSize:'30px',margin:'14px 0 4px',letterSpacing:'-1px'}}>{data.title}</h1>
{data.capa_titulo&&<h3 style={{color:'#00FF88',fontSize:'16px',margin:'6px 0'}}>{data.capa_titulo}</h3>}
{data.capa_desc&&<p style={{color:data.cor_desc||'#AAA',fontSize:'14px',margin:'6px 0'}}>{data.capa_desc}</p>}

<div style={{display:'flex',flexDirection:'column',gap:'18px',marginTop:'22px'}}>

{servicosJson.filter((s:any)=>s.nome||s.url).map((s:any,i:number)=>
<div key={i} style={{background:'rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden',textAlign:'left',border:'1px solid rgba(255,255,255,0.08)'}}>
{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'160px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={s.url} style={{width:'100%',height:'160px',objectFit:'cover'}}/>)}
<div style={{padding:'14px'}}><div style={{fontWeight:900,color:'white',fontSize:'17px'}}>{s.nome} {s.preco&&<span style={{color:'#00FF88'}}> - {s.preco}</span>}</div>{s.desc&&<div style={{fontSize:'13px',color:'#CCC',marginTop:'6px'}}>{s.desc}</div>}</div>
</div>
)}

{catalogoJson.filter((c:any)=>c.nome||c.url).map((c:any,i:number)=>
<div key={i} style={{background:'rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden',textAlign:'left',border:'1px solid rgba(255,255,255,0.08)'}}>
{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'160px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'160px',objectFit:'cover'}}/>)}
<div style={{padding:'14px'}}><div style={{fontWeight:900,color:'white',fontSize:'17px'}}>{c.nome} {c.preco&&<span style={{color:'#00FF88'}}> - {c.preco}</span>}</div>{c.desc&&<div style={{fontSize:'13px',color:'#CCC',marginTop:'6px'}}>{c.desc}</div>}</div>
</div>
)}

{!servicosJson.length&&data.servicos&&<div style={{background:'rgba(255,255,255,0.07)',padding:'16px',borderRadius:'18px',color:'white',fontWeight:700}}>{data.servicos}</div>}
{!catalogoJson.length&&data.catalogo&&<div style={{background:'rgba(255,255,255,0.07)',padding:'16px',borderRadius:'18px',color:'white',whiteSpace:'pre-wrap'}}>{data.catalogo}</div>}

{data.whatsapp&&<a href={`https://wa.me/${data.whatsapp.replace(/\D/g,'')}`} style={{background:'#25D366',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'20px',display:'flex',gap:'12px',justifyContent:'center',alignItems:'center',color:'white',textDecoration:'none',boxShadow:'0 12px 30px #25D36660'}}><img src={LOGOS.wpp} style={{width:'30px'}}/> WhatsApp</a>}

{data.instagram&&<a href={`https://instagram.com/${data.instagram.replace('@','')}`} style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'19px',color:'white',textDecoration:'none',display:'flex',gap:'10px',justifyContent:'center',alignItems:'center'}}><img src={LOGOS.insta} style={{width:'26px',background:'white',borderRadius:'6px'}}/> {data.instagram}</a>}

{pixQr&&<div style={{background:'white',padding:'20px',borderRadius:'24px',textAlign:'center'}}><div style={{fontWeight:900,color:'black',fontSize:'13px',letterSpacing:'1px'}}>PIX QR CODE - PAGAMENTO RÁPIDO</div><img src={pixQr} style={{width:'220px',height:'220px',margin:'14px auto',display:'block'}}/><div style={{color:'black',fontSize:'12px',wordBreak:'break-all',background:'#F5F5F5',padding:'10px',borderRadius:'10px'}}>{data.pix_key} {data.pix_qr_valor&&`- R$ ${data.pix_qr_valor}`}</div></div>}

{wifiQr&&<div style={{background:'white',padding:'20px',borderRadius:'24px',textAlign:'center'}}><div style={{fontWeight:900,color:'black',fontSize:'13px',letterSpacing:'1px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'220px',height:'220px',margin:'14px auto',display:'block'}}/><div style={{background:'#FFF3E0',padding:'14px',borderRadius:'14px'}}><div style={{color:'black',fontSize:'14px'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900,fontSize:'18px',marginTop:'4px'}}>Senha: {data.wifi_password}</div><div style={{fontSize:'10px',color:'#666',marginTop:'6px'}}>Aponte a câmera para conectar</div></div></div>}

{data.localizacao&&<a href={data.localizacao} style={{background:'white',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'19px',color:'#1a73e8',textDecoration:'none',display:'flex',gap:'12px',justifyContent:'center',alignItems:'center',boxShadow:'0 12px 30px rgba(0,0,0,0.2)'}}><img src={LOGOS.maps} style={{width:'26px'}}/> Ver no Maps</a>}

{colunas.length>0&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>{colunas.filter((c:any)=>c.url).map((c:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'130px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'130px',objectFit:'cover'}}/>}{c.desc&&<div style={{padding:'12px',fontSize:'12px',color:'white'}}>{c.desc}</div>}</div>)}</div>}

</div>
</div>
</div>
</div>
</div>
)
}
