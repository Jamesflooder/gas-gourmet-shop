
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="card-product h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="relative w-full h-48 overflow-hidden rounded-t-md mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-secondary">
              Populaire
            </Badge>
          )}
          {product.stock <= 5 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Stock limité
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        {product.weight && (
          <p className="text-sm mt-2">Poids: {product.weight}</p>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Link to={`/product/${product.id}`} className="w-full">
            <Button variant="outline" className="w-full">Détails</Button>
          </Link>
          <Button 
            onClick={handleAddToCart} 
            className="w-full"
            disabled={product.stock === 0}
          >
            <ShoppingCart size={18} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
