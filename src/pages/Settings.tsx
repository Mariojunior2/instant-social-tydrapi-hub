import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Lock, Bell, Eye, Moon, Sun, Languages, LogOut, Shield, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: 'João Silva',
    username: 'joaosilva',
    bio: 'Desenvolvedor Full Stack | React, Node.js, TypeScript | Entusiasta de IA e Tecnologias Emergentes | São Paulo, Brasil',
    email: 'joao.silva@exemplo.com',
    phone: '+55 11 98765-4321',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    matches: true,
    groups: true,
    mentions: true,
    emailNotifications: false,
    pushNotifications: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'all',
    onlineStatus: true,
    readReceipts: true,
    dataCollection: true,
    chatExpiration: '24h',
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark',
    fontSize: 'medium',
    language: 'pt-BR',
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleNotificationToggle = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    });
  };
  
  const handlePrivacyToggle = (key: string) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key as keyof typeof privacySettings],
    });
  };
  
  const handlePrivacySelectChange = (key: string, value: string) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: value,
    });
  };
  
  const handleAppearanceSelectChange = (key: string, value: string) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [key]: value,
    });
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram atualizadas com sucesso.",
    });
  };
  
  const handleSavePassword = () => {
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi atualizada com sucesso.",
    });
  };

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64">
              <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="account" 
                  className="justify-start w-full data-[state=active]:bg-tydrapi-darkgray data-[state=active]:text-white"
                >
                  <User size={16} className="mr-2" /> Conta
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="justify-start w-full data-[state=active]:bg-tydrapi-darkgray data-[state=active]:text-white"
                >
                  <Lock size={16} className="mr-2" /> Segurança
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start w-full data-[state=active]:bg-tydrapi-darkgray data-[state=active]:text-white"
                >
                  <Bell size={16} className="mr-2" /> Notificações
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="justify-start w-full data-[state=active]:bg-tydrapi-darkgray data-[state=active]:text-white"
                >
                  <Eye size={16} className="mr-2" /> Privacidade
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="justify-start w-full data-[state=active]:bg-tydrapi-darkgray data-[state=active]:text-white"
                >
                  <Moon size={16} className="mr-2" /> Aparência
                </TabsTrigger>
                
                <Separator className="my-2 bg-tydrapi-darkgray" />
                
                <Button variant="ghost" className="justify-start text-tydrapi-red w-full hover:bg-tydrapi-darkgray">
                  <LogOut size={16} className="mr-2" /> Sair
                </Button>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="account" className="mt-0">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Informações de Conta</CardTitle>
                    <CardDescription>
                      Gerencie suas informações pessoais e de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center md:flex-row md:items-start gap-4 mb-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <Button 
                          size="icon" 
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-tydrapi-red hover:bg-tydrapi-darkred"
                        >
                          <Upload size={14} />
                        </Button>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-center md:text-left">{profileForm.name}</h3>
                        <p className="text-sm text-tydrapi-gray text-center md:text-left">@{profileForm.username}</p>
                        <p className="text-sm mt-2 text-center md:text-left">{profileForm.bio}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={profileForm.name} 
                          onChange={handleProfileChange}
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Nome de usuário</Label>
                        <Input 
                          id="username" 
                          name="username" 
                          value={profileForm.username} 
                          onChange={handleProfileChange}
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea 
                        id="bio" 
                        name="bio" 
                        value={profileForm.bio} 
                        onChange={handleProfileChange}
                        rows={3}
                        className="bg-tydrapi-black border-tydrapi-darkgray resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={profileForm.email} 
                          onChange={handleProfileChange}
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={profileForm.phone} 
                          onChange={handleProfileChange}
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full md:w-auto bg-tydrapi-red hover:bg-tydrapi-darkred"
                      onClick={handleSaveProfile}
                    >
                      Salvar alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>
                      Gerencie sua senha e configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Alterar senha</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha atual</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova senha</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          className="bg-tydrapi-black border-tydrapi-darkgray"
                        />
                      </div>
                      
                      <Button 
                        className="bg-tydrapi-red hover:bg-tydrapi-darkred"
                        onClick={handleSavePassword}
                      >
                        Atualizar senha
                      </Button>
                    </div>
                    
                    <Separator className="my-4 bg-tydrapi-darkgray" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Autenticação de dois fatores</h3>
                      <p className="text-sm text-tydrapi-gray">
                        Adicione uma camada extra de segurança à sua conta com a autenticação de dois fatores.
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <Label htmlFor="twofa">Ativar autenticação de dois fatores</Label>
                        <Switch id="twofa" />
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-tydrapi-darkgray" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sessões ativas</h3>
                      <p className="text-sm text-tydrapi-gray">
                        Dispositivos onde você está conectado atualmente.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border border-tydrapi-darkgray rounded-lg">
                          <div>
                            <h4 className="font-medium">Chrome - Windows</h4>
                            <p className="text-xs text-tydrapi-gray">São Paulo, Brasil • Ativo agora</p>
                          </div>
                          <Badge className="bg-green-600">Atual</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-tydrapi-darkgray rounded-lg">
                          <div>
                            <h4 className="font-medium">Safari - iPhone</h4>
                            <p className="text-xs text-tydrapi-gray">São Paulo, Brasil • Há 2 horas</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            Encerrar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>
                      Gerencie como você recebe notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notificações push</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="notify-messages">Mensagens</Label>
                          <Switch 
                            id="notify-messages" 
                            checked={notificationSettings.messages} 
                            onCheckedChange={() => handleNotificationToggle('messages')} 
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label htmlFor="notify-matches">Novos matches</Label>
                          <Switch 
                            id="notify-matches" 
                            checked={notificationSettings.matches} 
                            onCheckedChange={() => handleNotificationToggle('matches')} 
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label htmlFor="notify-groups">Atividade em grupos</Label>
                          <Switch 
                            id="notify-groups" 
                            checked={notificationSettings.groups} 
                            onCheckedChange={() => handleNotificationToggle('groups')} 
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label htmlFor="notify-mentions">Menções</Label>
                          <Switch 
                            id="notify-mentions" 
                            checked={notificationSettings.mentions} 
                            onCheckedChange={() => handleNotificationToggle('mentions')} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-tydrapi-darkgray" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Métodos de notificação</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <Label htmlFor="notify-email">Notificações por email</Label>
                            <p className="text-xs text-tydrapi-gray">Receba resumos e atualizações importantes por email</p>
                          </div>
                          <Switch 
                            id="notify-email" 
                            checked={notificationSettings.emailNotifications} 
                            onCheckedChange={() => handleNotificationToggle('emailNotifications')} 
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <Label htmlFor="notify-push">Notificações push</Label>
                            <p className="text-xs text-tydrapi-gray">Receba notificações em tempo real no seu dispositivo</p>
                          </div>
                          <Switch 
                            id="notify-push" 
                            checked={notificationSettings.pushNotifications} 
                            onCheckedChange={() => handleNotificationToggle('pushNotifications')} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-tydrapi-red hover:bg-tydrapi-darkred">
                      Salvar preferências
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Privacidade</CardTitle>
                    <CardDescription>
                      Gerencie quem pode ver seu perfil e como seus dados são usados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Visibilidade do perfil</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profile-visibility">Quem pode ver meu perfil</Label>
                        <Select 
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) => handlePrivacySelectChange('profileVisibility', value)}
                        >
                          <SelectTrigger className="bg-tydrapi-black border-tydrapi-darkgray">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent className="bg-tydrapi-darkgray border-tydrapi-gray">
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="connections">Apenas conexões</SelectItem>
                            <SelectItem value="nobody">Ninguém</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="online-status">Mostrar status online</Label>
                          <p className="text-xs text-tydrapi-gray">Permite que outros usuários vejam quando você está online</p>
                        </div>
                        <Switch 
                          id="online-status" 
                          checked={privacySettings.onlineStatus} 
                          onCheckedChange={() => handlePrivacyToggle('onlineStatus')} 
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="read-receipts">Confirmações de leitura</Label>
                          <p className="text-xs text-tydrapi-gray">Permite que outros usuários vejam quando você leu suas mensagens</p>
                        </div>
                        <Switch 
                          id="read-receipts" 
                          checked={privacySettings.readReceipts} 
                          onCheckedChange={() => handlePrivacyToggle('readReceipts')} 
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-tydrapi-darkgray" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Configurações de chat</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="chat-expiration">Expiração de chats temporários</Label>
                        <Select 
                          value={privacySettings.chatExpiration}
                          onValueChange={(value) => handlePrivacySelectChange('chatExpiration', value)}
                        >
                          <SelectTrigger className="bg-tydrapi-black border-tydrapi-darkgray">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent className="bg-tydrapi-darkgray border-tydrapi-gray">
                            <SelectItem value="12h">12 horas</SelectItem>
                            <SelectItem value="24h">24 horas</SelectItem>
                            <SelectItem value="48h">48 horas</SelectItem>
                            <SelectItem value="never">Nunca expirar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-tydrapi-darkgray" />
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Dados e permissões</h3>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="data-collection">Coleta de dados para melhorias</Label>
                          <p className="text-xs text-tydrapi-gray">Permite a coleta de dados de uso para melhorar a experiência</p>
                        </div>
                        <Switch 
                          id="data-collection" 
                          checked={privacySettings.dataCollection} 
                          onCheckedChange={() => handlePrivacyToggle('dataCollection')} 
                        />
                      </div>
                      
                      <Button variant="outline" className="w-full mt-2 border-tydrapi-gray text-tydrapi-gray hover:bg-tydrapi-darkgray">
                        <Shield size={16} className="mr-2" /> Solicitar download dos meus dados
                      </Button>
                    </div>
                    
                    <Button className="bg-tydrapi-red hover:bg-tydrapi-darkred">
                      Salvar configurações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0">
                <Card className="tydrapi-card">
                  <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>
                      Personalize a aparência e a experiência da aplicação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tema</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`
                            border rounded-lg p-4 flex items-center justify-center cursor-pointer
                            ${appearanceSettings.theme === 'light' 
                              ? 'border-tydrapi-red bg-tydrapi-darkgray' 
                              : 'border-tydrapi-darkgray hover:border-tydrapi-gray'}
                          `}
                          onClick={() => handleAppearanceSelectChange('theme', 'light')}
                        >
                          <div className="flex flex-col items-center">
                            <Sun size={24} className="mb-2" />
                            <span>Claro</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`
                            border rounded-lg p-4 flex items-center justify-center cursor-pointer
                            ${appearanceSettings.theme === 'dark' 
                              ? 'border-tydrapi-red bg-tydrapi-darkgray' 
                              : 'border-tydrapi-darkgray hover:border-tydrapi-gray'}
                          `}
                          onClick={() => handleAppearanceSelectChange('theme', 'dark')}
                        >
                          <div className="flex flex-col items-center">
                            <Moon size={24} className="mb-2" />
                            <span>Escuro</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Configurações de texto</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="font-size">Tamanho da fonte</Label>
                        <Select 
                          value={appearanceSettings.fontSize}
                          onValueChange={(value) => handleAppearanceSelectChange('fontSize', value)}
                        >
                          <SelectTrigger className="bg-tydrapi-black border-tydrapi-darkgray">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent className="bg-tydrapi-darkgray border-tydrapi-gray">
                            <SelectItem value="small">Pequeno</SelectItem>
                            <SelectItem value="medium">Médio</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Idioma</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma da aplicação</Label>
                        <Select 
                          value={appearanceSettings.language}
                          onValueChange={(value) => handleAppearanceSelectChange('language', value)}
                        >
                          <SelectTrigger className="bg-tydrapi-black border-tydrapi-darkgray">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent className="bg-tydrapi-darkgray border-tydrapi-gray">
                            <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button className="bg-tydrapi-red hover:bg-tydrapi-darkred">
                      Salvar preferências
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
