export class InterestCalculator {
  constructor(
    private annualRate: number, // Annual interest rate in percentage (e.g., 18 for 18%)
    private compoundingPeriods: number = 12 // Default: compounded monthly
  ) {}

  /** Simple Interest Formula: A = P(1 + rt) */
  calculateSimpleInterest(principal: number, months: number): number {
    const r = this.annualRate / 100; // Convert to decimal
    const t = months / 12; // Convert months to years
    return principal * r * t; // Interest earned
  }

  /** Compound Interest Formula: A = P(1 + r/n)^(nt) */
  calculateCompoundInterest(principal: number, months: number): number {
    const r = this.annualRate / 100;
    const t = months / 12;
    const amount =
      principal *
      Math.pow(1 + r / this.compoundingPeriods, this.compoundingPeriods * t);
    return amount - principal;
  }

  /** Continuous Interest Formula: A = Pe^(rt) */
  calculateContinuousInterest(principal: number, months: number): number {
    const r = this.annualRate / 100;
    const t = months / 12;
    const amount = principal * Math.exp(r * t);
    return amount - principal;
  }

  /** Find required deposit to earn a target interest in given time (Compound Interest) */
  requiredDeposit(targetInterest: number, months: number): number {
    const r = this.annualRate / 100;
    const t = months / 12;
    return (
      targetInterest /
      (Math.pow(1 + r / this.compoundingPeriods, this.compoundingPeriods * t) -
        1)
    );
  }
}
