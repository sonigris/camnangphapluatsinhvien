import React, { useState, useEffect } from 'react';
import { LEGAL_ARTICLES, REAL_CASE_STUDIES, RENTAL_CHECKLIST_TEMPLATE } from '../data/legalContent';
import { ChecklistItem } from '../types/legal';
import {
  Home as HomeIcon,
  CheckSquare,
  Zap,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  RefreshCw,
  Scale,
  DollarSign,
} from 'lucide-react';

const STORAGE_KEY_CHECKLIST = 'student_housing_checklist_v1';

export const HousingTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'articles' | 'checklist' | 'electricity' | 'cases'>('articles');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('case-rental-deposit-scam');

  // Checklist state loaded from localStorage if available
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading checklist', e);
    }
    return RENTAL_CHECKLIST_TEMPLATE;
  });

  const [checklistFilter, setChecklistFilter] = useState<string>('all');

  // Save to localStorage whenever checklist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklist));
    } catch (e) {
      console.error('Error saving checklist', e);
    }
  }, [checklist]);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const resetChecklist = () => {
    setChecklist(RENTAL_CHECKLIST_TEMPLATE);
  };

  const markAllChecklist = (val: boolean) => {
    setChecklist((prev) => prev.map((item) => ({ ...item, isChecked: val })));
  };

  const checkedCount = checklist.filter((i) => i.isChecked).length;
  const safetyPercent = Math.round((checkedCount / checklist.length) * 100);

  // Electricity Calculator State
  const [monthlyKwh, setMonthlyKwh] = useState<number>(120);
  const [landlordPrice, setLandlordPrice] = useState<number>(4500); // 4,500 VND/kWh
  const OFFICIAL_TIER3_PRICE = 2167; // Official retail tier 3 (approx ~2,167 VND before VAT)
  const OFFICIAL_WITH_VAT = Math.round(OFFICIAL_TIER3_PRICE * 1.08); // 8% VAT

  const landlordTotal = monthlyKwh * landlordPrice;
  const officialTotal = monthlyKwh * OFFICIAL_WITH_VAT;
  const overchargeMonthly = Math.max(0, landlordTotal - officialTotal);
  const overchargeYearly = overchargeMonthly * 12;

  const housingArticles = LEGAL_ARTICLES.filter((a) => a.category === 'housing');
  const housingCases = REAL_CASE_STUDIES.filter((c) => c.category === 'housing');

  const checklistCategories = ['all', ...Array.from(new Set(checklist.map((c) => c.category)))];

  const filteredChecklist = checklist.filter((item) => {
    if (checklistFilter === 'all') return true;
    return item.category === checklistFilter;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <HomeIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700 block">
              Chuyên Đề 02
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pháp Luật Về Thuê Phòng Trọ Sinh Viên
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Phòng trọ là nơi gắn bó suốt những năm tháng đại học. Hãy chủ động bảo vệ quyền lợi
          bằng cách nắm vững quy định về hợp đồng thuê, bản chất tiền đặt cọc, biểu giá điện nước
          và danh sách kiểm tra 16 điểm an toàn trước khi đặt bút ký.
        </p>

        {/* Sub-Navigation Tabs */}
        <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
          {[
            { id: 'articles', label: 'Cẩm nang pháp lý', icon: <FileText className="w-4 h-4" /> },
            { id: 'checklist', label: 'Checklist 16 điểm kiểm tra', icon: <CheckSquare className="w-4 h-4" /> },
            { id: 'electricity', label: 'Tra cứu giá điện nước', icon: <Zap className="w-4 h-4" /> },
            { id: 'cases', label: 'Tình huống thực tế', icon: <AlertTriangle className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                subTab === tab.id
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SubTab 1: Core Articles */}
      {subTab === 'articles' && (
        <div className="grid grid-cols-1 gap-6">
          {housingArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4"
            >
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-amber-700 font-semibold block mb-1">
                  {article.officialReference}
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {article.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1 italic">{article.summary}</p>
              </div>

              <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                {article.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/80 space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-700" />
                  Nguyên tắc vàng sinh viên cần ghi nhớ:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {article.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold shrink-0">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] text-slate-400">
                {article.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 2: Interactive Checklist */}
      {subTab === 'checklist' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-700" />
                  Danh Sách 16 Điểm Kiểm Tra (Checklist) Trước Khi Đặt Bút Ký Hợp Đồng
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Đánh dấu từng mục khi đi xem phòng. Dữ liệu được tự động lưu trên điện thoại/trình duyệt của bạn.
                </p>
              </div>

              {/* Safety Score Meter */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Chỉ số an toàn pháp lý:</span>
                    <span className="text-base font-black font-mono text-amber-700">
                      {safetyPercent}%
                    </span>
                  </div>
                  <div className="w-36 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        safetyPercent < 50
                          ? 'bg-rose-500'
                          : safetyPercent < 80
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${safetyPercent}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 font-mono">
                  {checkedCount}/{checklist.length} mục
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1">
                {checklistCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setChecklistFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg border transition-colors ${
                      checklistFilter === cat
                        ? 'bg-amber-700 text-white font-medium border-amber-700'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả danh mục' : cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => markAllChecklist(true)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                >
                  Chọn tất cả
                </button>
                <button
                  onClick={resetChecklist}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Đặt lại</span>
                </button>
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredChecklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.isChecked
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="w-4 h-4 mt-0.5 rounded text-amber-700 focus:ring-amber-600 shrink-0 cursor-pointer"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        item.importance === 'Bắt buộc'
                          ? 'bg-rose-100 text-rose-800'
                          : item.importance === 'Rất quan trọng'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.importance}
                    </span>
                    <span className="text-[11px] text-slate-400">· {item.category}</span>
                  </div>
                  <h3 className={`text-sm font-bold ${item.isChecked ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Electricity Price Calculator */}
      {subTab === 'electricity' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-8">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Công Cụ So Sánh Tiền Điện Phòng Trọ: Thực Tế vs Biểu Giá Nhà Nước
              </h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Căn cứ Thông tư 25/2018/TT-BCT & Thông tư 09/2023/TT-BCT của Bộ Công Thương.
              Khoản 6 Điều 12 Nghị định 134/2013/NĐ-CP phạt tiền từ <strong>20 - 30 triệu đồng</strong> đối với chủ nhà thu tiền điện sai giá.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  1. Sản lượng điện phòng sử dụng trong tháng (kWh / Số điện)
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={monthlyKwh}
                  onChange={(e) => setMonthlyKwh(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base font-bold focus:ring-2 focus:ring-amber-600 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  (Ví dụ: Sinh viên có máy lạnh + tủ lạnh thường dùng khoảng 100 - 180 số/tháng).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  2. Đơn giá điện chủ nhà đang thu (VNĐ / số điện)
                </label>
                <input
                  type="number"
                  step="100"
                  min="1500"
                  max="8000"
                  value={landlordPrice}
                  onChange={(e) => setLandlordPrice(Math.max(1000, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base font-bold focus:ring-2 focus:ring-amber-600 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Nhiều chủ trọ tự ý thu 3.800đ - 4.500đ/số để kiếm lời.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1.5 leading-relaxed">
                <span className="font-bold flex items-center gap-1.5 text-amber-800">
                  <Scale className="w-4 h-4" />
                  Quy định giá điện sinh hoạt của Bộ Công Thương:
                </span>
                <p>
                  Theo quy định, đối với người thuê nhà không thể kê khai số người để cấp định mức,
                  chủ nhà được áp dụng giá bán lẻ điện sinh hoạt của <strong>BẬC 3 (từ 101 - 200 kWh)</strong> cho toàn bộ công tơ.
                  Giá bậc 3 có thuế VAT 8% hiện nay vào khoảng <strong>~2.340 đ/kWh</strong>.
                </p>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  Kết quả so sánh chênh lệch
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">Chủ trọ thu bạn:</span>
                    <p className="text-lg font-black font-mono text-rose-400 mt-0.5">
                      {landlordTotal.toLocaleString('vi-VN')} đ
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({landlordPrice.toLocaleString('vi-VN')} đ/số)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">Biểu giá Nhà nước Bậc 3:</span>
                    <p className="text-lg font-black font-mono text-emerald-400 mt-0.5">
                      {officialTotal.toLocaleString('vi-VN')} đ
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (~{OFFICIAL_WITH_VAT.toLocaleString('vi-VN')} đ/số có VAT)
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <span className="text-xs text-slate-400">Số tiền bạn bị thu chênh lệch vô lý:</span>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-1">
                    +{overchargeMonthly.toLocaleString('vi-VN')} đ
                    <span className="text-xs font-sans font-normal text-slate-400">/tháng</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Thiệt hại sau 1 năm thuê: <strong className="text-amber-300 font-mono">+{overchargeYearly.toLocaleString('vi-VN')} đ</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white block">Biện pháp xử lý của sinh viên:</span>
                <p>
                  Thu thập biên lai tiền điện, gửi phản ánh đến Tổng công ty Điện lực địa phương (EVN) hoặc Hội bảo vệ quyền lợi người tiêu dùng.
                  Chủ nhà vi phạm đối mặt với mức phạt hành chính từ 20 đến 30 triệu đồng!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Housing Cases */}
      {subTab === 'cases' && (
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              Những tranh chấp thực tế về quỵt tiền cọc, đòi phòng đột xuất và thu phí dịch vụ mập mờ.
            </span>
          </div>

          <div className="space-y-4">
            {housingCases.map((cs) => {
              const isExpanded = expandedCaseId === cs.id;
              return (
                <div
                  key={cs.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setExpandedCaseId(isExpanded ? null : cs.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Mức rủi ro: {cs.riskLevel}
                        </span>
                        <span className="text-xs text-slate-400">· {cs.legalReference}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {cs.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{cs.summary}</p>
                    </div>
                    <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Diễn biến thực tế:
                        </h4>
                        <p className="text-slate-600">{cs.situation}</p>
                      </div>

                      <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                        <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                          Phân tích pháp lý:
                        </h4>
                        <p className="text-amber-950">{cs.legalAnalysis}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                          Hướng xử lý khuyến nghị cho sinh viên:
                        </h4>
                        <ul className="space-y-1.5">
                          {cs.practicalAction.map((act, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold shrink-0">✓</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
