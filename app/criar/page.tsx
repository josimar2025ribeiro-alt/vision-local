// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMPLATES = [
  { label: "Barbearia", title: "Barbearia Style", capa: "Barbearia Premium", desc: "Corte e barba", serv: "Corte, Barba, Degrade" },
  { label: "Salao", title: "Studio Beleza", capa: "Salao Completo", desc: "Escova e coloracao", serv: "Escova, Coloracao" },
  { label: "Oficina Moto", title: "Oficina do Joao", capa: "Oficina de Motos", desc: "15 anos Holambra", serv: "Revisao, Motor, Freio" },
  { label: "Oficina Carro", title: "Auto Center", capa: "Auto Center", desc: "Mecanica completa", serv: "Mecanica, Freio, Troca oleo" },
  { label: "Lanchonete", title: "Lanches Top", capa: "Lanchonete", desc: "Melhores lanches", serv: "Lanches, Porcoes" },
  { label: "Pizzaria", title: "Pizzaria Sabor", capa: "Pizzaria", desc: "Pizza borda recheada", serv: "Pizzas, Esfihas" },
  { label: "Loja Roupas", title: "Moda Feminina", capa: "Moda Atual", desc: "Moda toda semana", serv: "Feminino, Masculino" },
  { label: "Pet Shop", title: "Pet Amigo", capa: "Pet Shop", desc: "Banho e tosa", serv: "Banho, Tosa, Racoes" },
]
const TEMAS = [
  { btn: "#00C851", grad: "linear-gradient(135deg,#080808,#1A1A1A)", card: "#1A1A1A", bg: "#080808" },
  { btn: "#FF1A1A", grad: "linear-gradient(135deg,#1A0000,#4A0000)", card: "#2A1010", bg: "#1A0000" },
  { btn: "#0066FF", grad: "linear-gradient(135deg,#000A1A,#002A5A)", card: "#0A1A2A", bg: "#000A1A" },
  { btn: "#FF6A00", grad: "linear-gradient(135deg,#1A0A00,#4A1A00)", card: "#2A1A0A", bg: "#1A0A00" },
  { btn: "#9C27B0", grad: "linear-gradient(135deg,#0F001A,#2A0A4A)", card: "#1A0A2A", bg: "#0F001A" },
]

export default function Criar() {
  const [f, setF] = useState({ title: "", slug: "", wpp: "", insta: "", serv: "", cat: "", pix: "", wifi: "", loc: "", logo: "", foto: "", capaTitulo: "", capaDesc: "" })
  const [temaIdx, setTemaIdx] = useState(0)
  const [up, setUp] = useState("")
  const tema = TEMAS[temaIdx]

  async function upload(file:any, pasta:string) {
    setUp("Enviando...")
    const nome = pasta + "/" + Date.now() + "-" + file.name
    const r = await supabase.storage.from("midias").upload(nome, file)
    setUp("")
    if (r.error) { alert(r.error.message); return null }
    return supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl
  }

  async function salvar() {
    const slugFinal = f.slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/--+/g, "-").trim()
    if (!f.title ||!slugFinal) { alert("Preenche NOME e SLUG sem espaco! Ex: barbearia-holambra"); return }
    setUp("Salvando...")
    const { error } = await supabase.from("biosites").upsert([{ title: f.title, slug: slugFinal, whatsapp: f.wpp, instagram: f.insta, servicos: f.serv, catalogo: f.cat, pix_key: f.pix, wifi_password: f.wifi, localizacao: f.loc, logo_url: f.logo, foto_url: f.foto, capa_titulo: f.capaTitulo, capa_desc: f.capaDesc }], { onConflict: 'slug' })
    setUp("")
    if (error) { alert("ERRO: " + error.message); return }
    location.href = "/" + slugFinal
  }

  const inp = { padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '10px', color: 'white', width: '100%', marginBottom: '8px' } as any
  const isVideo = f.foto && (f.foto.includes('.mp4') || f.foto.includes('video'))
  const slugPreview = f.slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/--+/g, "-")

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A', color: 'white' }}>
      <div style={{ width: '50%', padding: '14px', overflowY: 'auto', height: '100vh', borderRight: '1px solid #222' }}>
        <h2 style={{ fontWeight: 900, fontSize: '13px', marginBottom: '8px' }}>TEMPLATES - CLIQUE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
          {TEMPLATES.map((t, i) => <button key={i} onClick={() => setF({...f, title: t.title, capaTitulo: t.capa, capaDesc: t.desc, serv: t.serv })} style={{ background: '#1A1A1A', border: '1px solid #333', borderRadius: '10px', padding: '12px', color: 'white', fontWeight: 800 }}>{t.label}</button>)}
        </div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>{TEMAS.map((t, i) => <button key={i} onClick={() => setTemaIdx(i)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.btn, border: temaIdx === i? '3px solid white' : '1px solid #333' }}></button>)}</div>
        {up && <div style={{ background: tema.btn, padding: '6px', borderRadius: '6px', marginBottom: '6px' }}>{up}</div>}
        <input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e => setF({...f, title: e.target.value })} />
        <input style={inp} placeholder="Slug SEM ESPACO ex: barbearia-holambra *" value={f.slug} onChange={e => setF({...f, slug: e.target.value })} />
        <div style={{ fontSize: '10px', opacity: 0.6, marginBottom: '8px' }}>Slug final: {slugPreview}</div>
        <div style={{ background: '#1A1A1A', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px dashed #555' }}>
          <b style={{ fontSize: '10px' }}>LOGO - Galeria celular</b><br /><input type="file" accept="image/*" onChange={async e => { const file = e.target.files?.[0]; if (file) { const u = await upload(file, "logos"); if (u) setF({...f, logo: u }) } }} />
        </div>
        <div style={{ background: '#1A1A1A', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px dashed #555' }}>
          <b style={{ fontSize: '10px' }}>CAPA FOTO OU VIDEO - Max 50MB</b><br /><input type="file" accept="image/*,video/*" onChange={async e => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 50 * 1024 * 1024) { alert('Max 50MB'); return } const u = await upload(file, "capas"); if (u) setF({...f, foto: u }) }} />
          <input style={{...inp, marginTop: '8px' }} placeholder="Nome Capa" value={f.capaTitulo} onChange={e => setF({...f, capaTitulo: e.target.value })} />
          <input style={inp} placeholder="Descricao" value={f.capaDesc} onChange={e => setF({...f, capaDesc: e.target.value })} />
        </div>
        <input style={inp} placeholder="Servicos" value={f.serv} onChange={e => setF({...f, serv: e.target.value })} />
        <input style={inp} placeholder="Catalogo" value={f.cat} onChange={e => setF({...f, cat: e.target.value })} />
        <input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e => setF({...f, wpp: e.target.value })} />
        <input style={inp} placeholder="Instagram" value={f.insta} onChange={e => setF({...f, insta: e.target.value })} />
        <input style={inp} placeholder="Pix" value={f.pix} onChange={e => setF({...f, pix: e.target.value })} />
        <input style={inp} placeholder="WiFi" value={f.wifi} onChange={e => setF({...f, wifi: e.target.value })} />
        <input style={inp} placeholder="Google Maps link" value={f.loc} onChange={e => setF({...f, loc: e.target.value })} />
        <button onClick={salvar} style={{ background: tema.btn, padding: '16px', width: '100%', border: 'none', borderRadius: '12px', fontWeight: 900, color: 'white' }}>SALVAR LOJA</button>
      </div>
      <div style={{ width: '50%', background: '#050505', display: 'flex', justifyContent: 'center', padding: '20px', overflowY: 'auto', height: '100vh' }}>
        <div style={{ width: '380px' }}>
          <div style={{ background: tema.grad, borderRadius: '28px', overflow: 'hidden' }}>
            {f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{ width: '100%', height: '200px', objectFit: 'cover' }} /> : <div style={{ height: '200px', background: `url(${f.foto}) center/cover` }} />) : <div style={{ height: '110px', background: tema.grad }} />}
            <div style={{ padding: '18px', marginTop: '-45px' }}>
              {f.logo? <img src={f.logo} style={{ width: '78px', height: '78px', borderRadius: '50%', border: `4px solid ${tema.bg}`, margin: '0 auto', display: 'block' }} /> : <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: tema.card, margin: '0 auto' }} />}
              <h2 style={{ textAlign: 'center', fontWeight: 900 }}>{f.title || 'NOME DA LOJA'}</h2>
              {f.capaTitulo && <h3 style={{ textAlign: 'center', color: tema.btn }}>{f.capaTitulo}</h3>}
              {f.capaDesc && <p style={{ textAlign: 'center', opacity: 0.7, fontSize: '11px' }}>{f.capaDesc}</p>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
                {f.serv && <div style={{ background: tema.card, padding: '14px', borderRadius: '14px', textAlign: 'center' }}>{f.serv}</div>}
                {f.cat && <div style={{ background: tema.card, padding: '14px', borderRadius: '14px', textAlign: 'center', whiteSpace: 'pre-wrap' }}>{f.cat}</div>}
                <div style={{ background: tema.btn, padding: '14px', borderRadius: '14px', fontWeight: 900, textAlign: 'center' }}>WhatsApp</div>
                {f.wifi && <div style={{ border: '1px dashed orange', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>WiFi: {f.wifi}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
