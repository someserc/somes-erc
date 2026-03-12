import Footer from '@/components/Footer';
import UserNav from '@/components/NavBar/UserNav';
import React from 'react';

//This layout applies for client side only different than admin pages
const Layout = ({ Component, pageProps }) => {
  return (
    <div className="h-full">
      <UserNav />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default Layout;
