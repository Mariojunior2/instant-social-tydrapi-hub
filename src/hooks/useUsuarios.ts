
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '@/services/usuarioService';
import { Usuario, CreateUsuario, UpdateUsuario } from '@/types/database';
import { useToast } from '@/components/ui/use-toast';

export const useUsuarios = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['usuarios', page, limit],
    queryFn: () => usuarioService.getAll(page, limit),
  });
};

export const useUsuario = (id: number) => {
  return useQuery({
    queryKey: ['usuario', id],
    queryFn: () => usuarioService.getById(id),
    enabled: !!id,
  });
};

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (usuario: CreateUsuario) => usuarioService.create(usuario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({
        title: "Usuário criado!",
        description: "O usuário foi criado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar usuário.",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, usuario }: { id: number; usuario: UpdateUsuario }) => 
      usuarioService.update(id, usuario),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['usuario', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({
        title: "Usuário atualizado!",
        description: "O usuário foi atualizado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar usuário.",
        variant: "destructive"
      });
    }
  });
};

export const useUsuariosByInteresse = (interesseId: number) => {
  return useQuery({
    queryKey: ['usuarios', 'interesse', interesseId],
    queryFn: () => usuarioService.getByInteresse(interesseId),
    enabled: !!interesseId,
  });
};
