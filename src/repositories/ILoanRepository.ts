import { CreateLoanDto } from "../dto/CreateLoanDto";
import { ILoan } from "../models/Loan";

export interface ILoanRepository {
  countByBorrowerId(borrowerId: string): Promise<number>;
  create(data: CreateLoanDto): Promise<ILoan>;
  findAll(): Promise<ILoan[]>;
  findById(id: String): Promise<ILoan | null>;
  update(id: String, data: Partial<CreateLoanDto>): Promise<ILoan | null>;
  delete(id: String): Promise<void>
}
