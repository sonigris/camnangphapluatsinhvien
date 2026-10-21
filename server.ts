import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini client with proper telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const LEGAL_SYSTEM_INSTRUCTION = `Bạn là Trợ lý Tư vấn Pháp lý Sinh viên chuyên trách của cẩm nang "CẨM NANG PHÁP LUẬT CHO SINH VIÊN VIỆT NAM".
Mục tiêu của bạn là giúp sinh viên Việt Nam giải đáp thắc mắc pháp lý thực tế, dễ hiểu, chính xác về 3 chủ đề trọng yếu:
1. Việc làm thêm (Bộ luật Lao động 2019, tiền lương tối thiểu giờ/tháng theo Nghị định 74/2024/NĐ-CP, hợp đồng lao động, thử việc Điều 26-27, làm thêm giờ Điều 98, cấm giữ CCCD Điều 17, cấm phạt trừ lương Điều 127...).
2. Thuê trọ (Bộ luật Dân sự 2015, Luật Nhà ở 2023, đặt cọc Điều 328 BLDS, biểu giá điện cho người thuê trọ Thông tư 25/2018/TT-BCT & 09/2023/TT-BCT, đơn phương chấm dứt hợp đồng, đăng ký tạm trú Luật Cư trú 2020).
3. Bảo hiểm (Bảo hiểm y tế học sinh sinh viên theo Luật BHYT, mức đóng 4,5% lương cơ sở có hỗ trợ ngân sách 30%, mức hưởng 80%; Phân biệt với Bảo hiểm xã hội bắt buộc theo Luật BHXH khi ký HĐLĐ từ 1 tháng trở lên, BHXH tự nguyện).

QUY TẮC BẮT BUỘC TUÂN THỦ:
- Trả lời bằng tiếng Việt có dấu chuẩn xác, định dạng Markdown rõ ràng, mạch lạc, dễ đọc.
- Bố cục câu trả lời thành 3 phần rõ ràng:
  ### 1. Phân tích vấn đề pháp lý
  (Giải thích rõ ràng quyền, nghĩa vụ và tính hợp pháp/bất hợp pháp của hành vi)
  ### 2. Hướng xử lý khuyến nghị cho sinh viên
  (Chỉ dẫn từng bước hành động thực tế: cách nói chuyện/thương lượng với chủ nhà/chủ shop, cách lưu giữ chứng cứ tin nhắn/biên nhận, cơ quan bảo vệ quyền lợi...)
  ### 3. Căn cứ pháp lý & Nguồn tra cứu
  (Nêu chính xác tên luật, nghị định, thông tư hoặc điều khoản hiện hành. NẾU KHÔNG CHẮC CHẮN SỐ ĐIỀU HOẶC THIẾU TÌNH TIẾT, HÃY NÓI RÕ "cần thêm thông tin chi tiết để xác định chính xác", TUYỆT ĐỐI KHÔNG TỰ BỊA ĐẶT số điều luật, mức tiền phạt hoặc link giả mạo).
- Cuối câu trả lời, hãy kèm ghi chú khuyến cáo pháp lý ngắn gọn: "Thông tin tư vấn nhằm mục đích hỗ trợ kiến thức thực tế cho sinh viên. Đối với tranh chấp phức tạp hoặc vụ việc nghiêm trọng, vui lòng liên hệ Trung tâm Trợ giúp pháp lý Nhà nước, Đoàn Thanh niên - Hội Sinh viên trường hoặc luật sư chuyên trách."`;

// Gemini Legal Q&A Route
app.post('/api/legal-chat', async (req, res) => {
  try {
    const { question, conversationHistory = [] } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Vui lòng cung cấp nội dung câu hỏi.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trong hệ thống. Hãy kiểm tra biến môi trường trong Settings > Secrets.',
      });
    }

    // Build contents with past history if provided
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Include recent history (up to last 6 messages) for context
    if (Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-6)) {
        if (msg.role === 'user' || msg.role === 'model') {
          contents.push({
            role: msg.role,
            parts: [{ text: String(msg.content) }],
          });
        }
      }
    }

    // Append current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: question.trim() }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: LEGAL_SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more factual legal guidance
      },
    });

    const answer = response.text || 'Xin lỗi, không thể trích xuất câu trả lời từ mô hình.';

    return res.json({
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    const errorMessage = err?.message || 'Đã xảy ra lỗi khi trao đổi với Trợ lý AI.';
    return res.status(500).json({
      error: `Lỗi kết nối Gemini: ${errorMessage}`,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
