import { AbandonedPlace } from '../types';

export const ABANDONED_PLACES: AbandonedPlace[] = [
  {
    id: 'example-1',
    title: 'pizda',
    description: 'net',
    images: [
      'https://images.unsplash.com/photo-1667328931918-b6362ed95c1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYmFuZG9uZWQlMjBmYWN0b3J5JTIwYmF0dW1pJTIwZ2VvcmdpYSUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzU3Nzk4OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    location: {
      lat: 41.6168,
      lng: 41.6367,
      address: 'Район Хилваных, Батуми'
    },
    securityLevel: 'partial',
    addedAt: '2024-12-01T12:00:00Z',
    tags: ['фабрика', 'завод', 'промышленность']
  }
  // Для добавления новых мест отправьте заявку:
  // Telegram: @mangoabandoned
  // Email: submit@mango-abandoned.com
];
