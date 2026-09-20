export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase()
const { data } = await supabase.from("biosites").select("*").eq("slug", slug).single()
if(!data) return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada</div>

const secs = data.sections_json || { produtos: [], servVideos: [], etapas: [] }
const youtubeId = data.youtube_topo? data.youtube_topo.split('v=')[1]?.split('&')[0] : 'vMzKWhcSMCY'
const pixQr = data.pix_key?`https://quickchart.io/qr?text=${encodeURIComponent(data.pix_key)}&size=400`:null
const wifiQr = data.wifi_password?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${data.wifi_ssid||data.title};P:${data.wifi_password};;`)}&size=400`:null

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center'}}>
<div style={{width:'100%',maxWidth:'480px',background:'#0F0F0F',minHeight:'100vh'}}>

{/* TOPO VIDEO IGUAL SEU BIO.SITE */}
<div style={{position:'relative',height:'260px',background:'#000'}}>
<iframe src={`https://www.youtube.com/embed/${youtubeId}`} style={{width:'100%',height:'100%',border:'none'}} allowFullScreen/>
</div>

<div style={{padding:'20px',marginTop:'-30px',position:'relative',zIndex:2}}>
{data.logo_url&&<img src={data.logo_url} style={{width:'88px',height:'88px',borderRadius:'50%',border:'4px solid #0F0F0F',background:'white',display:'block',margin:'0 auto'}}/>}
<h1 style={{color:'white',fontWeight:900,fontSize:'22px',textAlign:'center',marginTop:'12px'}}>{data.title}</h1>
<p style={{color:'#AAA',textAlign:'center',fontSize:'13px'}}>Energia Solar Refrigeração e Climatização</p>

{/* PRODUTOS COM CARDS ARRASTÁVEIS IGUAL SEU BIO.SITE */}
<div style={{marginTop:'24px'}}>
<div style={{color:'white',fontWeight:900,marginBottom:'12px'}}>Conheça alguns dos nossos Produtos</div>
{(secs.produtos||[]).map((sec:any,i:number)=><div key={i} style={{marginBottom:'18px'}}>
<div style={{color:'#00E676',fontWeight:800,fontSize:'14px',marginBottom:'10px'}}>{sec.cat}</div>
<div style={{display:'flex',gap:'12px',overflowX:'auto',paddingBottom:'10px',scrollSnapType:'x mandatory'}}>
{sec.items.map((it:any,j:number)=><div key={j} style={{minWidth:'140px',background:'#1C1C1C',borderRadius:'16px',padding:'10px',scrollSnapAlign:'start',border:'1px solid #2A2A2A'}}>
{it.img?<img src={it.img} style={{width:'100%',height:'90px',objectFit:'cover',borderRadius:'10px'}}/>:<div style={{height:'90px',background:'#2A2A2A',borderRadius:'10px'}}/>}
<div style={{color:'white',fontSize:'11px',marginTop:'8px',fontWeight:600}}>{it.nome}</div>
<div style={{background:'#25D366',color:'white',padding:'6px',borderRadius:'8px',fontSize:'10px',fontWeight:900,marginTop:'8px',textAlign:'center'}}>Ver no Whats</div>
</div>)}
</div>
</div>)}
</div>

{/* VIDEOS SERVIÇOS IGUAL SEU BIO.SITE */}
<div style={{marginTop:'24px'}}>
<div style={{color:'white',fontWeight:900,marginBottom:'12px'}}>CONFIRA ALGUNS DOS NOSSOS SERVIÇOS</div>
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
{(secs.servVideos||[]).map((v:any,i:number)=>{
const id=v.split('v=')[1]?.split('&')[0]||'2-AnlWN5U-Y'
return <iframe key={i} src={`https://www.youtube.com/embed/${id}`} style={{width:'100%',height:'200px',borderRadius:'16px',border:'none'}} allowFullScreen/>
})}
</div>
</div>

{/* 5 ETAPAS IGUAL SEU BIO.SITE */}
<div style={{marginTop:'24px'}}>
<div style={{color:'white',fontWeight:900,marginBottom:'12px'}}>CONFIRA AS 5 ETAPAS PARA ECONOMIZAR</div>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
{(secs.etapas||[]).map((e:any,i:number)=><div key={i} style={{background:'#1C1C1C',borderRadius:'16px',padding:'14px',borderLeft:'4px solid #00E676'}}>
<div style={{color:'#00E676',fontWeight:900,fontSize:'13px'}}>{e.t}</div>
<div style={{color:'#CCC',fontSize:'12px',marginTop:'4px'}}>{e.d}</div>
</div>)}
</div>
</div>

{/* QR CODES QUE VOCÊ ADOROU - MANTIDOS 100% */}
<div style={{marginTop:'24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #00E676'}}>
<div style={{color:'black',fontWeight:900,fontSize:'11px'}}>PIX QR CODE</div>
<img src={pixQr} style={{width:'100%',marginTop:'8px'}}/>
<div style={{color:'black',fontSize:'10px',fontWeight:700,marginTop:'6px',wordBreak:'break-all'}}>{data.pix_key}</div>
</div>}
{wifiQr&&<div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #FF9500'}}>
<div style={{color:'black',fontWeight:900,fontSize:'11px'}}>WIFI QR CODE</div>
<img src={wifiQr} style={{width:'100%',marginTop:'8px'}}/>
<div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}>
<div style={{color:'black',fontSize:'11px'}}>Rede: <b>{data.wifi_ssid}</b></div>
<div style={{color:'black',fontWeight:900}}>Senha: {data.wifi_password}</div>
</div>
<div style={{fontSize:'9px',color:'#666',marginTop:'4px'}}>QR em cima - Senha embaixo</div>
</div>}
</div>

{/* BOTOES CTA */}
<div style={{marginTop:'24px',display:'flex',flexDirection:'column',gap:'12px'}}>
<a href={`https://wa.me/${data.whatsapp?.replace(/\D/g,'')}`} style={{background:'#25D366',padding:'18px',borderRadius:'16px',color:'white',fontWeight:900,textAlign:'center',textDecoration:'none',fontSize:'16px'}}>💬 Fale conosco</a>
<a href={data.localizacao} style={{background:'white',padding:'18px',borderRadius:'16px',color:'#1a73e8',fontWeight:900,textAlign:'center',textDecoration:'none'}}>📍 Ver no Maps - Rua Elvira Martinati 143</a>
<div style={{textAlign:'center',color:'#666',fontSize:'10px',marginTop:'12px'}}>
@2025 {data.title} - Todos os direitos Reservados<br/>
CNPJ: {data.pix_key}<br/>
{data.wifi_ssid}
</div>
</div>

</div>
</div>
</div>
)
}
