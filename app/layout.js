import { Inter, Playfair_Display, Mr_De_Haviland } from "next/font/google";
import './globals.css';
import BackToTop from './components/backToTop';
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/customCursor';
import Footer from './components/Footer';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const signature = Mr_De_Haviland({ weight: '400', subsets: ["latin"], variable: "--font-signature" });

export const metadata = {
  title: 'glitchStudioz',
  description: 'glitchStudioz by Kwaku Ntiri: photography exploring the intersection of street realism and editorial grace.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${signature.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-foreground/20 selection:text-foreground transition-colors duration-1000`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={['light', 'dark', 'midnight']}>
          <main>{children}</main>
          <Footer />
          <CustomCursor />
          <BackToTop />
          <ThemeToggle />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
