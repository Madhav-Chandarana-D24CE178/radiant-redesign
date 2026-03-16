import React from 'react';
import Header from './Header';
import Footer from './Footer';
import useSmoothScroll from '@/hooks/useSmoothScroll';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary z-[100] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
