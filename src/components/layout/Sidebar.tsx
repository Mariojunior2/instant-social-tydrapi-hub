
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, User, Settings, MessageCircle, Users, Bell, Book, GraduationCap, Calendar, BookOpen, Video, PenTool, Lightbulb, Library } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = () => {
  const location = useLocation();
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const [unreadSchoolNotifications, setUnreadSchoolNotifications] = useState(2);
  
  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Explorar', path: '/explore', icon: Compass },
    { name: 'Mensagens', path: '/messages', icon: MessageCircle, badge: unreadMessages },
    { name: 'Comunidades', path: '/communities', icon: Users },
    { 
      name: 'Recursos Educacionais', 
      path: '/educational-resources', 
      icon: Library,
      subItems: [
        { name: 'Material de Estudo', path: '/educational-resources?type=study', icon: BookOpen },
        { name: 'Vídeo Aulas', path: '/educational-resources?type=video', icon: Video },
        { name: 'Exercícios Práticos', path: '/educational-resources?type=exercises', icon: PenTool },
        { name: 'Dicas de Estudo', path: '/educational-resources?type=tips', icon: Lightbulb }
      ]
    },
    { 
      name: 'Notificações', 
      path: '/notifications', 
      icon: Bell, 
      badge: unreadNotifications + unreadSchoolNotifications,
      subItems: [
        { name: 'Acadêmicas', path: '/notifications/academic', icon: GraduationCap, badge: unreadSchoolNotifications },
        { name: 'Calendário', path: '/notifications/calendar', icon: Calendar },
        { name: 'Materiais', path: '/notifications/materials', icon: Book }
      ]
    },
    { name: 'Perfil', path: '/profile', icon: User },
    { name: 'Configurações', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 border-r border-tydrapi-darkgray bg-tydrapi-black flex flex-col h-screen">
      <div className="p-4 border-b border-tydrapi-darkgray">
        <Link to="/" className="flex items-center">
          <span className="text-tydrapi-red font-bold text-xl">Tydra</span>
          <span className="text-white font-bold text-xl">PI</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-tydrapi-red text-white' 
                      : 'text-tydrapi-gray hover:bg-tydrapi-darkgray hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon size={20} className="mr-3" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="bg-tydrapi-red ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
                
                {/* Sub-itens para notificações acadêmicas */}
                {item.subItems && isActive && (
                  <ul className="ml-8 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link 
                          to={subItem.path} 
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            location.pathname === subItem.path 
                              ? 'bg-tydrapi-darkred text-white' 
                              : 'text-tydrapi-gray hover:bg-tydrapi-darkgray hover:text-white'
                          }`}
                        >
                          <div className="flex items-center">
                            <subItem.icon size={16} className="mr-2" />
                            <span>{subItem.name}</span>
                          </div>
                          {subItem.badge && (
                            <Badge variant="destructive" className="bg-tydrapi-darkred ml-auto text-xs py-0 px-1.5">
                              {subItem.badge}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-tydrapi-darkgray">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=68" />
            <AvatarFallback className="bg-tydrapi-darkgray text-white">JD</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">João Silva</p>
            <p className="text-xs text-tydrapi-gray">@joaosilva</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-500" title="Online"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
