
import api from '@/lib/api';
import { Curtida, CreateCurtida, ApiResponse } from '@/types/database';

export const curtidaService = {
  // Curtir postagem
  curtirPostagem: async (postagemId: number, usuarioId: number): Promise<ApiResponse<Curtida>> => {
    const curtida: CreateCurtida = {
      tipo_recurso: 'postagem',
      idpostagem: postagemId,
      idusuario: usuarioId
    };
    const response = await api.post('/curtidas', curtida);
    return response.data;
  },

  // Curtir comentário
  curtirComentario: async (comentarioId: number, usuarioId: number): Promise<ApiResponse<Curtida>> => {
    const curtida: CreateCurtida = {
      tipo_recurso: 'comentario',
      idcomentario: comentarioId,
      idusuario: usuarioId
    };
    const response = await api.post('/curtidas', curtida);
    return response.data;
  },

  // Descurtir
  descurtir: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/curtidas/${id}`);
    return response.data;
  },

  // Verificar se usuário curtiu postagem
  verificarCurtidaPostagem: async (postagemId: number, usuarioId: number): Promise<ApiResponse<Curtida | null>> => {
    const response = await api.get(`/curtidas/postagem/${postagemId}/usuario/${usuarioId}`);
    return response.data;
  },

  // Verificar se usuário curtiu comentário
  verificarCurtidaComentario: async (comentarioId: number, usuarioId: number): Promise<ApiResponse<Curtida | null>> => {
    const response = await api.get(`/curtidas/comentario/${comentarioId}/usuario/${usuarioId}`);
    return response.data;
  },

  // Contar curtidas de postagem
  contarCurtidasPostagem: async (postagemId: number): Promise<ApiResponse<{ count: number }>> => {
    const response = await api.get(`/curtidas/postagem/${postagemId}/count`);
    return response.data;
  },

  // Contar curtidas de comentário
  contarCurtidasComentario: async (comentarioId: number): Promise<ApiResponse<{ count: number }>> => {
    const response = await api.get(`/curtidas/comentario/${comentarioId}/count`);
    return response.data;
  }
};
