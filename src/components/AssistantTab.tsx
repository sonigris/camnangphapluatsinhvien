import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/legal';
import {
  Bot,
  Send,
  User,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Scale,
  ShieldCheck,
} from 'lucide-react';

const STORAGE_KEY_CHAT = 'student_legal_chat_history_v1';

const SUGGESTED_PROMPTS = [
  'Chủ quán giữ CCCD của em và bắt đóng cọc 500k có đúng luật không?',
  'Chủ nhà trọ đòi tăng tiền phòng giữa chừng hợp đồng thì em phải xử lý thế nào?',
  'Sinh viên đi làm thêm ca đêm từ 22h đến 2h sáng được tính lương ra sao?',
  'Đi làm part-time có hợp đồng 3 tháng thì có phải đóng BHXH bắt buộc không?',
  'Chủ trọ dọa đuổi trong 3 ngày và giữ sạch 3 triệu tiền cọc thì em làm gì?',
  'Em quên thẻ BHYT giấy ở quê thì đi khám bệnh ở thành phố thế nào?',
];

export const AssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading chat history', e);
    }
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: `Xin chào bạn! Tôi là **Trợ lý Tư vấn Pháp lý Sinh viên**, sử dụng trí tuệ nhân tạo Gemini.

Tôi sẵn sàng hỗ trợ bạn giải đáp các vấn đề pháp luật thực tế liên quan đến:
1. **Việc làm thêm:** Hợp đồng part-time, mức lương tối thiểu theo giờ (NĐ 74/2024), thử việc, làm thêm giờ, cấm giữ CCCD/thu cọc.
2. **Thuê trọ:** Hợp đồng thuê nhà, tiền đặt cọc (Điều 328 BLDS), giá điện nước sinh hoạt, quyền đơn phương chấm dứt hợp đồng.
3. **Bảo hiểm:** Quyền lợi BHYT sinh viên (80%), BHXH khi đi làm, KCB bằng CCCD/VssID.

Mọi câu trả lời của tôi luôn tuân thủ nguyên tắc: **Trình bày rõ vấn đề, hướng xử lý tham khảo và căn cứ điều luật cụ thể; không tự bịa đặt điều luật hay số liệu.**

Bạn đang gặp khó khăn gì? Hãy nhập câu hỏi hoặc chọn các tình huống gợi ý bên dưới!`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Persist chat history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(messages));
    } catch (e) {
      console.error('Error saving chat', e);
    }
  }, [messages]);

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    setInputQuery('');
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/legal-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Máy chủ không phản hồi câu trả lời.');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(
        err.message || 'Không thể kết nối đến Trợ lý AI. Vui lòng kiểm tra lại kết nối mạng hoặc cấu hình hệ thống.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện không?')) {
      const initialMessage: ChatMessage = {
        id: 'welcome-reset',
        role: 'model',
        content: 'Lịch sử đã được làm mới. Bạn có câu hỏi pháp lý nào cần giải đáp không?',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMessage]);
      localStorage.removeItem(STORAGE_KEY_CHAT);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to render markdown bold, headers, and bullet points
  const formatMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-sm font-bold text-indigo-900 mt-3 mb-1 uppercase tracking-wider">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-base font-bold text-slate-900 mt-3 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet points
      if (line.startsWith('• ') || line.startsWith('- ') || line.startsWith('* ')) {
        const bulletText = line.substring(2);
        return (
          <div key={index} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-indigo-600 font-bold shrink-0 mt-0.5">•</span>
            <div>{renderInlineFormatting(bulletText)}</div>
          </div>
        );
      }
      // Numbered items
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={index} className="my-1 pl-1 font-medium text-slate-800">
            {renderInlineFormatting(line)}
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={index} className="h-2" />;
      }
      // Normal paragraph
      return (
        <p key={index} className="my-1 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    // Process **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-700 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Trợ Lý Tư Vấn Pháp Lý Sinh Viên
              </h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tư vấn thực tế · Không bịa đặt số điều luật · Dẫn chiếu quy định rõ ràng
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
          title="Xóa lịch sử hội thoại"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Làm mới hội thoại</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col h-[650px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/40">
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-2xs mt-1 ${
                    isBot ? 'bg-indigo-700' : 'bg-slate-700'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                    isBot
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <div className="space-y-1">{formatMarkdown(msg.content)}</div>

                  {/* Message Meta & Actions */}
                  <div
                    className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${
                      isBot ? 'border-slate-100 text-slate-400' : 'border-indigo-500 text-indigo-200'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {isBot && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Sao chép câu trả lời"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-xl bg-indigo-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                <span>Trợ lý Gemini đang phân tích quy định pháp luật và soạn thảo hướng dẫn...</span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block">Không thể gửi câu hỏi:</strong>
                <span>{errorMessage}</span>
                <p className="mt-1 text-[11px] text-rose-700">
                  Lưu ý: Khóa API được cấu hình trên máy chủ thông qua biến môi trường <code>GEMINI_API_KEY</code> trong bảng <strong>Settings &gt; Secrets</strong> của AI Studio.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Area */}
        <div className="p-3 bg-white border-t border-slate-200">
          <div className="flex items-center gap-1.5 mb-2 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Câu hỏi gợi ý nhanh:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200 whitespace-nowrap transition-colors shrink-0 text-left disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Nhập tình huống hoặc câu hỏi pháp lý của bạn... (Nhấn Enter để gửi, Shift+Enter xuống dòng)"
            className="flex-1 p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuery.trim()}
            className="h-11 px-5 rounded-xl bg-indigo-700 hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Gửi</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
