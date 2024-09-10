import { Schema, model, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

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
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(09)([0-9]{7,9})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'phone number required'],
        unique: true
    },
    email: { type: String, unique: true },
    address: { type: String, required: true },
    nrc_number: {
        type: String,
        validate: {
            validator: function (v) {
                return /^([1-9]|1[0-4])\/[a-zA-Z]+\([a-zA-Z]\)\d{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid NRC number!`
        },
        required: true,
        unique: true
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    versionKey: false
});

borrowerSchema.plugin(uniqueValidator, { message: '{PATH} need to be unique.' });

// Export the Mongoose model for Borrower
export const Borrower = model<IBorrower>('Borrower', borrowerSchema);
