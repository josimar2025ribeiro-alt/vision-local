export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page(props:any){
const slug = decodeURIComponent(props.params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const res = await supabase.from("biosites").select("*").eq("slug", slug).single()
const data = res.data
if(!data){
return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada</div>
}
const isVideo = data.foto_url && String(data.foto_url).indexOf('mp4')>-1
let pixQr=null
let wifiQr=null
if(data.pix_key){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(String(data.pix_key))+"&size=400"}
if(data.wifi_password){const txt="WIFI:T:WPA;S:"+(data.wifi_ssid||data.title)+";P:"+data.wifi_password+";;";wifiQr="https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=400"}

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'100%',maxWidth:'420px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'300px',objectFit:'cover'}}/> : <div style={{height:'300px',backgroundImage:"url("+data.foto_url+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'120px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{data.logo_url? <img src={data.logo_url} style={{width:'90px',height:'90px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-45px auto 0',display:'block',position:'relative',zIndex:2}} alt="logo"/> : null}
</div>
<div style={{padding:'20px',textAlign:'center'}}>
<h1 style={{color:data.cor_titulo||'white',fontWeight:900,fontSize:'28px',margin:'12px 0 4px'}}>{data.title}</h1>
{data.capa_titulo? <div style={{color:'#00FF88',fontWeight:800,fontSize:'16px'}}>{data.capa_titulo}</div> : null}
{data.capa_desc? <div style={{color:data.cor_desc||'#AAA',fontSize:'14px',marginTop:'4px'}}>{data.capa_desc}</div> : null}
<div style={{marginTop:'22px',display:'flex',flexDirection:'column',gap:'18px'}}>
{(data.servicos_json||[]).map((s:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'20px',overflow:'hidden',textAlign:'left'}}>{s.url? (s.type==='video'? <video src={s.url} style={{width:'100%',height:'160px',objectFit:'cover'}} autoPlay muted loop playsInline/> : <img src={s.url} style={{width:'100%',height:'160px',objectFit:'cover'}} alt="s"/> ) : null}<div style={{padding:'14px'}}><div style={{fontWeight:900,color:'white'}}>{s.nome} {s.preco? <span style={{color:'#00FF88'}}>{s.preco}</span> : null}</div>{s.desc? <div style={{fontSize:'13px',color:'#CCC',marginTop:'4px'}}>{s.desc}</div> : null}</div></div>)}
{(data.catalogo_json||[]).map((c:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'20px',overflow:'hidden',textAlign:'left'}}>{c.url? (c.type==='video'? <video src={c.url} style={{width:'100%',height:'160px',objectFit:'cover'}} autoPlay muted loop playsInline/> : <img src={c.url} style={{width:'100%',height:'160px',objectFit:'cover'}} alt="c"/> ) : null}<div style={{padding:'14px'}}><div style={{fontWeight:900,color:'white'}}>{c.nome} {c.preco? <span style={{color:'#00FF88'}}>{c.preco}</span> : null}</div>{c.desc? <div style={{fontSize:'13px',color:'#CCC',marginTop:'4px'}}>{c.desc}</div> : null}</div></div>)}
{data.whatsapp? <a href={"https://wa.me/"+String(data.whatsapp).replace(/\D/g,'')} style={{background:'#25D366',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'20px',color:'white',textDecoration:'none',display:'block'}}>WhatsApp GRANDE</a> : null}
{data.instagram? <a href={"https://instagram.com/"+String(data.instagram).replace('@','')} style={{background:'linear-gradient(45deg,#f09433,#dc2743,#bc1888)',padding:'22px',borderRadius:'22px',fontWeight:900,color:'white',textDecoration:'none',display:'block',fontSize:'18px'}}>Instagram GRANDE</a> : null}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr? <div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #00E676'}}><div style={{color:'black',fontWeight:900,fontSize:'12px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%',marginTop:'8px'}} alt="pix"/><div style={{color:'black',fontSize:'11px',wordBreak:'break-all',background:'#E0FFF0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}>{data.pix_key}</div></div> : null}
{wifiQr? <div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'12px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%',marginTop:'8px'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'10px',borderRadius:'10px',marginTop:'8px'}}><div style={{color:'black',fontSize:'12px'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900,fontSize:'16px'}}>Senha: {data.wifi_password}</div></div><div style={{fontSize:'10px',color:'#666',marginTop:'6px'}}>QR em cima - Senha embaixo</div></div> : null}
</div>
{data.localizacao? <a href={data.localizacao} style={{background:'white',padding:'22px',borderRadius:'22px',fontWeight:900,color:'#1a73e8',textDecoration:'none',display:'block',fontSize:'18px'}}>Ver no Maps GRANDE</a> : null}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{(data.colunas||[]).filter((c:any)=>c.url).map((c:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'18px',overflow:'hidden'}}>{c.type==='video'? <video src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} autoPlay muted loop playsInline/> : <img src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} alt="col"/>}{c.desc? <div style={{padding:'10px',fontSize:'12px',color:'white'}}>{c.desc}</div> : null}</div>)}
</div>
</div>
</div>
</div>
</div>
)
}
