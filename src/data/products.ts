
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Bouteille de gaz Butane 13kg",
    description: "Bouteille de gaz butane idéale pour un usage domestique. Compatible avec la plupart des appareils de cuisson et de chauffage.",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1618505462703-991193aee0e5?auto=format&q=80&w=500",
    category: "butane",
    weight: "13kg",
    stock: 25,
    featured: true
  },
  {
    id: 2,
    name: "Bouteille de gaz Propane 13kg",
    description: "Bouteille de gaz propane pour une utilisation en extérieur et par temps froid. Parfaite pour les barbecues et chauffages d'appoint.",
    price: 38.99,
    image: "https://images.unsplash.com/photo-1585675100414-add2e465a136?auto=format&q=80&w=500",
    category: "propane",
    weight: "13kg",
    stock: 20,
    featured: true
  },
  {
    id: 3,
    name: "Bouteille de gaz Butane 6kg",
    description: "Format compact de bouteille de gaz butane, idéal pour une utilisation nomade ou occasionnelle.",
    price: 23.50,
    image: "https://images.unsplash.com/photo-1639500316063-3ec0cfc97aaa?auto=format&q=80&w=500",
    category: "butane",
    weight: "6kg",
    stock: 15
  },
  {
    id: 4,
    name: "Bouteille de gaz Propane 35kg",
    description: "Grande bouteille de propane pour une utilisation intensive ou professionnelle. Idéale pour les chantiers ou événements.",
    price: 78.50,
    image: "https://images.unsplash.com/photo-1594761049659-28e98df28be8?auto=format&q=80&w=500",
    category: "propane",
    weight: "35kg",
    stock: 10
  },
  {
    id: 5,
    name: "Kit de raccordement universel",
    description: "Kit complet pour raccorder votre bouteille de gaz à vos appareils. Compatible avec les bouteilles butane et propane.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1590935217281-8f102120d683?auto=format&q=80&w=500",
    category: "accessoires",
    stock: 30
  },
  {
    id: 6,
    name: "Détendeur pour gaz butane",
    description: "Détendeur de sécurité pour bouteilles de gaz butane. Assure une pression constante pour vos appareils.",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&q=80&w=500",
    category: "accessoires",
    stock: 35
  },
  {
    id: 7,
    name: "Tuyau flexible 1.5m",
    description: "Tuyau flexible normalisé de 1.5m pour le raccordement de vos appareils à gaz.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&q=80&w=500",
    category: "accessoires",
    stock: 40
  },
  {
    id: 8,
    name: "Bouteille de gaz Propane 6kg",
    description: "Format compact de bouteille de gaz propane, parfait pour vos déplacements et activités en extérieur.",
    price: 25.90,
    image: "https://images.unsplash.com/photo-1620944146209-abcbdb66ec08?auto=format&q=80&w=500",
    category: "propane",
    weight: "6kg",
    stock: 18
  }
];
