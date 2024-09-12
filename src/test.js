"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanCalculator = void 0;
var date_fns_1 = require("date-fns");
var LoanCalculator = /** @class */ (function () {
    function LoanCalculator(principal, annualRate, months, paymentTerm) {
        this.principal = principal;
        this.annualRate = annualRate;
        this.months = months; // Total duration in months
        this.paymentTerm = paymentTerm;
    }
    // Calculate the payment based on the term (monthly, quarterly, or yearly)
    LoanCalculator.prototype.calculatePayment = function () {
        var rateFactor = this.getRateFactor(); // Calculate based on payment term
        var totalPeriods = Math.ceil(this.months / (12 / rateFactor)); // Calculate total periods
        var adjustedRate = this.annualRate / rateFactor / 100;
        return (this.principal * adjustedRate) / (1 - Math.pow(1 + adjustedRate, -totalPeriods));
    };
    // Calculate the total interest over the term
    LoanCalculator.prototype.calculateTotalInterest = function () {
        var payment = this.calculatePayment();
        var totalPeriods = Math.ceil(this.months / (12 / this.getRateFactor()));
        return (payment * totalPeriods) - this.principal;
    };
    // Generate repayment schedule based on the payment term
    LoanCalculator.prototype.generateRepaymentSchedule = function (startDate) {
        var schedule = [];
        var payment = this.calculatePayment();
        var balance = this.principal;
        var rateFactor = this.getRateFactor();
        var totalPeriods = Math.ceil(this.months / (12 / rateFactor));
        var adjustedRate = this.annualRate / rateFactor / 100;
        for (var i = 0; i < totalPeriods; i++) {
            var interestPayment = balance * adjustedRate;
            var principalPayment = payment - interestPayment;
            balance -= principalPayment;
            // Adjust the payment date according to the payment term
            var paymentDate = void 0;
            switch (this.paymentTerm) {
                case 'monthly':
                    paymentDate = (0, date_fns_1.addMonths)(startDate, i);
                    break;
                case 'quarterly':
                    paymentDate = (0, date_fns_1.addMonths)(startDate, i * 3);
                    break;
                case 'yearly':
                    paymentDate = (0, date_fns_1.addMonths)(startDate, i * 12);
                    break;
                default:
                    throw new Error('Invalid payment term');
            }
            schedule.push({
                paymentNumber: i + 1,
                paymentDate: paymentDate,
                paymentAmount: payment,
                interestPayment: interestPayment,
                principalPayment: principalPayment,
                remainingBalance: balance,
            });
        }
        return schedule;
    };
    // Helper method to determine the rate factor based on the payment term
    LoanCalculator.prototype.getRateFactor = function () {
        switch (this.paymentTerm) {
            case 'monthly':
                return 12;
            case 'quarterly':
                return 4;
            case 'yearly':
                return 1;
            default:
                throw new Error('Invalid payment term');
        }
    };
    return LoanCalculator;
}());
exports.LoanCalculator = LoanCalculator;
// Usage example:
var principal = 10000; // Loan amount
var annualRate = 5; // 5% annual interest
var months = 12; // Loan duration in months
var paymentTerm = 'monthly'; // Payment term (monthly, quarterly, or yearly)
var startDate = new Date('2024-01-01'); // Start date of the loan
var loanCalculator = new LoanCalculator(principal, annualRate, months, paymentTerm);
var payment = loanCalculator.calculatePayment();
var totalInterest = loanCalculator.calculateTotalInterest();
var repaymentSchedule = loanCalculator.generateRepaymentSchedule(startDate);
console.log("Payment per period: $".concat(payment.toFixed(2)));
console.log("Total Interest Paid: $".concat(totalInterest.toFixed(2)));
console.table(repaymentSchedule);
