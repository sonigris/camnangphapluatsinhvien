import React, { useState } from 'react';
import { LEGAL_ARTICLES, REAL_CASE_STUDIES } from '../data/legalContent';
import {
  Briefcase,
  AlertOctagon,
  Calculator,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Scale,
  Clock,
  Coins,
  ShieldAlert,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

export const EmploymentTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'articles' | 'calculator' | 'cases' | 'forbidden'>('articles');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('case-hold-id');

  // Wage Calculator State
  const [region, setRegion] = useState<'I' | 'II' | 'III' | 'IV'>('I');
  const [offeredHourlyWage, setOfferedHourlyWage] = useState<number>(25000);
  const [normalHours, setNormalHours] = useState<number>(60);
  const [nightHours, setNightHours] = useState<number>(10);
  const [otNormalHours, setOtNormalHours] = useState<number>(5);
  const [otWeekendHours, setOtWeekendHours] = useState<number>(8);
  const [otHolidayHours, setOtHolidayHours] = useState<number>(0);

  // Statutory minimum hourly rates (NĐ 74/2024/NĐ-CP)
  const MIN_WAGE_BY_REGION: Record<string, number> = {
    I: 23800,
    II: 21200,
    III: 18600,
    IV: 16600,
  };

  const statutoryMinHourly = MIN_WAGE_BY_REGION[region];
  const isOfferedWageIllegal = offeredHourlyWage < statutoryMinHourly;

  // Calculation logic based on Điều 98 & 105 BLLĐ 2019
  // 1. Normal hours at base rate
  const normalPay = normalHours * offeredHourlyWage;
  // 2. Night work: at least +30%
  const nightPay = nightHours * offeredHourlyWage * 1.3;
  // 3. Overtime normal day: at least 150%
  const otNormalPay = otNormalHours * offeredHourlyWage * 1.5;
  // 4. Overtime weekly rest: at least 200%
  const otWeekendPay = otWeekendHours * offeredHourlyWage * 2.0;
  // 5. Overtime holiday/Tet: at least 300%
  const otHolidayPay = otHolidayHours * offeredHourlyWage * 3.0;

  const totalCalculatedPay = normalPay + nightPay + otNormalPay + otWeekendPay + otHolidayPay;

  // Statutory baseline for comparison
  const statutoryBasePay =
    normalHours * statutoryMinHourly +
    nightHours * statutoryMinHourly * 1.3 +
    otNormalHours * statutoryMinHourly * 1.5 +
    otWeekendHours * statutoryMinHourly * 2.0 +
    otHolidayHours * statutoryMinHourly * 3.0;

  const employmentArticles = LEGAL_ARTICLES.filter((a) => a.category === 'employment');
  const employmentCases = REAL_CASE_STUDIES.filter((c) => c.category === 'employment');

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-700 block">
              Chuyên Đề 01
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pháp Luật Về Việc Làm Thêm Của Sinh Viên
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Sinh viên làm việc bán thời gian (part-time) được pháp luật Việt Nam bảo vệ
          bình đẳng như người lao động thông thường. Cẩm nang cung cấp kiến thức nền tảng
          về tiền lương tối thiểu giờ, thời giờ làm việc, chế độ thử việc và các cạm bẫy
          vi phạm thường gặp.
        </p>

        {/* Sub-Navigation Tabs */}
        <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
          {[
            { id: 'articles', label: 'Kiến thức cốt lõi', icon: <FileCheck className="w-4 h-4" /> },
            { id: 'calculator', label: 'Bộ tính lương & OT', icon: <Calculator className="w-4 h-4" /> },
            { id: 'cases', label: 'Tình huống thực tế', icon: <AlertTriangle className="w-4 h-4" /> },
            { id: 'forbidden', label: 'Hành vi bị cấm', icon: <AlertOctagon className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                subTab === tab.id
                  ? 'bg-indigo-700 text-white shadow-sm'
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
          {employmentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4"
            >
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-indigo-700 font-semibold block mb-1">
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

              {/* Key Takeaways Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  Điểm cốt lõi sinh viên cần ghi nhớ:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {article.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold shrink-0">•</span>
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

      {/* SubTab 2: Wage Calculator */}
      {subTab === 'calculator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Công Cụ Tính Tiền Lương Làm Thêm & Làm Thêm Giờ (OT) Chuẩn Luật
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Căn cứ theo Nghị định số 74/2024/NĐ-CP và Điều 98, 105 Bộ luật Lao động 2019.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4">
              {/* Region Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Chọn Vùng làm việc (Mức lương tối thiểu vùng)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'I', label: 'Vùng I', rate: '23.800 đ/h', desc: 'Hà Nội, TP.HCM...' },
                    { id: 'II', label: 'Vùng II', rate: '21.200 đ/h', desc: 'TP trực thuộc tỉnh...' },
                    { id: 'III', label: 'Vùng III', rate: '18.600 đ/h', desc: 'Thị xã, huyện ven...' },
                    { id: 'IV', label: 'Vùng IV', rate: '16.600 đ/h', desc: 'Vùng khó khăn...' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRegion(r.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        region === r.id
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs">{r.label}</div>
                      <div className="text-[11px] font-mono text-indigo-700">{r.rate}</div>
                      <div className="text-[10px] text-slate-500 truncate">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Offered Hourly Wage */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Mức lương theo giờ thỏa thuận (VNĐ/giờ)
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    Tối thiểu luật định: {statutoryMinHourly.toLocaleString('vi-VN')} đ/h
                  </span>
                </div>
                <input
                  type="number"
                  step="1000"
                  min="10000"
                  value={offeredHourlyWage}
                  onChange={(e) => setOfferedHourlyWage(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                {isOfferedWageIllegal && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      <strong>Cảnh báo vi phạm:</strong> Mức lương {offeredHourlyWage.toLocaleString('vi-VN')} đ/h thấp hơn mức sàn tối thiểu của Vùng {region} ({statutoryMinHourly.toLocaleString('vi-VN')} đ/h). Người sử dụng lao động có hành vi trả lương dưới chuẩn!
                    </span>
                  </div>
                )}
              </div>

              {/* Working Hours Input */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Số giờ làm việc trong tháng theo từng loại ca
                </label>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 font-medium block">Ca thường ban ngày</span>
                    <span className="text-[10px] text-slate-400 block mb-1">Hệ số 100%</span>
                    <input
                      type="number"
                      min="0"
                      value={normalHours}
                      onChange={(e) => setNormalHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 font-medium block">Ca đêm (22h - 6h sáng)</span>
                    <span className="text-[10px] text-indigo-600 block mb-1">Ít nhất +30% (Hệ số 130%)</span>
                    <input
                      type="number"
                      min="0"
                      value={nightHours}
                      onChange={(e) => setNightHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 font-medium block">Làm thêm (OT) ngày thường</span>
                    <span className="text-[10px] text-indigo-600 block mb-1">Ít nhất 150%</span>
                    <input
                      type="number"
                      min="0"
                      value={otNormalHours}
                      onChange={(e) => setOtNormalHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 font-medium block">Làm ngày nghỉ hàng tuần</span>
                    <span className="text-[10px] text-indigo-600 block mb-1">Ít nhất 200%</span>
                    <input
                      type="number"
                      min="0"
                      value={otWeekendHours}
                      onChange={(e) => setOtWeekendHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div className="col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-600 font-medium">Làm ngày nghỉ Lễ, Tết</span>
                      <span className="text-[10px] font-bold text-amber-700">Ít nhất 300% (Chưa kể lương ngày nghỉ)</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={otHolidayHours}
                      onChange={(e) => setOtHolidayHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Output Calculation Result */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-indigo-400" />
                  Bảng tổng hợp tiền lương dự tính
                </span>

                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs text-slate-400">Tổng thu nhập ước tính nhận được:</span>
                  <p className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
                    {Math.round(totalCalculatedPay).toLocaleString('vi-VN')} đ
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tổng số giờ làm: {normalHours + nightHours + otNormalHours + otWeekendHours + otHolidayHours} giờ
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Lương giờ thường ({normalHours}h):</span>
                    <span className="font-mono">{Math.round(normalPay).toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Lương ca đêm x1.3 ({nightHours}h):</span>
                    <span className="font-mono">{Math.round(nightPay).toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Lương làm thêm ngày thường x1.5 ({otNormalHours}h):</span>
                    <span className="font-mono">{Math.round(otNormalPay).toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Lương làm ngày nghỉ tuần x2.0 ({otWeekendHours}h):</span>
                    <span className="font-mono">{Math.round(otWeekendPay).toLocaleString('vi-VN')} đ</span>
                  </div>
                  {otHolidayHours > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>Lương ngày Lễ/Tết x3.0 ({otHolidayHours}h):</span>
                      <span className="font-mono">{Math.round(otHolidayPay).toLocaleString('vi-VN')} đ</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">Đối chiếu sàn tối thiểu luật định:</p>
                <p>
                  Thu nhập tối thiểu pháp luật bắt buộc chủ cơ sở phải trả cho khối lượng công việc này tại Vùng {region} là:{' '}
                  <strong className="text-indigo-300 font-mono">{Math.round(statutoryBasePay).toLocaleString('vi-VN')} đ</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Real Cases */}
      {subTab === 'cases' && (
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              Dưới đây là các tình huống tranh chấp việc làm thêm phổ biến nhất mà sinh viên Việt Nam thường gặp. Nhấn vào từng tình huống để xem phân tích pháp lý và các bước xử lý cụ thể.
            </span>
          </div>

          <div className="space-y-4">
            {employmentCases.map((cs) => {
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
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800">
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

                      <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1">
                        <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wider">
                          Phân tích pháp lý:
                        </h4>
                        <p className="text-indigo-950">{cs.legalAnalysis}</p>
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

      {/* SubTab 4: Forbidden Practices */}
      {subTab === 'forbidden' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Những Hành Vi Người Sử Dụng Lao Động Tuyệt Đối BỊ CẤM
            </h2>
            <p className="text-xs text-slate-500">
              Quy định rõ ràng tại Điều 17 và Điều 127 Bộ luật Lao động 2019. Nếu gặp phải, sinh viên hãy kiên quyết từ chối!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                01. Cấm giữ giấy tờ tùy thân gốc
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Không được giữ CCCD, Bằng cấp, Thẻ sinh viên
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khoản 1 Điều 17 BLLĐ cấm tuyệt đối việc giữ bản chính CMND/CCCD/Hộ chiếu của người lao động.
                Mức xử phạt hành chính: Từ <strong>20.000.000đ đến 25.000.000đ</strong> (Nghị định 12/2022/NĐ-CP).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                02. Cấm thu tiền cọc việc làm
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Không được yêu cầu đặt cọc bằng tiền hoặc tài sản
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khoản 2 Điều 17 cấm yêu cầu người lao động thực hiện biện pháp bảo đảm bằng tiền, tài sản cho việc thực hiện HĐLĐ.
                Mọi chiêu trò &quot;cọc đồng phục&quot;, &quot;cọc giữ chỗ&quot;, &quot;phí hồ sơ&quot; đều là dấu hiệu lừa đảo hoặc vi phạm pháp luật.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                03. Cấm phạt tiền, trừ lương thay kỷ luật
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Chủ quán không có quyền tự ý trừ tiền phạt vào lương
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Điều 127 BLLĐ quy định: Cấm dùng hình thức phạt tiền, cắt lương thay việc xử lý kỷ luật lao động.
                Các bảng nội quy ghi &quot;đi muộn 5p phạt 100k&quot; hoàn toàn vô hiệu về mặt pháp lý.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                04. Cấm bóc lột thử việc không lương
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Lương thử việc tối thiểu phải bằng 85% lương chính thức
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Điều 26 BLLĐ quy định rõ: Tiền lương trong thời gian thử việc ít nhất phải bằng 85% mức lương của công việc đó.
                Không có khái niệm &quot;thử việc không lương 1 tháng&quot; trong pháp luật lao động Việt Nam.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
