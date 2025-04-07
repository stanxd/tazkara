import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useAuth } from '@/context/AuthContext';
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-[#190038]/90 backdrop-blur-sm py-4 border-b border-purple-500/20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? <>
              <Link to="/dashboard" className="mx-2">
                <Button variant="outline" className="border-purple-500/50 text-gray-50 bg-purple-950 hover:bg-purple-800">
                  لوحة التحكم
                </Button>
              </Link>
              <Button onClick={handleSignOut} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white">
                تسجيل الخروج
              </Button>
            </> : <>
              <Link to="/register" className="mx-2">
                <Button variant="outline" className="border-purple-500/50 text-zinc-950">
                  تسجيل
                </Button>
              </Link>
              <Link to="/login" className="mx-2">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white">
                  تسجيل الدخول
                </Button>
              </Link>
            </>}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-white hover:bg-purple-900/40" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-[#190038]/90 backdrop-blur-sm py-2 px-4 border-t border-purple-500/20 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {user ? <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-purple-500/50 text-white hover:bg-purple-900/40">
                    لوحة التحكم
                  </Button>
                </Link>
                <Button onClick={handleSignOut} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white">
                  تسجيل الخروج
                </Button>
              </> : <>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-purple-500/50 text-zinc-50">
                    تسجيل
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white">
                    تسجيل الدخول
                  </Button>
                </Link>
              </>}
          </div>
        </div>}
    </nav>;
};
export default Navbar;