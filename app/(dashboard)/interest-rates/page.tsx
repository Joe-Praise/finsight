import type { Metadata } from 'next';
import InterestRateCalculatorWithSuspense from '@/components/interest-rate/interest-rate-calculator';

export const metadata: Metadata = {
    title: 'Interest Rate Calculator | Simple, Compound & Continuous Interest | Finsight',
    description: 'Calculate and visualize simple, compound, and continuous interest returns. Interactive tool to compare different interest types and compounding frequencies for investments and loans.',
    keywords: [
        'interest rate calculator',
        'compound interest',
        'simple interest',
        'continuous interest',
        'investment calculator',
        'financial planning',
        'interest comparison',
        'compounding frequency'
    ],
    openGraph: {
        title: 'Interest Rate Calculator - Compare Investment Returns',
        description: 'Calculate and visualize how your investments grow with different interest types and compounding frequencies.',
        type: 'website',
        url: '/interest-rates',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Interest Rate Calculator | Finsight',
        description: 'Calculate and visualize investment returns with our interactive interest rate calculator.',
    },
};

export default function InterestRatesPage() {
    return (
        <section>
            <InterestRateCalculatorWithSuspense />
        </section>
    );
}