import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { Bell, Search, Menu } from 'lucide-react'

function DashboardHeader() {
  return (
    <header className='bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-20'>
      <div className='flex items-center justify-between'>
        {/* Left Section */}
        <div className='flex items-center gap-4'>
          <button className='lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200'>
            <Menu className='h-5 w-5 text-slate-600' />
          </button>
          
          {/* Search Bar */}
          <div className='hidden md:flex items-center gap-3 bg-slate-100 rounded-lg px-4 py-2 w-80'>
            <Search className='h-4 w-4 text-slate-500' />
            <input 
              type="text" 
              placeholder="Search budgets, expenses..." 
              className='bg-transparent border-none outline-none text-slate-700 placeholder-slate-500 w-full'
            />
          </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <button className='p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 relative'>
            <Bell className='h-5 w-5 text-slate-600' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>
          
          {/* User Profile */}
          <div className='flex items-center gap-3'>
            <div className='hidden md:block text-right'>
              <p className='text-sm font-medium text-slate-800'>Welcome back!</p>
              <p className='text-xs text-slate-500'>Manage your finances</p>
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader