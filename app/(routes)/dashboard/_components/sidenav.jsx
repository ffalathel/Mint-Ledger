"use client";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Home, BarChart3 } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect } from 'react'
import {UserButton} from '@clerk/nextjs';
import { usePathname} from 'next/navigation';
import Link from 'next/link';

function SideNav() {
  const menuList = [
    {
      id: 1,
      name:'Dashboard',
      icon:LayoutGrid,
      path:'/dashboard'
    },
    {
      id: 2,
      name:'Budgets',
      icon:PiggyBank,
      path:'/dashboard/budgets'
    },
    {
      id: 3,
      name:'Expenses',
      icon:ReceiptText,
      path:'/dashboard/expenses'
    },
  ]
  
  const path = usePathname();
  
  useEffect(()=>{
    console.log(path)
  },[path])
  
  return (
    <div className='h-screen bg-white border-r border-slate-200 shadow-lg flex flex-col'>
      {/* Logo Section */}
      <div className='p-6 border-b border-slate-200'>
        <div className='flex items-center gap-3'>
          <Image 
            src={'./logo.svg'}
            alt={'Logo'}
            width={40}
            height={40}
            className='rounded-lg'
          />
          <div>
            <h1 className='font-bold text-xl text-slate-800'>Mint Ledger</h1>
            <p className='text-xs text-slate-500'>Financial Management</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className='flex-1 p-4'>
        <nav className='space-y-2'>
          {menuList.map((menu,index)=>(
            <Link href={menu.path} key={menu.id}>
              <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                path === menu.path 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
              }`}>
                <menu.icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                  path === menu.path ? 'text-white' : 'text-slate-500 group-hover:text-primary'
                }`}/>
                <span className={`font-medium transition-colors duration-200 ${
                  path === menu.path ? 'text-white' : 'text-slate-700 group-hover:text-primary'
                }`}>
                  {menu.name}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className='p-4 border-t border-slate-200'>
        <div className='bg-slate-50 rounded-xl p-4'>
          <div className='flex items-center gap-3 mb-3'>
            <UserButton />
            <div>
              <p className='text-sm font-medium text-slate-800'>Profile</p>
              <p className='text-xs text-slate-500'>Manage your account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav
