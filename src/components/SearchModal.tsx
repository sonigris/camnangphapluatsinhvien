import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab } from '../types/legal';
import { LEGAL_ARTICLES, REAL_CASE_STUDIES, OFFICIAL_LEGAL_SOURCES } from '../data/legalContent';
import { Search, X, ArrowRight, BookOpen, AlertCircle, ExternalLink } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: ActiveTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'employment' | 'housing' | 'insurance'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search in articles
  const matchedArticles = LEGAL_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.summary.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
      article.officialReference.toLowerCase().includes(normalizedQuery)
    );
  });

  // Search in cases
  const matchedCases = REAL_CASE_STUDIES.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      c.title.toLowerCase().includes(normalizedQuery) ||
      c.summary.toLowerCase().includes(normalizedQuery) ||
      c.situation.toLowerCase().includes(normalizedQuery) ||
      c.legalReference.toLowerCase().includes(normalizedQuery)
    );
  });

  // Search in official sources
  const matchedSources = OFFICIAL_LEGAL_SOURCES.filter((s) => {
    if (!normalizedQuery) return false; // only show sources when searching
    return (
      s.name.toLowerCase().includes(normalizedQuery) ||
      s.description.toLowerCase().includes(normalizedQuery) ||
      (s.docCode && s.docCode.toLowerCase().includes(normalizedQuery))
    );
  });

  const totalResults = matchedArticles.length + matchedCases.length + matchedSources.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-xs flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm: cọc phòng, lương tối thiểu, giữ CCCD, BHYT sinh viên, làm thêm giờ..."
            className="w-full text-base bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 text-xs"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs">
          <span className="text-slate-500 font-medium shrink-0 mr-1">Bộ lọc:</span>
          {(
            [
              { id: 'all', label: 'Tất cả chủ đề' },
              { id: 'employment', label: 'Việc làm thêm' },
              { id: 'housing', label: 'Thuê trọ' },
              { id: 'insurance', label: 'Bảo hiểm' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-medium shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-slate-400 text-xs shrink-0">
            {totalResults} kết quả
          </span>
        </div>

        {/* Results container */}
        <div className="overflow-y-auto p-4 space-y-6">
          {totalResults === 0 && (
            <div className="py-12 text-center space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-medium text-slate-600">
                Không tìm thấy kết quả phù hợp cho từ khóa &quot;{query}&quot;
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Gợi ý: Thử tìm các từ khóa ngắn như &quot;cọc&quot;, &quot;lương&quot;, &quot;thử việc&quot;, &quot;điện&quot;, &quot;BHYT&quot;, hoặc hỏi trực tiếp Trợ lý AI.
              </p>
            </div>
          )}

          {/* Articles Section */}
          {matchedArticles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                Kiến thức pháp luật ({matchedArticles.length})
              </h3>
              <div className="space-y-2">
                {matchedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onNavigateToTab(art.category);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {art.title}
                      </h4>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {art.summary}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span>{art.officialReference}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cases Section */}
          {matchedCases.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Tình huống thực tế ({matchedCases.length})
              </h3>
              <div className="space-y-2">
                {matchedCases.map((cs) => (
                  <div
                    key={cs.id}
                    onClick={() => {
                      onNavigateToTab(cs.category);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {cs.riskLevel}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                          {cs.title}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {cs.summary}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Căn cứ: {cs.legalReference}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources Section */}
          {matchedSources.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                Văn bản pháp luật & Cổng thông tin ({matchedSources.length})
              </h3>
              <div className="space-y-2">
                {matchedSources.map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                        {src.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{src.agency}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
