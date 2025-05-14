export interface Review {
  author: string;
  comment: string;
  rating: number; // Rating out of 5 stars, for example
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountedPrice: number;
  rating: number;
  reviews: Review[]; // Array of reviews for the product
}
