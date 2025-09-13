export interface AbandonedPlace {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  securityLevel: 'none' | 'partial' | 'full';
  addedAt: string;
  tags: string[];
}

export interface SubmissionRequest {
  title: string;
  description: string;
  location: string;
  securityLevel: 'none' | 'partial' | 'full';
  tags: string[];
  contactMethod: 'telegram' | 'email';
  contactValue: string;
  submittedAt: string;
}

export type SecurityLevel = 'none' | 'partial' | 'full';

export const SECURITY_LEVELS = {
  none: 'Не охраняется',
  partial: 'Частично охраняется', 
  full: 'Полностью охраняется'
};

export const COMMON_TAGS = [
  'фабрика',
  'завод', 
  'отель',
  'больница',
  'школа',
  'театр',
  'дом',
  'магазин',
  'ресторан',
  'офис',
  'склад',
  'церковь'
];
