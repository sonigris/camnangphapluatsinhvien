import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types/legal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeTab } from './components/HomeTab';
import { EmploymentTab } from './components/EmploymentTab';
import { HousingTab } from './components/HousingTab';
import { InsuranceTab } from './components/InsuranceTab';
import { AssistantTab } from './components/AssistantTab';
import { AboutTab } from './components/AboutTab';
import { SourcesTab } from './components/SourcesTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    // Read from window hash if present, e.g. #employment
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    const validTabs: ActiveTab[] = [
      'home',
      'employment',
      'housing',
      'insurance',
      'assistant',
      'about',
      'sources',
    ];
    if (validTabs.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync activeTab with URL hash
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Listen to hash change from browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      const validTabs: ActiveTab[] = [
        'home',
        'employment',
        'housing',
        'insurance',
        'assistant',
        'about',
        'sources',
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomeTab
            setActiveTab={setActiveTab}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}
        {activeTab === 'employment' && <EmploymentTab />}
        {activeTab === 'housing' && <HousingTab />}
        {activeTab === 'insurance' && <InsuranceTab />}
        {activeTab === 'assistant' && <AssistantTab />}
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'sources' && <SourcesTab />}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
