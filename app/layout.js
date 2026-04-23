import { Inter, Playfair_Display, Mr_De_Haviland } from "next/font/google";
import './globals.css';
import BackToTop from './components/backToTop';
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const signature = Mr_De_Haviland({ weight: '400', subsets: ["latin"], variable: "--font-signature" });

export const metadata = {
  title: 'Kaytee Photography Portfolio',
  description: 'A refined portfolio showcasing portraits, landscapes, and weddings with elegant visual storytelling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${signature.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-foreground/20 selection:text-foreground transition-colors duration-1000`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={['light', 'dark', 'midnight']}>
          <main>{children}</main>
          <BackToTop />
          <ThemeToggle />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}