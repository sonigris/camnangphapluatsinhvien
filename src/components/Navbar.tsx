import React, { useState } from 'react';
import { ActiveTab } from '../types/legal';
import {
  BookOpen,
  Briefcase,
  Home as HomeIcon,
  Shield,
  Bot,
  User,
  ExternalLink,
  Search,
  Menu,
  X,
  Scale,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; isAI?: boolean }> = [
    { id: 'home', label: 'Trang chủ', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'employment', label: 'Việc làm thêm', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'housing', label: 'Thuê trọ', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'insurance', label: 'Bảo hiểm', icon: <Shield className="w-4 h-4" /> },
    { id: 'assistant', label: 'Hỏi đáp AI', icon: <Bot className="w-4 h-4" />, isAI: true },
    { id: 'about', label: 'Giới thiệu', icon: <User className="w-4 h-4" /> },
    { id: 'sources', label: 'Nguồn tham khảo', icon: <ExternalLink className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <button
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-sm group-hover:bg-indigo-800 transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-indigo-700 block">
                Cẩm Nang Pháp Luật
              </span>
              <span className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Cho Sinh Viên
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                    isActive
                      ? 'text-indigo-700 bg-indigo-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-700' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.isAI && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Gemini
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              title="Tìm kiếm kiến thức pháp luật"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Tìm kiếm luật...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-slate-300 rounded text-slate-500 shadow-2xs">
                Ctrl K
              </kbd>
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-indigo-700' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.isAI && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Gemini AI
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
