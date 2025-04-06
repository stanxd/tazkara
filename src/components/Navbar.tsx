
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/register" className="mx-2">
            <Button variant="outline" className="border-tazkara-green text-tazkara-green hover:bg-tazkara-green hover:text-white">
              تسجيل
            </Button>
          </Link>
          <Link to="/login" className="mx-2">
            <Button className="bg-tazkara-green text-white hover:bg-tazkara-green/90">
              تسجيل الدخول
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-inner animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full border-tazkara-green text-tazkara-green hover:bg-tazkara-green hover:text-white">
                تسجيل
              </Button>
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-tazkara-green text-white hover:bg-tazkara-green/90">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
