
import api from '@/lib/api';
import { Postagem, CreatePostagem, UpdatePostagem, ApiResponse, PaginatedResponse } from '@/types/database';

export const postagemService = {
  // Buscar todas as postagens
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Postagem>> => {
    const response = await api.get(`/postagens?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar postagem por ID
  getById: async (id: number): Promise<ApiResponse<Postagem>> => {
    const response = await api.get(`/postagens/${id}`);
    return response.data;
  },

  // Buscar postagens por usuário
  getByUsuario: async (usuarioId: number, page = 1, limit = 10): Promise<PaginatedResponse<Postagem>> => {
    const response = await api.get(`/postagens/usuario/${usuarioId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar postagens públicas (feed)
  getFeed: async (page = 1, limit = 10): Promise<PaginatedResponse<Postagem>> => {
    const response = await api.get(`/postagens/feed?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Criar nova postagem
  create: async (postagem: CreatePostagem): Promise<ApiResponse<Postagem>> => {
    const response = await api.post('/postagens', postagem);
    return response.data;
  },

  // Atualizar postagem
  update: async (id: number, postagem: UpdatePostagem): Promise<ApiResponse<Postagem>> => {
    const response = await api.put(`/postagens/${id}`, postagem);
    return response.data;
  },

  // Deletar postagem
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/postagens/${id}`);
    return response.data;
  },

  // Upload de mídia
  uploadMedia: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/postagens/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
