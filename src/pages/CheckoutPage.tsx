
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreditCard, Landmark, Truck } from 'lucide-react';

// Form schema for validation
const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
  city: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères" }),
  postalCode: z.string().regex(/^\d{5}$/, { message: "Code postal invalide" }),
  phone: z.string().regex(/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/, { message: "Numéro de téléphone invalide" }),
  email: z.string().email({ message: "Email invalide" }),
  paymentMethod: z.enum(["card", "transfer"]),
  cardNumber: z.string().optional().refine(val => !val || val.replace(/\s/g, '').length === 16, {
    message: "Le numéro de carte doit contenir 16 chiffres"
  }),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional().refine(val => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), {
    message: "Format de date invalide (MM/YY)"
  }),
  cardCvc: z.string().optional().refine(val => !val || (val.length >= 3 && val.length <= 4), {
    message: "Le CVC doit contenir 3 ou 4 chiffres"
  })
}).refine(data => {
  if (data.paymentMethod === "card") {
    return !!data.cardNumber && !!data.cardName && !!data.cardExpiry && !!data.cardCvc;
  }
  return true;
}, {
  message: "Tous les champs de carte de crédit sont requis",
  path: ["paymentMethod"]
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  const { state, clearCart } = useCart();
  const { items, total } = state;
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate shipping, taxes, and final total
  const shipping = total > 50 ? 0 : 5.99;
  const taxes = total * 0.20; // 20% TVA
  const finalTotal = total + shipping + taxes;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      email: "",
      paymentMethod: "card",
      cardNumber: "4242 4242 4242 4242", // Fake card for demo
      cardName: "John Doe",
      cardExpiry: "12/25",
      cardCvc: "123"
    }
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: FormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Paiement accepté",
        description: "Votre commande a été traitée avec succès.",
      });
      clearCart();
      setIsProcessing(false);
      navigate("/payment-success");
    }, 2000);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Finaliser votre commande</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Jean" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Dupont" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="jean.dupont@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="06 12 34 56 78" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123 rue de Paris" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Paris" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Postal</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="75001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Méthode de paiement</h2>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" /> Carte bancaire
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                              <RadioGroupItem value="transfer" id="transfer" />
                              <Label htmlFor="transfer" className="flex items-center">
                                <Landmark className="mr-2 h-4 w-4" /> Virement bancaire
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {paymentMethod === "card" && (
                    <div className="mt-4 space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro de carte</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="4242 4242 4242 4242" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom sur la carte</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date d'expiration (MM/YY)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="12/25" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardCvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="123" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === "transfer" && (
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm">Pour effectuer un virement bancaire, veuillez utiliser les informations suivantes:</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">IBAN: FR76 3000 4000 0300 0000 0000 000</p>
                        <p className="text-sm">BIC: BNPAFRPPXXX</p>
                        <p className="text-sm">Référence: Votre email</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Traitement en cours..." : `Payer ${finalTotal.toFixed(2)} €`}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      <p className="text-sm">{(item.product.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
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
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} €</span>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Truck size={16} className="mr-2" />
                <span>Livraison sous 24-48h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CheckoutPage;
