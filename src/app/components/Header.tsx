import { Search, Menu } from 'lucide-react';
import type { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page, sectionId?: string) => void;
  currentPage: Page;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const navItems: { label: string; page: Page; section?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Mentors', page: 'mentors' },
    { label: 'Tracks', page: 'tracks' },
    { label: 'Careers', page: 'careers' },
    { label: 'About', page: 'about' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group select-none" 
            onClick={() => onNavigate('home')}
          >
            <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">Mentozy</span>
            <div className="w-2 h-2 bg-amber-500 rounded-sm group-hover:rotate-45 transition-transform duration-300"></div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => onNavigate(item.page, item.section)}
                className={`text-sm font-medium transition-colors ${currentPage === item.page ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center justify-center p-2.5 hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-xl transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="md:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <button 
                onClick={() => onNavigate('contact')}
                className="hidden md:block px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
                Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}