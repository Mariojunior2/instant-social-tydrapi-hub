
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, User, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Explorar', path: '/explore', icon: Compass },
    { name: 'Perfil', path: '/profile', icon: User },
    { name: 'Configurações', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-tydrapi-black border-t border-tydrapi-darkgray text-tydrapi-gray z-50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`flex flex-col items-center justify-center px-4 pt-2 pb-1 ${
                  isActive ? 'text-tydrapi-red' : 'text-tydrapi-gray hover:text-white'
                }`}
              >
                <item.icon size={24} className={isActive ? 'animate-slide-up' : ''} />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
