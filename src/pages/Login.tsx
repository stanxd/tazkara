
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  // Add padding to ensure content is visible below fixed navbar
  useEffect(() => {
    document.body.classList.add('has-navbar');
    
    return () => {
      document.body.classList.remove('has-navbar');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#190038]">
      <Navbar />
      <main className="flex-1 pt-24">  {/* Added padding-top */}
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
