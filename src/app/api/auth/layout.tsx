// src/app/api/auth/layout.tsx

// This forces all API pages in this directory to be dynamically rendered
export const dynamic = 'force-dynamic';

export default function AuthApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}