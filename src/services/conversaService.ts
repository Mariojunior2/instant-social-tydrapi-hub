
import api from '@/lib/api';
import { Conversa, ComentarioConversa, ApiResponse, PaginatedResponse } from '@/types/database';

export const conversaService = {
  // Buscar conversas do usuário
  getByUsuario: async (usuarioId: number): Promise<ApiResponse<Conversa[]>> => {
    const response = await api.get(`/conversas/usuario/${usuarioId}`);
    return response.data;
  },

  // Buscar conversa entre dois usuários
  getByUsuarios: async (usuario1Id: number, usuario2Id: number): Promise<ApiResponse<Conversa>> => {
    const response = await api.get(`/conversas/${usuario1Id}/${usuario2Id}`);
    return response.data;
  },

  // Criar nova conversa
  create: async (remetenteId: number, destinatarioId: number): Promise<ApiResponse<Conversa>> => {
    const response = await api.post('/conversas', {
      idremetente: remetenteId,
      iddestinatario: destinatarioId
    });
    return response.data;
  },

  // Buscar mensagens da conversa
  getMensagens: async (conversaId: number, page = 1, limit = 50): Promise<PaginatedResponse<ComentarioConversa>> => {
    const response = await api.get(`/conversas/${conversaId}/mensagens?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Enviar mensagem
  enviarMensagem: async (conversaId: number, autorId: number, conteudo: string): Promise<ApiResponse<ComentarioConversa>> => {
    const response = await api.post('/conversas/mensagens', {
      idconversa: conversaId,
      idautor: autorId,
      conteudo
    });
    return response.data;
  }
};
