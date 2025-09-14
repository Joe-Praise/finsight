import type { Metadata } from 'next';
import ComingSoonPage from '@/components/shared/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Stock Return Calculator | Investment Performance Analysis | Finsight',
    description: 'Analyze stock investment returns with comprehensive calculations. Track dividends, capital gains, and total return performance to make informed investment decisions.',
    keywords: [
        'stock return calculator',
        'investment calculator',
        'stock performance',
        'dividend calculator',
        'capital gains calculator',
        'total return analysis',
        'stock market calculator',
        'investment performance'
    ],
    openGraph: {
        title: 'Stock Return Calculator - Analyze Investment Performance',
        description: 'Calculate comprehensive stock returns including dividends and capital gains for better investment decisions.',
        type: 'website',
        url: '/stock-return-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Stock Return Calculator | Finsight',
        description: 'Analyze your stock investments with comprehensive return calculations and performance tracking.',
    },
};

export default function StockReturnCalculatorPage() {
    return (
        <ComingSoonPage
            pageName="Stock Return Calculator"
            description="Analyze your stock investments with comprehensive return calculations. Track performance, dividends, and capital gains to make informed investment decisions."
            width={'30%'}
        />
    );
}