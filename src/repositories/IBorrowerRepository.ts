import { CreateBorrowerDTO } from "../dto/CreateBorrowerDto";
import { IBorrower } from "../models/Borrower";

export interface IBorrowerRepository {
    create(data: CreateBorrowerDTO): Promise<IBorrower>;
    findAll(): Promise<IBorrower[]>;
    findById(id: String): Promise<IBorrower | null>;
    update(id: String, data: CreateBorrowerDTO): Promise<IBorrower | null>;
    delete(id: String): Promise<void>
  }
  