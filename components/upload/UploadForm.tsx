import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Upload, X, MapPin, Tag } from 'lucide-react';
import { AbandonedPlace, SecurityLevel, SECURITY_LEVELS } from '../../types';
import { getCurrentUser, savePlace, addNotification } from '../../utils/storage';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function UploadForm({ onSuccess, onCancel }: UploadFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('none');
  const [location, setLocation] = useState({ lat: 41.6168, lng: 41.6367, address: 'Батуми, Грузия' });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = getCurrentUser();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > 6) {
      setError('Максимум 6 изображений');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('Размер файла не должен превышать 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleLocationClick = () => {
    // Simulate location picker
    const lat = 41.6168 + (Math.random() - 0.5) * 0.1;
    const lng = 41.6367 + (Math.random() - 0.5) * 0.1;
    setLocation({
      lat,
      lng,
      address: `Батуми, ${Math.random() > 0.5 ? 'Старый город' : 'Новый Батуми'}`
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!currentUser) {
      setError('Необходимо войти в систему');
      setIsSubmitting(false);
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Заполните название и описание');
      setIsSubmitting(false);
      return;
    }

    if (images.length < 3) {
      setError('Добавьте минимум 3 изображения');
      setIsSubmitting(false);
      return;
    }

    try {
      const place: AbandonedPlace = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        images,
        location,
        securityLevel,
        authorId: currentUser.id,
        author: currentUser.nickname,
        status: 'pending',
        createdAt: new Date().toISOString(),
        likes: [],
        dislikes: [],
        rating: [],
        tags
      };

      savePlace(place);

      // Send notification to admin (if exists)
      addNotification({
        id: crypto.randomUUID(),
        userId: 'admin-user',
        type: 'approval',
        message: `Новая заброшка "${title}" ожидает модерации`,
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: place.id
      });

      onSuccess();
    } catch (err) {
      setError('Ошибка при загрузке заброшки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Добавить заброшку
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Название *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заброшенная фабрика..."
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Расскажите об этом месте, его истории, что вы там видели..."
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/1000 символов
              </p>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Изображения * (3-6 фото)</Label>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Нажмите для выбора фото или перетащите файлы сюда
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG до 5MB каждый
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <ImageWithFallback
                        src={image}
                        alt={`Изображение ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Security Level */}
            <div className="space-y-2">
              <Label>Уровень охраны</Label>
              <Select value={securityLevel} onValueChange={(value: SecurityLevel) => setSecurityLevel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SECURITY_LEVELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {key === 'none' && '🟢'} 
                      {key === 'partial' && '🟡'} 
                      {key === 'full' && '🔴'} {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Местоположение</Label>
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{location.address}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleLocationClick}
                  className="w-full"
                >
                  Выбрать на карте
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Теги</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="завод, фабрика, отель..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      #{tag} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Отправка...' : 'Опубликовать'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
