import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash, Receipt, DollarSign, Calendar } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expensesList,refreshData}) {

  const deleteExpense=async(expense)=>{
    const result=await db.delete(Expenses)
    .where(eq(Expenses.id,expense.id))
    .returning();

    if(result)
    {
      toast('Expense Deleted!');
      refreshData()
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-2 bg-red-100 rounded-lg'>
          <Receipt className='h-5 w-5 text-red-600' />
        </div>
        <div>
          <h2 className='font-bold text-xl text-slate-800'>Latest Expenses</h2>
          <p className='text-slate-600 text-sm'>Track your recent spending activities</p>
        </div>
      </div>

      {expensesList.length > 0 ? (
        <div className='overflow-hidden rounded-xl border border-slate-200'>
          {/* Table Header */}
          <div className='bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-4'>
                <h3 className='font-semibold text-slate-700 text-sm uppercase tracking-wide'>Expense Name</h3>
              </div>
              <div className='col-span-3'>
                <h3 className='font-semibold text-slate-700 text-sm uppercase tracking-wide'>Amount</h3>
              </div>
              <div className='col-span-3'>
                <h3 className='font-semibold text-slate-700 text-sm uppercase tracking-wide'>Date</h3>
              </div>
              <div className='col-span-2'>
                <h3 className='font-semibold text-slate-700 text-sm uppercase tracking-wide'>Action</h3>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-slate-200'>
            {expensesList.map((expense, index) => (
              <div 
                key={expense.id || index}
                className='px-6 py-4 hover:bg-slate-50 transition-colors duration-200 group'
              >
                <div className='grid grid-cols-12 gap-4 items-center'>
                  <div className='col-span-4'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-primary/10 rounded-lg'>
                        <Receipt className='h-4 w-4 text-primary' />
                      </div>
                      <span className='font-medium text-slate-800'>{expense.name}</span>
                    </div>
                  </div>
                  <div className='col-span-3'>
                    <div className='flex items-center gap-2'>
                      <DollarSign className='h-4 w-4 text-green-600' />
                      <span className='font-semibold text-slate-800'>${expense.amount}</span>
                    </div>
                  </div>
                  <div className='col-span-3'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-slate-500' />
                      <span className='text-slate-600 text-sm'>{formatDate(expense.createdAt)}</span>
                    </div>
                  </div>
                  <div className='col-span-2'>
                    <button
                      onClick={() => deleteExpense(expense)}
                      className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group-hover:scale-110'
                      title='Delete expense'
                    >
                      <Trash className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
            <Receipt className='h-8 w-8 text-slate-400' />
          </div>
          <h3 className='text-lg font-medium text-slate-600 mb-2'>No expenses yet</h3>
          <p className='text-slate-500 text-sm'>Start tracking your expenses by adding your first one</p>
        </div>
      )}
    </div>
  )
}

export default ExpenseListTable