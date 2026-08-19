import { Schema, models, model, type Document, type Model } from "mongoose";

export interface SiteSettingsDocument extends Document {
  siteName: string;
  email: string;
  phone: string;
  location: string;
  locationMapUrl: string;
  hours: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<SiteSettingsDocument>(
  {
    siteName: { type: String, default: "Ferrous & Field" },
    email: { type: String, default: "hello@ferrousfield.com" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    locationMapUrl: { type: String, default: "" },
    hours: { type: String, default: "" },
  },
  { timestamps: true }
);

export default (models.SiteSettings as Model<SiteSettingsDocument>) ||
  model<SiteSettingsDocument>("SiteSettings", SiteSettingsSchema);