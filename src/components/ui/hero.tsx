
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
}

const Hero = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink,
  imageUrl = "/placeholder.svg"
}: HeroProps) => {
  return (
    <div className="bg-gradient-to-r from-gas-blue to-gas-green text-white">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
            <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
            <div>
              <Link to={buttonLink}>
                <Button size="lg" className="bg-white text-gas-blue hover:bg-gray-100">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img 
              src={imageUrl} 
              alt="Hero" 
              className="rounded-lg shadow-lg w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
