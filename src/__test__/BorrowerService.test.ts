import { BorrowerService } from '../services/BorrowerService';
import { IBorrowerRepository } from '../repositories/IBorrowerRepository';
import { IBorrower } from '../models/Borrower';
import { ILoanRepository } from '../repositories/ILoanRepository';

// Mock the BorrowerRepository
class MockBorrowerRepository implements IBorrowerRepository {
    create = jest.fn();
    findAll = jest.fn();
    findById = jest.fn();
    update = jest.fn();
    delete = jest.fn();
}

class MockLoanRepository implements ILoanRepository {
    countByBorrowerId = jest.fn();
    create = jest.fn();
    findAll = jest.fn();
    findById = jest.fn();
    update = jest.fn();
    delete = jest.fn();
}

describe('BorrowerService', () => {

    let mockRepository: MockBorrowerRepository; 
    let mockLoanRepository: MockLoanRepository;
    let borrowerService: BorrowerService;

    beforeEach(() => {
        mockRepository = new MockBorrowerRepository();
        mockLoanRepository = new MockLoanRepository()
        borrowerService = new BorrowerService(mockRepository, mockLoanRepository);
    });

    it('should create a borrower', async () => {
        const borrowerData = {
            name: 'John Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            address: '123 Main St',
            nrc_number: 'AB123456'
        };

        (mockRepository.create as jest.Mock).mockResolvedValue(borrowerData);

        const result = await borrowerService.createBorrower(borrowerData);

        expect(result).toEqual(borrowerData);
        expect(mockRepository.create).toHaveBeenCalledWith(borrowerData);
    });

    it('should fetch all borrowers', async () => {
        const borrowersList = [
            {
                name: 'John Doe',
                phone: '1234567890',
                email: 'john.doe@example.com',
                address: '123 Main St',
                nrc_number: 'AB123456'
            },
            {
                name: 'Jane Smith',
                phone: '0987654321',
                email: 'jane.smith@example.com',
                address: '456 Elm St',
                nrc_number: 'CD789012'
            }
        ];

        (mockRepository.findAll as jest.Mock).mockResolvedValue(borrowersList);

        const result = await borrowerService.getBorrowers();

        expect(result).toEqual(borrowersList);
        expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it('should fetch a borrower by ID', async () => {
        const borrower = {
            name: 'John Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            address: '123 Main St',
            nrc_number: 'AB123456'
        };

        (mockRepository.findById as jest.Mock).mockResolvedValue(borrower);

        const result = await borrowerService.getBorrowerById('123');

        expect(result).toEqual(borrower);
        expect(mockRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should return null if borrower is not found by ID', async () => {
        (mockRepository.findById as jest.Mock).mockResolvedValue(null);

        const result = await borrowerService.getBorrowerById('123');

        expect(result).toBeNull();
        expect(mockRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should update a borrower', async () => {
        const borrowerData = {
            name: 'John Doe Updated',
            phone: '1234567890',
            email: 'john.updated@example.com',
            address: '123 Main St Updated',
            nrc_number: 'AB123456'
        };

        (mockRepository.update as jest.Mock).mockResolvedValue(borrowerData);

        const result = await borrowerService.updateBorrower('123', borrowerData);

        expect(result).toEqual(borrowerData);
        expect(mockRepository.update).toHaveBeenCalledWith('123', borrowerData);
    });

    it('should delete a borrower', async () => {
        (mockRepository.delete as jest.Mock).mockResolvedValue(undefined);

        await borrowerService.deleteBorrower('123');

        expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('should throw an error when trying to delete a borrower with existing loans', async () => {
        // Mock the loan repository to return a count of 1 (indicating loans exist)
        (mockLoanRepository.countByBorrowerId as jest.Mock).mockResolvedValue(1);
    
        await expect(borrowerService.deleteBorrower('123')).rejects.toThrow('Cannot delete borrower. The borrower is linked with existing loans.');
        expect(mockLoanRepository.countByBorrowerId).toHaveBeenCalledWith('123');
    });

    it('should throw an error if borrower deletion fails', async () => {
        (mockRepository.delete as jest.Mock).mockRejectedValue(new Error('Error deleting borrower'));
    
        await expect(borrowerService.deleteBorrower('123')).rejects.toThrow('Error deleting borrower');
    });
    
    

    it('should throw an error if borrower creation fails', async () => {
        const borrowerData = {
            name: 'John Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            address: '123 Main St',
            nrc_number: 'AB123456'
        };

        (mockRepository.create as jest.Mock).mockRejectedValue(new Error('Error creating borrower'));

        await expect(borrowerService.createBorrower(borrowerData)).rejects.toThrow('Error creating borrower');
    });

    it('should throw an error if fetching borrowers fails', async () => {
        (mockRepository.findAll as jest.Mock).mockRejectedValue(new Error('Error fetching borrowers'));

        await expect(borrowerService.getBorrowers()).rejects.toThrow('Error fetching borrowers');
    });
});
