
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <h1 className="text-3xl font-bold text-white">Iqra<span className="text-brand-primary">Screens</span></h1>
            <p className="text-brand-text-secondary text-base">
              Light Up Your Brand, The Halal Way. Connecting businesses and advertisers in Northern Nigeria.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => setCurrentPage('screens')} className="text-base text-brand-text-secondary hover:text-white">For Advertisers</button></li>
                  <li><button onClick={() => setCurrentPage('partner')} className="text-base text-brand-text-secondary hover:text-white">For Partners</button></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => setCurrentPage('pricing')} className="text-base text-brand-text-secondary hover:text-white">Pricing</button></li>
                  <li><button onClick={() => setCurrentPage('contact')} className="text-base text-brand-text-secondary hover:text-white">Contact</button></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                    <li><button onClick={() => setCurrentPage('how-it-works')} className="text-base text-brand-text-secondary hover:text-white">How It Works</button></li>
                    <li><button onClick={() => setCurrentPage('policy')} className="text-base text-brand-text-secondary hover:text-white">Islamic Ad Policy</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-border pt-8">
          <p className="text-base text-brand-text-secondary xl:text-center">&copy; {new Date().getFullYear()} Iqra Screens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
