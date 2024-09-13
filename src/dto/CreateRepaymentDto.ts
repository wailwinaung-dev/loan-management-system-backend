import { Schema } from "mongoose";

export interface CreateRepaymentDto {
    loan: Schema.Types.ObjectId;  // Reference to Borrower ID (MongoDB ObjectId)
    paymentDate: Date;  // Amount of the loan
    amountPaid: number;
    remainingBalance: number
}
