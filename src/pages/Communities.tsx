
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Users, MessageCircle, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Communities = () => {
  const { toast } = useToast();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupType, setNewGroupType] = useState('public');
  
  const myGroups = [
    {
      id: 1,
      name: "Desenvolvedores React Brasil",
      members: 1856,
      role: "Membro",
      avatar: "https://i.pravatar.cc/150?img=50",
      unreadMessages: 12,
      lastActive: "Há 5 minutos"
    },
    {
      id: 2,
      name: "UX/UI Design",
      members: 732,
      role: "Admin",
      avatar: "https://i.pravatar.cc/150?img=24",
      unreadMessages: 0,
      lastActive: "Há 1 hora"
    },
    {
      id: 3,
      name: "Programadores São Paulo",
      members: 3421,
      role: "Membro",
      avatar: "https://i.pravatar.cc/150?img=67",
      unreadMessages: 5,
      lastActive: "Há 30 minutos"
    }
  ];
  
  const suggestedGroups = [
    {
      id: 4,
      name: "Machine Learning Brasil",
      members: 1245,
      avatar: "https://i.pravatar.cc/150?img=51",
      description: "Grupo para discussão de técnicas e implementações de machine learning",
      tags: ["IA", "Machine Learning", "Data Science"]
    },
    {
      id: 5,
      name: "Front-end Developers",
      members: 2897,
      avatar: "https://i.pravatar.cc/150?img=42",
      description: "Comunidade para desenvolvedores front-end compartilharem experiências e novidades",
      tags: ["HTML", "CSS", "JavaScript", "Front-end"]
    }
  ];

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Erro",
        description: "O nome do grupo é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Grupo criado com sucesso!",
      description: `O grupo "${newGroupName}" foi criado.`,
    });
    
    setIsCreateGroupOpen(false);
    setNewGroupName('');
    setNewGroupDesc('');
    setNewGroupType('public');
  };

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Comunidades</h1>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tydrapi-gray" size={18} />
              <Input 
                placeholder="Buscar comunidades..." 
                className="pl-10 bg-tydrapi-darkgray border-tydrapi-darkgray focus:border-tydrapi-red" 
              />
            </div>
            <Button 
              className="bg-tydrapi-red hover:bg-tydrapi-darkred"
              onClick={() => setIsCreateGroupOpen(true)}
            >
              <Plus size={18} className="mr-2" /> Criar Grupo
            </Button>
          </div>
        </div>

        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-tydrapi-darkgray">
            <TabsTrigger value="my-groups" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Users size={16} className="mr-2" /> Meus Grupos
            </TabsTrigger>
            <TabsTrigger value="discover" className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white">
              <Search size={16} className="mr-2" /> Descobrir
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-groups" className="space-y-4">
            {myGroups.map(group => (
              <Card key={group.id} className="tydrapi-card cursor-pointer hover:border-tydrapi-red/50 transition-colors">
                <CardContent className="py-4">
                  <div className="flex items-start">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={group.avatar} />
                      <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{group.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="bg-tydrapi-darkred/30 border-none mr-2">
                              {group.role}
                            </Badge>
                            <span className="text-sm text-tydrapi-gray">{group.members} membros</span>
                          </div>
                          <p className="text-xs text-tydrapi-gray mt-1">Ativo: {group.lastActive}</p>
                        </div>
                        {group.unreadMessages > 0 && (
                          <Badge className="bg-tydrapi-red">{group.unreadMessages} novos</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full bg-tydrapi-darkgray">
                        <MessageCircle size={18} />
                      </Button>
                      {group.role === 'Admin' && (
                        <Button variant="ghost" size="icon" className="rounded-full bg-tydrapi-darkgray">
                          <Settings size={18} />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="discover" className="space-y-4">
            {suggestedGroups.map(group => (
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
        </Tabs>
        
        <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
          <DialogContent className="bg-tydrapi-darkgray text-white border-tydrapi-gray">
            <DialogHeader>
              <DialogTitle>Criar novo grupo</DialogTitle>
              <DialogDescription className="text-tydrapi-gray">
                Crie um grupo para conectar pessoas com interesses similares.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do grupo*</Label>
                <Input 
                  id="name" 
                  value={newGroupName} 
                  onChange={(e) => setNewGroupName(e.target.value)} 
                  className="bg-tydrapi-black border-tydrapi-gray focus:border-tydrapi-red"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={newGroupDesc} 
                  onChange={(e) => setNewGroupDesc(e.target.value)} 
                  className="bg-tydrapi-black border-tydrapi-gray focus:border-tydrapi-red"
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Tipo de grupo</Label>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="groupType" 
                      id="public" 
                      value="public"
                      checked={newGroupType === 'public'}
                      onChange={() => setNewGroupType('public')}
                      className="mr-2 accent-tydrapi-red"
                    />
                    <Label htmlFor="public">Público</Label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="groupType" 
                      id="private" 
                      value="private"
                      checked={newGroupType === 'private'}
                      onChange={() => setNewGroupType('private')}
                      className="mr-2 accent-tydrapi-red"
                    />
                    <Label htmlFor="private">Privado</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsCreateGroupOpen(false)}
                className="border-tydrapi-gray text-tydrapi-gray hover:bg-tydrapi-darkgray"
              >
                Cancelar
              </Button>
              <Button 
                className="bg-tydrapi-red hover:bg-tydrapi-darkred"
                onClick={handleCreateGroup}
              >
                Criar grupo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Communities;
