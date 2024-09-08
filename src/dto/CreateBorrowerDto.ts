export interface CreateBorrowerDTO {
    name: string;
    phone: string;
    email?: string;  // Optional email
    address: string;
    nrc_number: string;  // The NRC number is required
}
