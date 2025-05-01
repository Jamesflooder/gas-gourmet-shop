
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { state, clearCart } = useCart();
  const { items, total } = state;
  
  // Calculate shipping, taxes, and final total
  const shipping = total > 50 ? 0 : 5.99;
  const taxes = total * 0.20; // 20% TVA
  const finalTotal = total + shipping + taxes;
  
  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-4 text-muted-foreground">
              <ShoppingCart size={64} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
            <p className="mb-8">Vous n'avez pas encore ajouté d'articles à votre panier.</p>
            <Link to="/products">
              <Button>Parcourir nos produits</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Votre Panier</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="font-semibold text-lg">Articles ({items.length})</h2>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Vider le panier
                </Button>
              </div>
              
              <Separator className="mb-4" />
              
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-secondary">Gratuit</span>
                    ) : (
                      `${shipping.toFixed(2)} €`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>{taxes.toFixed(2)} €</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full flex items-center justify-center">
                    <span>Passer au paiement</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Information</h3>
              <p className="text-sm text-muted-foreground">
                Livraison gratuite pour toute commande supérieure à 50 €. Livraison sous 24-48h à domicile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CartPage;
