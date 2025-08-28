"use client"
import React from 'react'
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

function Hero() {
  const { isSignedIn } = useUser();
  
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                Smart Financial Management
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Manage your Expenses
                <span className="block bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                  With Confidence
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Simplify your budget, maximize your savings. Take control of your finances with our intuitive expense tracking system.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="h-4 w-4 text-green-500" />
                Secure & Private
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Zap className="h-4 w-4 text-yellow-500" />
                Real-time Updates
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <TrendingUp className="h-4 w-4 text-primary" />
                Smart Analytics
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <button className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 mx-auto lg:mx-0">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              ) : (
                <Link href="/sign-in">
                  <button className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 mx-auto lg:mx-0">
                    Get Started Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src='/dash.png'
                alt='Dashboard Preview'
                width={600}
                height={400}
                className='rounded-2xl shadow-2xl border border-slate-200 w-full'
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-green-200 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-200 to-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;