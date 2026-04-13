import { Inter, Playfair_Display } from "next/font/google";
import './globals.css';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: 'Kaytee Photography Portfolio',
  description: 'A refined portfolio showcasing portraits, landscapes, and weddings with elegant visual storytelling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-[#050505] text-[#e5e5e5] antialiased selection:bg-white/20 selection:text-white`}>
        <main>{children}</main>
      </body>
    </html>
  );
}