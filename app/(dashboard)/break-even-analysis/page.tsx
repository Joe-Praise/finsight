import type { Metadata } from 'next';
import ComingSoonPage from '@/components/shared/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Break Even Analysis Calculator | Business Profitability Tool | Finsight',
    description: 'Calculate your break-even point to determine when revenue equals costs. Essential business planning tool for understanding profitability thresholds and investment recovery.',
    keywords: [
        'break even analysis calculator',
        'break even point calculator',
        'business profitability calculator',
        'cost revenue analysis',
        'business planning tool',
        'profitability analysis',
        'fixed costs calculator',
        'variable costs calculator'
    ],
    openGraph: {
        title: 'Break Even Analysis Calculator - Business Profitability Tool',
        description: 'Calculate when your business becomes profitable by determining the exact break-even point for revenue and costs.',
        type: 'website',
        url: '/break-even-analysis',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Break Even Analysis Calculator | Finsight',
        description: 'Essential business planning tool to calculate profitability thresholds and break-even points.',
    },
};

export default function BreakEvenAnalysisPage() {
    return (
        <ComingSoonPage
            pageName="Break Even Analysis"
            description="Determine the point where your revenue equals your costs. Essential for business planning and understanding when your investments or business ventures become profitable."
            width={'30%'}
        />
    );
}