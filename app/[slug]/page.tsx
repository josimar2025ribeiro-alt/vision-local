export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"
const TEMAS=[
{ btn:"#00FF88", bg:"#050505", b1:"#00FF88", b2:"#0066FF" },
{ btn:"#FF006B", bg:"#0A0014", b1:"#FF006B", b2:"#8A2BE2" },
{ btn:"#00D4FF", bg:"#00111A", b1:"#00D4FF", b2:"#0066FF" },
{ btn:"#FFD700", bg:"#1A1400", b1:"#FFD700", b2:"#FF6B00" },
{ btn:"#000", bg:"#FFF", b1:"#DDD", b2:"#FFF" },
{ btn:"#FF1A1A", bg:"#1A0000", b1:"#FF1A1A", b2:"#FF6B00" },
]
export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-")
const { data } = await supabase.from("biosites").select("*").eq("slug", slug).single()
if(!data) return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada <a href="/criar" style={{color:'#00FF88',marginLeft:'10px'}}>Criar</a></div>
const t = TEMAS[data.tema_idx||0] || TEMAS[0]
const layout = data.layout_tipo||1
const capaEstilo = data.capa_estilo||'full'
const logoPos = data.logo_pos||'centro'
const isVideo = data.foto_url?.includes('.mp4')
const pixQr = data.pix_key?`https://quickchart.io/qr?text=${encodeURIComponent(data.pix_key)}&size=350`:null
const wifiQr = data.wifi_password?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${data.wifi_ssid||data.title};P:${data.wifi_password};;`)}&size=350`:null

function capaStyle(){
if(capaEstilo==='sem') return {height:'80px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}
if(capaEstilo==='quadrada') return {height:'380px',background:data.foto_url?`url(${data.foto_url}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`,borderRadius:'24px',margin:'12px'}
if(capaEstilo==='redonda') return {width:'220px',height:'220px',background:data.foto_url?`url(${data.foto_url}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`,borderRadius:'50%',margin:'12px auto'}
if(capaEstilo==='banner') return {height:'110px',background:data.foto_url?`url(${data.foto_url}) center/cover`:`linear-gradient(90deg,${t.b1},${t.b2})`}
if(capaEstilo==='separada') return {height:'200px',background:data.foto_url?`url(${data.foto_url}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`,borderRadius:'20px',margin:'12px',border:`2px solid ${t.btn}`}
return {height:'280px',background:data.foto_url?`url(${data.foto_url}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`}
}

return(
<div style={{minHeight:'100vh',background:t.bg,display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'420px'}}>
<div style={{
background: layout===2?'rgba(20,20,20,0.9)': layout===3?'white': layout===4?'#111': layout===5?`#000`:'#1A1A1A',
borderRadius: layout===3?'12px': layout===6?'8px':'28px',
overflow:'hidden',
border: layout===5?`2px solid ${t.btn}`:'1px solid rgba(255,255,255,0.1)',
boxShadow: layout===5?`0 0 30px ${t.btn}60`:'0 20px 60px rgba(0,0,0,0.5)'
}}>
<div style={{position:'relative'}}>
<div style={capaStyle()}>{isVideo&&capaEstilo==='full'&&<video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}/>}</div>
{data.logo_url&&(
logoPos==='centro'?<img src={data.logo_url} style={{width:'90px',height:'90px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',objectFit:'cover',margin:'-45px auto 0',display:'block',position:'relative',zIndex:2}}/>:
logoPos==='esquerda'?<img src={data.logo_url} style={{width:'86px',height:'86px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',margin:'-40px 0 0 20px',display:'block'}}/>:
logoPos==='direita'?<img src={data.logo_url} style={{width:'86px',height:'86px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',margin:'-40px 20px 0 auto',display:'block'}}/>:
logoPos==='flut-esq'?<img src={data.logo_url} style={{width:'80px',height:'80px',borderRadius:'50%',background:'white',position:'absolute',top:'16px',left:'16px',zIndex:5}}/>:
logoPos==='flut-dir'?<img src={data.logo_url} style={{width:'80px',height:'80px',borderRadius:'50%',background:'white',position:'absolute',top:'16px',right:'16px',zIndex:5}}/>:
<img src={data.logo_url} style={{width:'90px',height:'90px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',margin:'-45px auto 0',display:'block'}}/>
)}
</div>

<div style={{padding:'20px',textAlign: layout===6?'left':'center'}}>
<h1 style={{color: layout===3?'black':data.cor_titulo||'white',fontWeight:900,fontSize:'28px'}}>{data.title}</h1>
{data.capa_titulo&&<div style={{color:t.btn,fontWeight:800}}>{data.capa_titulo}</div>}
{data.capa_desc&&<div style={{color: layout===3?'#666':data.cor_desc||'#AAA',fontSize:'13px'}}>{data.capa_desc}</div>}

<div style={{display: layout===6?'grid':'flex',gridTemplateColumns: layout===6?'1fr 1fr':'',flexDirection:'column',gap:'14px',marginTop:'20px'}}>

{(data.servicos_json||[]).map((s:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',textAlign:'left'}}>{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'140px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={s.url} style={{width:'100%',height:'140px',objectFit:'cover'}}/>)}<div style={{padding:'10px'}}><div style={{fontWeight:900,color:'white'}}>{s.nome} {s.preco&&<span style={{color:t.btn}}>{s.preco}</span>}</div>{s.desc&&<div style={{fontSize:'12px',color:'#CCC'}}>{s.desc}</div>}</div></div>)}

{(data.catalogo_json||[]).map((c:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',textAlign:'left'}}>{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'140px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'140px',objectFit:'cover'}}/>)}<div style={{padding:'10px'}}><div style={{fontWeight:900,color:'white'}}>{c.nome} {c.preco&&<span style={{color:t.btn}}>{c.preco}</span>}</div>{c.desc&&<div style={{fontSize:'12px',color:'#CCC'}}>{c.desc}</div>}</div></div>)}

{data.whatsapp&&<a href={`https://wa.me/${data.whatsapp.replace(/\D/g,'')}`} style={{background:'#25D366',padding:'20px',borderRadius: layout===3?'8px':'20px',color:'white',fontWeight:900,textDecoration:'none',display:'block'}}>WhatsApp</a>}
{data.instagram&&<a href={`https://instagram.com/${data.instagram.replace('@','')}`} style={{background:'linear-gradient(45deg,#f09433,#bc1888)',padding:'20px',borderRadius:'20px',color:'white',fontWeight:900,textDecoration:'none',display:'block'}}>Instagram {data.instagram}</a>}

{pixQr&&<div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #00C851'}}><div style={{color:'black',fontWeight:900,fontSize:'12px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'200px',height:'200px',margin:'10px auto',display:'block'}}/><div style={{color:'black',fontSize:'11px',wordBreak:'break-all',background:'#E8FFF0',padding:'8px',borderRadius:'8px'}}>Chave: {data.pix_key}</div></div>}

{wifiQr&&<div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'12px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'200px',height:'200px',margin:'10px auto',display:'block'}}/><div style={{background:'#FFF3E0',padding:'10px',borderRadius:'10px'}}><div style={{color:'black'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900,fontSize:'18px'}}>Senha: {data.wifi_password}</div></div><div style={{fontSize:'10px',color:'#666',marginTop:'6px'}}>QR em cima - Senha embaixo</div></div>}

{data.localizacao&&<a href={data.localizacao} style={{background:'white',padding:'18px',borderRadius:'20px',color:'#1a73e8',fontWeight:900,textDecoration:'none',display:'block'}}>Ver no Maps</a>}

{(data.colunas||[]).filter((c:any)=>c.url).map((c:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.07)',borderRadius:'16px',overflow:'hidden'}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}}/>}{c.desc&&<div style={{padding:'8px',fontSize:'12px',color:'white'}}>{c.desc}</div>}</div>)}

</div>
</div>
</div>
</div>
</div>
)
}
