import { SignUp } from '@clerk/nextjs';
import Image from "next/image";
import { Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';

export default function Page() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side - Image and Content */}
        <section className="relative flex h-32 items-end bg-gradient-to-br from-primary to-green-600 lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-green-600/90"></div>
          
          {/* Background Image */}
          <img
            alt="Financial Management"
            src='/stonk.png'
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="hidden lg:relative lg:block lg:p-12 z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <Image 
                src={'./logo.svg'}
                alt={'Logo'}
                width={40}
                height={40}
                className='rounded-lg'
              />
              <div>
                <h1 className="font-bold text-xl text-white">Mint Ledger</h1>
                <p className="text-white/80 text-sm">Financial Management</p>
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
              Join Mint Ledger
            </h2>

            <p className="mt-6 leading-relaxed text-white/90 text-lg max-w-md">
              Start your journey to financial freedom. Create an account and begin 
              tracking your expenses with our powerful budgeting tools.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <Shield className="h-5 w-5 text-green-300" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <TrendingUp className="h-5 w-5 text-blue-300" />
                <span>Smart Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Sign Up Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden text-center mb-8">
              <div className="inline-flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-lg mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Get Started
              </h1>
              <p className="mt-2 text-slate-600">
                Create your account and start managing your finances
              </p>
            </div>

            {/* Sign Up Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
                <p className="text-slate-600">Join thousands of users managing their finances</p>
              </div>
              
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
                    card: 'shadow-none',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                  }
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}