import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Spacious 2 BHK in Koramangala',
    description: 'A beautiful 2 BHK apartment located in the heart of Koramangala 4th Block. Close to parks and restaurants. Comes with covered parking.',
    price: 35000,
    deposit: 150000,
    location: 'Koramangala',
    bhk: 2,
    type: 'Apartment',
    furnishing: 'Semi Furnished',
    imageUrls: [
        'https://picsum.photos/800/600?random=1', 
        'https://picsum.photos/800/600?random=101',
        'https://picsum.photos/800/600?random=102'
    ],
    ownerName: 'Rajesh Kumar',
    contactNumber: '9876543210',
    postedOn: '2023-10-25'
  },
  {
    id: '2',
    title: 'Luxury 3 BHK Villa in Whitefield',
    description: 'Premium gated community villa with private garden. Amenities include swimming pool, gym, and 24/7 security. Perfect for families.',
    price: 65000,
    deposit: 300000,
    location: 'Whitefield',
    bhk: 3,
    type: 'Villa',
    furnishing: 'Fully Furnished',
    imageUrls: [
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=201'
    ],
    ownerName: 'Sneha Reddy',
    contactNumber: '9988776655',
    postedOn: '2023-10-26'
  },
  {
    id: '3',
    title: 'Cozy 1 BHK in Indiranagar',
    description: 'Perfect for bachelors. Walkable distance from Metro station. Includes modular kitchen and wardrobes.',
    price: 22000,
    deposit: 100000,
    location: 'Indiranagar',
    bhk: 1,
    type: 'Apartment',
    furnishing: 'Unfurnished',
    imageUrls: [
        'https://picsum.photos/800/600?random=3'
    ],
    ownerName: 'Amit Singh',
    contactNumber: '9123456789',
    postedOn: '2023-10-27'
  }
];