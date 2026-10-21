import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Users,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle,
  Save,
  Edit2,
  Scale,
  Shield,
  HelpCircle,
} from 'lucide-react';

const STORAGE_KEY_GROUP = 'student_about_group_name_v1';

export const AboutTab: React.FC = () => {
  // Group state editable by user
  const [groupName, setGroupName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GROUP);
      if (saved !== null) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'Nhóm 01 - Pháp lý Sinh viên';
  });

  const [isEditingGroup, setIsEditingGroup] = useState<boolean>(false);
  const [tempGroup, setTempGroup] = useState<string>(groupName);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSaveGroup = () => {
    setGroupName(tempGroup);
    setIsEditingGroup(false);
    try {
      localStorage.setItem(STORAGE_KEY_GROUP, tempGroup);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-700 block">
              Thông Tin Sản Phẩm &amp; Tác Giả
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Giới Thiệu Đồ Án Cẩm Nang Pháp Luật
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Sản phẩm ứng dụng web được xây dựng nhằm phổ biến tri thức pháp lý thực tiễn,
          bảo vệ sinh viên Việt Nam trước các rủi ro việc làm, thuê trọ và tối ưu quyền lợi bảo hiểm y tế.
        </p>
      </div>

      {/* Required Profile Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Hồ Sơ Đăng Ký Đồ Án &amp; Thông Tin Sinh Viên
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Các thông tin định danh chính thức của người thực hiện và sản phẩm.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Đã lưu thông tin nhóm!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Field 1: Họ và tên */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Họ và tên tác giả:
            </span>
            <p className="text-xl font-black text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Phan Hải Sơn
            </p>
            <p className="text-xs text-slate-400">Sinh viên thực hiện đồ án</p>
          </div>

          {/* Field 2: Mã sinh viên */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Mã sinh viên (MSSV):
            </span>
            <p className="text-xl font-black font-mono text-indigo-700 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              PH72830
            </p>
            <p className="text-xs text-slate-400">Mã định danh sinh viên</p>
          </div>

          {/* Field 3: Nhóm (Editable) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Nhóm thực hiện:
              </span>
              {!isEditingGroup ? (
                <button
                  onClick={() => {
                    setTempGroup(groupName);
                    setIsEditingGroup(true);
                  }}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa tên nhóm</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveGroup}
                    className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-md font-semibold hover:bg-indigo-700"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu</span>
                  </button>
                  <button
                    onClick={() => setIsEditingGroup(false)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>

            {isEditingGroup ? (
              <input
                type="text"
                value={tempGroup}
                onChange={(e) => setTempGroup(e.target.value)}
                placeholder="Nhập tên hoặc số thứ tự nhóm của bạn..."
                className="w-full px-3 py-2 bg-white border border-indigo-300 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            ) : (
              <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>{groupName || '(Chưa nhập tên nhóm - bấm Chỉnh sửa để điền)'}</span>
              </p>
            )}
            <p className="text-xs text-slate-400">
              Bạn có thể tự do điền hoặc thay đổi tên nhóm, hệ thống sẽ tự động lưu lại vào trình duyệt.
            </p>
          </div>

          {/* Field 4: Tên sản phẩm */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1 md:col-span-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
              Tên sản phẩm:
            </span>
            <p className="text-xl font-black text-indigo-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-700" />
              Cẩm nang pháp luật cho sinh viên.
            </p>
          </div>

          {/* Field 5: Mục tiêu */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              Mục tiêu &amp; Sứ mệnh của cẩm nang:
            </span>
            <p className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
              &quot;Giúp sinh viên Việt Nam tìm hiểu pháp luật thực tế liên quan đến việc làm thêm, thuê trọ và bảo hiểm.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Mission & Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Nội dung chuẩn xác &amp; có căn cứ
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Viện dẫn trực tiếp từ các văn bản quy phạm pháp luật đang có hiệu lực như Bộ luật Lao động 2019,
            Bộ luật Dân sự 2015, Luật Nhà ở 2023 và Luật Bảo hiểm y tế.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Hướng dẫn hành động thực tiễn
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Không chỉ trích dẫn lý thuyết khô khan, cẩm nang cung cấp các bước xử lý cụ thể,
            danh sách kiểm tra (checklist) 16 điểm và cách phản ánh tới cơ quan thẩm quyền.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Trợ lý AI Gemini an toàn &amp; bảo mật
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tích hợp mô hình Gemini qua máy chủ an toàn (server-side proxy). Tuyệt đối không để lộ
            khóa API ra phía client và áp dụng nguyên tắc nói không với bịa đặt điều luật.
          </p>
        </div>
      </div>
    </div>
  );
};
