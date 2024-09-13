import { CreateRepaymentDto } from "../dto/CreateRepaymentDto";
import { IRepayment } from "../models/Repayment";

export interface IRepaymentRepository {
  create(data: CreateRepaymentDto): Promise<IRepayment>;
  findAll(): Promise<IRepayment[]>;
  findById(id: String): Promise<IRepayment | null>;
  update(id: String, data: CreateRepaymentDto): Promise<IRepayment | null>;
  delete(id: String): Promise<void>
}
