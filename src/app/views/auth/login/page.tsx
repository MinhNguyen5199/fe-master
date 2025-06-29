'use client'

import { Suspense } from 'react'
import LoginContent from '../../../components/LoginContent'
import Header from '@/app/components/ui/Header'
import Footer from '@/app/components/ui/Footer'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Header />
      <LoginContent />
      <Footer />
    </Suspense>
  )
}
