
// Tipos baseados no schema do banco de dados
export interface Usuario {
  idusuario: number;
  matricula: string;
  idade: number;
  foto?: string;
  email: string;
  nome: string;
  senha: string;
  data_criacao: string;
  status: 'ativo' | 'inativo';
  criado_em: string;
  atualizado_em: string;
  admin: boolean;
}

export interface Interesse {
  idinteresse: number;
  nome: string;
  criado_em: string;
  atualizado_em: string;
}

export interface InteresseUsuario {
  idinteresse_usuario: number;
  idinteresse: number;
  idusuario: number;
  criado_em: string;
  atualizado_em: string;
}

export interface Postagem {
  idpostagem: number;
  idpostagem_pai?: number;
  conteudo: string;
  visibilidade: 'publico' | 'privado' | 'amigos';
  tipo_postagem: 'texto' | 'imagem' | 'video';
  media_url?: string;
  contador_comentario: number;
  url_amigavel?: string;
  idusuario: number;
  criado_em: string;
  atualizado_em: string;
  usuario?: Usuario;
}

export interface Comentario {
  idcomentario: number;
  idpostagem: number;
  idcomentario_pai?: number;
  texto: string;
  data_emissao: string;
  visibilidade: 'publico' | 'privado' | 'amigos';
  contador_resposta: number;
  url_amigavel?: string;
  tipo_comentario: 'comum' | 'resposta';
  idusuario: number;
  criado_em: string;
  atualizado_em: string;
  usuario?: Usuario;
}

export interface Curtida {
  idcurtida: number;
  tipo_recurso: 'postagem' | 'comentario';
  idcomentario?: number;
  idpostagem?: number;
  idusuario: number;
  criado_em: string;
  atualizado_em: string;
}

export interface Conversa {
  idconversa: number;
  idremetente: number;
  iddestinatario: number;
  criado_em: string;
  atualizado_em: string;
  remetente?: Usuario;
  destinatario?: Usuario;
}

export interface ComentarioConversa {
  idcomentario_conversa: number;
  conteudo: string;
  data_envio: string;
  idconversa: number;
  idautor: number;
  criado_em: string;
  atualizado_em: string;
  autor?: Usuario;
}

export interface Grupo {
  idgrupo: number;
  nome: string;
  idconversa: number;
  criado_em: string;
  atualizado_em: string;
  conversa?: Conversa;
}

export interface GrupoUsuario {
  idgrupo_usuario: number;
  idgrupo: number;
  idusuario: number;
  criado_em: string;
  atualizado_em: string;
  usuario?: Usuario;
  grupo?: Grupo;
}

export interface TipoNotificacao {
  idtipo_notificacao: number;
  nome_do_tipo: string;
}

export interface Notificacao {
  idnotificacao: number;
  conteudo: string;
  idtipo_notificacao: number;
  data_criacao: string;
  id_referencia?: number;
  tipo_referencia?: 'postagem' | 'comentario' | 'curtida' | 'mensagem' | 'amizade' | 'grupo';
  tipo?: TipoNotificacao;
}

export interface NotificacaoUsuario {
  idnotificacao_do_usuario: number;
  idusuario: number;
  idnotificacao: number;
  lida: boolean;
  data_leitura?: string;
  notificacao?: Notificacao;
}

// Tipos para criação/atualização
export type CreateUsuario = Omit<Usuario, 'idusuario' | 'data_criacao' | 'criado_em' | 'atualizado_em'>;
export type UpdateUsuario = Partial<CreateUsuario>;

export type CreatePostagem = Omit<Postagem, 'idpostagem' | 'contador_comentario' | 'criado_em' | 'atualizado_em'>;
export type UpdatePostagem = Partial<CreatePostagem>;

export type CreateComentario = Omit<Comentario, 'idcomentario' | 'data_emissao' | 'contador_resposta' | 'criado_em' | 'atualizado_em'>;
export type UpdateComentario = Partial<CreateComentario>;

export type CreateCurtida = Omit<Curtida, 'idcurtida' | 'criado_em' | 'atualizado_em'>;

// Tipos para responses da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
