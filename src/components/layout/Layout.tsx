import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../ui/CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}
