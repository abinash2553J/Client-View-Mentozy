import { Twitter, Linkedin, Instagram, Send, Mail } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page, sectionId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const links = {
    platform: [
        { label: 'Browse Mentors', action: () => onNavigate('mentors') },
        { label: 'Learning Tracks', action: () => onNavigate('tracks') },
        { label: 'Success Stories', action: () => onNavigate('home', 'opportunities') },
        { label: 'Pricing', action: () => onNavigate('home', 'pricing') }
    ],
    company: [
        { label: 'About Us', action: () => onNavigate('about') },
        { label: 'Careers', action: () => onNavigate('careers') }, 
        { label: 'Contact', action: () => onNavigate('contact') },
        { label: 'Become a Mentor', action: () => onNavigate('contact') },
    ],
    legal: [
        { label: 'Privacy Policy', action: () => {} },
        { label: 'Terms of Service', action: () => {} },
        { label: 'Cookie Policy', action: () => {} }
    ]
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6">
        
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div 
                className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Mentozy</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Democratizing mentorship for everyone. We connect ambitious learners with world-class experts.
            </p>
            
            <div className="relative mb-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-amber-50 rounded-lg text-amber-600 hover:bg-amber-100 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:wearementozy@gmail.com">wearementozy@gmail.com</a>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {links.platform.map((link, i) => (
                  <li key={i}>
                      <button onClick={link.action} className="hover:text-amber-600 transition-colors text-left w-full sm:w-auto">
                          {link.label}
                      </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {links.company.map((link, i) => (
                   <li key={i}>
                      <button onClick={link.action} className="hover:text-amber-600 transition-colors text-left w-full sm:w-auto">
                          {link.label}
                      </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {links.legal.map((link, i) => (
                  <li key={i}>
                      <button onClick={link.action} className="hover:text-amber-600 transition-colors text-left w-full sm:w-auto">
                          {link.label}
                      </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mentozy Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors hover:scale-110 transform">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors hover:scale-110 transform">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors hover:scale-110 transform">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}