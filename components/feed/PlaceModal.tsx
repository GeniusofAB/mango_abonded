import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MapPin, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AbandonedPlace } from '../../types';

interface PlaceModalProps {
  place: AbandonedPlace;
  onClose: () => void;
}

export function PlaceModal({ place, onClose }: PlaceModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);

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

    const icons = {
      none: '🟢',
      partial: '🟡',
      full: '🔴'
    };

    return (
      <Badge className={colors[level as keyof typeof colors]}>
        {icons[level as keyof typeof icons]} {labels[level as keyof typeof labels]}
      </Badge>
    );
  };



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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === place.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? place.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-gray-900 border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-gray-100">{place.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-200">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Подробная информация о заброшенном месте: {place.title}
          </DialogDescription>
          <div className="flex items-center gap-3 mt-2">
            {getSecurityBadge(place.securityLevel)}
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              {getTimeAgo(place.addedAt)}
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          <div className="grid lg:grid-cols-2 gap-6 p-6">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={place.images[currentImageIndex]}
                  alt={place.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop`;
                  }}
                />
                {place.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {place.images.length}
                    </div>
                  </>
                )}
              </div>
              
              {place.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {place.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 rounded cursor-pointer overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-orange-400' : 'border-gray-600'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${place.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg mb-3 text-gray-100">Описание</h3>
                <p className="text-gray-300 leading-relaxed">{place.description}</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg mb-3 flex items-center gap-2 text-gray-100">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  Местоположение
                </h3>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-300 mb-2">{place.location.address}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {place.location.lat.toFixed(6)}, {place.location.lng.toFixed(6)}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowMap(!showMap)}
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {showMap ? 'Скрыть карту' : 'Показать на карте'}
                  </Button>
                  {showMap && (
                    <div className="mt-4 h-48 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                      <div className="text-center text-gray-400">
                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                        <p>Интерактивная карта</p>
                        <p className="text-sm">Координаты: {place.location.lat}, {place.location.lng}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {place.tags.length > 0 && (
                <div>
                  <h3 className="text-lg mb-3 text-gray-100">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-orange-400 border-orange-400/30">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}



              {/* Call to Action */}
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 p-4 rounded-lg border border-orange-400/30">
                <h4 className="text-lg mb-2 text-orange-400">Хотите добавить свою заброшку?</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Отправьте заявку через Telegram или email, и мы добавим ваше место на карту.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10"
                    onClick={() => window.open('https://t.me/mangoabandoned', '_blank')}
                  >
                    Telegram
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10"
                    onClick={() => window.open('mailto:submit@mango-abandoned.com', '_blank')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}