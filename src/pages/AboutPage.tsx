
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">À propos de Gas Gourmet</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6 text-muted-foreground">
              Gas Gourmet est votre partenaire de confiance pour la fourniture de solutions de gaz domestique et professionnel depuis plus de 15 ans.
            </p>
            
            <div className="my-8 rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="À propos de Gas Gourmet" 
                className="w-full h-auto"
              />
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Notre mission</h2>
            <p className="mb-6">
              Chez Gas Gourmet, notre mission est de fournir des produits de gaz de haute qualité avec un service client exceptionnel. Nous nous engageons à rendre l'achat et la livraison de gaz aussi simple et pratique que possible pour nos clients.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Notre histoire</h2>
            <p className="mb-6">
              Fondée en 2008, Gas Gourmet a commencé comme une petite entreprise familiale avec une vision simple : révolutionner la façon dont les clients achètent et reçoivent leurs produits de gaz. Au fil des ans, nous avons élargi notre offre et notre présence pour devenir un leader du marché, tout en conservant notre engagement envers un service personnalisé et de qualité.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Nos valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-primary">Qualité</h3>
                <p>
                  Nous ne proposons que des produits de la plus haute qualité, conformes aux normes de sécurité les plus strictes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-primary">Fiabilité</h3>
                <p>
                  Nous tenons nos promesses et livrons toujours à temps, vous permettant de ne jamais manquer de gaz.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-primary">Service client</h3>
                <p>
                  Notre équipe est disponible pour répondre à toutes vos questions et résoudre rapidement tout problème.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Notre équipe</h2>
            <p className="mb-6">
              Gas Gourmet est composé d'une équipe de professionnels passionnés et expérimentés, dédiés à fournir le meilleur service possible à nos clients. De nos livreurs à notre service client, chaque membre de notre équipe partage notre engagement envers l'excellence.
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Nous contacter</h2>
            <p className="mb-6">
              Vous avez des questions ou besoin d'assistance? Notre équipe est là pour vous aider. Contactez-nous par téléphone, e-mail ou via notre formulaire de contact.
            </p>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Coordonnées</h3>
              <address className="not-italic">
                <p>Gas Gourmet</p>
                <p>123 Avenue du Gaz</p>
                <p>75000 Paris, France</p>
                <p className="mt-4">Email: contact@gasgourmet.fr</p>
                <p>Téléphone: +33 1 23 45 67 89</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
