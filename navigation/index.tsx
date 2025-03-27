export const routes = {
  entry: { path: '/' },
  signIn: { path: '/sign-in' },
  dashboard: {
    entry: {
      path: '/dashboard/interest-rates',
    },
    loan_amortization: {
      path: '/dashboard/loan-amortization-schedule',
    },
    stock_return_calculator: {
      path: '/dashboard/stock-return-calculator',
    },
    investment_portfolio_performance: {
      path: '/dashboard/investment-portfoilo-performance',
    },
    break_even_analysis: {
      path: '/dashboard/break-even-analysis',
    },
    debt_payoff_calculator: {
      path: '/dashboard/debt-payoff-calculator',
    },
  },
};

import {
  LayoutDashboard,
  Hourglass,
  Handshake,
  Settings,
  // Headset,
  Wallet,
} from 'lucide-react';
import { ReactElement } from 'react';

type Route = {
  name: string;
  label: string;
  path: string;
  icon: ReactElement;
};

const appRoutes: Route[] = [
  {
    name: 'Interest Rates',
    label: 'Interest Rates',
    path: routes.dashboard.entry.path,
    icon: <LayoutDashboard />,
  },
  {
    name: 'Loan Amortization',
    label: 'Loan Amortization',
    path: routes.dashboard.loan_amortization.path,
    icon: <Handshake />,
  },
  {
    name: 'Investment Portfolio',
    path: routes.dashboard.investment_portfolio_performance.path,
    label: 'Investment Portfolio Performance',
    icon: <Wallet />,
  },
  {
    name: 'Stock Return',
    label: 'Stock Return Calculator',
    path: routes.dashboard.stock_return_calculator.path,
    icon: <Hourglass />,
  },
  {
    name: 'Break Even',
    label: 'Break Even Analysis',
    path: routes.dashboard.break_even_analysis.path,
    icon: <Settings />,
  },
  {
    name: 'Debt Payoff Calculator',
    label: 'Debt Payoff',
    path: routes.dashboard.debt_payoff_calculator.path,
    icon: <Settings />,
  },
  { name: '', label: '', path: '', icon: <></> },

  // {
  //   name: 'Help center',
  //   path: routes.dashboard.help_center.path,
  //   icon: <Headset />,
  // },
];

export default appRoutes;
