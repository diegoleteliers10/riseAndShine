import LoginForm from '@/components/dashboard/auth/LoginForm'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Auth Rise & Shine',
};

export default function Login() {
  return <LoginForm />
}