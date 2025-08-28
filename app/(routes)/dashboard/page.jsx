"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const {user}=useUser();

  const [budgetList,setBudgetList]=useState([]);
  const [expensesList,setExpensesList]=useState([]);
  
  useEffect(()=>{
    user&&getBudgetList();
  },[user])
  
  /**
   * used to get budget List
   */
  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    ;

    setBudgetList(result);
    getAllExpenses();

  }

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
   
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-8'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h1 className='font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent'>
              Hi, {user?.fullName} ✌️
            </h1>
            <p className='text-slate-600 text-lg mt-2 max-w-2xl'>
              Here's what's happening with your money. Let's manage your expenses together and stay on track with your financial goals.
            </p>
          </div>
          <div className='hidden lg:block'>
            <UserButton />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <CardInfo budgetList={budgetList} />
      
      {/* Main Content Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-4 gap-6 mt-8'>
        {/* Left Column - Charts and Expenses */}
        <div className='xl:col-span-3 space-y-6'>
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={()=>getBudgetList()}
          />
        </div>
        
        {/* Right Column - Budgets */}
        <div className='xl:col-span-1'>
          <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-6'>
            <h2 className='font-bold text-xl text-slate-800 mb-4 flex items-center gap-2'>
              <span className='w-2 h-2 bg-primary rounded-full'></span>
              Latest Budgets
            </h2>
            
            <div className='space-y-4'>
              {budgetList?.length > 0 ? 
                budgetList.map((budget,index)=>(
                  <BudgetItem budget={budget} key={index} />
                ))
                :
                [1,2,3,4].map((item,index)=>(
                  <div key={index} className='h-[120px] w-full bg-slate-200 rounded-xl animate-pulse'></div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard