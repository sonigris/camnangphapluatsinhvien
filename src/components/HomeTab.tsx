import React, { useState } from 'react';
import { ActiveTab } from '../types/legal';
import {
  Briefcase,
  Home as HomeIcon,
  Shield,
  Bot,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  HelpCircle,
  TrendingUp,
  Scale,
} from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab, onOpenSearch }) => {
  // Mini interactive Quiz: "Nhận biết bẫy pháp lý sinh viên"
  const [quizAnswer, setQuizAnswer] = useState<{ [key: number]: number | null }>({
    1: null,
    2: null,
    3: null,
  });

  const quizQuestions = [
    {
      id: 1,
      question: 'Chủ quán trà sữa giữ bản gốc CCCD của bạn và thu 500.000đ "cọc giữ chỗ nhận việc". Đúng hay sai?',
      options: [
        { text: 'A. Đúng, chủ quán có quyền tự đặt quy định tuyển dụng nội bộ.', isCorrect: false },
        { text: 'B. Sai hoàn toàn. Điều 17 Bộ luật Lao động nghiêm cấm giữ CCCD và cấm thu cọc việc làm.', isCorrect: true },
        { text: 'C. Đúng nếu sinh viên tự nguyện đồng ý ký tên.', isCorrect: false },
      ],
      explanation: 'Điều 17 BLLĐ 2019 nghiêm cấm người sử dụng lao động giữ bản chính giấy tờ tùy thân và cấm yêu cầu tiền cọc. Hành vi này có thể bị xử phạt hành chính từ 20 đến 25 triệu đồng!',
    },
    {
      id: 2,
      question: 'Chủ nhà trọ thu tiền điện 4.500đ/kWh của sinh viên vì lý do "giá thị trường tự do". Đúng hay sai?',
      options: [
        { text: 'A. Đúng, giá điện phòng trọ do hai bên tự do thỏa thuận.', isCorrect: false },
        { text: 'B. Sai. Bộ Công Thương quy định áp giá bậc 3 hoặc cấp định mức; thu vượt giá bị phạt tới 30 triệu.', isCorrect: true },
        { text: 'C. Đúng nếu phòng có trang bị máy lạnh.', isCorrect: false },
      ],
      explanation: 'Theo Thông tư 25/2018/TT-BCT và Nghị định 134/2013/NĐ-CP (sửa đổi), chủ trọ thu sai giá điện sinh hoạt của người thuê nhà bị phạt tiền từ 20.000.000đ đến 30.000.000đ.',
    },
    {
      id: 3,
      question: 'Sinh viên tham gia Bảo hiểm y tế tại trường học được Nhà nước hỗ trợ bao nhiêu phần trăm mức đóng?',
      options: [
        { text: 'A. Nhà nước không hỗ trợ, sinh viên tự đóng 100%.', isCorrect: false },
        { text: 'B. Hỗ trợ tối thiểu 30% mức đóng, sinh viên chỉ tự đóng 70%.', isCorrect: true },
        { text: 'C. Nhà nước hỗ trợ 50% mức đóng.', isCorrect: false },
      ],
      explanation: 'Theo Luật Bảo hiểm y tế, học sinh sinh viên là đối tượng được Ngân sách Nhà nước hỗ trợ tối thiểu 30% mức đóng BHYT, chỉ cần đóng 70%.',
    },
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5 text-indigo-300" />
            <span>Pháp lý thực tiễn - Vững bước giảng đường</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Cẩm Nang Pháp Luật <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-sky-300 to-emerald-300">
              Dành Cho Sinh Viên
            </span>
          </h1>

          <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed max-w-2xl">
            Trang bị kiến thức pháp lý nền tảng và thực tiễn để bảo vệ quyền lợi chính đáng
            của sinh viên Việt Nam khi <strong>tìm việc làm thêm</strong>,{' '}
            <strong>thuê phòng trọ</strong> và <strong>sử dụng thẻ bảo hiểm</strong>.
          </p>

          {/* Quick Search Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center justify-between px-5 py-3.5 bg-white text-slate-800 hover:bg-slate-100 rounded-xl font-semibold shadow-md transition-all text-sm gap-4"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Tra cứu tình huống, điều luật, quyền lợi...</span>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-medium">
                Tìm kiếm
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all text-sm shadow-md"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi Trợ lý AI Gemini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -top-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 4 Key Numbers to Remember for Students */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Lương tối thiểu giờ (Vùng I)
          </span>
          <p className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono">
            23.800 đ<span className="text-xs text-slate-500 font-sans font-normal">/giờ</span>
          </p>
          <p className="text-xs text-slate-500 pt-1">
            Theo NĐ 74/2024/NĐ-CP. Nghiêm cấm chủ cơ sở trả dưới mức này.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Lương thử việc tối thiểu
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
            85%
          </p>
          <p className="text-xs text-slate-500 pt-1">
            Điều 26 BLLĐ 2019. Không được trả 50% hay bóc lột thử việc miễn phí.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Hỗ trợ BHYT Sinh viên
          </span>
          <p className="text-2xl sm:text-3xl font-black text-sky-700 font-mono">
            ≥ 30%
          </p>
          <p className="text-xs text-slate-500 pt-1">
            Ngân sách Nhà nước hỗ trợ tối thiểu 30%; sinh viên chỉ đóng 70%.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Mức phạt thu điện sai giá
          </span>
          <p className="text-2xl sm:text-3xl font-black text-rose-700 font-mono">
            20 - 30 tr
          </p>
          <p className="text-xs text-slate-500 pt-1">
            Nghị định 134/2013/NĐ-CP phạt chủ trọ thu giá điện sinh hoạt quá mức.
          </p>
        </div>
      </section>

      {/* 3 Core Thematic Cards */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              3 Trọng Tâm Pháp Lý Sinh Viên Cần Nắm
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Phân tích chi tiết quy định, rủi ro thường gặp và cẩm nang hành động thực tế.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Cập nhật theo quy định pháp luật hiện hành
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Việc làm thêm */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-700">
                  Chủ đề 01
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-indigo-700 transition-colors">
                  Việc Làm Thêm
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Bộ luật Lao động 2019 & Nghị định 74/2024
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quy định hợp đồng làm việc bán thời gian (part-time).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Lương tối thiểu theo giờ & phụ cấp ca đêm (≥30%), OT (≥150%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Cấm giữ bản gốc CCCD và cấm thu cọc việc làm.</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('employment')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Xem hướng dẫn việc làm thêm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Thuê trọ */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                  Chủ đề 02
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-amber-800 transition-colors">
                  Thuê Phòng Trọ
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Bộ luật Dân sự 2015 & Luật Nhà ở 2023
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Các điều khoản thiết yếu trong hợp đồng thuê trọ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bảo vệ tiền đặt cọc (Điều 328) & cam kết hoàn trả.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Biểu giá điện nước theo quy định Bộ Công Thương.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Danh sách 16 điểm kiểm tra an toàn trước khi đặt bút ký.</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('housing')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Xem hướng dẫn thuê trọ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Bảo hiểm */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-sky-700">
                  Chủ đề 03
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-sky-800 transition-colors">
                  Bảo Hiểm Y Tế & Xã Hội
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Luật BHYT 2008 & Luật BHXH 2014
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>BHYT bắt buộc sinh viên & quyền lợi thanh toán 80%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Phân biệt BHYT sinh viên vs BHXH người đi làm có HĐLĐ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cách đi khám chữa bệnh qua ứng dụng VssID và VNeID.</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('insurance')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Xem hướng dẫn bảo hiểm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Spotlight: Trợ lý Pháp lý Gemini AI */}
      <section className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Mô hình Gemini AI kết nối Server-side</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Có thắc mắc cụ thể về vụ việc của bạn?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Hỏi trực tiếp Trợ lý Pháp lý Gemini. Phân tích rõ 3 khía cạnh:{' '}
            <strong>(1) Bản chất vấn đề</strong>,{' '}
            <strong>(2) Hướng xử lý từng bước</strong> và{' '}
            <strong>(3) Căn cứ điều luật cụ thể</strong>. Tuyệt đối không tự bịa luật.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs text-indigo-200">
            <span className="bg-white/10 px-2.5 py-1 rounded-md"># Bị giam lương</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md"># Chủ trọ quỵt cọc</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-md"># BHYT chuyển tuyến</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('assistant')}
          className="shrink-0 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg transition-all flex items-center gap-3 text-base"
        >
          <Bot className="w-5 h-5" />
          <span>Mở khung tư vấn AI ngay</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Mini Quiz: Nhận biết bẫy pháp lý */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Thử Thách Nhanh: Bạn Có Nhận Diện Được Bẫy Pháp Lý?
              </h3>
              <p className="text-xs text-slate-500">
                Chọn câu trả lời để kiểm tra kiến thức tự vệ pháp lý của bạn.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
            3 Câu hỏi
          </span>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q) => {
            const chosen = quizAnswer[q.id];
            return (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
                <p className="text-sm font-bold text-slate-900">
                  Câu {q.id}: {q.question}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosen === optIndex;
                    return (
                      <button
                        key={optIndex}
                        onClick={() => setQuizAnswer((prev) => ({ ...prev, [q.id]: optIndex }))}
                        className={`text-left text-xs sm:text-sm p-3 rounded-xl border transition-all ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                              : 'bg-rose-50 border-rose-400 text-rose-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {chosen !== null && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed mt-2 ${
                      q.options[chosen].isCorrect
                        ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-100/70 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <p className="font-bold">
                      {q.options[chosen].isCorrect ? '✓ Chính xác!' : '✗ Chưa chính xác!'}
                    </p>
                    <p className="mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
