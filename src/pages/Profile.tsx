
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Edit, Settings, Users, MessageCircle, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const userProfile = {
    name: "João Silva",
    username: "joaosilva",
    avatar: "https://i.pravatar.cc/150?img=68",
    bio: "Desenvolvedor Full Stack | React, Node.js, TypeScript | Entusiasta de IA e Tecnologias Emergentes | São Paulo, Brasil",
    joined: "Abril 2023",
    badges: [
      { name: "Conversador Ativo", description: "Mantém conversas ativas diariamente" },
      { name: "Criador de Conteúdo", description: "Publica conteúdo valioso regularmente" },
      { name: "Moderador", description: "Ajuda a manter a comunidade saudável" }
    ],
    stats: {
      groups: 5,
      connections: 128,
      reputation: 92
    }
  };
  
  const activities = [
    {
      id: 1,
      type: "connection",
      title: "Novo Match",
      description: "Você e Ana Paula agora estão conectados",
      time: "Hoje, 14:23",
      icon: Users
    },
    {
      id: 2,
      type: "group",
      title: "Novo Grupo",
      description: "Você entrou no grupo 'Desenvolvedores React Brasil'",
      time: "Ontem, 10:45",
      icon: Users
    },
    {
      id: 3,
      type: "message",
      title: "Chat Expirado",
      description: "Seu chat com Carlos Eduardo expirou após 24h",
      time: "12 Abr, 2025",
      icon: MessageCircle
    },
    {
      id: 4,
      type: "reputation",
      title: "Reputação Aumentada",
      description: "Você recebeu 3 avaliações positivas esta semana",
      time: "10 Abr, 2025",
      icon: ThumbsUp
    }
  ];
  
  const feedbacks = [
    {
      id: 1,
      type: "positive",
      count: 24,
      icon: ThumbsUp,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "neutral",
      count: 8,
      icon: Heart,
      color: "text-tydrapi-gray"
    },
    {
      id: 3,
      type: "negative",
      count: 2,
      icon: ThumbsDown,
      color: "text-red-500"
    }
  ];

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Coluna de perfil */}
          <div className="w-full md:w-1/3 space-y-4">
            <Card className="tydrapi-card overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-tydrapi-darkred to-tydrapi-red"></div>
              <CardContent className="pt-0 relative">
                <div className="absolute -top-10 left-4 ring-4 ring-tydrapi-black">
                  <Avatar className="h-20 w-20 border-4 border-tydrapi-black">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback>{userProfile.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="pt-12 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold">{userProfile.name}</h2>
                      <p className="text-tydrapi-gray">@{userProfile.username}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-tydrapi-red text-tydrapi-red hover:bg-tydrapi-red hover:text-white">
                      <Edit size={16} className="mr-2" /> Editar
                    </Button>
                  </div>
                  
                  <p className="mt-4 text-sm">{userProfile.bio}</p>
                  
                  <div className="flex items-center mt-4 text-tydrapi-gray text-sm">
                    <CalendarIcon size={16} className="mr-2" />
                    <span>Membro desde {userProfile.joined}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="tydrapi-card">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{userProfile.stats.connections}</p>
                    <p className="text-tydrapi-gray text-sm">Conexões</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userProfile.stats.groups}</p>
                    <p className="text-tydrapi-gray text-sm">Grupos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userProfile.stats.reputation}%</p>
                    <p className="text-tydrapi-gray text-sm">Reputação</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="tydrapi-card">
              <CardHeader>
                <CardTitle className="text-lg">Impressões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbacks.map(feedback => (
                    <div key={feedback.id} className="flex items-center">
                      <div className={`mr-3 ${feedback.color}`}>
                        <feedback.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-tydrapi-darkgray rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              feedback.type === 'positive' ? 'bg-green-500' : 
                              feedback.type === 'neutral' ? 'bg-tydrapi-gray' : 'bg-red-500'
                            }`}
                            style={{ width: `${(feedback.count / 34) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-3 text-sm">{feedback.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="tydrapi-card">
              <CardHeader>
                <CardTitle className="text-lg">Conquistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.badges.map((badge, idx) => (
                    <div key={idx} className="flex items-start">
                      <Badge className="bg-tydrapi-red mr-3 mt-0.5">{idx + 1}</Badge>
                      <div>
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-tydrapi-gray">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Coluna de conteúdo */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-tydrapi-darkgray">
                <TabsTrigger value="activity" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
                  Atividade
                </TabsTrigger>
                <TabsTrigger value="connections" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
                  Conexões
                </TabsTrigger>
                <TabsTrigger value="groups" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
                  Grupos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 relative">
                      <div className="absolute left-2.5 top-0 bottom-0 w-px bg-tydrapi-darkgray"></div>
                      
                      {activities.map((activity, idx) => (
                        <div key={activity.id} className="relative pl-10">
                          <div className="absolute left-0 w-5 h-5 rounded-full bg-tydrapi-red flex items-center justify-center">
                            <activity.icon size={12} className="text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-tydrapi-gray">{activity.description}</p>
                            <p className="text-xs text-tydrapi-gray mt-1">{activity.time}</p>
                          </div>
                          {idx < activities.length - 1 && (
                            <Separator className="mt-6 bg-tydrapi-darkgray/50" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connections">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Minhas Conexões</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tydrapi-gray mb-4">Você possui 128 conexões</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(id => (
                        <div key={id} className="flex items-center p-3 border border-tydrapi-darkgray rounded-lg">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${id + 20}`} />
                            <AvatarFallback>US</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-1">
                            <h4 className="font-medium">Usuário {id}</h4>
                            <p className="text-xs text-tydrapi-gray">@usuario{id}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-tydrapi-red hover:text-white hover:bg-tydrapi-red">
                            <MessageCircle size={18} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-tydrapi-darkgray hover:bg-tydrapi-gray/30 text-white">
                      Ver todas as conexões
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="groups">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Meus Grupos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-tydrapi-gray mb-4">Você participa de 5 grupos</p>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map(id => (
                        <div key={id} className="flex items-start p-3 border border-tydrapi-darkgray rounded-lg">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${id + 50}`} />
                            <AvatarFallback>GP</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-1">
                            <h4 className="font-medium">Grupo {id}</h4>
                            <p className="text-xs text-tydrapi-gray">123 membros</p>
                            <p className="text-sm mt-1 text-tydrapi-gray">Descrição breve do grupo {id}...</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-tydrapi-red text-tydrapi-red hover:bg-tydrapi-red hover:text-white">
                            Ver grupo
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-tydrapi-darkgray hover:bg-tydrapi-gray/30 text-white">
                      Ver todos os grupos
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
