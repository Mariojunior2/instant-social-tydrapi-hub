
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, Share2, UserPlus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeMatches, setActiveMatches] = useState([
    {
      id: 1,
      name: 'Ana Paula',
      username: 'anapaula',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'online',
      lastMessage: 'Oi! Vi que você também curte IA. Conhece o GPT-4?',
      time: '5m',
      unread: 2,
    },
    {
      id: 2,
      name: 'Carlos Eduardo',
      username: 'carlosedu',
      avatar: 'https://i.pravatar.cc/150?img=8',
      status: 'offline',
      lastMessage: 'Vamos marcar aquele café para conversar sobre o projeto?',
      time: '1h',
      unread: 0,
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Grupo de Debate Sobre IA',
        username: 'ia-debate',
        avatar: 'https://i.pravatar.cc/150?img=20',
        isGroup: true
      },
      content: 'Pessoal, o que vocês acham sobre os avanços recentes em IA generativa? Vale a pena investir tempo aprendendo como usar essas ferramentas?',
      time: '35min',
      likes: 24,
      comments: 12,
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Márcia Silva',
        username: 'marciasilva',
        avatar: 'https://i.pravatar.cc/150?img=31',
        isGroup: false
      },
      content: 'Acabei de me juntar ao TydraPI! Alguém aqui é da área de design de UX/UI? Estou procurando pessoas para trocar ideias sobre projetos!',
      time: '2h',
      likes: 15,
      comments: 8,
      liked: true
    }
  ]);

  const [pendingConnections, setPendingConnections] = useState([
    {
      id: 1,
      name: 'Pedro Rocha',
      username: 'pedro_rocha',
      avatar: 'https://i.pravatar.cc/150?img=12',
      bio: 'Desenvolvedor Full Stack | React & Node.js | Entusiasta de IA',
      mutualInterests: ['Programação', 'IA', 'Café'],
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleAcceptConnection = (id: number) => {
    toast({
      title: "Conexão aceita!",
      description: "Agora vocês podem conversar.",
    });
    setPendingConnections(pendingConnections.filter(conn => conn.id !== id));
  };

  const handleRejectConnection = (id: number) => {
    toast({
      description: "Conexão rejeitada.",
    });
    setPendingConnections(pendingConnections.filter(conn => conn.id !== id));
  };

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Início</h1>
        
        {/* Matches Ativos */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Matches Ativos</h2>
            <Button variant="link" className="text-tydrapi-red">Ver todos</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMatches.map(match => (
              <Card key={match.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-start">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={match.avatar} />
                        <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {match.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-tydrapi-black"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{match.name}</h3>
                        <span className="text-xs text-tydrapi-gray">{match.time}</span>
                      </div>
                      <p className="text-sm text-tydrapi-gray truncate">{match.lastMessage}</p>
                    </div>
                    {match.unread > 0 && (
                      <Badge className="ml-2 bg-tydrapi-red">{match.unread}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Grupos em Destaque / Posts */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Destaques</h2>
            <Button variant="link" className="text-tydrapi-red">Atualizar</Button>
          </div>
          
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id} className="tydrapi-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <CardTitle className="text-base">{post.user.name}</CardTitle>
                        <p className="text-xs text-tydrapi-gray">@{post.user.username} • {post.time}</p>
                      </div>
                    </div>
                    {post.user.isGroup && (
                      <Badge variant="outline" className="bg-tydrapi-darkred border-none">Grupo</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{post.content}</p>
                </CardContent>
                <CardFooter className="pt-2 pb-3 flex justify-between text-tydrapi-gray">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-tydrapi-red">
                    <MessageCircle size={18} /> {post.comments}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-1 ${post.liked ? 'text-tydrapi-red' : 'hover:text-tydrapi-red'}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart size={18} fill={post.liked ? '#E10600' : 'none'} /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-tydrapi-red">
                    <Share2 size={18} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Conexões Pendentes */}
        {pendingConnections.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Conexões Pendentes</h2>
            </div>
            
            <div className="space-y-4">
              {pendingConnections.map(connection => (
                <Card key={connection.id} className="tydrapi-card">
                  <CardContent className="pt-4">
                    <div className="flex items-start">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3 flex-grow">
                        <h3 className="font-medium">{connection.name}</h3>
                        <p className="text-xs text-tydrapi-gray">@{connection.username}</p>
                        <p className="text-sm mt-1">{connection.bio}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {connection.mutualInterests.map((interest, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-tydrapi-darkred/30 text-white">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full bg-tydrapi-red h-10 w-10 hover:bg-tydrapi-darkred"
                          onClick={() => handleAcceptConnection(connection.id)}
                        >
                          <UserPlus size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full bg-tydrapi-darkgray h-10 w-10 hover:bg-tydrapi-gray/30"
                          onClick={() => handleRejectConnection(connection.id)}
                        >
                          <X size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
