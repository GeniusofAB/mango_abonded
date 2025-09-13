import React, { useState } from 'react';
import { AbandonedPlace } from '../../types';
import { ABANDONED_PLACES } from '../../data/places';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { MapPin, Clock, Search, Plus } from 'lucide-react';
import { PlaceModal } from './PlaceModal';

interface PlaceFeedProps {
  onBack: () => void;
}

export function PlaceFeed({ onBack }: PlaceFeedProps) {
  const [places] = useState<AbandonedPlace[]>(ABANDONED_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<AbandonedPlace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('');

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || place.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ч. назад`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} дн. назад`;
    }
  };

  const getSecurityBadge = (level: string) => {
    const colors = {
      none: 'bg-green-500/20 text-green-400 border-green-400/30',
      partial: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30', 
      full: 'bg-red-500/20 text-red-400 border-red-400/30'
    };
    
    const labels = {
      none: 'Не охраняется',
      partial: 'Частично охраняется',
      full: 'Полностью охраняется'
    };

    return (
      <Badge className={colors[level as keyof typeof colors]}>
        {labels[level as keyof typeof labels]}
      </Badge>
    );
  };

  const allTags = Array.from(new Set(places.flatMap(place => place.tags)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onBack} className="text-orange-400 hover:text-orange-300">
                ← Назад
              </Button>
              <h1 className="text-2xl text-orange-400">🥭 Mango Abandoned</h1>
            </div>
            <div className="text-sm text-gray-400">
              {filteredPlaces.length} мест найдено
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={filterTag === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTag('')}
                className="whitespace-nowrap"
              >
                Все
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={filterTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterTag(tag)}
                  className="whitespace-nowrap"
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {filteredPlaces.map((place) => (
          <Card 
            key={place.id}
            className="bg-gray-800/80 border-gray-700 hover:border-orange-400/50 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedPlace(place)}
          >
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={place.images[0]}
                  alt={place.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop`;
                  }}
                />
                <div className="absolute top-4 left-4">
                  {getSecurityBadge(place.securityLevel)}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {place.images.length} фото
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl text-gray-100 leading-tight">{place.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {getTimeAgo(place.addedAt)}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-2">{place.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-gray-400">{place.location.address}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-orange-400 border-orange-400/30">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Action */}
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-orange-400 border-orange-400/30 hover:bg-orange-400/10"
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {places.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🥭</div>
            <h3 className="text-2xl text-gray-300 mb-4">Добро пожаловать в Mango Abandoned!</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Здесь пока нет заброшенных мест. Будьте первым, кто поделится интересной локацией в Батуми!
            </p>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 max-w-lg mx-auto">
              <h4 className="text-lg text-orange-400 mb-3">📤 Как добавить место?</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Telegram</Badge>
                  <span>@mangoabandoned</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">Email</Badge>
                  <span>submit@mango-abandoned.com</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Все заявки проходят модерацию перед публикацией
              </p>
            </div>
          </div>
        ) : filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl text-gray-300 mb-2">Ничего не найдено</h3>
            <p className="text-gray-400">Попробуйте изменить поисковый запрос или фильтры</p>
          </div>
        ) : null}
      </div>

      {/* Place Modal */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
