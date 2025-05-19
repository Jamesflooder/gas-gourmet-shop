import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', parseInt(id))  // Convert string id to number
          .single();
        
        if (error) {
          console.error('Error fetching product:', error);
          return;
        }
        
        setProduct(data as Product);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Chargement du produit...</div>
        </div>
      </PageLayout>
    );
  }
  
  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <p>Le produit que vous recherchez n'existe pas.</p>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">
              {product.price.toFixed(2)} €
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <p className="text-sm mb-2">Disponibilité: 
                <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {product.stock > 0 ? " En stock" : " Rupture de stock"}
                </span>
              </p>
              {product.stock > 0 && (
                <p className="text-sm">Quantité disponible: {product.stock}</p>
              )}
              {product.category && (
                <p className="text-sm mt-2">Catégorie: {product.category}</p>
              )}
              {product.weight && (
                <p className="text-sm mt-2">Poids: {product.weight}</p>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {product.stock > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            )}
            
            {product.stock <= 0 && (
              <Button disabled className="w-full" size="lg">
                Produit indisponible
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
