
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import Hero from '@/components/ui/hero';
import Feature from '@/components/ui/feature';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Truck, ShieldCheck, Clock, PhoneCall, ArrowRight } from 'lucide-react';

interface IndexProps {
  session?: Session | null;
}

const Index = ({ session }: IndexProps) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true);
        
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        setFeaturedProducts(data as Product[]);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <PageLayout session={session}>
      {/* Hero Section */}
      <Hero 
        title="Votre partenaire de confiance en solutions de gaz"
        subtitle="Gas Gourmet vous offre une gamme complète de produits de gaz de haute qualité, avec livraison rapide directement à votre porte."
        buttonText="Découvrir nos produits"
        buttonLink="/products"
        imageUrl="/placeholder.svg"
      />
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gas-blue mb-4">Pourquoi choisir Gas Gourmet?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous combinons qualité, service et expertise pour vous offrir une expérience exceptionnelle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature 
              title="Livraison rapide" 
              description="Livraison en 24-48h partout en France métropolitaine"
              icon={<Truck size={24} />} 
            />
            <Feature 
              title="Produits certifiés" 
              description="Tous nos produits sont conformes aux normes européennes"
              icon={<ShieldCheck size={24} />} 
            />
            <Feature 
              title="Service 24/7" 
              description="Support client disponible à tout moment"
              icon={<Clock size={24} />}  
            />
            <Feature 
              title="Conseil personnalisé" 
              description="Nos experts vous guident dans vos choix"
              icon={<PhoneCall size={24} />}  
            />
          </div>
        </div>
      </section>
      
      {/* Popular Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gas-blue">Nos produits populaires</h2>
            <Link to="/products" className="text-gas-green flex items-center hover:underline">
              Voir tous les produits <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gas-blue border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des produits...</p>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gas-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Prêt à commander votre gaz?</h2>
              <p className="text-lg opacity-90 mb-6">
                Profitez de notre service de livraison à domicile et recevez vos bouteilles de gaz en toute sécurité.
              </p>
            </div>
            <div>
              <Button size="lg" className="bg-white text-gas-blue hover:bg-gray-100">
                <Link to="/products">Commander maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
