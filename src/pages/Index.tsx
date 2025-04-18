
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/components/ui/use-toast';
import ActiveMatches from '@/components/home/ActiveMatches';
import AcademicEvents from '@/components/home/AcademicEvents';
import SocialPosts from '@/components/home/SocialPosts';
import PendingConnections from '@/components/home/PendingConnections';
import { Button } from '@/components/ui/button';

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
    },
    {
      id: 3,
      user: {
        name: 'Grupo de Estudos - Matemática Avançada',
        username: 'matematica-grupo',
        avatar: 'https://i.pravatar.cc/150?img=42',
        isGroup: true
      },
      content: 'Lembrando a todos: nossa sessão de estudos para o próximo exame de Cálculo 3 será amanhã às 19h na sala de videoconferência. Preparei alguns exercícios práticos para revisarmos!',
      time: '1h',
      likes: 18,
      comments: 5,
      liked: false,
      isAcademic: true
    },
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

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Entrega do Trabalho Final',
      subject: 'Programação Web',
      date: 'Hoje, 23:59',
      type: 'deadline',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Prova Bimestral',
      subject: 'Banco de Dados',
      date: 'Amanhã, 10:00',
      type: 'exam',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Lista de Exercícios 3',
      subject: 'Algoritmos Avançados',
      date: 'Sexta, 18:00',
      type: 'homework',
      priority: 'low'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Entrega de Trabalho - Hoje",
        description: "Não esqueça de enviar o trabalho final de Programação Web até 23:59.",
        academicType: "deadline",
      });
      
      setTimeout(() => {
        toast({
          title: "Prova Amanhã",
          description: "Prepare-se para a prova de Banco de Dados às 10:00.",
          academicType: "exam",
        });
      }, 3000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
        
        <AcademicEvents events={upcomingEvents} />
        <ActiveMatches matches={activeMatches} />
        <SocialPosts posts={posts} onLike={handleLike} />
        {pendingConnections.length > 0 && (
          <PendingConnections 
            connections={pendingConnections}
            onAccept={handleAcceptConnection}
            onReject={handleRejectConnection}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
