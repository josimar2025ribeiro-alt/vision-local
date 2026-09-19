import { supabase } from "../../lib/supabase";
import { notFound } from "next/navigation";

export default async function Page({params}:{params:{slug:string}}){
  const {data} = await supabase.from("sites").select("*").eq("slug",params.slug).single();
  if(!data) return notFound();
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-black">🍕 Pizzaria Holambra</h1>
        <a href="https://wa.me/5519988887777?text=Quero%20pizza!" className="bg-[#FF4D00] px-6 py-3 rounded-full font-bold">Peça Agora</a>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-[#1A1A1A] inline-block px-4 py-2 rounded-full text-sm mb-4">⭐ 4.9/5 - 1.200 avaliações</div>
            <h2 className="text-6xl font-black leading-none">A Melhor<br/><span className="text-[#FF4D00]">Pizza de</span><br/>Holambra</h2>
            <p className="opacity-70 mt-6 text-xl">Massa artesanal, ingredientes frescos da região. Entrega em 30min ou sua pizza é grátis!</p>
            <div className="flex gap-4 mt-8">
              <a href="https://wa.me/5519988887777?text=Quero%20pizza!" className="bg-[#FF4D00] px-8 py-4 rounded-full font-bold">Pedir no WhatsApp</a>
              <a href="#cardapio" className="border border-white/20 px-8 py-4 rounded-full font-bold">Ver Cardápio</a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#FF4D00] to-[#FF8A00] rounded- p-2">
            <div className="bg-[#111] rounded- p-8 h- flex items-center justify-center text-9xl">🍕</div>
          </div>
        </section>
        <section id="cardapio" className="mt-32">
          <h3 className="text-4xl font-black text-center mb-12">Nosso Cardápio</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {nome:"Calabresa Especial",preco:"R$ 49",desc:"Calabresa artesanal, cebola, catupiry"},
              {nome:"Portuguesa",preco:"R$ 52",desc:"Presunto, ovos, cebola, azeitona"},
              {nome:"Margherita",preco:"R$ 45",desc:"Mussarela, tomate fresco, manjericão"},
              {nome:"Frango Catupiry",preco:"R$ 54",desc:"Frango desfiado, catupiry original"},
              {nome:"4 Queijos",preco:"R$ 56",desc:"Mussarela, gorgonzola, parmesão, catupiry"},
              {nome:"Vegana Holambra",preco:"R$ 48",desc:"Legumes da colônia, molho especial"},
            ].map(p=>(
              <div key={p.nome} className="bg-[#141414] p-6 rounded-2xl border border-white/10">
                <div className="text-5xl mb-4">🍕</div>
                <h4 className="font-bold text-xl">{p.nome}</h4>
                <p className="opacity-60 text-sm mt-1">{p.desc}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#FF4D00] font-black">{p.preco}</span>
                  <a href="https://wa.me/5519988887777" className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">Pedir</a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-20 bg-[#141414] rounded- p-8 text-center">
          <p className="opacity-60">📍 R. Rota dos Imigrantes, 123 - Centro, Holambra - SP</p>
          <p className="opacity-60 mt-2">⏰ Ter-Dom: 18h às 23h | WhatsApp: (19) 98888-7777</p>
        </section>
      </main>
      <a href="https://wa.me/5519988887777" className="fixed bottom-6 right-6 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl">💬</a>
    </div>
  );
}
