
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter products based on search term and category
  useEffect(() => {
    let result = products;
    
    // Filter by category if not 'all'
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, activeCategory]);
  
  // Update URL when category changes
  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      navigate(`/products?category=${activeCategory}`);
    } else {
      navigate('/products');
    }
  }, [activeCategory, navigate]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Nos Produits</h1>
          
          <div className="w-full md:w-auto flex">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={activeCategory} onValueChange={handleCategoryChange} className="mb-8">
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === 'all' ? 'Tous' : category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl">Aucun produit ne correspond à votre recherche.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                    className="mt-4"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ProductsPage;
