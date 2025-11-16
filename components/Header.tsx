import React from 'react';
import { Page } from '../types';
import Button from './Button';

interface HeaderProps {
  setCurrentPage: (page: Page) => void;
  user: { name: string } | null;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, user, handleLogout }) => {
  const navLinks: { name: string; page: Page }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Browse Screens', page: 'screens' },
    { name: 'How It Works', page: 'how-it-works' },
    { name: 'Become a Partner', page: 'partner' },
    { name: 'Pricing', page: 'pricing' },
  ];

  return (
    <header className="bg-brand-dark/80 backdrop-blur-lg sticky top-0 z-50 border-b border-brand-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="flex-shrink-0 flex items-center gap-2 group">
               <h1 className="text-2xl font-bold text-white group-hover:text-brand-secondary transition-colors">Iqra<span className="text-brand-primary">Screens</span></h1>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setCurrentPage(link.page)}
                  className="text-brand-text-secondary hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
             {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-brand-text">Welcome, <span className="font-bold capitalize">{user.name}</span></span>
                    {/* <Button onClick={() => {}} variant="outline">Dashboard</Button> */}
                    <Button onClick={handleLogout} variant="primary">Logout</Button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Button onClick={() => setCurrentPage('login')} variant="outline">Login</Button>
                    <Button onClick={() => setCurrentPage('signup')} variant="primary">Sign Up</Button>
                </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button className="bg-brand-surface inline-flex items-center justify-center p-2 rounded-md text-brand-text-secondary hover:text-white hover:bg-brand-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;