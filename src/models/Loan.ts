import { Schema, model, Document } from 'mongoose';

export interface ILoan extends Document {
    borrower: Schema.Types.ObjectId;  // Reference to Borrower ID (MongoDB ObjectId)
    loanAmount: number;  // Amount of the loan
    loanType: 'Personal' | 'Mortgage';  // Type of loan
    startDate: Date;  // Loan start date
    endDate: Date;  // Loan end date
    interestRate: number;  // Interest rate on the loan
    paymentTerm: 'monthly' | 'quarterly' | 'yearly';
    remainingBalance: number
}

const loanSchema = new Schema<ILoan>({
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'Borrower', // Link to the Borrower model
        required: true,
    },
    loanAmount: {
        type: Number,
        required: true,
    },
    loanType: {
        type: String,
        enum: ['Personal', 'Mortgage'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    paymentTerm: {
        type: String,
        required: true
    },
    remainingBalance: {
        type: Number
    }
}, {
    timestamps: true,
});

export const Loan = model<ILoan>('Loan', loanSchema);
