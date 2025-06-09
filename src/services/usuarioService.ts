
import api from '@/lib/api';
import { Usuario, CreateUsuario, UpdateUsuario, ApiResponse, PaginatedResponse } from '@/types/database';

export const usuarioService = {
  // Buscar todos os usuários
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Usuario>> => {
    const response = await api.get(`/usuarios?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar usuário por ID
  getById: async (id: number): Promise<ApiResponse<Usuario>> => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Buscar usuário por email
  getByEmail: async (email: string): Promise<ApiResponse<Usuario>> => {
    const response = await api.get(`/usuarios/email/${email}`);
    return response.data;
  },

  // Criar novo usuário
  create: async (usuario: CreateUsuario): Promise<ApiResponse<Usuario>> => {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  },

  // Atualizar usuário
  update: async (id: number, usuario: UpdateUsuario): Promise<ApiResponse<Usuario>> => {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  },

  // Deletar usuário
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },

  // Login
  login: async (email: string, senha: string): Promise<ApiResponse<{ token: string; usuario: Usuario }>> => {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  },

  // Buscar usuários por interesse
  getByInteresse: async (interesseId: number): Promise<ApiResponse<Usuario[]>> => {
    const response = await api.get(`/usuarios/interesse/${interesseId}`);
    return response.data;
  }
};
