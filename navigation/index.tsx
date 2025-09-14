export const routes = {
  entry: { path: '/' },
  signIn: { path: '/sign-in' },
  dashboard: {
    entry: {
      path: '/interest-rates',
    },
    loan_amortization: {
      path: '/loan-amortization-schedule',
    },
    stock_return_calculator: {
      path: '/stock-return-calculator',
    },
    investment_portfolio_performance: {
      path: '/investment-portfoilo-performance',
    },
    break_even_analysis: {
      path: '/break-even-analysis',
    },
    debt_payoff_calculator: {
      path: '/debt-payoff-calculator',
    },
  },
};

import {
  LayoutDashboard,
  Hourglass,
  Handshake,
  // Headset,
  Wallet,
  Calculator,
  Diameter,
} from 'lucide-react';
import { ReactElement } from 'react';

type Route = {
  name: string;
  label: string;
  path: string;
  icon: ReactElement;
  isComing: boolean;
};

const appRoutes: Route[] = [
  {
    name: 'Interest Rates',
    label: 'Interest Rates',
    path: routes.dashboard.entry.path,
    icon: <LayoutDashboard />,
    isComing: false,
  },
  {
    name: 'Loan Amortization',
    label: 'Loan Amortization',
    path: routes.dashboard.loan_amortization.path,
    icon: <Handshake />,
    isComing: true,
  },
  {
    name: 'Investment Portfolio',
    path: routes.dashboard.investment_portfolio_performance.path,
    label: 'Investment Portfolio Performance',
    icon: <Wallet />,
    isComing: true,
  },
  {
    name: 'Stock Return',
    label: 'Stock Return Calculator',
    path: routes.dashboard.stock_return_calculator.path,
    icon: <Hourglass />,
    isComing: true,
  },
  {
    name: 'Break Even',
    label: 'Break Even Analysis',
    path: routes.dashboard.break_even_analysis.path,
    icon: <Diameter />,
    isComing: true,
  },
  {
    name: 'Debt Payoff Calculator',
    label: 'Debt Payoff',
    path: routes.dashboard.debt_payoff_calculator.path,
    icon: <Calculator />,
    isComing: true,
  },
  { name: '', label: '', path: '', icon: <></>, isComing: true },

  // {
  //   name: 'Help center',
  //   label: "",
  //   path: '',
  //   icon: <Headset />,
  //   isComing: true
  // },
];

export default appRoutes;
