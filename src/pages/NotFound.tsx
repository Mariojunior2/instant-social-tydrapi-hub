
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-tydrapi-black text-white">
      <div className="text-center px-4">
        <div className="mb-6 text-tydrapi-red">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl text-tydrapi-gray mb-8">Página não encontrada</p>
        <p className="text-tydrapi-gray mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi removida. Verifique se o URL está correto.
        </p>
        <Link to="/">
          <Button className="bg-tydrapi-red hover:bg-tydrapi-darkred">
            <Home className="mr-2" /> Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
