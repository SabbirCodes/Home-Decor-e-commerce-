import { Schema, models, model, type Document, type Model } from "mongoose";

export interface ContactMessageDocument extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<ContactMessageDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default (models.ContactMessage as Model<ContactMessageDocument>) ||
  model<ContactMessageDocument>("ContactMessage", ContactMessageSchema);