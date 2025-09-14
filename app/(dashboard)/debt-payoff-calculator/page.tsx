import type { Metadata } from 'next';
import ComingSoonPage from '@/components/shared/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Debt Payoff Calculator | Snowball & Avalanche Methods | Finsight',
    description: 'Create strategic debt payoff plans using proven snowball and avalanche methods. Compare payment strategies, calculate interest savings, and accelerate your path to debt freedom.',
    keywords: [
        'debt payoff calculator',
        'debt snowball calculator',
        'debt avalanche calculator',
        'debt elimination planner',
        'credit card payoff calculator',
        'debt consolidation calculator',
        'early payment calculator',
        'debt reduction strategy'
    ],
    openGraph: {
        title: 'Debt Payoff Calculator - Strategic Debt Elimination Planning',
        description: 'Compare debt payoff strategies and calculate how much you can save with snowball and avalanche methods.',
        type: 'website',
        url: '/debt-payoff-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Debt Payoff Calculator | Finsight',
        description: 'Strategic debt elimination planning with snowball and avalanche methods to accelerate debt freedom.',
    },
};

export default function DebtPayoffCalculatorPage() {
    return (
        <ComingSoonPage
            pageName="Debt Payoff Calculator"
            description="Create strategic debt payoff plans using snowball and avalanche methods. Compare payment strategies and see how much you can save by paying off debt early."
            width={'30%'}
        />
    );
}