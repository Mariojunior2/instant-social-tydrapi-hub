import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AcademicEvents from '@/components/home/AcademicEvents';
import ActiveMatches from '@/components/home/ActiveMatches';
import PendingConnections from '@/components/home/PendingConnections';
import SocialPosts from '@/components/home/SocialPosts';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  const academicEvents = [
    {
      id: 1,
      title: "Entrega do Projeto Final",
      subject: "Desenvolvimento Web",
      date: "25 Abr, 2025",
      type: "deadline" as const,
      priority: "high" as const
    },
    {
      id: 2,
      title: "Prova de Algoritmos",
      subject: "Estrutura de Dados",
      date: "28 Abr, 2025",
      type: "exam" as const,
      priority: "medium" as const
    },
    {
      id: 3,
      title: "Lista de Exercícios",
      subject: "Cálculo III",
      date: "30 Abr, 2025",
      type: "homework" as const,
      priority: "low" as const
    }
  ];

  const activeMatches = [
    {
      id: 1,
      name: "Maria Silva",
      username: "mariasilva",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "online" as const,
      lastMessage: "Podemos marcar um estudo em grupo?",
      time: "14:30",
      unread: 2
    },
    {
      id: 2,
      name: "João Santos",
      username: "joaosantos",
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "offline" as const,
      lastMessage: "Claro, vamos resolver juntos!",
      time: "12:45",
      unread: 0
    }
  ];

  const pendingConnections = [
    {
      id: 1,
      name: "Ana Oliveira",
      username: "anaoliveira",
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "Estudante de Engenharia | Apaixonada por tecnologia",
      mutualInterests: ["Inteligência Artificial", "Desenvolvimento Web"]
    },
    {
      id: 2,
      name: "Carlos Pereira",
      username: "carlospereira",
      avatar: "https://i.pravatar.cc/150?img=4",
      bio: "Desenvolvedor Full Stack | Amante de café e livros",
      mutualInterests: ["JavaScript", "React", "Node.js"]
    }
  ];

  const handleAcceptConnection = (id: number) => {
    console.log(`Conexão com ID ${id} aceita`);
    toast({
      title: "Conexão Aceita!",
      description: `Você aceitou o pedido de conexão.`,
    });
  };

  const handleRejectConnection = (id: number) => {
    console.log(`Conexão com ID ${id} rejeitada`);
    toast({
      title: "Conexão Rejeitada",
      description: `Você rejeitou o pedido de conexão.`,
    });
  };

  return (
    <MainLayout>
      <div className="tydrapi-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <AcademicEvents events={academicEvents} />
            <ActiveMatches matches={activeMatches} />
            <SocialPosts />
          </div>
          <div className="lg:col-span-4">
            <PendingConnections
              connections={pendingConnections}
              onAccept={handleAcceptConnection}
              onReject={handleRejectConnection}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
