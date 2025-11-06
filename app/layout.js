import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const metadata = {
  title: 'Kaytee Photography - Capturing Your Special Moments',
  description: 'Professional photography services specializing in portraits, landscapes, and wedding photography.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}