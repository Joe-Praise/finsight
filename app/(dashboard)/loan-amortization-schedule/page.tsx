import type { Metadata } from 'next';
import ComingSoonPage from '@/components/shared/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Loan Amortization Schedule Calculator | Finsight',
    description: 'Calculate detailed loan payment schedules with principal and interest breakdowns. Track your mortgage, auto, or personal loan payments over time and see total interest costs.',
    keywords: [
        'loan amortization calculator',
        'mortgage calculator',
        'loan payment schedule',
        'principal and interest',
        'loan breakdown',
        'monthly payments',
        'auto loan calculator',
        'personal loan calculator'
    ],
    openGraph: {
        title: 'Loan Amortization Schedule Calculator - Track Your Loan Payments',
        description: 'Calculate detailed loan payment schedules and see how much principal and interest you pay each month.',
        type: 'website',
        url: '/loan-amortization-schedule',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Loan Amortization Calculator | Finsight',
        description: 'Calculate detailed loan payment schedules and track your principal and interest payments.',
    },
};

export default function LoanAmortizationPage() {
    return (
        <ComingSoonPage
            pageName="Loan Amortization Schedule"
            description="Calculate detailed loan payment schedules with principal and interest breakdowns. Track your loan payments over time and see how much interest you'll pay."
            width={'60%'}
        />
    );
}