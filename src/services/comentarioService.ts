
import api from '@/lib/api';
import { Comentario, CreateComentario, UpdateComentario, ApiResponse, PaginatedResponse } from '@/types/database';

export const comentarioService = {
  // Buscar comentários de uma postagem
  getByPostagem: async (postagemId: number, page = 1, limit = 10): Promise<PaginatedResponse<Comentario>> => {
    const response = await api.get(`/comentarios/postagem/${postagemId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar respostas de um comentário
  getRespostas: async (comentarioId: number): Promise<ApiResponse<Comentario[]>> => {
    const response = await api.get(`/comentarios/${comentarioId}/respostas`);
    return response.data;
  },

  // Criar novo comentário
  create: async (comentario: CreateComentario): Promise<ApiResponse<Comentario>> => {
    const response = await api.post('/comentarios', comentario);
    return response.data;
  },

  // Atualizar comentário
  update: async (id: number, comentario: UpdateComentario): Promise<ApiResponse<Comentario>> => {
    const response = await api.put(`/comentarios/${id}`, comentario);
    return response.data;
  },

  // Deletar comentário
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/comentarios/${id}`);
    return response.data;
  }
};
