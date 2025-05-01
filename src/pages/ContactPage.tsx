
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted');
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Nos coordonnées</CardTitle>
                  <CardDescription>
                    Plusieurs façons de nous contacter pour répondre à vos besoins
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Adresse</h3>
                    <address className="not-italic text-muted-foreground">
                      <p>Gas Gourmet</p>
                      <p>123 Avenue du Gaz</p>
                      <p>75000 Paris, France</p>
                    </address>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Service client</h3>
                    <p className="text-muted-foreground">Lundi - Vendredi, 9h - 18h</p>
                    <p className="text-muted-foreground">Téléphone: +33 1 23 45 67 89</p>
                    <p className="text-muted-foreground">Email: contact@gasgourmet.fr</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Service livraison</h3>
                    <p className="text-muted-foreground">Lundi - Samedi, 8h - 20h</p>
                    <p className="text-muted-foreground">Téléphone: +33 1 23 45 67 90</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Horaires d'ouverture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span>9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span>9h - 13h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" placeholder="Votre prénom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" placeholder="Votre nom" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" placeholder="Votre numéro de téléphone" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" placeholder="Objet de votre message" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Détaillez votre demande ici..." 
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">Envoyer le message</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-2">
            <div className="bg-muted h-[400px] w-full rounded flex items-center justify-center">
              <p className="text-muted-foreground">Carte Google Maps ici</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
