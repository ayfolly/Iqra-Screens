export interface Screen {
  id: number;
  name: string;
  location: string;
  pricePerDay: number;
  footTraffic: 'Low' | 'Medium' | 'High';
  impressionsPerDay: number;
  operatingHours: string;
  islamicSafe: boolean;
  imageUrl: string;
  lat: number;
  lng: number;
  businessType: 'Mall' | 'Market' | 'University' | 'Complex';
}

export type Page = 'home' | 'how-it-works' | 'screens' | 'pricing' | 'partner' | 'policy' | 'contact' | 'login' | 'signup';