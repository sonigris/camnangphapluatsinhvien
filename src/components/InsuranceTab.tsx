import React, { useState } from 'react';
import { LEGAL_ARTICLES } from '../data/legalContent';
import {
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Scale,
  Sparkles,
} from 'lucide-react';

export const InsuranceTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'student-bhyt' | 'comparison' | 'calculator' | 'digital-card'>('student-bhyt');

  // BHYT Fee Calculator State
  // Lương cơ sở theo Nghị định 73/2024/NĐ-CP là 2.340.000 đ
  const [baseSalary, setBaseSalary] = useState<number>(2340000);
  const [monthsCount, setMonthsCount] = useState<number>(12); // Default 1 year

  // Formulas according to Decree 146/2018/NĐ-CP:
  // Total contribution rate: 4.5% of base salary
  // State support: at least 30%
  // Student self-contribution: 70%
  const monthlyTotal = baseSalary * 0.045;
  const stateSupportMonthly = monthlyTotal * 0.3;
  const studentPayMonthly = monthlyTotal * 0.7;

  const studentPayTotal = Math.round(studentPayMonthly * monthsCount);
  const stateSupportTotal = Math.round(stateSupportMonthly * monthsCount);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-sky-700 block">
              Chuyên Đề 03
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pháp Luật Về Bảo Hiểm Y Tế & Xã Hội
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Bảo hiểm y tế (BHYT) là chính sách an sinh bắt buộc được Nhà nước trợ cấp 30% kinh phí.
          Cẩm nang giúp sinh viên nắm rõ quyền lợi khám chữa bệnh, mức hỗ trợ viện phí, phân biệt rõ
          BHYT sinh viên với BHXH khi đi làm, và hướng dẫn dùng thẻ điện tử qua VssID/VNeID.
        </p>

        {/* Sub-Navigation Tabs */}
        <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
          {[
            { id: 'student-bhyt', label: 'BHYT Sinh viên', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'comparison', label: 'Bảng so sánh BHYT vs BHXH', icon: <Scale className="w-4 h-4" /> },
            { id: 'calculator', label: 'Bộ tính tiền đóng BHYT', icon: <FileCheck className="w-4 h-4" /> },
            { id: 'digital-card', label: 'Khám bệnh không thẻ giấy (VssID)', icon: <Smartphone className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                subTab === tab.id
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SubTab 1: BHYT Sinh Vien Detail */}
      {subTab === 'student-bhyt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                Đối tượng tham gia
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Học sinh, Sinh viên Bắt buộc
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Theo Luật Bảo hiểm y tế, toàn bộ học sinh - sinh viên đang theo học tại các trường đại học, cao đẳng, trung cấp đều thuộc diện bắt buộc tham gia BHYT tại cơ sở giáo dục.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                Mức hỗ trợ ngân sách
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Nhà nước hỗ trợ tối thiểu 30%
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ngân sách Nhà nước chi trả ít nhất 30% mức đóng BHYT của sinh viên. Sinh viên chỉ cần đóng 70% mức đóng quy định theo mức lương cơ sở hàng năm.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                Mức thanh toán viện phí
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Hưởng đến 80% - 100%
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khi khám chữa bệnh đúng tuyến, quỹ BHYT chi trả 80% chi phí. Hưởng 100% tại trạm y tế xã hoặc khi chi phí 1 lần KCB thấp hơn 15% mức lương cơ sở.
              </p>
            </div>
          </div>

          {/* Core Rules Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Chế Độ Quyền Lợi Khám Chữa Bệnh (KCB) Sinh Viên Cần Nắm Chắc
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Căn cứ theo Luật BHYT 2008 (sửa đổi, bổ sung 2014) và Nghị định 146/2018/NĐ-CP.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="space-y-3 p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                <h3 className="text-sm font-bold text-sky-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  Quyền lợi khi KCB Đúng tuyến
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-700 font-bold">•</span>
                    <span>
                      <strong>Hưởng 80% chi phí KCB:</strong> Quỹ BHYT chi trả 80%, sinh viên cùng chi trả 20% trong phạm vi quyền lợi BHYT.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-700 font-bold">•</span>
                    <span>
                      <strong>Hưởng 100% chi phí KCB tại Tuyến xã/phường:</strong> Khám tại trạm y tế xã, phường, trạm y tế trường học được thanh toán toàn bộ 100%.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-700 font-bold">•</span>
                    <span>
                      <strong>Hưởng 100% khi chi phí nhỏ:</strong> Khi chi phí cho 01 lần KCB thấp hơn 15% mức lương cơ sở (dưới ~351.000đ).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-700 font-bold">•</span>
                    <span>
                      <strong>Quyền lợi 5 năm liên tục:</strong> Đã tham gia BHYT đủ 5 năm liên tục và có số tiền cùng chi trả trong năm lớn hơn 6 tháng lương cơ sở thì được hưởng 100% cho các lần khám tiếp theo trong năm.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Quyền lợi khi KCB Trái tuyến & Cấp cứu
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>
                      <strong>Cấp cứu khẩn cấp:</strong> Trường hợp cấp cứu, sinh viên được đến KCB tại BẤT KỲ cơ sở y tế nào và vẫn được hưởng quyền lợi như đúng tuyến.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>
                      <strong>Thông tuyến huyện:</strong> Tự đi KCB ngoại trú hoặc nội trú tại bệnh viện tuyến huyện trên TOÀN QUỐC được hưởng 100% mức quyền lợi như đúng tuyến.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>
                      <strong>Thông tuyến tỉnh nội trú:</strong> Tự đi điều trị nội trú tại bệnh viện tuyến tỉnh được thanh toán 100% chi phí điều trị nội trú theo mức hưởng.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>
                      <strong>Tuyến Trung ương:</strong> Nếu tự vượt tuyến lên bệnh viện Trung ương (như Bạch Mai, Việt Đức, Chợ Rẫy...) điều trị nội trú chỉ được hưởng 40% chi phí.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Comparison Student vs Formal Employee */}
      {subTab === 'comparison' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-sky-700" />
              Bảng Phân Biệt: BHYT Sinh Viên vs BHXH Người Lao Động Đi Làm
            </h2>
            <p className="text-xs text-slate-500">
              Rất nhiều sinh viên thắc mắc: Đi làm part-time có phải đóng BHXH không? Có bị đóng trùng thẻ BHYT không?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                  <th className="p-3.5 font-bold">Tiêu chí phân biệt</th>
                  <th className="p-3.5 font-bold text-sky-800 bg-sky-50/70">
                    BHYT Sinh Viên (Tại trường)
                  </th>
                  <th className="p-3.5 font-bold text-indigo-900 bg-indigo-50/70">
                    BHXH Bắt Buộc (Khi đi làm)
                  </th>
                  <th className="p-3.5 font-bold text-emerald-900 bg-emerald-50/70">
                    BHXH Tự Nguyện
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Đối tượng áp dụng</td>
                  <td className="p-3.5 bg-sky-50/30">Học sinh, sinh viên đang theo học tại trường.</td>
                  <td className="p-3.5 bg-indigo-50/30">
                    Người lao động ký HĐLĐ từ <strong>đủ 01 tháng trở lên</strong> (kể cả sinh viên đi làm có HĐLĐ).
                  </td>
                  <td className="p-3.5 bg-emerald-50/30">
                    Công dân Việt Nam từ đủ 15 tuổi trở lên không thuộc diện đóng bắt buộc.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Tính chất pháp lý</td>
                  <td className="p-3.5 bg-sky-50/30 font-semibold text-rose-700">Bắt buộc tham gia</td>
                  <td className="p-3.5 bg-indigo-50/30 font-semibold text-rose-700">Bắt buộc tham gia</td>
                  <td className="p-3.5 bg-emerald-50/30 text-emerald-700 font-semibold">Tự nguyện lựa chọn</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Mức đóng & Trợ cấp</td>
                  <td className="p-3.5 bg-sky-50/30">
                    • 4,5% lương cơ sở.<br />
                    • Nhà nước hỗ trợ ≥ 30%.<br />
                    • Sinh viên chỉ nộp 70% (~73.710đ/tháng).
                  </td>
                  <td className="p-3.5 bg-indigo-50/30">
                    • NLĐ đóng <strong>10,5%</strong> tiền lương (8% BHXH, 1,5% BHYT, 1% BHTN).<br />
                    • Doanh nghiệp đóng <strong>21,5%</strong>.
                  </td>
                  <td className="p-3.5 bg-emerald-50/30">
                    • 22% mức thu nhập do người tham gia lựa chọn.<br />
                    • Nhà nước hỗ trợ theo chuẩn nghèo.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Các chế độ được hưởng</td>
                  <td className="p-3.5 bg-sky-50/30">
                    Khám chữa bệnh, phục hồi chức năng, thuốc men trong danh mục BHYT (80% - 100%).
                  </td>
                  <td className="p-3.5 bg-indigo-50/30">
                    Đầy đủ <strong>5 chế độ</strong>:<br />
                    1. Ốm đau (nghỉ việc có lương BHXH)<br />
                    2. Thai sản<br />
                    3. Tai nạn lao động - Bệnh nghề nghiệp<br />
                    4. Hưu trí (lương hưu)<br />
                    5. Tử tuất
                  </td>
                  <td className="p-3.5 bg-emerald-50/30">
                    Hưởng 2 chế độ dài hạn:<br />
                    • Hưu trí (lương hưu)<br />
                    • Tử tuất
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Quy tắc chống đóng trùng</td>
                  <td colSpan={3} className="p-3.5 bg-amber-50 text-amber-950 font-medium">
                    ⚡ <strong>Lưu ý quan trọng cho sinh viên:</strong> Nếu sinh viên đi làm và được công ty ký HĐLĐ từ 1 tháng trở lên, công ty sẽ đóng BHYT theo diện người lao động (1,5%). Khi đó, bạn sẽ <strong>KHÔNG PHẢI ĐÓNG TIỀN BHYT TẠI TRƯỜNG ĐẠI HỌC</strong> nữa! Nếu đã lỡ nộp tiền tại trường, bạn hãy đem bản sao thẻ BHYT công ty cấp lên phòng Công tác sinh viên để được hoàn lại 100% số tiền đã nộp trùng.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 3: BHYT Fee Calculator */}
      {subTab === 'calculator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-8">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-sky-700" />
              Công Cụ Tính Mức Đóng BHYT Sinh Viên Theo Năm Học
            </h2>
            <p className="text-xs text-slate-500">
              Công thức: Mức đóng/tháng = 4,5% x Mức lương cơ sở. Sinh viên tự đóng 70%, Ngân sách Nhà nước hỗ trợ 30%.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  1. Mức lương cơ sở hiện hành (VNĐ/tháng)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(Math.max(1000000, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base font-bold text-slate-900 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Mức lương cơ sở từ 01/07/2024 theo Nghị định 73/2024/NĐ-CP là <strong>2.340.000 đ/tháng</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  2. Chọn số tháng đóng theo đợt nhà trường thu
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { months: 3, label: '3 tháng' },
                    { months: 6, label: '6 tháng' },
                    { months: 9, label: '9 tháng' },
                    { months: 12, label: '12 tháng (1 năm)' },
                  ].map((m) => (
                    <button
                      key={m.months}
                      type="button"
                      onClick={() => setMonthsCount(m.months)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        monthsCount === m.months
                          ? 'bg-sky-50 border-sky-600 text-sky-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-1">
                <span className="font-bold block">Chính sách hỗ trợ bổ sung của địa phương:</span>
                <p>
                  Một số tỉnh/thành phố như Hà Nội, TP.HCM, Đà Nẵng, Quảng Ninh... có chính sách trích thêm ngân sách địa phương hỗ trợ thêm từ 10% đến 100% tiền đóng BHYT cho học sinh sinh viên có hoàn cảnh khó khăn hoặc cận nghèo.
                </p>
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-sky-300">
                  Số tiền sinh viên thực nộp ({monthsCount} tháng)
                </span>

                <div className="border-b border-slate-800 pb-4">
                  <p className="text-3xl sm:text-4xl font-black font-mono text-sky-400 mt-1">
                    {studentPayTotal.toLocaleString('vi-VN')} đ
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tương đương: {Math.round(studentPayMonthly).toLocaleString('vi-VN')} đ/tháng
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Tổng mức đóng chuẩn theo luật (4,5%):</span>
                    <span className="font-mono">
                      {Math.round(monthlyTotal * monthsCount).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Ngân sách Nhà nước hỗ trợ chi trả (30%):</span>
                    <span className="font-mono">
                      -{stateSupportTotal.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sky-300 font-bold pt-2 border-t border-slate-800">
                    <span>Sinh viên tự đóng (70%):</span>
                    <span className="font-mono">{studentPayTotal.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300">
                <p>
                  Thẻ BHYT có giá trị sử dụng liên tục trong thời gian theo học. Đóng đủ 5 năm liên tục giúp nâng mức hưởng viện phí lên 100%.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Digital Health Card with VssID & VNeID */}
      {subTab === 'digital-card' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-sky-700" />
              Đi Khám Bệnh Không Cần Mang Thẻ Giấy: Ứng Dụng VssID & VNeID
            </h2>
            <p className="text-xs text-slate-500">
              Hiện nay 100% cơ sở khám chữa bệnh BHYT trên toàn quốc đã chấp nhận thẻ điện tử thay thế thẻ giấy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">
                  1
                </span>
                Sử dụng Thẻ BHYT trên app VssID
              </h3>
              <p className="text-slate-600 leading-relaxed">
                VssID là ứng dụng BHXH số chính thức của Bảo hiểm xã hội Việt Nam.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>Mở ứng dụng VssID và đăng nhập bằng mã số BHXH/CCCD.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>Chọn mục <strong>&quot;Thẻ BHYT&quot;</strong> để hiển thị hình ảnh thẻ BHYT có mã QR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>Xuất trình cho nhân viên tiếp đón tại bệnh viện để quét mã tiếp nhận khám bệnh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>Xem được chi tiết lịch sử khám chữa bệnh và đơn thuốc đã hưởng BHYT.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
                  2
                </span>
                Sử dụng CCCD gắn chip hoặc App VNeID mức 2
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Tích hợp dữ liệu BHYT quốc gia trực tiếp vào thẻ Căn cước công dân.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Chỉ cần đưa thẻ CCCD gắn chip cho nhân viên bệnh viện để quét đầu đọc chip.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Hoặc mở app VNeID &gt; Vào mục <strong>&quot;Ví giấy tờ&quot;</strong> &gt; Chọn <strong>&quot;Thẻ BHYT&quot;</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Không còn lo bị rách, mất hoặc quên thẻ BHYT giấy ở quê nhà.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
