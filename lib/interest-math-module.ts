export enum InterestTypeEnum {
  Simple = 'simple',
  Compound = 'compound',
  Continuous = 'continuous',
  'Required Return' = 'required deposit',
}

export type CompoundingFrequency =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'annually';

export const CompoundingMap: Record<CompoundingFrequency, number> = {
  daily: 365,
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

interface InterestCalculatorConfig {
  rate: number; // Annual interest rate in %
  frequency?: CompoundingFrequency; // Only used for compound interest
  type?: InterestTypeEnum; // Default: compound
  locale?: string; // For formatting, e.g. 'en-NG'
  currency?: string; // e.g. 'NGN'
}

export class InterestCalculator {
  private annualRate: number;
  private frequency: CompoundingFrequency;
  private type: InterestTypeEnum;
  private locale?: string;
  private currency?: string;

  constructor(config: InterestCalculatorConfig) {
    this.annualRate = config.rate;
    this.frequency = config.frequency ?? 'monthly';
    this.type = config.type ?? InterestTypeEnum.Compound;
    this.locale = config.locale;
    this.currency = config.currency;
  }

  private format(value: number): string | number {
    if (!this.locale || !this.currency) return value;
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
    }).format(value);
  }

  calculateSimpleInterest(principal: number, months: number): number {
    const r = this.annualRate / 100;
    const t = months / 12;
    return principal * r * t;
  }

  calculateCompoundInterest(principal: number, months: number): number {
    const r = this.annualRate / 100;
    const n = CompoundingMap[this.frequency];
    const t = months / 12;
    const amount = principal * Math.pow(1 + r / n, n * t);
    return amount - principal;
  }

  calculateContinuousInterest(principal: number, months: number): number {
    const r = this.annualRate / 100;
    const t = months / 12;
    const amount = principal * Math.exp(r * t);
    return amount - principal;
  }

  calculate(principal: number, months: number): number {
    let result: number;

    switch (this.type) {
      case InterestTypeEnum.Simple:
        result = this.calculateSimpleInterest(principal, months);
        break;
      case InterestTypeEnum.Continuous:
        result = this.calculateContinuousInterest(principal, months);
        break;
      case InterestTypeEnum.Compound:
      default:
        result = this.calculateCompoundInterest(principal, months);
        break;
    }

    return result;
  }

  requiredDeposit(targetInterest: number, months: number): number {
    const r = this.annualRate / 100;
    const t = months / 12;
    const n = CompoundingMap[this.frequency];
    const factor = Math.pow(1 + r / n, n * t);
    return targetInterest / (factor - 1);
  }
}
