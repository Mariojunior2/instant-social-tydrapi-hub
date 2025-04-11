
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Trending, Calendar, User } from 'lucide-react';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('trending');
  
  const trends = [
    {
      id: 1,
      title: "Inteligência Artificial no Brasil",
      category: "Tecnologia",
      posts: 1240,
      growing: true
    },
    {
      id: 2,
      title: "Desenvolvimento Web 2023",
      category: "Programação",
      posts: 890,
      growing: true
    },
    {
      id: 3,
      title: "Design de interfaces minimalistas",
      category: "Design",
      posts: 567,
      growing: false
    }
  ];
  
  const groups = [
    {
      id: 1,
      name: "Desenvolvedores React Brasil",
      members: 1856,
      avatar: "https://i.pravatar.cc/150?img=50",
      description: "Grupo para discutir React, React Native e todo o ecossistema Javascript no Brasil.",
      tags: ["React", "Javascript", "Frontend"]
    },
    {
      id: 2,
      name: "Inteligência Artificial e Machine Learning",
      members: 2453,
      avatar: "https://i.pravatar.cc/150?img=51",
      description: "Discussões sobre IA, ML, Deep Learning e suas aplicações na indústria e academia.",
      tags: ["IA", "Machine Learning", "Tecnologia"]
    },
    {
      id: 3,
      name: "UX/UI Design Trends",
      members: 1240,
      avatar: "https://i.pravatar.cc/150?img=52",
      description: "Compartilhamento de tendências, cases e estudos sobre UX/UI Design.",
      tags: ["Design", "UX", "UI"]
    }
  ];
  
  const events = [
    {
      id: 1,
      title: "Workshop de IA Generativa",
      date: "15 Abr, 2025",
      time: "19:00 - 21:00",
      online: true,
      attendees: 234,
      organizer: "Comunidade IA Brasil"
    },
    {
      id: 2,
      title: "Meetup de Desenvolvedores",
      date: "20 Abr, 2025",
      time: "14:00 - 18:00",
      online: false,
      location: "São Paulo, SP",
      attendees: 87,
      organizer: "Dev Community SP"
    }
  ];
  
  const users = [
    {
      id: 1,
      name: "Juliana Mendes",
      username: "julianamendes",
      avatar: "https://i.pravatar.cc/150?img=32",
      followers: 1245,
      bio: "Desenvolvedora Frontend | React | UX/UI Design",
      verified: true
    },
    {
      id: 2,
      name: "Ricardo Alves",
      username: "ricardoalves",
      avatar: "https://i.pravatar.cc/150?img=60",
      followers: 982,
      bio: "Tech Lead at @empresa | JS, TS, Node | Mentor",
      verified: false
    },
    {
      id: 3,
      name: "Carolina Lima",
      username: "carolima",
      avatar: "https://i.pravatar.cc/150?img=25",
      followers: 3572,
      bio: "Designer de Produto | Professora de UX/UI | Palestrante",
      verified: true
    }
  ];

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Explorar</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tydrapi-gray" size={18} />
            <Input 
              placeholder="Buscar..." 
              className="pl-10 bg-tydrapi-darkgray border-tydrapi-darkgray focus:border-tydrapi-red" 
            />
          </div>
        </div>

        <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-tydrapi-darkgray">
            <TabsTrigger value="trending" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Trending size={16} className="mr-2" /> Tendências
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Users size={16} className="mr-2" /> Grupos
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Calendar size={16} className="mr-2" /> Eventos
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <User size={16} className="mr-2" /> Usuários
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="space-y-4">
            {trends.map(trend => (
              <Card key={trend.id} className="tydrapi-card cursor-pointer hover:border-tydrapi-red/50 transition-colors">
                <CardContent className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{trend.title}</h3>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="bg-tydrapi-darkred/30 border-none mr-2">
                          {trend.category}
                        </Badge>
                        <span className="text-sm text-tydrapi-gray">{trend.posts} posts</span>
                      </div>
                    </div>
                    {trend.growing && (
                      <Badge className="bg-tydrapi-red">Em alta</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-4">
            {groups.map(group => (
              <Card key={group.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-xs text-tydrapi-gray">{group.members} membros</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm">{group.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {group.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-tydrapi-darkgray">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-tydrapi-red hover:bg-tydrapi-darkred">
                    Participar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            {events.map(event => (
              <Card key={event.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
                <CardContent className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-tydrapi-red mr-2">{event.date}</span>
                        <span className="text-sm text-tydrapi-gray">{event.time}</span>
                      </div>
                      <p className="text-sm mt-1">
                        {event.online ? 'Online' : event.location} • {event.attendees} participantes
                      </p>
                      <p className="text-xs text-tydrapi-gray mt-1">Organizado por: {event.organizer}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-tydrapi-red text-tydrapi-red hover:bg-tydrapi-red hover:text-white">
                      Participar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            {users.map(user => (
              <Card key={user.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
                <CardContent className="py-4">
                  <div className="flex items-start">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <h3 className="font-semibold">{user.name}</h3>
                        {user.verified && (
                          <Badge className="ml-2 bg-tydrapi-red">Verificado</Badge>
                        )}
                      </div>
                      <p className="text-xs text-tydrapi-gray">@{user.username} • {user.followers} seguidores</p>
                      <p className="text-sm mt-1">{user.bio}</p>
                    </div>
                    <Button size="sm" className="bg-tydrapi-red hover:bg-tydrapi-darkred">
                      Seguir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Explore;
