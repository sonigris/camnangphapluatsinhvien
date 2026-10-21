export type ActiveTab =
  | 'home'
  | 'employment'
  | 'housing'
  | 'insurance'
  | 'assistant'
  | 'about'
  | 'sources';

export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  situation: string;
  legalAnalysis: string;
  practicalAction: string[];
  legalReference: string;
  riskLevel: 'Thấp' | 'Trung bình' | 'Cao' | 'Nghiêm trọng';
  category: 'employment' | 'housing' | 'insurance';
}

export interface LegalArticle {
  id: string;
  title: string;
  category: 'employment' | 'housing' | 'insurance';
  summary: string;
  content: string[];
  keyTakeaways: string[];
  officialReference: string;
  tags: string[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  importance: 'Bắt buộc' | 'Rất quan trọng' | 'Nên có';
  isChecked: boolean;
}

export interface OfficialSource {
  id: string;
  name: string;
  agency: string;
  docCode?: string;
  category: 'Văn bản Luật' | 'Nghị định - Thông tư' | 'Cổng thông tin Quốc gia' | 'Cơ quan Trợ giúp';
  description: string;
  url: string;
  status: 'Còn hiệu lực' | 'Cổng thông tin chính thức';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
