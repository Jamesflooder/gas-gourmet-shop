
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem as CartItemType } from '@/types/product';
import { Trash } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= product.stock) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const itemTotal = product.price * quantity;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-b">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-20 h-20 object-cover rounded-md mr-0 sm:mr-4"
        />
        <div className="text-center sm:text-left mt-2 sm:mt-0">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            {product.weight ? `Poids: ${product.weight}` : product.category}
          </p>
          <p className="text-sm font-medium">{product.price.toFixed(2)} € / unité</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <div className="flex items-center">
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center"
          />
        </div>
        
        <div className="w-24 text-right font-semibold">
          {itemTotal.toFixed(2)} €
        </div>
        
        <Button variant="ghost" size="icon" onClick={handleRemove} className="text-destructive">
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
