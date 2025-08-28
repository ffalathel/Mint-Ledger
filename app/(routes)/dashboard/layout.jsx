"use client"
import React, { Children, useEffect } from 'react'
import SideNav from './_components/sidenav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {
  const{user}=useUser();
  const router=useRouter();

  useEffect(()=>{
    user&&checkUserBudgets();
  },[user])
  
  const checkUserBudgets=async()=>{
    const result= await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if(result?.length==0)
    {
      router.replace('/dashboard/budgets');
    }
  }
  
  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Sidebar */}
      <div className='fixed left-0 top-0 h-full w-64 hidden lg:block z-30'>
        <SideNav />
      </div>

      {/* Main Content */}
      <div className='lg:ml-64 min-h-screen'>
        <DashboardHeader />
        <main className='relative'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

