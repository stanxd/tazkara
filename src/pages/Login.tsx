
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#190038]">
      <Navbar />
      <main className="flex-1">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
