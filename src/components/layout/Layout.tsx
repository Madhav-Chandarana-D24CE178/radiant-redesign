import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Scroll to top smoothly on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [children]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
