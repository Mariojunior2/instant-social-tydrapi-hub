
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuarioService';
import { Usuario } from '@/types/database';
import { useToast } from '@/components/ui/use-toast';

interface AuthState {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  // Verificar se há token salvo ao carregar
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        logout();
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: ({ email, senha }: { email: string; senha: string }) =>
      usuarioService.login(email, senha),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { token, usuario } = response.data;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(usuario));
        
        setAuthState({
          user: usuario,
          token,
          isAuthenticated: true,
          isLoading: false,
        });

        toast({
          title: "Login realizado!",
          description: `Bem-vindo(a), ${usuario.nome}!`,
        });
      }
    },
    onError: () => {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
    }
  });

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return {
    ...authState,
    login: loginMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
  };
};
