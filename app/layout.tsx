import type { Metadata } from "next";
export const metadata: Metadata = { title: "Visão Local", description: "Plataforma profissional de microsites inteligentes" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="pt-BR"><body style={{margin:0,fontFamily:'system-ui',background:'#0a0a0a',color:'#fff'}}>{children}</body></html>);
}
