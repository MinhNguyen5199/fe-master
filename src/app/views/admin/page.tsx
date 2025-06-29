'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AdminBookManager from '../../components/AdminBookManager';

export default function AdminPage() {
  const { userProfile } = useAuth();
const router = useRouter();

// Add a derived loading state
const isLoading = userProfile === undefined || userProfile === null;

useEffect(() => {
  if (isLoading) return; // wait until auth is resolved

  if (!userProfile?.is_admin) {
    router.push(userProfile ? '/' : '/views/auth/login');
  }
}, [isLoading, userProfile, router]);

if (isLoading) {
  return <div className="p-4 text-center text-gray-700">Loading...</div>;
}

return <AdminBookManager />;

}