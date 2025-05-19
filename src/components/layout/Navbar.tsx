
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Session } from "@supabase/supabase-js";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface NavbarProps {
  session?: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();
  const navigate = useNavigate();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gas-blue rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold">GG</span>
            </div>
            <span className="text-xl font-bold text-gas-blue">Gas Gourmet</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Accueil</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-medium">Produits</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium">À propos</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {session.user?.user_metadata?.full_name || session.user?.email}
                </span>
                <Button variant="outline" size="sm" className="flex items-center" onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center">
                  <User size={18} className="mr-2" />
                  Connexion
                </Button>
              </Link>
            )}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 flex flex-col">
            <Link to="/" className="text-gray-700 py-2" onClick={() => setIsOpen(false)}>Accueil</Link>
            <Link to="/products" className="text-gray-700 py-2" onClick={() => setIsOpen(false)}>Produits</Link>
            <Link to="/about" className="text-gray-700 py-2" onClick={() => setIsOpen(false)}>À propos</Link>
            <Link to="/contact" className="text-gray-700 py-2" onClick={() => setIsOpen(false)}>Contact</Link>
            {session ? (
              <Button variant="outline" size="sm" className="flex items-center w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                <LogOut size={18} className="mr-2" />
                Déconnexion
              </Button>
            ) : (
              <Link to="/login" className="text-gray-700 py-2" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="flex items-center w-full">
                  <User size={18} className="mr-2" />
                  Connexion
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
