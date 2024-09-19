import { Product } from './types/Product'

export const sampleProducts: Product[] = [
  {
    name: 'Labtop',
    slug: 'Labtop',
    description: 'Labtop for Gaming',
    category: 'Labtop',
    brand: 'Lenovo',
    price: 1000,
    image: ['../images/p1-1.jpg', '../images/p1-2.jpeg'],
    rating: 4.5,
    countInStock: 15,
    numReviews: 7,
  },
  {
    name: 'Iphone',
    slug: 'Iphone',
    description: 'Iphone 15 pro max',
    category: 'Mobile',
    brand: 'Apple',
    price: 1000,
    image: ['../images/p2-1.webp', '../images/p2-2.jpg', '../images/p2-3.jpg'],
    rating: 5.0,
    countInStock: 100,
    numReviews: 168,
  },
  {
    name: 'NikeBoom',
    slug: 'NikeBoom',
    description: 'T-shirt high quality for training',
    category: 'T-shirt',
    brand: 'Nike',
    price: 75,
    image: ['../images/p3-1.jpg', '../images/p3-2.jpeg', '../images/p3-3.jpeg'],
    rating: 4.0,
    countInStock: 156,
    numReviews: 86,
  },
  {
    name: 'Screen',
    slug: 'Screen',
    description: 'Screen for Gaming',
    category: 'Screen',
    brand: 'LG',
    price: 400,
    image: ['../images/p4-1.jpg', '../images/p4-2.jpeg'],
    rating: 3.5,
    countInStock: 10,
    numReviews: 9,
  },
  {
    name: 'RTX 4050',
    slug: 'RTX 4050',
    description: 'RTX 4050 Grafic card for Gaming',
    category: 'Grafic card',
    brand: 'Nvidia',
    price: 1000,
    image: ['../images/p5.jpeg', '../images/p5-2.jpeg', '../images/p5-3.jpg'],
    rating: 5.0,
    countInStock: 3,
    numReviews: 18,
  },
]
