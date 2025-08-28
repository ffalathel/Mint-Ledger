import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { ArrowUp, Github, Twitter, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header/>
      <Hero/>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image 
                  src={'./logo.svg'}
                  alt={'Logo'}
                  width={32}
                  height={32}
                  className='rounded-lg'
                />
                <h3 className="font-bold text-xl">Mint Ledger</h3>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Take control of your finances with our intuitive expense tracking system. 
                Simplify your budget and maximize your savings.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Budgets</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Expenses</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Analytics</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Mint Ledger. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 z-50"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}