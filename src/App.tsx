import React, { useState } from 'react';
import { LandingPage } from './components/home/LandingPage';
import { PlaceFeed } from './components/feed/PlaceFeed';
import { SubmitForm } from './components/submit/SubmitForm';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Home, MapPin, Plus, Star, Users } from 'lucide-react';

type Page = 'home' | 'feed' | 'submit' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onGetStarted={() => setCurrentPage('feed')} />;
      case 'feed':
        return <PlaceFeed onBack={() => setCurrentPage('home')} />;
      case 'submit':
        return <SubmitForm onBack={() => setCurrentPage('home')} />;
      case 'about':
        return <AboutPage onBack={() => setCurrentPage('home')} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('feed')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderPage()}
      
      {/* Navigation */}
      {currentPage !== 'home' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-gray-900/95 border-gray-700 backdrop-blur">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={currentPage === 'feed' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('feed')}
                  className="text-gray-300 hover:text-orange-400"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage('home')}
                  className="text-gray-300 hover:text-orange-400"
                >
                  <Home className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentPage === 'submit' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('submit')}
                  className="text-gray-300 hover:text-orange-400"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentPage === 'about' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage('about')}
                  className="text-gray-300 hover:text-orange-400"
                >
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Toaster />
    </div>
  );
}

// About Page Component
function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} className="text-orange-400 hover:text-orange-300">
              ← Назад
            </Button>
            <h1 className="text-2xl text-orange-400">🥭 О проекте</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Main Info */}
        <Card className="bg-gray-800/80 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🥭</div>
              <h2 className="text-3xl text-orange-400 mb-2">Mango Abandoned</h2>
              <p className="text-gray-300">Социальная сеть для исследователей заброшенных мест</p>
              <p className="text-sm text-gray-400 mt-2">Домен: mango-trollface.xyz</p>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-orange-400">Mango Abandoned</strong> — это каталог заброшенных мест для исследователей урбекса, 
                начинающий свою работу с города Батуми, Грузия.
              </p>
              
              <p>
                Мы собираем информацию о заброшенных зданиях, фабриках, отелях и других объектах, 
                которые когда-то были частью городской жизни, а теперь стали свидетелями времени.
              </p>

              <p>
                <strong className="text-orange-400">Простота без регистрации:</strong> никаких аккаунтов, лайков или комментариев. 
                Просто каталог интересных мест с подробными описаниями и координатами.
              </p>

              <p>
                Каждое место проходит модерацию перед публикацией через личную связь с администраторами 
                по Telegram или email.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/80 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl text-orange-400 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Исследование
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Каталог заброшенных мест Батуми</li>
                <li>• Подробные описания и фотографии</li>
                <li>• Информация об уровне безопасности</li>
                <li>• Интерактивные карты</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl text-orange-400 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Сообщество
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Подача заявок на новые места</li>
                <li>• Система тегов для классификации</li>
                <li>• Модерация всех заявок</li>
                <li>• Связь через Telegram и Email</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Safety */}
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-6">
            <h3 className="text-xl text-amber-400 mb-4">⚠️ Безопасность превыше всего</h3>
            <div className="grid md:grid-cols-2 gap-4 text-amber-200/80 text-sm">
              <div>
                <h4 className="text-amber-300 mb-2">Правила безопасности:</h4>
                <ul className="space-y-1">
                  <li>• Исследуйте только в группе</li>
                  <li>• Уважайте частную собственность</li>
                  <li>• Не наносите ущерб объектам</li>
                  <li>• Берегите природу</li>
                </ul>
              </div>
              <div>
                <h4 className="text-amber-300 mb-2">Что брать с собой:</h4>
                <ul className="space-y-1">
                  <li>• Фонарик и запасные батареи</li>
                  <li>• Аптечку первой помощи</li>
                  <li>• Прочную обувь</li>
                  <li>• Заряженный телефон</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gray-800/80 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl text-orange-400 mb-4">📞 Связь с нами</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-gray-200 mb-2">Подача заявок:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Telegram</Badge>
                    <span className="text-sm">@mangoabandoned</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">Email</Badge>
                    <span className="text-sm">submit@mango-abandoned.com</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-gray-200 mb-2">Поддержка:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">GitHub</Badge>
                    <span className="text-sm">mango-abandoned/issues</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/80 border-gray-700 text-center">
            <CardContent className="p-4">
              <div className="text-2xl text-orange-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Локаций</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/80 border-gray-700 text-center">
            <CardContent className="p-4">
              <div className="text-2xl text-orange-400 mb-1">1</div>
              <div className="text-sm text-gray-400">Город</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/80 border-gray-700 text-center">
            <CardContent className="p-4">
              <div className="text-2xl text-orange-400 mb-1">2024</div>
              <div className="text-sm text-gray-400">Год запуска</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}