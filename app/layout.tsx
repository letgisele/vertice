import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Vértice — Dados que movem negócios",description:"Consultoria em dados, inteligência financeira, automação e inteligência artificial. Da complexidade à próxima decisão.",icons:{icon:`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg`}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR" suppressHydrationWarning><body>{children}</body></html>}
