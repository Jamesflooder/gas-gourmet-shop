
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Session } from '@supabase/supabase-js';

interface PageLayoutProps {
  children: React.ReactNode;
  session?: Session | null;
}

const PageLayout = ({ children, session }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
