import { routes } from '@/navigation';
import { redirect } from 'next/navigation';

export default function Home() {
  // This will only run if middleware fails for some reason
  redirect(routes.dashboard.entry.path);
}
