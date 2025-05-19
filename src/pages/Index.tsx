
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gas-blue">Gas Gourmet</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Votre fournisseur de confiance pour toutes vos solutions de gaz.
            </p>
          </div>
          
          <div className="bg-primary/10 p-8 rounded-lg mb-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                <h2 className="text-3xl font-bold mb-4">Livraison de gaz à domicile</h2>
                <p className="mb-4 text-lg">
                  Nous proposons une large gamme de bouteilles de gaz et d'accessoires pour tous vos besoins domestiques et professionnels.
                </p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  <li>Livraison rapide et fiable</li>
                  <li>Produits de qualité garantie</li>
                  <li>Service client exceptionnel</li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">Image de présentation</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nos produits populaires</h2>
          {loading ? (
            <div className="text-center py-12">Chargement des produits...</div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
