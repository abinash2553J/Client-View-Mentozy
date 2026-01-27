import { useState, Suspense, lazy, memo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection'; // Keep Hero eager for LCP
import { Loader2 } from 'lucide-react';

// Lazy load heavy page components
const FeaturesSection = lazy(() => import('./components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const HowItWorks = lazy(() => import('./components/HowItWorks').then(module => ({ default: module.HowItWorks })));
const MentorshipFormats = lazy(() => import('./components/MentorshipFormats').then(module => ({ default: module.MentorshipFormats })));
const LearningTracks = lazy(() => import('./components/LearningTracks').then(module => ({ default: module.LearningTracks })));
const TeamSection = lazy(() => import('./components/TeamSection').then(module => ({ default: module.TeamSection })));
const CTASection = lazy(() => import('./components/CTASection').then(module => ({ default: module.CTASection })));
const Opportunities = lazy(() => import('./components/Opportunities').then(module => ({ default: module.Opportunities })));
const TechnologySection = lazy(() => import('./components/TechnologySection').then(module => ({ default: module.TechnologySection })));
const WhatWeDoDifferently = lazy(() => import('./components/WhatWeDoDifferently').then(module => ({ default: module.WhatWeDoDifferently })));
const WhoItsFor = lazy(() => import('./components/WhoItsFor').then(module => ({ default: module.WhoItsFor })));

// Lazy load pages
const CareerPage = lazy(() => import('./pages/CareerPage').then(module => ({ default: module.CareerPage })));
const MentorsPage = lazy(() => import('./pages/MentorsPage').then(module => ({ default: module.MentorsPage })));
const TracksPage = lazy(() => import('./pages/TracksPage').then(module => ({ default: module.TracksPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(module => ({ default: module.SignupPage })));
const StudentAuthPage = lazy(() => import('./pages/StudentAuthPage').then(module => ({ default: module.StudentAuthPage })));
const StudentOnboardingPage = lazy(() => import('./pages/StudentOnboardingPage').then(module => ({ default: module.StudentOnboardingPage })));
const StudentDashboardPage = lazy(() => import('./pages/StudentDashboardPage').then(module => ({ default: module.StudentDashboardPage })));

export type Page = 'home' | 'careers' | 'mentors' | 'tracks' | 'about' | 'contact' | 'login' | 'signup' | 'student-auth' | 'student-onboarding' | 'student-dashboard';

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
  </div>
);

// Memoized Header & Footer to prevent re-renders on page content changes
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page, sectionId?: string) => {
    // Immediate state update
    setCurrentPage(page);

    // Defer scroll to next tick to allow DOM to update
    requestAnimationFrame(() => {
      if (page === 'home') {
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  // Full-screen pages without header/footer
  const isAuthPage = ['login', 'signup', 'student-auth', 'student-onboarding', 'student-dashboard'].includes(currentPage);

  if (isAuthPage) {
    return (
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader2 className="w-10 h-10 text-amber-500 animate-spin" /></div>}>
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
        {currentPage === 'signup' && <SignupPage onNavigate={handleNavigate} />}
        {currentPage === 'student-auth' && <StudentAuthPage onNavigate={handleNavigate} />}
        {currentPage === 'student-onboarding' && <StudentOnboardingPage onNavigate={handleNavigate} />}
        {currentPage === 'student-dashboard' && <StudentDashboardPage onNavigate={handleNavigate} />}
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <MemoizedHeader onNavigate={handleNavigate} currentPage={currentPage} />

      <main>
        <Suspense fallback={<PageLoader />}>
          {currentPage === 'home' && (
            <>
              {/* Keep Hero eager for immediate visual feedback */}
              <div id="home"><HeroSection onNavigate={handleNavigate} /></div>
              <div id="features"><FeaturesSection /></div>
              <div id="how-it-works"><HowItWorks /></div>
              <WhatWeDoDifferently />
              <WhoItsFor />
              <div id="learning-tracks"><LearningTracks /></div>
              <MentorshipFormats />
              <TechnologySection />
              <div id="opportunities">
                <Opportunities onNavigate={handleNavigate} />
              </div>
              <TeamSection />
              <div id="pricing"><CTASection onNavigate={handleNavigate} /></div>
            </>
          )}
          {currentPage === 'careers' && <CareerPage />}
          {currentPage === 'mentors' && <MentorsPage />}
          {currentPage === 'tracks' && <TracksPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        </Suspense>
      </main>

      <MemoizedFooter onNavigate={handleNavigate} />
    </div>
  );
}

export default App;