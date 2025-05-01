
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6 text-primary">
            <CheckCircle size={80} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Paiement réussi !</h1>
          <p className="mb-6 text-lg">
            Votre commande a été traitée avec succès. Vous recevrez bientôt un email de confirmation.
          </p>
          <p className="mb-8 text-muted-foreground">
            Numéro de commande: <span className="font-semibold">{`ORD-${Math.floor(100000 + Math.random() * 900000)}`}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/">
              <Button variant="outline" className="w-full">Retour à l'accueil</Button>
            </Link>
            <Link to="/products">
              <Button className="w-full">Continuer mes achats</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentSuccessPage;
