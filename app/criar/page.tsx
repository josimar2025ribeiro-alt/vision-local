// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMPLATES = [
  { label: "Barbearia", title: "Barbearia Style", capa: "Barbearia Premium - Corte na Regua", desc: "Corte, barba e pigmentacao. 10 anos em Holambra", serv: "Corte, Barba, Sobrancelha" },
  { label: "Salao", title: "Studio Beleza", capa: "Salao - Beleza Completa", desc: "Escova, mechas e coloracao", serv: "Escova, Coloracao" },
  { label: "Oficina Moto", title: "Oficina do Joao", capa: "Oficina de Motos Especialista", desc: "15 anos consertando motos", serv: "Revisao, Motor, Freio" },
  { label: "Oficina Carro", title: "Auto Center Silva", capa: "Mecanica Completa", desc: "Mecanica, freio, suspensao", serv: "Mecanica, Freio" },
  { label: "Lanchonete", title: "Lanches Top", capa: "Lanchonete Artesanal", desc: "Melhores lanches da cidade", serv: "Lanches, Porcoes" },
  { label: "Pizzaria", title: "Pizzaria Sabor", capa: "Forno a Lenha", desc: "Pizza grande borda recheada", serv: "Pizzas Salgadas, Doces" },
  { label: "Loja Roupas", title: "Moda Feminina", capa: "Moda Atual", desc: "Novidades toda semana", serv: "Feminino, Masculino" },
  { label: "Pet Shop", title: "Pet Amigo", capa: "Banho e Tosa", desc: "Seu pet em boas maos", serv: "Banho e Tosa" },
]

const TEMAS = [
  { name: "Preto Premium", bg: "#080808", card: "#1A1A1A", btn: "#00C851", grad: "linear-gradient(135deg,#080808,#1A1A1A)" },
  { name: "Vermelho Oficina", bg: "#1A0000", card: "#2A1010", btn: "#FF1A1A", grad: "linear-gradient(135deg,#1A0000,#4A0000)" },
  { name: "Azul Eletrico", bg: "#000A1A", card: "#0A1A2A", btn: "#0066FF", grad: "linear-gradient(135deg,#000A1A,#002A5A)" },
  { name: "Laranja Moto", bg: "#1A0A00", card: "#2A1A0A", btn: "#FF6A00", grad: "linear-gradient(135deg,#1A0A00,#4A1A00)" },
  { name: "Roxo Neon", bg: "#0F001A", card: "#1A0A2A", btn: "#9C27B0", grad: "linear-gradient(135deg,#0F001A,#2A0A4A)" },
  { name: "Verde Floresta", bg: "#001A0A", card: "#0A2A1A", btn: "#00C851", grad: "linear-gradient(135deg,#001A0A,#0A3A1A)" },
]

const EFEITOS = [
  { id: "solido", label: "Solido" },
  { id: "gradiente", label: "Gradiente" },
  { id: "vidro", label: "Vidro Flutuante" },
  { id: "neon", label: "Neon Brilho" },
]

export default function Criar() {
  const [f, setF] = useState({ title: "", slug: "", wpp: "", insta: "", serv: "", cat: "", pix: "", wifi: "", loc: "", logo: "", foto: "", capaTitulo: "", capaDesc: "" })
  const [temaIdx, setTemaIdx] = useState(0)
  const [efeito, setEfeito] = useState("gradiente")
  const [up, setUp] = useState("")
  const tema = TEMAS[temaIdx]

  async function upload(file, pasta) {
    setUp("Enviando...")
    const nome = pasta + "/" + Date.now() + "-" + file.name
    const r = await supabase.storage.from("midias").upload(nome, file)
    setUp("")
    if (r.error) { alert(r.error.message); return null }
    const pub = supabase.storage.from("midias").getPublicUrl(nome)
    return pub.data.publicUrl
  }
  function useTemplate(t) { setF({...f, title: t.title, capaTitulo: t.capa, capaDesc: t.desc, serv: t.serv }) }

  async function salvar() {
    if (!f.title ||!f.slug) { alert("Nome e slug"); return }
    const { error } = await supabase.from("biosites").upsert([{
      title: f.title, slug: f.slug.toLowerCase().replace(/\s+/g, "-"),
      whatsapp: f.wpp, instagram: f.insta, servicos: f.serv, catalogo: f.cat,
      pix_key: f.pix, wifi_password: f.wifi, localizacao: f.loc,
      logo_url: f.logo, foto_url: f.foto, capa_titulo: f.capaTitulo, capa_desc: f.capaDesc
    }], { onConflict: 'slug' })
    if (error) alert(error.message); else location.href = "/" + f.slug
  }

  const inp = { padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '10px', color: 'white', width: '100%', marginBottom: '8px', fontSize: '13px' }
  const cardPreview = efeito === "vidro"? { background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' } : efeito === "neon"? { background: tema.card, border: `1px solid ${tema.btn}`, boxShadow: `0 0 20px ${tema.btn}40` } : { background: tema.card, border: `1px solid #333` }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A', color: 'white' }}>
      {/* ESQUERDA */}
      <div style={{ width: '50%', padding: '14px', overflowY: 'auto', height: '100vh', borderRight: '1px solid #222' }}>
        <h2 style={{ fontWeight: 900, fontSize: '13px', marginBottom: '8px' }}>TEMPLATES - CLIQUE PRA USAR</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
          {TEMPLATES.map((t, i) => <button key={i} onClick={() => useTemplate(t)} style={{ background: '#1A1A1A', border: '1px solid #333', borderRadius: '10px', padding: '12px', color: 'white', fontWeight: 800, fontSize: '11px' }}>{t.label}</button>)}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <b style={{ fontSize: '10px' }}>CORES DO TEMA</b>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
            {TEMAS.map((t, i) => <button key={i} onClick={() => setTemaIdx(i)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.btn, border: temaIdx === i? '3px solid white' : '1px solid #333' }} title={t.name}></button>)}
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <b style={{ fontSize: '10px' }}>EFEITO DE FUNDO</b>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
            {EFEITOS.map(e => <button key={e.id} onClick={() => setEfeito(e.id)} style={{ padding: '6px 10px', borderRadius: '8px', background: efeito === e.id? tema.btn : '#1A1A1A', border: '1px solid #333', color: 'white', fontSize: '10px', fontWeight: 700 }}>{e.label}</button>)}
          </div>
        </div>

        {up && <div style={{ background: tema.btn, padding: '6px', borderRadius: '6px', fontSize: '11px', marginBottom: '6px' }}>{up}</div>}

        <input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e => setF({...f, title: e.target.value })} />
        <input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e => setF({...f, slug: e.target.value })} />

        <div style={{ background: '#1A1A1A', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px dashed #555' }}>
          <b style={{ fontSize: '10px' }}>LOGO</b><br /><input type="file" accept="image/*" onChange={async e => { const file = e.target.files?.[0]; if (file) { const u = await upload(file, "logos"); if (u) setF({...f, logo: u }) } }} />
        </div>
        <div style={{ background: '#1A1A1A', padding: '10px', borderRadius: '10px', marginBottom: '8px', border: '1px dashed #555' }}>
          <b style={{ fontSize: '10px' }}>CAPA - FOTO OU VIDEO</b><br /><input type="file" accept="image/*,video/*" onChange={async e => { const file = e.target.files?.[0]; if (file) { const u = await upload(file, "capas"); if (u) setF({...f, foto: u }) } }} />
          <input style={{...inp, marginTop: '8px' }} placeholder="Nome da Capa" value={f.capaTitulo} onChange={e => setF({...f, capaTitulo: e.target.value })} />
          <input style={inp} placeholder="Descricao" value={f.capaDesc} onChange={e => setF({...f, capaDesc: e.target.value })} />
        </div>

        <input style={inp} placeholder="Servicos" value={f.serv} onChange={e => setF({...f, serv: e.target.value })} />
        <input style={inp} placeholder="Catalogo" value={f.cat} onChange={e => setF({...f, cat: e.target.value })} />
        <input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e => setF({...f, wpp: e.target.value })} />
        <input style={inp} placeholder="Instagram" value={f.insta} onChange={e => setF({...f, insta: e.target.value })} />
        <input style={inp} placeholder="Pix" value={f.pix} onChange={e => setF({...f, pix: e.target.value })} />
        <input style={inp} placeholder="WiFi Senha" value={f.wifi} onChange={e => setF({...f, wifi: e.target.value })} />
        <input style={inp} placeholder="Link Google Maps" value={f.loc} onChange={e => setF({...f, loc: e.target.value })} />
        <button onClick={salvar} style={{ background: tema.btn, padding: '16px', width: '100%', border: 'none', borderRadius: '12px', fontWeight: 900, color: 'white', marginTop: '8px' }}>SALVAR LOJA</button>
      </div>

      {/* DIREITA - PREVIEW PROFISSIONAL AO VIVO */}
      <div style={{ width: '50%', background: '#050505', display: 'flex', justifyContent: 'center', padding: '20px', overflowY: 'auto', height: '100vh' }}>
        <div style={{ width: '380px' }}>
          <div style={{ fontSize: '9px', textAlign: 'center', opacity: 0.4, marginBottom: '10px', letterSpacing: '1px' }}>PREVIEW AO VIVO - LADO DIREITO</div>

          <div style={{
            background: efeito === "gradiente"? tema.grad : tema.bg,
            borderRadius: '28px', overflow: 'hidden', border: `1px solid ${tema.card}`,
            boxShadow: efeito === "neon"? `0 0 40px ${tema.btn}30` : '0 20px 60px rgba(0,0,0,0.6)',
            animation: efeito === "vidro"? 'float 4s ease-in-out infinite' : 'none',
            position: 'relative'
          }}>
            {/* Fundo flutuante brilho */}
            {efeito!== "solido" && <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: tema.btn, opacity: 0.15, borderRadius: '50%', filter: 'blur(30px)' }}></div>}

            {f.foto? <div style={{ height: '200px', background: `url(${f.foto}) center/cover`, position: 'relative' }}><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div></div> : <div style={{ height: '110px', background: tema.grad }}></div>}

            <div style={{ padding: '18px', marginTop: '-45px', position: 'relative', zIndex: 2 }}>
              {f.logo? <img src={f.logo} style={{ width: '78px', height: '78px', borderRadius: '50%', border: `4px solid ${tema.bg}`, margin: '0 auto', display: 'block', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }} /> : <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: tema.card, margin: '0 auto', border: `3px solid ${tema.bg}` }}></div>}

              <h2 style={{ textAlign: 'center', fontWeight: 900, marginTop: '10px', fontSize: '20px', letterSpacing: '-0.5px' }}>{f.title || 'NOME DA LOJA'}</h2>
              {f.capaTitulo && <h3 style={{ textAlign: 'center', fontSize: '13px', color: tema.btn, marginTop: '4px', fontWeight: 700 }}>{f.capaTitulo}</h3>}
              {f.capaDesc && <p style={{ textAlign: 'center', fontSize: '11px', opacity: 0.7, marginTop: '6px', lineHeight: '14px' }}>{f.capaDesc}</p>}

              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {f.serv && <div style={{...cardPreview, padding: '14px', borderRadius: '14px', fontSize: '13px', textAlign: 'center', fontWeight: 600 }}>{f.serv}</div>}
                <div style={{ background: tema.btn, padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 900, textAlign: 'center', boxShadow: `0 4px 16px ${tema.btn}40` }}>WhatsApp</div>
                <div style={{...cardPreview, padding: '13px', borderRadius: '14px', fontSize: '12px', textAlign: 'center' }}>Instagram</div>
                {f.cat && <div style={{...cardPreview, padding: '13px', borderRadius: '14px', fontSize: '12px', textAlign: 'center' }}>Catalogo: {f.cat}</div>}
                {f.pix && <div style={{...cardPreview, padding: '13px', borderRadius: '14px', fontSize: '12px', textAlign: 'center' }}>Pix: {f.pix}</div>}
                {f.wifi && <div style={{ background: 'rgba(255,165,0,0.1)', border: '1px dashed #FFA500', padding: '12px', borderRadius: '12px', fontSize: '12px', textAlign: 'center' }}>WiFi: {f.wifi}</div>}
                {f.loc && <div style={{ background: '#0A2A5A', padding: '13px', borderRadius: '12px', fontSize: '12px', textAlign: 'center', fontWeight: 900 }}>Ver Localizacao no Maps</div>}
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '12px', fontSize: '9px', opacity: 0.3 }}>vision-local.com/{f.slug || 'sua-loja'}</div>
          </div>

          <style>{`@keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-6px) } }`}</style>
        </div>
      </div>
    </div>
  )
}
