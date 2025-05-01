
import React, { ReactNode } from 'react';

interface FeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const Feature = ({ title, description, icon }: FeatureProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="text-gas-green mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-secondary/10">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Feature;

