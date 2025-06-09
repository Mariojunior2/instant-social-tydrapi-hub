
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { curtidaService } from '@/services/curtidaService';
import { useToast } from '@/components/ui/use-toast';

export const useCurtidaPostagem = (postagemId: number, usuarioId: number) => {
  return useQuery({
    queryKey: ['curtida', 'postagem', postagemId, usuarioId],
    queryFn: () => curtidaService.verificarCurtidaPostagem(postagemId, usuarioId),
    enabled: !!postagemId && !!usuarioId,
  });
};

export const useContarCurtidasPostagem = (postagemId: number) => {
  return useQuery({
    queryKey: ['curtidas', 'count', 'postagem', postagemId],
    queryFn: () => curtidaService.contarCurtidasPostagem(postagemId),
    enabled: !!postagemId,
  });
};

export const useCurtirPostagem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ postagemId, usuarioId }: { postagemId: number; usuarioId: number }) =>
      curtidaService.curtirPostagem(postagemId, usuarioId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['curtida', 'postagem', variables.postagemId, variables.usuarioId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['curtidas', 'count', 'postagem', variables.postagemId] 
      });
      toast({
        title: "Curtida adicionada!",
        description: "Você curtiu esta postagem.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao curtir postagem.",
        variant: "destructive"
      });
    }
  });
};

export const useDescurtir = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (curtidaId: number) => curtidaService.descurtir(curtidaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curtida'] });
      queryClient.invalidateQueries({ queryKey: ['curtidas', 'count'] });
      toast({
        title: "Curtida removida!",
        description: "Você descurtiu esta postagem.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao descurtir.",
        variant: "destructive"
      });
    }
  });
};
