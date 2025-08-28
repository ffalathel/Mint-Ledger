"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

function Header() {
  const {user,isSignedIn}= useUser();
  
  return (
    <header className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href="/" className='flex items-center gap-3 group'>
            <Image 
              src={'./logo.svg'}
              alt={'Logo'}
              width={40}
              height={40}
              className='rounded-lg group-hover:scale-105 transition-transform duration-300'
            />
            <div>
              <h1 className='font-bold text-xl text-slate-800'>Mint Ledger</h1>
              <p className='text-xs text-slate-500'>Financial Management</p>
            </div>
          </Link>
 
          {/* Navigation */}
          <div className='flex items-center gap-4'>
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button className='bg-primary hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2'>
                  <Sparkles className='h-4 w-4' />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className='flex items-center gap-3'>
                <Link href="/sign-in">
                  <Button variant="ghost" className='text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors duration-200'>
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className='bg-primary hover:bg-primary/90 transition-colors duration-200'>
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
