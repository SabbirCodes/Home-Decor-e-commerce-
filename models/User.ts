import { Schema, models, model, type Document, type Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  provider: string;
  role: "customer" | "admin";
  address: {
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    provider: { type: String, default: "credentials" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: {
      line1: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default (models.User as Model<UserDocument>) || model<UserDocument>("User", UserSchema);
