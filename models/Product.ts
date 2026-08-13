import { Schema, models, model, type Document, type Model } from "mongoose";

export interface ProductDocument extends Document {
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
  featured: boolean;
  tags: string[];
  ratingAverage: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: null },
    category: { type: String, required: true, index: true },
    material: { type: String, default: "" },
    color: { type: String, default: "" },
    dimensions: { type: String, default: "" },
    images: [{ type: String, required: true }],
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });

export default (models.Product as Model<ProductDocument>) || model<ProductDocument>("Product", ProductSchema);
