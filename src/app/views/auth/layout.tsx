// src/app/views/auth/layout.tsx

// This forces all pages in this directory to be dynamically rendered
export const dynamic = 'force-dynamic';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}