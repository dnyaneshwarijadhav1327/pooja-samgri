import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ProductMakingVideoWidget from '@/components/ProductMakingVideoWidget';
import FloatingPromoVideo from '@/components/FloatingPromoVideo';

export const metadata: Metadata = {
  title: 'Pooja Sanskar - Pure Samagri. Sacred Traditions.',
  description: 'Authentic pooja samagri, carefully selected for your daily prayers, festivals and sacred rituals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF6EE] text-[#3A2A20] antialiased min-h-screen flex flex-col justify-between selection:bg-[#D97706] selection:text-white">
        <ShopProvider>
          <Header />
          <SearchModal />
          <CartDrawer />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <ProductMakingVideoWidget />
          <FloatingPromoVideo />
          <WhatsAppWidget />
        </ShopProvider>
      </body>
    </html>
  );
}
