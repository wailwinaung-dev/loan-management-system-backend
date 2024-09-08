import { Schema, model, Document } from 'mongoose';

// Define the Borrower interface
export interface IBorrower extends Document {
    name: string;
    phone: string;
    email?: string;
    address: string;
    nrc_number: string;
}

// Create a Borrower schema
const borrowerSchema = new Schema<IBorrower>({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true},
    address: { type: String, required: true },
    nrc_number: { type: String, required: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Export the Mongoose model for Borrower
export const Borrower = model<IBorrower>('Borrower', borrowerSchema);
