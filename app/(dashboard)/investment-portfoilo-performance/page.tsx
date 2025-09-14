import type { Metadata } from 'next';
import ComingSoonPage from '@/components/shared/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Investment Portfolio Performance Tracker | Portfolio Analysis | Finsight',
    description: 'Monitor and analyze your entire investment portfolio with advanced performance metrics. Track asset allocation, returns, risk assessments, and diversification across all investments.',
    keywords: [
        'portfolio performance tracker',
        'investment portfolio analysis',
        'asset allocation calculator',
        'portfolio diversification',
        'investment tracking',
        'portfolio management',
        'risk assessment tool',
        'portfolio returns calculator'
    ],
    openGraph: {
        title: 'Investment Portfolio Performance Tracker - Comprehensive Analysis',
        description: 'Monitor your entire investment portfolio with advanced metrics for asset allocation, returns, and risk assessment.',
        type: 'website',
        url: '/investment-portfoilo-performance',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Performance Tracker | Finsight',
        description: 'Comprehensive investment portfolio analysis with advanced performance metrics and risk assessment.',
    },
};

export default function InvestmentPortfolioPerformancePage() {
    return (
        <ComingSoonPage
            pageName="Investment Portfolio Performance"
            description="Monitor and analyze your entire investment portfolio with advanced performance metrics. Track asset allocation, returns, and risk assessments across all your investments."
            width={'30%'}
        />
    );
}