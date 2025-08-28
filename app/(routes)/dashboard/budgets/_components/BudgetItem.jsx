import Link from 'next/link'
import React from 'react'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

function BudgetItem({budget}) {
  const calculatePerc=()=>{
    const percentage=(budget.totalSpend/budget.amount)*100;
    return percentage.toFixed(2);
  }

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  }

  const getStatusIcon = (percentage) => {
    if (percentage >= 90) return <AlertCircle className="h-4 w-4" />;
    if (percentage >= 75) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-primary';
  }

  return (
    <Link href={'/dashboard/expenses/'+budget?.id} className='group block'>
      <div className='bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300'>
              <span className='text-xl'>{budget?.icon}</span>
            </div>
            <div>
              <h3 className='font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300'>
                {budget?.name}
              </h3>
              <p className='text-sm text-slate-500'>
                {budget?.totalItem ? budget.totalItem : 0} items
              </p>
            </div>
          </div>
          <div className='text-right'>
            <h3 className='font-bold text-primary text-lg'>${budget?.amount?.toLocaleString()}</h3>
            <div className={`flex items-center gap-1 text-xs ${getStatusColor(calculatePerc())}`}>
              {getStatusIcon(calculatePerc())}
              <span>{calculatePerc()}% used</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-slate-600 flex items-center gap-1'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              ${budget?.totalSpend ? budget?.totalSpend?.toLocaleString() : 0} spent
            </span>
            <span className='text-slate-600 flex items-center gap-1'>
              <span className='w-2 h-2 bg-green-500 rounded-full'></span>
              ${(budget?.amount - (budget?.totalSpend || 0))?.toLocaleString()} remaining
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className='w-full bg-slate-200 h-2 rounded-full overflow-hidden'>
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(calculatePerc())}`} 
              style={{width: `${Math.min(calculatePerc(), 100)}%`}}
            ></div>
          </div>
          
          {/* Budget Status */}
          <div className='flex items-center justify-between text-xs'>
            <span className='text-slate-500'>Budget limit</span>
            <span className={`font-medium ${getStatusColor(calculatePerc())}`}>
              {calculatePerc() >= 90 ? 'Critical' : calculatePerc() >= 75 ? 'Warning' : 'Healthy'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BudgetItem