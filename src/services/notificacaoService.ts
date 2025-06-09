
import api from '@/lib/api';
import { NotificacaoUsuario, ApiResponse, PaginatedResponse } from '@/types/database';

export const notificacaoService = {
  // Buscar notificações do usuário
  getByUsuario: async (usuarioId: number, page = 1, limit = 20): Promise<PaginatedResponse<NotificacaoUsuario>> => {
    const response = await api.get(`/notificacoes/usuario/${usuarioId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar notificações não lidas
  getNaoLidas: async (usuarioId: number): Promise<ApiResponse<NotificacaoUsuario[]>> => {
    const response = await api.get(`/notificacoes/usuario/${usuarioId}/nao-lidas`);
    return response.data;
  },

  // Marcar notificação como lida
  marcarComoLida: async (notificacaoUsuarioId: number): Promise<ApiResponse<void>> => {
    const response = await api.put(`/notificacoes/${notificacaoUsuarioId}/lida`);
    return response.data;
  },

  // Marcar todas as notificações como lidas
  marcarTodasComoLidas: async (usuarioId: number): Promise<ApiResponse<void>> => {
    const response = await api.put(`/notificacoes/usuario/${usuarioId}/todas-lidas`);
    return response.data;
  },

  // Contar notificações não lidas
  contarNaoLidas: async (usuarioId: number): Promise<ApiResponse<{ count: number }>> => {
    const response = await api.get(`/notificacoes/usuario/${usuarioId}/count-nao-lidas`);
    return response.data;
  }
};
