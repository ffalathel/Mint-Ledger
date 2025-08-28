"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import {desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { useState } from 'react'
import BudgetItem from './BudgetItem'
import CreateBudget from './CreateBudget'

function BudgetList() {
  const [budgetList, setBudgetList]=useState([]);
  const {user}=useUser();
  
  useEffect(()=>{
    user&&getBudgetList();
  },[user])
  
  const getBudgetList= async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    setBudgetList(result);
  }
  
  return (
    <div className='space-y-6'>
      {/* Create Budget Section */}
      <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <span className='text-2xl'>➕</span>
          </div>
          <div>
            <h2 className='font-bold text-xl text-slate-800'>Create New Budget</h2>
            <p className='text-slate-600 text-sm'>Add a new budget category to track your spending</p>
          </div>
        </div>
        <CreateBudget refreshData={()=>getBudgetList()}/>
      </div>

      {/* Budgets Grid */}
      <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <span className='text-2xl'>📊</span>
          </div>
          <div>
            <h2 className='font-bold text-xl text-slate-800'>Your Budgets</h2>
            <p className='text-slate-600 text-sm'>
              {budgetList?.length > 0 
                ? `You have ${budgetList.length} budget${budgetList.length > 1 ? 's' : ''}`
                : 'No budgets created yet'
              }
            </p>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
          {budgetList?.length > 0 ? 
            budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
            :
            [1,2,3,4,5].map((item, index) => (
              <div key={index} className='w-full bg-slate-200 rounded-xl h-[180px] animate-pulse'></div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BudgetList