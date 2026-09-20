export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

import { supabase } from "../../lib/supabase"

const TEMAS=[
{ btn:"#00FF88", bg:"#050505", b1:"#00FF88", b2:"#0066FF" },
{ btn:"#FF006B", bg:"#0A0014", b1:"#FF006B", b2:"#8A2BE2" },
{ btn:"#00D4FF", bg:"#00111A", b1:"#00D4FF", b2:"#0066FF" },
{ btn:"#FF6B00", bg:"#1A0A00", b1:"#FF6B00", b2:"#FF006B" },
{ btn:"#000", bg:"#F5F5F5", b1:"#DDD", b2:"#FFF" },
{ btn:"#CCFF00", bg:"#0A1400", b1:"#CCFF00", b2:"#00FF88" },
{ btn:"#8A2BE2", bg:"#0A001A", b1:"#8A2BE2", b2:"#FF006B" },
{ btn:"#FF1A1A", bg:"#1A0000", b1:"#FF1A1A", b2:"#FF6B00" },
{ btn:"#FFD700", bg:"#1A1400", b1:"#FFD700", b2:"#FF6B00" },
{ btn:"#000", bg:"#E8F4FF", b1:"#00D4FF", b2:"#FFF" },
{ btn:"#FFF", bg:"#000", b1:"#333", b2:"#111" },
{ btn:"#0066FF", bg:"#000A1A", b1:"#0066FF", b2:"#00D4FF" },
]

export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-")
console.log("Buscando slug:", slug)

const { data, error } = await supabase.from("biosites").select("*").eq("slug", slug).single()

if (error ||!data) {
return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding:'20px'}}>
<div style={{fontSize:'18px'}}>ERRO: Loja {slug} nao encontrada</div>
<div style={{fontSize:'12px',opacity:0.6,marginTop:'8px'}}>{error?.message}</div>
<a href="/criar" style={{color:'#00FF88',marginTop:'16px',fontWeight:900}}>Voltar pra criar</a>
</div>
}

// DEBUG - VEJA O QUE TA VINDO DO BANCO
console.log("Dados:", { pix: data.pix_key, wifi: data.wifi_password, wifi_ssid: data.wifi_ssid, tema: data.tema_idx })

const t = TEMAS[data.tema_idx || 0] || TEMAS[0]
const isVideo = data.foto_url?.includes('.mp4') || data.foto_url?.includes('webm')

// QR CODE - GERA SEMPRE QUE TIVER DADO - USANDO 2 APIS PRA GARANTIR
const pixKey = data.pix_key? String(data.pix_key).trim() : ""
const wifiPass = data.wifi_password? String(data.wifi_password).trim() : ""
const wifiSsid = data.wifi_ssid? String(data.wifi_ssid).trim() : String(data.title || "WiFi").trim()

// SE NAO TIVER PIX OU WIFI, MOSTRA AVISO VERMELHO
const pixQrUrl = pixKey? `https://quickchart.io/qr?text=${encodeURIComponent(pixKey)}&size=300&dark=000000&light=FFFFFF` : null
const wifiQrUrl = wifiPass? `https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`)}&size=300&dark=000000&light=FFFFFF` : null

const servicos = data.servicos_json || []
const catalogo = data.catalogo_json || []
const colunas = data.colunas || []

return (
<div style={{minHeight:'100vh',background:t.bg,display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'420px'}}>
<div style={{background:'rgba(15,15,15,0.95)',borderRadius:'32px',overflow:'hidden',border:`2px solid ${t.btn}`,boxShadow:`0 20px 60px ${t.b1}60`}}>

{data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'280px',objectFit:'cover'}}/> : <div style={{height:'280px',background:`url(${data.foto_url}) center/cover`}}/>) : <div style={{height:'100px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>}

<div style={{padding:'20px',marginTop:'-50px',textAlign:'center',position:'relative',zIndex:2}}>
{data.logo_url && <img src={data.logo_url} style={{width:'90px',height:'90px',borderRadius:'50%',margin:'0 auto',display:'block',border:`4px solid ${t.bg}`,background:'white',objectFit:'cover'}}/>}

<h1 style={{color:data.cor_titulo || '#FFFFFF',fontWeight:900,fontSize:'28px',margin:'12px 0 4px'}}>{data.title || 'RTR'}</h1>
{data.capa_titulo && <div style={{color:t.btn,fontWeight:800}}>{data.capa_titulo}</div>}
{data.capa_desc && <div style={{color:data.cor_desc || '#AAA',fontSize:'13px',marginTop:'4px'}}>{data.capa_desc}</div>}

<div style={{marginTop:'20px',display:'flex',flexDirection:'column',gap:'16px'}}>

{/* BOTÕES GRANDES */}
{data.whatsapp && <a href={`https://wa.me/${data.whatsapp.replace(/\D/g,'')}`} style={{background:'#25D366',padding:'22px',borderRadius:'20px',color:'white',fontWeight:900,fontSize:'20px',textDecoration:'none',display:'block'}}>WhatsApp - {data.whatsapp}</a>}

{data.instagram && <a href={`https://instagram.com/${data.instagram.replace('@','')}`} style={{background:'linear-gradient(45deg,#f09433,#bc1888)',padding:'20px',borderRadius:'20px',color:'white',fontWeight:900,textDecoration:'none',display:'block'}}>Instagram - {data.instagram}</a>}

{/* PIX - AGORA COM DEBUG */}
{pixKey? (
<div style={{background:'white',padding:'16px',borderRadius:'20px',border:'4px solid #00C851'}}>
<div style={{color:'black',fontWeight:900,fontSize:'14px'}}>PIX QR CODE - TESTE</div>
<img src={pixQrUrl!} style={{width:'220px',height:'220px',margin:'10px auto',display:'block'}} alt="QR Pix"/>
<div style={{background:'#E8FFF0',padding:'10px',borderRadius:'10px',marginTop:'8px'}}>
<div style={{color:'black',fontWeight:900,wordBreak:'break-all'}}>Chave: {pixKey}</div>
{data.pix_qr_valor && <div style={{color:'black',fontWeight:900,marginTop:'4px'}}>Valor R$ {data.pix_qr_valor}</div>}
</div>
<div style={{fontSize:'10px',color:'#666',marginTop:'6px'}}>Se QR nao aparecer, copie a chave</div>
</div>
) : (
<div style={{background:'#FF1A1A',padding:'12px',borderRadius:'12px',color:'white',fontSize:'12px'}}>DEBUG: pix_key vazio no banco! Valor: "{String(data.pix_key)}"</div>
)}

{/* WIFI - AGORA COM DEBUG */}
{wifiPass? (
<div style={{background:'white',padding:'16px',borderRadius:'20px',border:'4px solid #FF9500'}}>
<div style={{color:'black',fontWeight:900,fontSize:'14px'}}>WIFI QR CODE - TESTE</div>
<img src={wifiQrUrl!} style={{width:'220px',height:'220px',margin:'10px auto',display:'block'}} alt="QR WiFi"/>
<div style={{background:'#FFF3E0',padding:'12px',borderRadius:'12px',marginTop:'8px'}}>
<div style={{color:'black'}}>Rede: <b>{wifiSsid}</b></div>
<div style={{color:'black',fontWeight:900,fontSize:'18px',marginTop:'4px'}}>Senha: {wifiPass}</div>
</div>
<div style={{fontSize:'11px',color:'#666',marginTop:'8px'}}>Aponte camera para conectar</div>
</div>
) : (
<div style={{background:'#FF1A1A',padding:'12px',borderRadius:'12px',color:'white',fontSize:'12px'}}>DEBUG: wifi_password vazio! Valor: "{String(data.wifi_password)}" - wifi_ssid: "{String(data.wifi_ssid)}"</div>
)}

{data.localizacao && <a href={data.localizacao} style={{background:'white',padding:'20px',borderRadius:'20px',fontWeight:900,color:'#1a73e8',textDecoration:'none',display:'block'}}>Ver no Maps</a>}

</div>
</div>
</div>
</div>
</div>
)
}
