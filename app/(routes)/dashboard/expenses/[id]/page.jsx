"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';

function ExpensesScreen({params}) {
    const {user}=useUser();
    const [budgetInfo,setbudgetInfo]=useState();
    const [expensesList,setExpensesList]=useState([]);
    const route=useRouter();
    
    useEffect(()=>{
        user&&getBudgetInfo();
    },[user]);

    /**
     * Get Budget Information
     */
    const getBudgetInfo=async()=>{
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)

          setbudgetInfo(result[0]);
          getExpensesList();
    }

    /**
     * Get Latest Expenses
     */
    const getExpensesList=async()=>{
      const result=await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result)
    }

    /**
     * Used to Delete budget
     */
    const deleteBudget=async()=>{
      const deleteExpenseResult=await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning()

      if(deleteExpenseResult) {
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
      }
      toast.success('Budget Deleted Successfully! 🗑️');
      route.replace('/dashboard/budgets');
    }
   
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-8'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-4'>
            <button 
              onClick={()=>route.back()} 
              className='p-2 hover:bg-white rounded-lg transition-colors duration-200 group'
            >
              <ArrowLeft className='h-5 w-5 text-slate-600 group-hover:text-primary'/>
            </button>
            <div>
              <h1 className='font-bold text-3xl lg:text-4xl text-slate-800'>Budget Details</h1>
              <p className='text-slate-600 mt-1'>Manage your expenses for this budget</p>
            </div>
          </div>
          
          <div className='flex gap-3'>
            <EditBudget 
              budgetInfo={budgetInfo}
              refreshData={()=>getBudgetInfo()} 
            />
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="flex gap-2 hover:bg-red-600 transition-colors duration-200"
                > 
                  <Trash className='h-4 w-4'/> 
                  Delete Budget
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='flex items-center gap-2 text-red-600'>
                    <AlertTriangle className='h-5 w-5' />
                    Delete Budget
                  </AlertDialogTitle>
                  <AlertDialogDescription className='text-slate-600'>
                    This action cannot be undone. This will permanently delete your current budget along with all associated expenses and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='bg-slate-100 hover:bg-slate-200 text-slate-700'>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={()=>deleteBudget()}
                    className='bg-red-600 hover:bg-red-700'
                  >
                    Delete Budget
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Budget and Add Expense Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className='h-[180px] w-full bg-slate-200 rounded-2xl animate-pulse'></div>
        )}
        
        <AddExpense 
          budgetId={params.id}
          user={user}
          refreshData={()=>getBudgetInfo()}
        />
      </div>

      {/* Expenses List */}
      <div className='mt-8'>
        <ExpenseListTable 
          expensesList={expensesList}
          refreshData={()=>getBudgetInfo()} 
        />
      </div>
    </div>
  )
}

export default ExpensesScreen