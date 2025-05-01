
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Produit non trouvé</h1>
          <p className="mb-8">Le produit que vous recherchez n'existe pas.</p>
          <Link to="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Retour aux produits
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge>{product.category}</Badge>
              {product.featured && <Badge variant="secondary">Populaire</Badge>}
              {product.stock <= 5 && (
                <Badge variant="destructive">
                  {product.stock === 0 ? 'Rupture de stock' : 'Stock limité'}
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">{product.price.toFixed(2)} €</p>
            
            {product.weight && (
              <p className="text-muted-foreground mb-4">Poids: {product.weight}</p>
            )}
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <p className="text-sm mb-2">Quantité:</p>
              <div className="flex max-w-[160px]">
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mx-2 text-center"
                />
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon" 
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <p className="text-sm mt-2">
                {product.stock > 0 
                  ? `${product.stock} articles disponibles` 
                  : 'Rupture de stock'}
              </p>
            </div>
            
            <Button
              className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              Ajouter au panier
            </Button>
            
            <Link to="/cart">
              <Button variant="outline" size="lg">
                Voir le panier
              </Button>
            </Link>
            
            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Truck size={24} className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Livraison rapide</h3>
                  <p className="text-sm text-muted-foreground">Livraison sous 24-48h à domicile</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield size={24} className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Sécurité garantie</h3>
                  <p className="text-sm text-muted-foreground">Produits certifiés et testés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
