import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/5"></div>
        
        <div className="relative text-center max-w-4xl mx-auto">
          <div className="text-8xl mb-8">🥭</div>
          <h1 className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
            Mango Abandoned
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Социальная сеть для исследователей заброшенных мест. Открывайте, делитесь и оценивайте забытые уголки городов.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary transition-all duration-300"
              onClick={onGetStarted}
            >
              Смотреть заброшки 🔍
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={onGetStarted}
            >
              Присоединиться 🚀
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="mb-2">Исследуйте</h3>
                <p className="text-sm text-muted-foreground">
                  Находите и документируйте заброшенные места вашего города
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="mb-2">Оценивайте</h3>
                <p className="text-sm text-muted-foreground">
                  Ставьте рейтинги и делитесь впечатлениями с сообществом
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="mb-2">Исследуйте карту</h3>
                <p className="text-sm text-muted-foreground">
                  Смотрите местоположения заброшек на интерактивной карте
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">#urbex</Badge>
            <Badge variant="secondary">#заброшки</Badge>
            <Badge variant="secondary">#батуми</Badge>
            <Badge variant="secondary">#исследования</Badge>
            <Badge variant="secondary">#фотография</Badge>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-16 text-primary">Геймификация и достижения(пока недоступно)</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="mb-2">Уровни</h4>
                <p className="text-sm text-muted-foreground">
                  Повышайте уровень, зарабатывая XP за активность
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎖️</div>
                <h4 className="mb-2">Бейджи</h4>
                <p className="text-sm text-muted-foreground">
                  Получайте уникальные награды за достижения
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h4 className="mb-2">Рейтинг</h4>
                <p className="text-sm text-muted-foreground">
                  Соревнуйтесь с другими исследователями
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="mb-2">Сообщество</h4>
                <p className="text-sm text-muted-foreground">
                  Подписывайтесь на других исследователей
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-primary/10 to-orange-500/10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl mb-6">Готовы начать исследование?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Присоединяйтесь к сообществу исследователей заброшенных мест уже сегодня
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary"
            onClick={onGetStarted}
          >
            Начать исследование 🥭
          </Button>
        </div>
      </div>
    </div>
  );
}
