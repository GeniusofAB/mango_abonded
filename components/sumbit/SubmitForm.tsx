import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Send, MessageCircle, Mail, AlertCircle, FileText, Shield } from 'lucide-react';

interface SubmitFormProps {
  onBack: () => void;
}

export function SubmitForm({ onBack }: SubmitFormProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} className="text-orange-400 hover:text-orange-300">
              ← Назад
            </Button>
            <h1 className="text-2xl text-orange-400">🥭 Добавить заброшку</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Contacts */}
        <Card className="bg-gray-800/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-100 flex items-center gap-2">
              <Send className="h-6 w-6 text-orange-400" />
              Как добавить новое место
            </CardTitle>
            <p className="text-gray-400">
              Все места в каталоге проходят ручную модерацию. Свяжитесь с нами одним из способов ниже.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg text-gray-100 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  Telegram
                </h3>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 mb-2">Быстрый способ связи</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      @mangoabandoned
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-200/80 mt-2">
                    Отправьте нам фото, описание и координаты места
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-gray-100 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  Email
                </h3>
                <div className="p-4 bg-gray-500/10 border border-gray-500/30 rounded-lg">
                  <p className="text-gray-300 mb-2">Подробные заявки</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                      submit@mango-abandoned.com
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300/80 mt-2">
                    Для детальных описаний с множеством фотографий
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-600" />

            {/* Required Information */}
            <div className="space-y-4">
              <h3 className="text-lg text-gray-100 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-400" />
                Необходимая информация
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-gray-200">Обязательно укажите:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Название и описание места
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Точное местоположение или координаты
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Фотографии (минимум 1)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Уровень охраны/безопасности
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-gray-200">Дополнительно:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      История места (если известна)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Особенности архитектуры
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Интересные детали
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      Ваши контакты для связи
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Rules */}
        <Card className="bg-gray-800/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-gray-100 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Правила публикации
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-gray-200 mb-3">✅ Мы публикуем:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Заброшенные здания и сооружения</li>
                  <li>• Места с исторической ценностью</li>
                  <li>• Безопасные для исследования объекты</li>
                  <li>• Места с интересной архитектурой</li>
                  <li>• Объекты в Батуми и окрестностях</li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-200 mb-3">❌ Мы НЕ публикуем:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Частные жилые дома</li>
                  <li>• Действующие объекты</li>
                  <li>• Места с активной охраной</li>
                  <li>• Опасные для посещения места</li>
                  <li>• Объекты без точного местоположения</li>
                </ul>
              </div>
            </div>

            <Separator className="bg-gray-600" />

            <div>
              <h4 className="text-gray-200 mb-3">⏱️ Процесс модерации:</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>1. <strong>Получение заявки</strong> — мы получаем вашу заявку через Telegram или Email</p>
                <p>2. <strong>Проверка информации</strong> — проверяем достоверность данных и безопасность места</p>
                <p>3. <strong>Решение</strong> — принимаем решение о публикации в течение 2-3 дней</p>
                <p>4. <strong>Публикация</strong> — место появляется в каталоге с указанием источника</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Warning */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg text-amber-300 mb-3">⚠️ Безопасность превыше всего</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-200/90">
                <div>
                  <h4 className="text-amber-300 mb-2">Правила безопасности:</h4>
                  <ul className="space-y-1">
                    <li>• Исследуйте только в группе</li>
                    <li>• Уважайте частную собственность</li>
                    <li>• Не наносите ущерб объектам</li>
                    <li>• Берегите природу и окружающую среду</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-amber-300 mb-2">Что брать с собой:</h4>
                  <ul className="space-y-1">
                    <li>• Фонарик и запасные батареи</li>
                    <li>• Аптечку первой помощи</li>
                    <li>• Прочную обувь и одежду</li>
                    <li>• Заряженный телефон</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
