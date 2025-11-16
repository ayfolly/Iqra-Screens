import React, { useState, useEffect } from 'react';
import { Page, Screen } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ScreenCard from './components/ScreenCard';
import { SCREENS_DATA } from './constants';
import Button from './components/Button';
import DecorativeSeparator from './components/DecorativeSeparator';
import { ShieldCheckIcon, GridIcon, MapIcon } from './components/IconComponents';


const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => (
    <div className="relative overflow-hidden">
        <div 
            className="absolute inset-0 bg-repeat opacity-5" 
            style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23238636' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center relative">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Light Up Your Brand. <br />
                <span className="text-brand-primary">The Halal Way.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-brand-text-secondary">
                Iqra Screens is the premier platform for advertising on digital screens in Kano's most trusted local businesses. Reach your audience in an Islamic-friendly environment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={() => setCurrentPage('screens')} variant="primary" className="w-full sm:w-auto text-lg">Browse Screens</Button>
                <Button onClick={() => setCurrentPage('partner')} variant="secondary" className="w-full sm:w-auto text-lg">Become a Partner</Button>
            </div>
        </div>
        <DecorativeSeparator />
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Featured Screens in Kano</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SCREENS_DATA.slice(0, 3).map(screen => (
                    <ScreenCard key={screen.id} screen={screen} />
                ))}
            </div>
        </div>
    </div>
);

const MapView = ({ screens }: { screens: Screen[] }) => {
    const bounds = { latMin: 11.96, latMax: 12.02, lngMin: 8.45, lngMax: 8.56 };
    const project = (lat: number, lng: number) => {
        const y = 100 - ((lat - bounds.latMin) / (bounds.latMax - bounds.latMin)) * 100;
        const x = ((lng - bounds.lngMin) / (bounds.lngMax - bounds.lngMin)) * 100;
        return { x, y };
    };

    return (
        <div className="relative w-full h-[600px] bg-brand-surface border border-brand-border rounded-lg overflow-hidden">
             <div 
                className="absolute inset-0 opacity-20" 
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cpath d='M0 300 Q 200 250 400 300 T 800 300' stroke='%2330363D' fill='none' stroke-width='2'/%3E%3Cpath d='M0 350 Q 150 400 300 350 T 600 350 T 800 320' stroke='%2330363D' fill='none' stroke-width='1'/%3E%3Cpath d='M300 0 Q 350 150 300 300 T 350 600' stroke='%2330363D' fill='none' stroke-width='1'/%3E%3Cpath d='M500 0 Q 450 200 500 400 T 450 600' stroke='%2330363D' fill='none' stroke-width='2'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }}
            ></div>
            {screens.map(screen => {
                const { x, y } = project(screen.lat, screen.lng);
                return (
                    <div
                        key={screen.id}
                        className="absolute group"
                        style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="w-4 h-4 bg-brand-secondary rounded-full cursor-pointer ring-4 ring-brand-secondary/30 transition-all group-hover:scale-125"></div>
                        <div className="absolute bottom-full mb-2 w-64 bg-brand-dark border border-brand-border p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2 left-1/2">
                            <p className="font-bold text-white text-sm">{screen.name}</p>
                            <p className="text-xs text-brand-text-secondary">{screen.location}</p>
                            <p className="text-sm font-bold text-brand-primary mt-1">₦{screen.pricePerDay.toLocaleString()}/day</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


const ScreensPage = () => {
    const [screens, setScreens] = useState<Screen[]>(SCREENS_DATA);
    const [locationFilter, setLocationFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(50000);
    const [trafficFilter, setTrafficFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [view, setView] = useState<'grid' | 'map'>('grid');

    useEffect(() => {
        let filtered = SCREENS_DATA;
        if (locationFilter) {
            filtered = filtered.filter(s => s.location.toLowerCase().includes(locationFilter.toLowerCase()));
        }
        filtered = filtered.filter(s => s.pricePerDay <= priceFilter);
        if (trafficFilter !== 'All') {
            filtered = filtered.filter(s => s.footTraffic === trafficFilter);
        }
        if (typeFilter !== 'All') {
            filtered = filtered.filter(s => s.businessType === typeFilter);
        }
        setScreens(filtered);
    }, [locationFilter, priceFilter, trafficFilter, typeFilter]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-center text-white mb-4">Find the Perfect Screen for Your Brand</h1>
            <p className="text-center text-brand-text-secondary max-w-3xl mx-auto mb-10">
                Explore our network of digital screens across Kano. Use the filters to find the ideal location to connect with your target audience.
            </p>
            <div className="bg-brand-surface p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center border border-brand-border">
                <div className="flex-grow">
                    <label htmlFor="location" className="block text-sm font-medium text-brand-text-secondary mb-1">Location</label>
                    <input type="text" id="location" placeholder="e.g., Zoo Road" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-2 text-white focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div className="w-full md:w-1/4">
                     <label htmlFor="price" className="block text-sm font-medium text-brand-text-secondary mb-1">Max Price: ₦{priceFilter.toLocaleString()}</label>
                     <input id="price" type="range" min="5000" max="50000" step="1000" value={priceFilter} onChange={(e) => setPriceFilter(Number(e.target.value))} className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                </div>
                 <div className="w-full md:w-auto">
                    <label htmlFor="traffic" className="block text-sm font-medium text-brand-text-secondary mb-1">Foot Traffic</label>
                    <select id="traffic" value={trafficFilter} onChange={e => setTrafficFilter(e.target.value)} className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-2 text-white focus:ring-brand-primary focus:border-brand-primary">
                        <option>All</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                 <div className="w-full md:w-auto">
                    <label htmlFor="type" className="block text-sm font-medium text-brand-text-secondary mb-1">Business Type</label>
                    <select id="type" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-2 text-white focus:ring-brand-primary focus:border-brand-primary">
                        <option>All</option>
                        <option>Mall</option>
                        <option>Market</option>
                        <option>University</option>
                        <option>Complex</option>
                    </select>
                </div>
                <div className="self-end">
                     <div className="flex items-center bg-brand-dark border border-brand-border rounded-md p-1">
                        <button onClick={() => setView('grid')} className={`p-2 rounded ${view === 'grid' ? 'bg-brand-primary text-white' : 'text-brand-text-secondary'}`}><GridIcon/></button>
                        <button onClick={() => setView('map')} className={`p-2 rounded ${view === 'map' ? 'bg-brand-primary text-white' : 'text-brand-text-secondary'}`}><MapIcon/></button>
                    </div>
                </div>
            </div>
            {view === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {screens.map(screen => (
                        <ScreenCard key={screen.id} screen={screen} />
                    ))}
                </div>
            ) : (
                <MapView screens={screens} />
            )}
        </div>
    );
};

const HowItWorksPage = () => (
    <div className="py-16 bg-brand-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-white mb-12">Simple, Transparent Process</h1>
            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="p-8 border border-brand-border rounded-lg">
                    <h2 className="text-2xl font-bold text-brand-secondary mb-4">For Advertisers</h2>
                    <ol className="list-decimal list-inside space-y-4 text-brand-text">
                        <li><strong>Discover Screens:</strong> Browse our curated directory of screens in high-traffic, Islamic-friendly locations across Kano.</li>
                        <li><strong>Upload Your Ad:</strong> Submit your image or video ad. Our team ensures it complies with our Halal advertising policy.</li>
                        <li><strong>Schedule & Pay:</strong> Choose your desired dates and complete the booking with secure online payment (Naira).</li>
                        <li><strong>Go Live:</strong> Your ad is displayed on the selected screens, reaching thousands of potential customers daily.</li>
                    </ol>
                </div>
                 <div className="p-8 border border-brand-border rounded-lg">
                    <h2 className="text-2xl font-bold text-brand-primary mb-4">For Screen Partners</h2>
                     <ol className="list-decimal list-inside space-y-4 text-brand-text">
                        <li><strong>List Your Screen:</strong> Sign up and provide details about your business location and digital screen. It's free!</li>
                        <li><strong>Set Your Price:</strong> You decide the daily rate for advertisers to use your screen.</li>
                        <li><strong>Approve Ads:</strong> Review booking requests and approve ads that align with your business values. You have full control.</li>
                        <li><strong>Earn Passive Income:</strong> Get paid automatically for every ad displayed on your screen. A new revenue stream for your business.</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
);

const SignUpPage = ({ onSignup }: { onSignup: (userType: 'advertiser' | 'partner', email: string) => void }) => {
    const handleSignup = (e: React.FormEvent, userType: 'advertiser' | 'partner') => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        onSignup(userType, email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden border border-brand-border">
                <div className="p-8 md:p-12 bg-brand-surface">
                    <h2 className="text-3xl font-bold text-brand-primary mb-2">Join as an Advertiser</h2>
                    <p className="text-brand-text-secondary mb-6">Reach a dedicated audience in Kano.</p>
                    <form className="space-y-4" onSubmit={(e) => handleSignup(e, 'advertiser')}>
                         <input name="businessName" className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="Business Name" type="text" required />
                         <input name="email" className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="Email Address" type="email" required />
                         <input name="password" className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="Password" type="password" required />
                        <Button type="submit" className="w-full !py-3 !text-base" variant="primary">Create Advertiser Account</Button>
                    </form>
                </div>
                 <div className="p-8 md:p-12 bg-brand-dark">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-2">Join as a Partner</h2>
                    <p className="text-brand-text-secondary mb-6">Monetize your screen and earn.</p>
                     <form className="space-y-4" onSubmit={(e) => handleSignup(e, 'partner')}>
                         <input name="businessName" className="w-full bg-brand-surface border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-secondary focus:border-brand-secondary" placeholder="Business Name" type="text" required />
                         <input name="email" className="w-full bg-brand-surface border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-secondary focus:border-brand-secondary" placeholder="Contact Email" type="email" required />
                         <input name="location" className="w-full bg-brand-surface border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-secondary focus:border-brand-secondary" placeholder="Location in Kano" type="text" required />
                         <input name="password" className="w-full bg-brand-surface border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-secondary focus:border-brand-secondary" placeholder="Password" type="password" required />
                        <Button type="submit" className="w-full !py-3 !text-base" variant="secondary">Create Partner Account</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LoginPage = ({ onLogin }: { onLogin: (userType: 'advertiser' | 'partner', email: string) => void }) => {
    const handleLogin = (e: React.FormEvent, userType: 'advertiser' | 'partner') => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        onLogin(userType, email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden border border-brand-border">
                <div className="p-8 md:p-12 bg-brand-surface">
                    <h2 className="text-3xl font-bold text-brand-primary mb-2">Advertiser Login</h2>
                    <p className="text-brand-text-secondary mb-6">Welcome back!</p>
                    <form className="space-y-4" onSubmit={(e) => handleLogin(e, 'advertiser')}>
                         <input name="email" className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="Email Address" type="email" required />
                         <input name="password" className="w-full bg-brand-dark border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-primary focus:border-brand-primary" placeholder="Password" type="password" required />
                        <Button type="submit" className="w-full !py-3 !text-base" variant="primary">Login</Button>
                    </form>
                </div>
                 <div className="p-8 md:p-12 bg-brand-dark">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-2">Partner Login</h2>
                    <p className="text-brand-text-secondary mb-6">Manage your screens.</p>
                     <form className="space-y-4" onSubmit={(e) => handleLogin(e, 'partner')}>
                         <input name="email" className="w-full bg-brand-surface border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-secondary focus:border-brand-secondary" placeholder="Contact Email" type="email" required />
                         <input name="password" className="w-full bg-brand-surface border border-brand-border rounded-md px-3 py-3 text-white focus:ring-brand-secondary focus:border-brand-secondary" placeholder="Password" type="password" required />
                        <Button type="submit" className="w-full !py-3 !text-base" variant="secondary">Login</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const PolicyPage = () => (
     <div className="bg-brand-surface py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <ShieldCheckIcon className="mx-auto h-16 w-16 text-brand-primary"/>
                    <h1 className="text-4xl font-bold text-white mt-4">Islamic Advertising Policy</h1>
                    <p className="text-brand-text-secondary mt-2">Our commitment to Halal and ethical advertising.</p>
                </div>
                 <div className="space-y-6 text-brand-text p-8 border border-brand-border rounded-lg">
                    <p>Iqra Screens is dedicated to providing an advertising environment that is respectful of Islamic values and the cultural context of Northern Nigeria. All advertisements submitted to our platform are subject to review to ensure compliance with the following guidelines.</p>
                    <h3 className="text-xl font-semibold text-white">Prohibited Content</h3>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Alcohol, Tobacco, and Gambling:</strong> Any promotion of alcohol, tobacco products, gambling, or related establishments is strictly forbidden.</li>
                        <li><strong>Haram Products/Services:</strong> Advertisements for non-Halal food products, interest-based (Riba) financial services, and other items considered Haram are not permitted.</li>
                        <li><strong>Indecency and Nudity:</strong> Content must be modest. Any form of nudity, suggestive imagery, or indecent content is prohibited.</li>
                        <li><strong>Inappropriate Music/Media:</strong> Music with vulgar lyrics or themes that contradict Islamic values is not allowed. This is especially strict for screens located in or near places of worship.</li>
                        <li><strong>False Advertising:</strong> All claims made in advertisements must be truthful and verifiable. Misleading information is not tolerated.</li>
                    </ul>
                    <h3 className="text-xl font-semibold text-white">Review Process</h3>
                    <p>All ads undergo a two-step approval process: an initial automated screening followed by a manual review by our compliance team. We reserve the right to reject or request modification of any ad that does not meet our standards. Partners (screen owners) also have the final right to refuse an ad on their specific screen.</p>
                 </div>
             </div>
        </div>
     </div>
);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<{ type: 'advertiser' | 'partner', name: string } | null>(null);

  const handleLogin = (userType: 'advertiser' | 'partner', email: string) => {
    // In a real app, this would involve an API call and token management
    setUser({ type: userType, name: email.split('@')[0] });
    setCurrentPage('home');
  };

  const handleSignup = (userType: 'advertiser' | 'partner', email: string) => {
    // In a real app, this would involve an API call and token management
    setUser({ type: userType, name: email.split('@')[0] });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'screens':
        return <ScreensPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'policy':
        return <PolicyPage />;
      case 'signup':
        return <SignUpPage onSignup={handleSignup} />;
       case 'login':
        return <LoginPage onLogin={handleLogin} />;
      // Add other cases for other pages
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentPage={setCurrentPage} user={user} handleLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;