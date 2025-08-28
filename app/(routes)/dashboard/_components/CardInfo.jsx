import { PiggyBank, ReceiptText, Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({budgetList}) {

    const [totalBudget,setTotalBudget]=useState(0);
    const [totalSpend,setTotalSpend]=useState(0);
   
    useEffect(()=>{
        budgetList&&CalculateCardInfo();
    },[budgetList])
    
    const CalculateCardInfo=()=>{
        console.log(budgetList);
        let totalBudget_=0;
        let totalSpend_=0;

        budgetList.forEach(element => {
                totalBudget_=totalBudget_+Number(element.amount)
                totalSpend_=totalSpend_+element.totalSpend
            });

            setTotalBudget(totalBudget_);
            setTotalSpend(totalSpend_);
        console.log(totalBudget_,totalSpend_)
    }

    const getRemainingBudget = () => totalBudget - totalSpend;
    const getSpendingPercentage = () => totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0;

  return (
    <div className='mb-8'>
      {budgetList?.length > 0 ?  
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
          {/* Total Budget Card */}
          <div className='group relative overflow-hidden bg-gradient-to-br from-primary to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='relative z-10'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-sm font-medium text-white/90 uppercase tracking-wide'>Total Budget</h3>
                <PiggyBank className='h-8 w-8 text-white/90 group-hover:scale-110 transition-transform duration-300'/>
              </div>
              <h2 className='font-bold text-3xl mb-2'>${totalBudget.toLocaleString()}</h2>
              <p className='text-white/80 text-sm'>Your total allocated budget</p>
            </div>
          </div>

          {/* Total Spend Card */}
          <div className='group relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='relative z-10'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-sm font-medium text-white/90 uppercase tracking-wide'>Total Spent</h3>
                <ReceiptText className='h-8 w-8 text-white/90 group-hover:scale-110 transition-transform duration-300'/>
              </div>
              <h2 className='font-bold text-3xl mb-2'>${totalSpend.toLocaleString()}</h2>
              <div className='flex items-center gap-2'>
                <TrendingUp className='h-4 w-4' />
                <p className='text-white/80 text-sm'>{getSpendingPercentage().toFixed(1)}% of budget used</p>
              </div>
            </div>
          </div>

          {/* Remaining Budget Card */}
          <div className='group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='relative z-10'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-sm font-medium text-white/90 uppercase tracking-wide'>Remaining</h3>
                <Target className='h-8 w-8 text-white/90 group-hover:scale-110 transition-transform duration-300'/>
              </div>
              <h2 className='font-bold text-3xl mb-2'>${getRemainingBudget().toLocaleString()}</h2>
              <div className='flex items-center gap-2'>
                <TrendingDown className='h-4 w-4' />
                <p className='text-white/80 text-sm'>Available to spend</p>
              </div>
            </div>
          </div>
        </div>
        :
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1,2,3].map((item,index)=>(
            <div key={index} className='h-[140px] w-full bg-slate-200 animate-pulse rounded-2xl'></div>
          ))}
        </div>
      }
    </div>
  )
}

export default CardInfo