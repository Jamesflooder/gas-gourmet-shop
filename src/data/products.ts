
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Bouteille de gaz Butane 13kg",
    description: "Bouteille de gaz butane idéale pour un usage domestique. Compatible avec la plupart des appareils de cuisson et de chauffage.",
    price: 35.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "butane",
    weight: "6kg",
    stock: 15
  },
  {
    id: 4,
    name: "Bouteille de gaz Propane 35kg",
    description: "Grande bouteille de propane pour une utilisation intensive ou professionnelle. Idéale pour les chantiers ou événements.",
    price: 78.50,
    image: "/placeholder.svg",
    category: "propane",
    weight: "35kg",
    stock: 10
  },
  {
    id: 5,
    name: "Kit de raccordement universel",
    description: "Kit complet pour raccorder votre bouteille de gaz à vos appareils. Compatible avec les bouteilles butane et propane.",
    price: 15.99,
    image: "/placeholder.svg",
    category: "accessoires",
    stock: 30
  },
  {
    id: 6,
    name: "Détendeur pour gaz butane",
    description: "Détendeur de sécurité pour bouteilles de gaz butane. Assure une pression constante pour vos appareils.",
    price: 12.50,
    image: "/placeholder.svg",
    category: "accessoires",
    stock: 35
  },
  {
    id: 7,
    name: "Tuyau flexible 1.5m",
    description: "Tuyau flexible normalisé de 1.5m pour le raccordement de vos appareils à gaz.",
    price: 8.99,
    image: "/placeholder.svg",
    category: "accessoires",
    stock: 40
  },
  {
    id: 8,
    name: "Bouteille de gaz Propane 6kg",
    description: "Format compact de bouteille de gaz propane, parfait pour vos déplacements et activités en extérieur.",
    price: 25.90,
    image: "/placeholder.svg",
    category: "propane",
    weight: "6kg",
    stock: 18
  }
];
