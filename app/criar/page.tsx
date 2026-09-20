// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMAS = [
  { name: "Preto Vivo", btn: "#00FF88", bg: "#050505", card: "rgba(20,20,20,0.8)", blob1: "#00FF88", blob2: "#0066FF", text: "#FFFFFF" },
  { name: "Neon Rosa", btn: "#FF006B", bg: "#0A0014", card: "rgba(40,10,30,0.8)", blob1: "#FF006B", blob2: "#8A2BE2", text: "#FFFFFF" },
  { name: "Ocean", btn: "#00D4FF", bg: "#00111A", card: "rgba(10,30,50,0.8)", blob1: "#00D4FF", blob2: "#0066FF", text: "#FFFFFF" },
  { name: "Sunset", btn: "#FF6B00", bg: "#1A0A00", card: "rgba(50,20,10,0.8)", blob1: "#FF6B00", blob2: "#FF006B", text: "#FFFFFF" },
  { name: "Branco Luxo", btn: "#000000", bg: "#F5F5F5", card: "rgba(255,255,255,0.9)", blob1: "#E0E0E0", blob2: "#FFFFFF", text: "#000000" },
  { name: "White Neon", btn: "#00FF88", bg: "#FFFFFF", card: "rgba(255,255,255,0.9)", blob1: "#00FF88", blob2: "#00D4FF", text: "#000000" },
  { name: "Lime", btn: "#CCFF00", bg: "#0A1400", card: "rgba(20,40,10,0.8)", blob1: "#CCFF00", blob2: "#00FF88", text: "#FFFFFF" },
  { name: "Roxo Futuro", btn: "#8A2BE2", bg: "#0A001A", card: "rgba(30,10,50,0.8)", blob1: "#8A2BE2", blob2: "#FF006B", text: "#FFFFFF" },
  { name: "Red Fire", btn: "#FF1A1A", bg: "#1A0000", card: "rgba(50,10,10,0.8)", blob1: "#FF1A1A", blob2: "#FF6B00", text: "#FFFFFF" },
  { name: "Gold", btn: "#FFD700", bg: "#1A1400", card: "rgba(40,35,10,0.8)", blob1: "#FFD700", blob2: "#FF6B00", text: "#FFFFFF" },
  { name: "Ice", btn: "#000000", bg: "#E8F4FF", card: "rgba(255,255,255,0.9)", blob1: "#00D4FF", blob2: "#FFFFFF", text: "#000000" },
  { name: "Preto Total", btn: "#FFFFFF", bg: "#000000", card: "rgba(15,15,15,0.9)", blob1: "#333", blob2: "#111", text: "#FFFFFF" },
]

export default function Criar() {
  const [f, setF] = useState({ title: "", slug: "", wpp: "", insta: "", serv: "", cat: "", pix: "", wifi: "", loc: "", logo: "", foto: "", capaTitulo: "", capaDesc: "", corTitulo: "#FFFFFF", corDesc: "#AAAAAA" })
  const [temaIdx, setTemaIdx] = useState(0)
  const [up, setUp] = useState("")
  const t = TEMAS[temaIdx]
  async function upload(file:any, pasta:string){ setUp("Enviando..."); const nome=pasta+"/"+Date.now()+"-"+file.name; const r=await supabase.storage.from("midias").upload(nome,file); setUp(""); if(r.error){alert(r.error.message);return null} return supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl }
  async function salvar(){ const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-").trim(); if(!f.title||!slugFinal){alert("Nome e slug!");return} setUp("Salvando..."); const {error}=await supabase.from("biosites").upsert([{title:f.title,slug:slugFinal,whatsapp:f.wpp,instagram:f.insta,servicos:f.serv,catalogo:f.cat,pix_key:f.pix,wifi_password:f.wifi,localizacao:f.loc,logo_url:f.logo,foto_url:f.foto,capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,cor_titulo:f.corTitulo,cor_desc:f.corDesc,tema_idx:temaIdx}],{onConflict:'slug'}); setUp(""); if(error){alert(error.message);return} location.href="/"+slugFinal }
  const inp={padding:'14px',background:'#111',border:'1px solid #333',borderRadius:'12px',color:'white',width:'100%',marginBottom:'8px',fontSize:'14px'} as any
  const isVideo=f.foto&&(f.foto.includes('.mp4')||f.foto.includes('video'))
  return(
    <div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
      <style>{`@keyframes float1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-30px) scale(1.1)}}@keyframes float2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,20px) scale(1.2)}}`}</style>
      <div style={{width:'50%',padding:'16px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
        <h2 style={{fontSize:'11px',letterSpacing:'2px',opacity:0.6}}>12 TEMAS FLUTUANTES</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px',margin:'10px 0'}}>
          {TEMAS.map((tm,i)=><button key={i} onClick={()=>setTemaIdx(i)} title={tm.name} style={{height:'44px',borderRadius:'12px',background:tm.bg,border:temaIdx===i?'3px solid white':'2px solid #333',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',inset:'2px',background:`linear-gradient(135deg,${tm.blob1},${tm.blob2})`,borderRadius:'8px',opacity:0.8}}/><div style={{position:'absolute',bottom:'2px',left:'0',right:'0',fontSize:'6px',color:'white',fontWeight:900,textAlign:'center',textShadow:'0 1px 2px black'}}>{tm.name}</div></button>)}
        </div>
        <div style={{display:'flex',gap:'8px',marginBottom:'10px'}}>
          <div style={{flex:1}}><label style={{fontSize:'9px'}}>COR TITULO</label><input type="color" value={f.corTitulo} onChange={e=>setF({...f,corTitulo:e.target.value})} style={{width:'100%',height:'36px',borderRadius:'8px'}}/></div>
          <div style={{flex:1}}><label style={{fontSize:'9px'}}>COR DESC</label><input type="color" value={f.corDesc} onChange={e=>setF({...f,corDesc:e.target.value})} style={{width:'100%',height:'36px',borderRadius:'8px'}}/></div>
        </div>
        {up&&<div style={{background:t.btn,color:t.bg===' #FFFFFF'?'black':'white',padding:'8px',borderRadius:'8px',marginBottom:'8px',fontWeight:900}}>{up}</div>}
        <input style={inp} placeholder="Nome *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
        <input style={inp} placeholder="Slug ex: loja-holambra *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
        <div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',marginBottom:'8px',border:'1px dashed #555'}}><b style={{fontSize:'10px'}}>LOGO</b><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/></div>
        <div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',marginBottom:'8px',border:'1px dashed #555'}}><b style={{fontSize:'10px'}}>CAPA VIDEO/FOTO</b><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u})}}}/><input style={{...inp,marginTop:'8px'}} placeholder="Titulo capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/><input style={inp} placeholder="Descricao" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/></div>
        <input style={inp} placeholder="Servicos" value={f.serv} onChange={e=>setF({...f,serv:e.target.value})}/>
        <input style={inp} placeholder="Catalogo" value={f.cat} onChange={e=>setF({...f,cat:e.target.value})}/>
        <input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
        <input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
        <input style={inp} placeholder="Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
        <input style={inp} placeholder="WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
        <input style={inp} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
        <button onClick={salvar} style={{background:t.btn,color:t.bg.includes('FF')&&t.bg.includes('F5')||t.bg==='#FFFFFF'?'black':'white',padding:'18px',width:'100%',border:'none',borderRadius:'16px',fontWeight:900,fontSize:'16px'}}>SALVAR LOJA</button>
      </div>
      <div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'20px',overflowY:'auto',height:'100vh',position:'relative'}}>
        <div style={{position:'absolute',width:'300px',height:'300px',background:t.blob1,borderRadius:'50%',filter:'blur(80px)',opacity:0.4,top:'10%',left:'10%',animation:'float1 6s ease-in-out infinite'}}/>
        <div style={{position:'absolute',width:'400px',height:'400px',background:t.blob2,borderRadius:'50%',filter:'blur(100px)',opacity:0.3,bottom:'10%',right:'5%',animation:'float2 8s ease-in-out infinite'}}/>
        <div style={{width:'390px',position:'relative',zIndex:2}}>
          <div style={{background:t.card,backdropFilter:'blur(20px)',borderRadius:'32px',overflow:'hidden',border:`1px solid ${t.btn}40`,boxShadow:`0 20px 60px ${t.blob1}30`}}>
            {f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'260px',objectFit:'cover'}}/> : <div style={{height:'260px',background:`url(${f.foto}) center/cover`}}/>):<div style={{height:'120px',background:`linear-gradient(135deg,${t.blob1},${t.blob2})`}}/>}
            <div style={{padding:'20px',marginTop:'-50px',textAlign:'center'}}>
              {f.logo? <img src={f.logo} style={{width:'90px',height:'90px',borderRadius:'50%',border:`4px solid ${t.bg}`,margin:'0 auto',display:'block',background:'white'}}/> : <div style={{width:'90px',height:'90px',borderRadius:'50%',background:t.btn,margin:'0 auto'}}/>}
              <h1 style={{color:f.corTitulo,fontWeight:900,fontSize:'26px',margin:'12px 0 4px',letterSpacing:'-1px'}}>{f.title||'NOME DA LOJA'}</h1>
              {f.capaTitulo&&<h3 style={{color:t.btn,fontSize:'15px',margin:'4px 0'}}>{f.capaTitulo}</h3>}
              {f.capaDesc&&<p style={{color:f.corDesc,fontSize:'13px',margin:'4px 0'}}>{f.capaDesc}</p>}
              <div style={{display:'flex',flexDirection:'column',gap:'14px',marginTop:'20px'}}>
                {f.serv&&<div style={{background:t.card,backdropFilter:'blur(10px)',padding:'16px',borderRadius:'18px',color:t.text,fontWeight:700,fontSize:'15px',border:`1px solid ${t.btn}20`}}>{f.serv}</div>}
                {f.cat&&<div style={{background:t.card,padding:'16px',borderRadius:'18px',color:t.text,whiteSpace:'pre-wrap',fontSize:'14px'}}>{f.cat}</div>}
                {f.wpp&&<div style={{background:'#25D366',padding:'20px',borderRadius:'20px',fontWeight:900,fontSize:'18px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',color:'white',boxShadow:'0 8px 24px #25D36660'}}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width:'28px'}}/> WhatsApp</div>}
                {f.insta&&<div style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'20px',borderRadius:'20px',fontWeight:900,fontSize:'18px',color:'white',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px'}}>📸 {f.insta}</div>}
                {f.pix&&<div style={{background:t.card,padding:'18px',borderRadius:'20px',color:t.text,border:'2px dashed #32BCAD',fontWeight:800,fontSize:'15px'}}>💰 Pix: {f.pix}</div>}
                {f.wifi&&<div style={{border:'2px dashed #FF9500',padding:'18px',borderRadius:'20px',color:t.text,fontWeight:800,fontSize:'15px'}}>📶 WiFi: {f.wifi}</div>}
                {f.loc&&<div style={{background:'white',padding:'20px',borderRadius:'20px',fontWeight:900,fontSize:'18px',color:'#1a73e8',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',boxShadow:'0 8px 24px rgba(0,0,0,0.2)'}}><img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg" style={{width:'24px'}}/> Ver no Maps</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
