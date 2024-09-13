import { Schema, model, Document } from 'mongoose';

export interface IRepayment extends Document {
    loan: Schema.Types.ObjectId;  // Reference to Borrower ID (MongoDB ObjectId)
    paymentDate: Date;  // Amount of the loan
    amountPaid: number;
}

const repaymentSchema = new Schema<IRepayment>({
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan', // Link to the Borrower model
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

export const Repayment = model<IRepayment>('Repayment', repaymentSchema);
