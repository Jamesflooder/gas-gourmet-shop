
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const categoryFilter = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('products')
          .select('*');
        
        if (categoryFilter) {
          query = query.eq('category', categoryFilter);
        }
        
        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        setProducts(data as Product[]);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryFilter, searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (categoryFilter) params.set('category', categoryFilter);
    setSearchParams(params);
  };
  
  const handleCategoryFilter = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };
  
  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'butane', name: 'Butane' },
    { id: 'propane', name: 'Propane' },
    { id: 'accessoires', name: 'Accessoires' }
  ];
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Nos Produits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-4">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={categoryFilter === category.id || (category.id === 'all' && !categoryFilter) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryFilter(category.id === 'all' ? '' : category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Rechercher</Button>
            </form>
            
            {loading ? (
              <div className="text-center py-12">Chargement des produits...</div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
