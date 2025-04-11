
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'react-router-dom';
import { Bell, Book, Calendar, Check, GraduationCap, Clock, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type NotificationType = 'all' | 'academic' | 'calendar' | 'materials';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: NotificationType;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  academicType?: 'homework' | 'exam' | 'deadline' | 'event';
}

const Notifications = () => {
  const { toast } = useToast();
  const { type } = useParams<{ type: NotificationType }>();
  const [activeTab, setActiveTab] = useState<NotificationType>(type || 'all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Entrega de Trabalho",
      message: "Lembrete: O trabalho final de Programação Web deve ser entregue hoje até às 23:59.",
      date: "13/04/2025",
      time: "09:30",
      type: "academic",
      priority: "high",
      read: false,
      academicType: "deadline"
    },
    {
      id: 2,
      title: "Prova Amanhã",
      message: "Não se esqueça da prova de Banco de Dados amanhã às 10:00 na sala 302.",
      date: "12/04/2025",
      time: "14:45",
      type: "academic",
      priority: "high",
      read: false,
      academicType: "exam"
    },
    {
      id: 3,
      title: "Material Disponível",
      message: "O professor de Algoritmos disponibilizou o material para a próxima aula.",
      date: "11/04/2025",
      time: "16:20",
      type: "materials",
      priority: "medium",
      read: false,
      academicType: "homework"
    },
    {
      id: 4,
      title: "Evento de Networking",
      message: "Participe do evento de networking com empresas de tecnologia no próximo sábado.",
      date: "10/04/2025",
      time: "11:15",
      type: "calendar",
      priority: "medium",
      read: true,
      academicType: "event"
    },
    {
      id: 5,
      title: "Nova Lista de Exercícios",
      message: "A lista de exercícios 3 de Algoritmos Avançados já está disponível na plataforma.",
      date: "09/04/2025",
      time: "08:50",
      type: "materials",
      priority: "low",
      read: true,
      academicType: "homework"
    },
    {
      id: 6,
      title: "Alteração de Horário",
      message: "A aula de Matemática Discreta foi transferida para quinta-feira às 14:00.",
      date: "08/04/2025",
      time: "17:30",
      type: "calendar",
      priority: "high",
      read: false
    },
    {
      id: 7,
      title: "Revisão para Prova",
      message: "Haverá uma sessão de revisão para a prova de Banco de Dados hoje às 18:00 na sala 304.",
      date: "07/04/2025",
      time: "13:10",
      type: "academic",
      priority: "medium",
      read: true,
      academicType: "exam"
    }
  ]);

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      description: "Notificação marcada como lida",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "Todas as notificações",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
    
    toast({
      description: "Notificação removida",
    });
  };

  const filteredNotifications = notifications.filter(notification => 
    activeTab === 'all' || notification.type === activeTab
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const academicUnreadCount = notifications.filter(n => !n.read && n.type === 'academic').length;
  const calendarUnreadCount = notifications.filter(n => !n.read && n.type === 'calendar').length;
  const materialsUnreadCount = notifications.filter(n => !n.read && n.type === 'materials').length;

  const getNotificationIcon = (notification: Notification) => {
    if (notification.type === 'academic') {
      if (notification.academicType === 'homework') return <Book className="h-5 w-5 text-blue-400" />;
      if (notification.academicType === 'exam') return <GraduationCap className="h-5 w-5 text-yellow-400" />;
      if (notification.academicType === 'deadline') return <Clock className="h-5 w-5 text-red-400" />;
      if (notification.academicType === 'event') return <Calendar className="h-5 w-5 text-green-400" />;
      return <GraduationCap className="h-5 w-5 text-tydrapi-red" />;
    }
    if (notification.type === 'calendar') return <Calendar className="h-5 w-5 text-tydrapi-red" />;
    if (notification.type === 'materials') return <Book className="h-5 w-5 text-tydrapi-red" />;
    return <Bell className="h-5 w-5 text-tydrapi-red" />;
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (priority === 'medium') return <Info className="h-4 w-4 text-yellow-500" />;
    return <Info className="h-4 w-4 text-green-500" />;
  };

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notificações</h1>
          <Button 
            variant="outline"
            className="border-tydrapi-gray text-tydrapi-gray hover:bg-tydrapi-darkgray"
            onClick={markAllAsRead}
          >
            <Check size={18} className="mr-2" /> Marcar todas como lidas
          </Button>
        </div>

        <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value as NotificationType)}>
          <TabsList className="grid grid-cols-4 mb-6 bg-tydrapi-darkgray">
            <TabsTrigger value="all" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Bell size={16} className="mr-2" /> Todas
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-tydrapi-red">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="academic" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <GraduationCap size={16} className="mr-2" /> Acadêmicas
              {academicUnreadCount > 0 && (
                <Badge className="ml-2 bg-tydrapi-red">{academicUnreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Calendar size={16} className="mr-2" /> Calendário
              {calendarUnreadCount > 0 && (
                <Badge className="ml-2 bg-tydrapi-red">{calendarUnreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Book size={16} className="mr-2" /> Materiais
              {materialsUnreadCount > 0 && (
                <Badge className="ml-2 bg-tydrapi-red">{materialsUnreadCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={`tydrapi-card ${!notification.read ? 'border-l-4 border-l-tydrapi-red' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification)}
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-base flex items-center">
                              {notification.title}
                              <span className="ml-2">{getPriorityIcon(notification.priority)}</span>
                            </h3>
                            <p className="text-sm mt-1">{notification.message}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-tydrapi-gray">{notification.date}</p>
                            <p className="text-xs text-tydrapi-gray">{notification.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between mt-3">
                          <div>
                            {!notification.read && (
                              <Badge className="bg-tydrapi-red">Não lida</Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button 
                                variant="outline"
                                size="sm"
                                className="border-tydrapi-gray text-tydrapi-gray hover:bg-tydrapi-darkgray"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check size={14} className="mr-1" /> Marcar como lida
                              </Button>
                            )}
                            <Button 
                              variant="ghost"
                              size="sm"
                              className="text-tydrapi-gray hover:bg-tydrapi-darkgray hover:text-tydrapi-red"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-tydrapi-gray">Não há notificações para exibir.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Notifications;
