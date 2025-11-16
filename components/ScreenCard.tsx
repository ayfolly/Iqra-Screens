import React from 'react';
import { Screen } from '../types';
import { LocationIcon, UsersIcon, EyeIcon, ClockIcon, ShieldCheckIcon, BuildingOfficeIcon } from './IconComponents';
import Button from './Button';

interface ScreenCardProps {
  screen: Screen;
}

const ScreenCard: React.FC<ScreenCardProps> = ({ screen }) => {
  return (
    <div className="bg-brand-surface rounded-xl overflow-hidden shadow-lg border border-brand-border hover:border-brand-primary transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <img className="w-full h-56 object-cover" src={screen.imageUrl} alt={screen.name} />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{screen.name}</h3>
        <div className="flex items-center text-brand-text-secondary mb-4">
          <LocationIcon className="mr-2 text-brand-primary w-4 h-4" />
          <span>{screen.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4 text-brand-text flex-grow">
          <div className="flex items-center"><UsersIcon className="mr-2 text-brand-secondary w-4 h-4" /> Foot Traffic: {screen.footTraffic}</div>
          <div className="flex items-center"><EyeIcon className="mr-2 text-brand-secondary w-4 h-4" /> ~{screen.impressionsPerDay.toLocaleString()} views/day</div>
          <div className="flex items-center"><BuildingOfficeIcon className="mr-2 text-brand-secondary w-4 h-4" /> Type: {screen.businessType}</div>
          <div className="flex items-center"><ClockIcon className="mr-2 text-brand-secondary w-4 h-4" /> {screen.operatingHours}</div>
        </div>

        {screen.islamicSafe && (
          <div className="mb-4 flex items-center justify-center bg-brand-primary/10 text-brand-primary py-1 px-3 rounded-full text-xs font-semibold">
            <ShieldCheckIcon className="w-4 h-4 mr-2" /> Islamic-Friendly Environment
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-brand-border flex justify-between items-center">
          <div>
            <p className="text-2xl font-extrabold text-white">
              ₦{screen.pricePerDay.toLocaleString()}
            </p>
            <p className="text-xs text-brand-text-secondary">per day</p>
          </div>
          <Button variant="primary">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ScreenCard;