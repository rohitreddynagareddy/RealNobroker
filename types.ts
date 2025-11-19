export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  deposit: number;
  location: string; // Specific area in Bangalore
  bhk: number;
  type: 'Apartment' | 'Independent House' | 'Villa';
  furnishing: 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';
  imageUrls: string[];
  ownerName: string;
  contactNumber: string;
  postedOn: string;
}

export type ViewState = 'home' | 'upload' | 'listing';

export const BANGALORE_AREAS = [
  'Koramangala',
  'Indiranagar',
  'Whitefield',
  'HSR Layout',
  'Jayanagar',
  'Malleswaram',
  'Marathahalli',
  'Electronic City',
  'Hebbal',
  'Banashankari'
];