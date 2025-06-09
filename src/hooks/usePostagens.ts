
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postagemService } from '@/services/postagemService';
import { CreatePostagem, UpdatePostagem } from '@/types/database';
import { useToast } from '@/components/ui/use-toast';

export const usePostagens = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['postagens', page, limit],
    queryFn: () => postagemService.getAll(page, limit),
  });
};

export const useFeedPostagens = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['postagens', 'feed', page, limit],
    queryFn: () => postagemService.getFeed(page, limit),
  });
};

export const usePostagem = (id: number) => {
  return useQuery({
    queryKey: ['postagem', id],
    queryFn: () => postagemService.getById(id),
    enabled: !!id,
  });
};

export const usePostagensByUsuario = (usuarioId: number, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['postagens', 'usuario', usuarioId, page, limit],
    queryFn: () => postagemService.getByUsuario(usuarioId, page, limit),
    enabled: !!usuarioId,
  });
};

export const useCreatePostagem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (postagem: CreatePostagem) => postagemService.create(postagem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postagens'] });
      toast({
        title: "Postagem criada!",
        description: "Sua postagem foi criada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar postagem.",
        variant: "destructive"
      });
    }
  });
};

export const useUpdatePostagem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, postagem }: { id: number; postagem: UpdatePostagem }) =>
      postagemService.update(id, postagem),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['postagem', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['postagens'] });
      toast({
        title: "Postagem atualizada!",
        description: "Sua postagem foi atualizada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar postagem.",
        variant: "destructive"
      });
    }
  });
};

export const useUploadMedia = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (file: File) => postagemService.uploadMedia(file),
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da mídia.",
        variant: "destructive"
      });
    }
  });
};
