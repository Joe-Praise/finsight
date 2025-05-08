export class SavingsCalculator {
  constructor(
    private annualRate: number, // Annual interest rate in percentage (e.g., 5 for 5%)
    private compoundingPeriods: number = 12 // Default: compounded monthly
  ) {}

  /**
   * Future Value with Recurring Deposits Formula:
   * FV = P(1 + r/n)^(nt) + D * [(1 + r/n)^(nt) - 1] / (r/n)
   */
  calculateSavingsGrowth(
    initialDeposit: number, // P
    monthlyDeposit: number, // D
    years: number // t
  ): { year: number; total: number; principal: number; interest: number }[] {
    const r = this.annualRate / 100;
    const n = this.compoundingPeriods;
    const savingsData = [];

    let totalPrincipal = initialDeposit;
    let totalInterest = 0;

    for (let year = 1; year <= years; year++) {
      const FV =
        initialDeposit * Math.pow(1 + r / n, n * year) +
        (monthlyDeposit * (Math.pow(1 + r / n, n * year) - 1)) / (r / n);

      totalPrincipal = initialDeposit + monthlyDeposit * 12 * year;
      totalInterest = FV - totalPrincipal;

      savingsData.push({
        year,
        total: FV,
        principal: totalPrincipal,
        interest: totalInterest,
      });
    }

    return savingsData;
  }
}
