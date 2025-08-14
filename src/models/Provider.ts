import mongoose, { Schema, Document } from 'mongoose';


export interface IProvider extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  bio?: string;
  portfolio?: string[];
  createdAt: Date;
}


const providerSchema = new Schema<IProvider>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String },
    portfolio: { type: [String] }
  },
  { timestamps: true }
);


export default mongoose.model<IProvider>('Provider', providerSchema);
