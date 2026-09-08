import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona o usuário de "site.com/" para "site.com/dashboard"
  redirect('/dashboard');
}