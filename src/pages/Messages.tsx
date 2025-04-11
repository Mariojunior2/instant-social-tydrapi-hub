
import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Mic, Send, Image, Phone, Video, MoreVertical, Clock, ArrowLeft, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type Contact = {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
  unread: number;
  isGroup?: boolean;
  lastMessage?: {
    text: string;
    time: string;
  };
};

type Message = {
  id: number;
  text: string;
  sent: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  temporaryChat?: boolean;
};

const Messages = () => {
  const isMobile = useIsMobile();
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Ana Paula",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "online",
      unread: 2,
      lastMessage: {
        text: "Oi! Vi que você também curte IA. Conhece o GPT-4?",
        time: "10:42"
      }
    },
    {
      id: 2,
      name: "Carlos Eduardo",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "offline",
      lastSeen: "Há 30 minutos",
      unread: 0,
      lastMessage: {
        text: "Vamos marcar aquele café para conversar sobre o projeto?",
        time: "09:15"
      }
    },
    {
      id: 3,
      name: "Grupo de Desenvolvedores",
      avatar: "https://i.pravatar.cc/150?img=67",
      status: "online",
      unread: 5,
      isGroup: true,
      lastMessage: {
        text: "Alguém já experimentou o novo framework?",
        time: "Ontem"
      }
    },
    {
      id: 4,
      name: "Mariana Silva",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "online",
      unread: 0,
      lastMessage: {
        text: "Chat temporário - expira em 8h",
        time: "16:20"
      }
    }
  ]);
  
  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: "Oi! Tudo bem?", sent: false, timestamp: "10:30", status: 'read' },
      { id: 2, text: "Oi! Tudo ótimo e com você?", sent: true, timestamp: "10:32", status: 'read' },
      { id: 3, text: "Bem também! Vi que você se interessa por IA", sent: false, timestamp: "10:35", status: 'read' },
      { id: 4, text: "Sim! Estou estudando bastante sobre o assunto", sent: true, timestamp: "10:38", status: 'read' },
      { id: 5, text: "Que legal! Eu trabalho com isso", sent: false, timestamp: "10:40", status: 'read' },
      { id: 6, text: "Você já conhece o GPT-4?", sent: false, timestamp: "10:42", status: 'read' }
    ],
    2: [
      { id: 1, text: "E aí, como está o projeto?", sent: false, timestamp: "09:10", status: 'read' },
      { id: 2, text: "Está avançando! Consegui terminar aquela parte difícil", sent: true, timestamp: "09:12", status: 'read' },
      { id: 3, text: "Ótimo! Vamos marcar aquele café para conversar sobre?", sent: false, timestamp: "09:15", status: 'read' }
    ],
    3: [
      { id: 1, text: "Pessoal, alguém já testou o novo framework?", sent: false, timestamp: "Ontem, 18:30", status: 'read' },
      { id: 2, text: "Eu testei! É muito bom", sent: true, timestamp: "Ontem, 18:35", status: 'read' },
      { id: 3, text: "Achei a performance excelente", sent: true, timestamp: "Ontem, 18:36", status: 'read' },
      { id: 4, text: "Concordo! A documentação também está bem completa", sent: false, timestamp: "Ontem, 18:40", status: 'read' },
      { id: 5, text: "Vou testar também!", sent: false, timestamp: "Ontem, 18:45", status: 'read' }
    ],
    4: [
      { id: 1, text: "Olá! Somos um match! Este chat é temporário e expirará em 24h", sent: false, timestamp: "16:15", status: 'read', temporaryChat: true },
      { id: 2, text: "Oi! Vi que você trabalha com design também!", sent: true, timestamp: "16:18", status: 'read' },
      { id: 3, text: "Sim! Especializada em UI/UX. E você?", sent: false, timestamp: "16:20", status: 'read' }
    ]
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, messages]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        temporaryChat: activeChat.id === 4
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
      }));
      
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderChatHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-tydrapi-darkgray">
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-tydrapi-gray hover:text-white hover:bg-transparent"
          onClick={() => setActiveChat(null)}
        >
          <ArrowLeft size={20} />
        </Button>
      )}
      
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={activeChat?.avatar} />
          <AvatarFallback>{activeChat?.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h3 className="font-medium text-white">{activeChat?.name}</h3>
          <p className="text-xs text-tydrapi-gray">
            {activeChat?.status === 'online' ? 'Online' : activeChat?.lastSeen || 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {activeChat?.id === 4 && (
          <div className="flex items-center text-xs text-yellow-400 mr-2">
            <Clock size={14} className="mr-1" />
            <span>Expira em 8h</span>
          </div>
        )}
        <Button variant="ghost" size="icon" className="text-tydrapi-gray hover:text-white hover:bg-transparent">
          <Phone size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-tydrapi-gray hover:text-white hover:bg-transparent">
          <Video size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-tydrapi-gray hover:text-white hover:bg-transparent">
          <MoreVertical size={20} />
        </Button>
      </div>
    </div>
  );

  const renderChatMessages = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {activeChat && messages[activeChat.id]?.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`
              max-w-[70%] rounded-2xl px-4 py-2 
              ${msg.sent 
                ? 'bg-tydrapi-red text-white rounded-br-none' 
                : 'bg-tydrapi-darkgray text-white rounded-bl-none'
              }
              ${msg.temporaryChat ? 'border border-yellow-500/30' : ''}
            `}
          >
            <p>{msg.text}</p>
            <div className="flex justify-end items-center mt-1 gap-1">
              <span className="text-xs opacity-70">{msg.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );

  const renderChatInput = () => (
    <div className="border-t border-tydrapi-darkgray p-3">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-tydrapi-gray hover:text-white hover:bg-transparent"
        >
          <Image size={20} />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-tydrapi-darkgray border-tydrapi-darkgray focus:border-tydrapi-red"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-tydrapi-gray hover:text-white hover:bg-transparent"
        >
          <Mic size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-tydrapi-red hover:text-tydrapi-red hover:bg-transparent"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );

  const renderContactList = () => (
    <div className="w-full md:w-80 border-r border-tydrapi-darkgray flex flex-col h-full">
      <div className="p-4 border-b border-tydrapi-darkgray">
        <h2 className="text-xl font-bold mb-3">Mensagens</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tydrapi-gray" size={18} />
          <Input 
            placeholder="Buscar contatos..." 
            className="pl-10 bg-tydrapi-darkgray border-tydrapi-darkgray focus:border-tydrapi-red"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div 
            key={contact.id}
            className={`
              flex items-center p-3 cursor-pointer border-b border-tydrapi-darkgray/30 hover:bg-tydrapi-darkgray/50
              ${activeChat?.id === contact.id ? 'bg-tydrapi-darkgray' : ''}
            `}
            onClick={() => setActiveChat(contact)}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {contact.status === 'online' && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-tydrapi-black"></span>
              )}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white truncate">{contact.name}</h3>
                <span className="text-xs text-tydrapi-gray">{contact.lastMessage?.time}</span>
              </div>
              <p className="text-sm text-tydrapi-gray truncate">{contact.lastMessage?.text}</p>
            </div>
            {contact.unread > 0 && (
              <Badge className="ml-2 bg-tydrapi-red">{contact.unread}</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="h-screen flex flex-col md:flex-row animate-fade-in">
        {(!activeChat || !isMobile) && renderContactList()}
        
        {activeChat ? (
          <div className="flex-1 flex flex-col h-full">
            {renderChatHeader()}
            {renderChatMessages()}
            {renderChatInput()}
          </div>
        ) : (
          isMobile ? null : (
            <div className="flex-1 flex items-center justify-center bg-tydrapi-black/30">
              <Card className="tydrapi-card p-8 text-center max-w-md">
                <h3 className="text-xl font-semibold mb-3">Selecione uma conversa</h3>
                <p className="text-tydrapi-gray mb-6">
                  Escolha um contato ou grupo para iniciar uma conversa
                </p>
              </Card>
            </div>
          )
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
