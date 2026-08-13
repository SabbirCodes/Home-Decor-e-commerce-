export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number | null;
  category: string;
  material?: string;
  color?: string;
  dimensions?: string;
  images: string[];
  stock: number;
  featured?: boolean;
  tags?: string[];
  ratingAverage: number;
  ratingCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  product: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface IShippingAddress {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  user: string | { _id: string; name: string; email: string };
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "cod";
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

export interface IReview {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "customer" | "admin";
  address?: Partial<IShippingAddress>;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  stock?: number;
}
