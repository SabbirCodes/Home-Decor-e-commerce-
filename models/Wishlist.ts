import { Schema, models, model, type Document, type Types, type Model } from "mongoose";

export interface WishlistDocument extends Document {
  user: Types.ObjectId;
  products: Types.ObjectId[];
}

const WishlistSchema = new Schema<WishlistDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default (models.Wishlist as Model<WishlistDocument>) || model<WishlistDocument>("Wishlist", WishlistSchema);
