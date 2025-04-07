
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
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
      <main className="flex-1 pt-28">  {/* Increased padding-top to ensure visibility */}
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
