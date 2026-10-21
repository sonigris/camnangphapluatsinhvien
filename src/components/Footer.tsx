import React from 'react';
import { ActiveTab } from '../types/legal';
import { Scale, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About App */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                CẨM NANG PHÁP LUẬT CHO SINH VIÊN
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              Nền tảng trang bị tri thức và kỹ năng pháp lý thực tế cho sinh viên Việt Nam.
              Tập trung giải quyết các vướng mắc phổ biến nhất khi đi làm thêm, tìm phòng trọ
              và quyền lợi bảo hiểm y tế, bảo hiểm xã hội.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Nội dung viện dẫn từ Bộ luật Lao động 2019, Bộ luật Dân sự 2015 & Luật Nhà ở 2023.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
              Chủ đề chính
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('employment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Việc làm thêm & Tiền lương
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('housing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Thuê trọ & Cọc phòng
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('insurance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Bảo hiểm Y tế & Xã hội
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('assistant'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left text-indigo-400 font-medium"
                >
                  Trợ lý Pháp lý Gemini AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Project Info */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400">
              Thông tin tác giả
            </h4>
            <div className="text-sm space-y-1 text-slate-300">
              <p className="font-semibold text-white">Phan Hải Sơn</p>
              <p className="text-slate-400">Mã sinh viên: <span className="text-indigo-400 font-mono">PH72830</span></p>
              <p className="text-slate-400">Sản phẩm: Cẩm nang pháp luật cho sinh viên</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Xem chi tiết thông tin đồ án →
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Tuyên bố miễn trừ trách nhiệm pháp lý:</strong> Toàn bộ nội dung trong Cẩm nang nhằm mục đích nâng cao nhận thức và hiểu biết pháp luật cộng đồng dành cho sinh viên. Mọi giải pháp và hướng dẫn mang tính chất tham khảo học thuật và ứng xử thực tiễn. Đối với các tranh chấp có tính chất phức tạp, giá trị tranh chấp lớn hoặc dấu hiệu tội phạm hình sự, đương sự nên liên hệ Trung tâm Trợ giúp pháp lý Nhà nước hoặc luật sư được cấp chứng chỉ hành nghề để nhận sự hỗ trợ pháp lý chính thức.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-400 gap-2">
            <p>© {new Date().getFullYear()} Cẩm nang Pháp luật cho Sinh viên Việt Nam.</p>
            <p className="flex items-center gap-1">
              Phát triển bởi <span className="text-slate-200 font-medium">Phan Hải Sơn (PH72830)</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
