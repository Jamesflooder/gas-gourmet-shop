
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/ui/hero';
import Feature from '@/components/ui/feature';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Truck, CreditCard } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <Hero 
        title="Livraison de gaz à domicile"
        subtitle="Profitez d'une large gamme de produits de gaz de qualité, livrés directement chez vous. Simple, rapide et sécurisé."
        buttonText="Découvrir nos produits"
        buttonLink="/products"
      />
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Pourquoi choisir Gas Gourmet?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              title="Livraison rapide"
              description="Nous livrons vos bouteilles de gaz en 24 à 48 heures, directement à votre domicile."
              icon={<Truck size={32} />}
            />
            <Feature 
              title="Large sélection"
              description="Une gamme complète de bouteilles de gaz et d'accessoires pour tous vos besoins."
              icon={<ShoppingCart size={32} />}
            />
            <Feature 
              title="Paiement sécurisé"
              description="Toutes vos transactions sont sécurisées avec notre système de paiement en ligne."
              icon={<CreditCard size={32} />}
            />
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Produits populaires</h2>
            <Link to="/products">
              <Button variant="outline">Voir tout</Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-gas-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à commander?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits de gaz de qualité et profitez d'une livraison rapide à domicile.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-gas-green hover:bg-gray-100">
              Commander maintenant
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
