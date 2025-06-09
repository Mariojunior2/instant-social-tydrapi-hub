
// Configurações do banco de dados para sua API Node.js
export const DATABASE_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pi_banco_de_dados',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// URLs da API
export const API_ENDPOINTS = {
  USUARIOS: '/usuarios',
  POSTAGENS: '/postagens',
  COMENTARIOS: '/comentarios',
  CURTIDAS: '/curtidas',
  INTERESSES: '/interesses',
  CONVERSAS: '/conversas',
  NOTIFICACOES: '/notificacoes',
  AUTH: '/auth',
  UPLOAD: '/upload',
};

// Configurações gerais
export const APP_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
  JWT_EXPIRES_IN: '7d',
  UPLOAD_LIMIT: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'],
};
