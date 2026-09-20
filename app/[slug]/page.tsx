import { supabase } from "../../lib/supabase"

const TEMAS=[
{ btn:"#00FF88", bg:"#050505", b1:"#00FF88", b2:"#0066FF" },
{ btn:"#FF006B", bg:"#0A0014", b1:"#FF006B", b2:"#8A2BE2" },
{ btn:"#00D4FF", bg:"#00111A", b1:"#00D4FF", b2:"#0066FF" },
{ btn:"#FF6B00", bg:"#1A0A00", b1:"#FF6B00", b2:"#FF006B" },
{ btn:"#000", bg:"#F5F5F5", b1:"#E0E0E0", b2:"#FFF" },
{ btn:"#CCFF00", bg:"#0A1400", b1:"#CCFF00", b2:"#00FF88" },
{ btn:"#8A2BE2", bg:"#0A001A", b1:"#8A2BE2", b2:"#FF006B" },
{ btn:"#FF1A1A", bg:"#1A0000", b1:"#FF1A1A", b2:"#FF6B00" },
{ btn:"#FFD700", bg:"#1A1400", b1:"#FFD700", b2:"#FF6B00" },
{ btn:"#000", bg:"#E8F4FF", b1:"#00D4FF", b2:"#FFF" },
{ btn:"#FFF", bg:"#000", b1:"#333", b2:"#111" },
{ btn:"#0066FF", bg:"#000A1A", b1:"#0066FF", b2:"#00D4FF" },
]

export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-")
const { data, error } = await supabase.from("biosites").select("*").eq("slug", slug).single()

if (error ||!data) {
return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
<div>Loja {slug} nao encontrada - Erro: {error?.message}</div>
<a href="/criar" style={{color:'#00FF88',marginTop:'10px'}}>Criar nova</a>
</div>
}

const t = TEMAS[data.tema_idx||0] || TEMAS[0]
const isVideo = data.foto_url?.includes('.mp4')||data.foto_url?.includes('webm')
const pixKey = data.pix_key?.trim()
const wifiPass = data.wifi_password?.trim()
const wifiSsid = (data.wifi_ssid||data.title||"WiFi").trim()

// QR CODE - SEMPRE GERA SE TIVER PIX OU WIFI
const pixQr = pixKey? `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(pixKey)}` : null
const wifiQr = wifiPass? `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(`WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`)}` : null

const servicos = data.servicos_json || []
const catalogo = data.catalogo_json || []
const colunas = data.colunas || []

return (
<div style={{minHeight:'100vh',background:t.bg,display:'flex',justifyContent:'center',padding:'16px',position:'relative'}}>
<div style={{position:'fixed',width:'400px',height:'400px',background:t.b1,borderRadius:'50%',filter:'blur(90px)',opacity:0.35,top:'5%',left:'5%'}}/>
<div style={{position:'fixed',width:'500px',height:'500px',background:t.b2,borderRadius:'50%',filter:'blur(110px)',opacity:0.25,bottom:'5%',right:'5%'}}/>

<div style={{width:'420px',position:'relative',zIndex:2}}>
<div style={{background:'rgba(20,20,20,0.9)',backdropFilter:'blur(24px)',borderRadius:'32px',overflow:'hidden',border:`1px solid ${t.btn}40`,boxShadow:`0 20px 60px ${t.b1}50`}}>

{data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'300px',objectFit:'cover'}}/> : <div style={{height:'300px',background:`url(${data.foto_url}) center/cover`}}/> ) : <div style={{height:'120px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>}

<div style={{padding:'22px',marginTop:'-56px',textAlign:'center'}}>
{data.logo_url&&<img src={data.logo_url} style={{width:'96px',height:'96px',borderRadius:'50%',margin:'0 auto',display:'block',border:`4px solid ${t.bg}`,background:'white',objectFit:'cover'}}/>}

<h1 style={{color:data.cor_titulo||'#FFFFFF',fontWeight:900,fontSize:'30px',margin:'14px 0 4px'}}>{data.title}</h1>
{data.capa_titulo&&<h3 style={{color:t.btn,fontSize:'16px',margin:'6px 0'}}>{data.capa_titulo}</h3>}
{data.capa_desc&&<p style={{color:data.cor_desc||'#AAA',fontSize:'14px'}}>{data.capa_desc}</p>}

<div style={{display:'flex',flexDirection:'column',gap:'18px',marginTop:'22px'}}>

{servicos.filter((s:any)=>s.nome||s.url).map((s:any,i:number)=>
<div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'20px',overflow:'hidden',textAlign:'left'}}>
{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'160px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={s.url} style={{width:'100%',height:'160px',objectFit:'cover'}}/>)}
<div style={{padding:'14px'}}><div style={{fontWeight:900,color:'white'}}>{s.nome} {s.preco&&<span style={{color:t.btn}}> - {s.preco}</span>}</div>{s.desc&&<div style={{fontSize:'13px',color:'#CCC',marginTop:'4px'}}>{s.desc}</div>}</div>
</div>
)}

{catalogo.filter((c:any)=>c.nome||c.url).map((c:any,i:number)=>
<div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'20px',overflow:'hidden',textAlign:'left'}}>
{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'160px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'160px',objectFit:'cover'}}/>)}
<div style={{padding:'14px'}}><div style={{fontWeight:900,color:'white'}}>{c.nome} {c.preco&&<span style={{color:t.btn}}> - {c.preco}</span>}</div>{c.desc&&<div style={{fontSize:'13px',color:'#CCC',marginTop:'4px'}}>{c.desc}</div>}</div>
</div>
)}

{data.servicos&&servicos.length===0&&<div style={{background:'rgba(255,255,255,0.08)',padding:'16px',borderRadius:'18px',color:'white'}}>{data.servicos}</div>}
{data.catalogo&&catalogo.length===0&&<div style={{background:'rgba(255,255,255,0.08)',padding:'16px',borderRadius:'18px',color:'white',whiteSpace:'pre-wrap'}}>{data.catalogo}</div>}

{data.whatsapp&&<a href={`https://wa.me/${data.whatsapp.replace(/\D/g,'')}`} style={{background:'#25D366',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'20px',color:'white',textDecoration:'none',display:'flex',gap:'12px',justifyContent:'center',alignItems:'center'}}>WhatsApp</a>}

{data.instagram&&<a href={`https://instagram.com/${data.instagram.replace('@','')}`} style={{background:'linear-gradient(45deg,#f09433,#dc2743,#bc1888)',padding:'22px',borderRadius:'22px',fontWeight:900,color:'white',textDecoration:'none',display:'block'}}>Instagram {data.instagram}</a>}

{/* PIX QR CODE - FORÇA APARECER */}
{pixQr&&(
<div style={{background:'white',padding:'20px',borderRadius:'24px',textAlign:'center',border:'3px solid #32BCAD'}}>
<div style={{fontWeight:900,color:'black',fontSize:'14px',letterSpacing:'1px'}}>💰 PIX QR CODE</div>
<img src={pixQr} alt="Pix QR" style={{width:'240px',height:'240px',margin:'14px auto',display:'block',background:'white'}}/>
<div style={{background:'#E0FFF0',padding:'12px',borderRadius:'12px'}}>
<div style={{color:'black',fontSize:'13px',wordBreak:'break-all',fontWeight:700}}>Chave: {pixKey}</div>
{data.pix_qr_valor&&<div style={{color:'black',fontWeight:900,fontSize:'18px',marginTop:'6px'}}>Valor: R$ {data.pix_qr_valor}</div>}
</div>
</div>
)}

{/* WIFI QR CODE - FORÇA APARECER */}
{wifiQr&&(
<div style={{background:'white',padding:'20px',borderRadius:'24px',textAlign:'center',border:'3px solid #FF9500'}}>
<div style={{fontWeight:900,color:'black',fontSize:'14px',letterSpacing:'1px'}}>📶 WIFI QR CODE</div>
<img src={wifiQr} alt="WiFi QR" style={{width:'240px',height:'240px',margin:'14px auto',display:'block',background:'white'}}/>
<div style={{background:'#FFF3E0',padding:'14px',borderRadius:'14px'}}>
<div style={{color:'black',fontSize:'14px'}}>Rede: <b>{wifiSsid}</b></div>
<div style={{color:'black',fontWeight:900,fontSize:'20px',marginTop:'4px'}}>Senha: {wifiPass}</div>
<div style={{fontSize:'11px',color:'#666',marginTop:'8px'}}>📱 Aponte a câmera do celular</div>
</div>
</div>
)}

{data.localizacao&&<a href={data.localizacao} style={{background:'white',padding:'22px',borderRadius:'22px',fontWeight:900,color:'#1a73e8',textDecoration:'none',display:'block'}}>📍 Ver no Maps</a>}

{colunas.filter((c:any)=>c.url).length>0&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>{colunas.filter((c:any)=>c.url).map((c:any,i:number)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'18px',overflow:'hidden'}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}}/>}{c.desc&&<div style={{padding:'10px',fontSize:'12px',color:'white'}}>{c.desc}</div>}</div>)}</div>}

</div>
</div>
</div>
</div>
</div>
)
}
