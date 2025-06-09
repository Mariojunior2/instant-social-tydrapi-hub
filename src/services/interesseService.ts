
import api from '@/lib/api';
import { Interesse, InteresseUsuario, ApiResponse } from '@/types/database';

export const interesseService = {
  // Buscar todos os interesses
  getAll: async (): Promise<ApiResponse<Interesse[]>> => {
    const response = await api.get('/interesses');
    return response.data;
  },

  // Buscar interesses do usuário
  getByUsuario: async (usuarioId: number): Promise<ApiResponse<Interesse[]>> => {
    const response = await api.get(`/interesses/usuario/${usuarioId}`);
    return response.data;
  },

  // Adicionar interesse ao usuário
  addToUsuario: async (usuarioId: number, interesseId: number): Promise<ApiResponse<InteresseUsuario>> => {
    const response = await api.post('/interesse-usuario', {
      idusuario: usuarioId,
      idinteresse: interesseId
    });
    return response.data;
  },

  // Remover interesse do usuário
  removeFromUsuario: async (usuarioId: number, interesseId: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/interesse-usuario/${usuarioId}/${interesseId}`);
    return response.data;
  }
};
