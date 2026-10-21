import React, { useState } from 'react';
import { OFFICIAL_LEGAL_SOURCES } from '../data/legalContent';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scale,
} from 'lucide-react';

export const SourcesTab: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất cả nguồn' },
    { id: 'Văn bản Luật', label: 'Văn bản Luật' },
    { id: 'Nghị định - Thông tư', label: 'Nghị định - Thông tư' },
    { id: 'Cổng thông tin Quốc gia', label: 'Cổng thông tin Quốc gia' },
  ];

  const filteredSources = OFFICIAL_LEGAL_SOURCES.filter((source) => {
    const matchesCat = filterCategory === 'all' || source.category === filterCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      source.name.toLowerCase().includes(q) ||
      source.agency.toLowerCase().includes(q) ||
      source.description.toLowerCase().includes(q) ||
      (source.docCode && source.docCode.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ExternalLink className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 block">
              Tính Minh Bạch &amp; Căn Cứ Tra Cứu
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Danh Mục Nguồn Pháp Luật Tham Khảo
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Toàn bộ kiến thức trong cẩm nang được tổng hợp và đối chiếu từ các nguồn văn bản pháp quy
          chính thức của Nhà nước Việt Nam. Dưới đây là danh sách chi tiết các đạo luật, nghị định,
          thông tư và cổng thông tin chính thống có liên kết tra cứu trực tiếp.
        </p>

        {/* Filter & Search Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  filterCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Lọc theo tên văn bản, cơ quan..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Official Government Portals Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://vbpl.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 px-2 py-0.5 rounded bg-emerald-50">
              Bộ Tư pháp
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Cơ sở dữ liệu Quốc gia về Văn bản Pháp luật (vbpl.vn)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hệ thống chính thức lưu trữ toàn văn văn bản quy phạm pháp luật, chỉ rõ tình trạng hiệu lực và văn bản sửa đổi.
          </p>
        </a>

        <a
          href="https://chinhphu.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 px-2 py-0.5 rounded bg-sky-50">
              Văn phòng Chính phủ
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
            Cổng Thông tin điện tử Chính phủ (chinhphu.vn)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Công bố kịp thời các Nghị định, Quyết định và giải đáp chính sách pháp luật trực tiếp cho người dân và doanh nghiệp.
          </p>
        </a>

        <a
          href="https://baohiemxahoi.gov.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 px-2 py-0.5 rounded bg-indigo-50">
              BHXH Việt Nam
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
            Cổng Thông tin điện tử Bảo hiểm xã hội Việt Nam
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Cơ quan tổ chức thực hiện chính sách BHYT sinh viên và BHXH; cung cấp tra cứu giá trị thẻ BHYT và ứng dụng VssID.
          </p>
        </a>
      </div>

      {/* Source Items Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-700" />
          Danh Sách Chi Tiết ({filteredSources.length} nguồn)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {source.category}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {source.status}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {source.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{source.agency}</span>
                  {source.docCode && (
                    <span className="font-mono text-slate-400">· Số: {source.docCode}</span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {source.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Nguồn công khai</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
                >
                  <span>Xem toàn văn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide: How to verify legal validity */}
      <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="flex items-center gap-2 text-white">
          <Scale className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold">
            Kỹ Năng Cho Sinh Viên: Cách Tự Kiểm Tra Hiệu Lực Của Một Văn Bản Luật
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Pháp luật có tính thời điểm và thường xuyên được sửa đổi, bổ sung. Khi tìm hiểu hoặc tranh tụng,
          sinh viên cần tự kiểm chứng tình trạng hiệu lực theo các bước sau:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-2">
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <strong className="text-white block font-semibold">1. Kiểm tra ngày có hiệu lực</strong>
            <p className="text-slate-400">
              Văn bản chỉ áp dụng sau ngày có hiệu lực thi hành được ghi ở điều khoản cuối cùng của văn bản.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <strong className="text-white block font-semibold">2. Kiểm tra văn bản sửa đổi</strong>
            <p className="text-slate-400">
              Tra cứu trên vbpl.vn mục &quot;Lược đồ&quot; để biết điều khoản nào đã bị sửa đổi bởi luật mới hơn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <strong className="text-white block font-semibold">3. Tra cứu văn bản hướng dẫn</strong>
            <p className="text-slate-400">
              Luật thường có Nghị định của Chính phủ và Thông tư của Bộ chuyên ngành hướng dẫn chi tiết thi hành.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
