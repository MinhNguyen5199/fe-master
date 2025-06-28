'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase/client'

export default function ConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(window.location.search)
      const token_hash = params.get('token_hash')
      const type = params.get('type') as 'recovery' | 'signup' | 'magiclink' | null
      const next = params.get('next') ?? '/'

      if (!token_hash || !type) {
        router.replace('/auth/auth-code-error')
        return
      }

      const { error } = await supabase.auth.verifyOtp({ token_hash, type })

      if (error) {
        console.error('Verification error:', error.message)
        router.replace('/auth/auth-code-error')
      } else {
        router.replace(next)
      }
    }

    verifyToken()
  }, [router])

  return <p className="text-center mt-20">🔄 Verifying your session...</p>
}
