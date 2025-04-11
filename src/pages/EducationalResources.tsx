
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Video, PenTool, Lightbulb, Filter, Search, Clock, Calendar, Star, Download, ExternalLink, Share2, BookText, GraduationCap, Target, Users, School, Brain, Library, FileBadge, FolderKanban } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ResourceType = 'study' | 'video' | 'exercises' | 'tips' | 'quizzes' | 'projects' | 'courses' | 'presentations' | 'papers' | 'all';
type ResourceLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';
type ResourceSubject = 'math' | 'physics' | 'programming' | 'languages' | 'history' | 'geography' | 'biology' | 'chemistry' | 'all';
type ResourceFormat = 'pdf' | 'video' | 'audio' | 'interactive' | 'all';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: ResourceType;
  level: ResourceLevel;
  subject: ResourceSubject;
  format?: ResourceFormat;
  tags: string[];
  popularity: number;
  dateAdded: string;
  estimatedTime?: string;
  link: string;
  downloadable: boolean;
  author?: string;
  institution?: string;
  prerequisites?: string[];
  certification?: boolean;
  language?: string;
  featuredImage?: string;
  relatedResources?: number[];
}

const EducationalResources = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') as ResourceType || 'all';
  
  const [activeTab, setActiveTab] = useState<ResourceType>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<ResourceLevel>('all');
  const [subjectFilter, setSubjectFilter] = useState<ResourceSubject>('all');
  const [formatFilter, setFormatFilter] = useState<ResourceFormat>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'duration'>('recent');
  const [showCertification, setShowCertification] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  const resources: Resource[] = [
    {
      id: 1,
      title: "Fundamentos de Cálculo I",
      description: "Material completo com teoria e exercícios resolvidos sobre limites, derivadas e integrais",
      type: "study",
      level: "beginner",
      subject: "math",
      format: "pdf",
      tags: ["Cálculo", "Matemática", "Limites", "Derivadas"],
      popularity: 428,
      dateAdded: "2023-08-15",
      estimatedTime: "4 horas",
      link: "#",
      downloadable: true,
      author: "Prof. Carlos Santos",
      institution: "Universidade Federal do Rio",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=1"
    },
    {
      id: 2,
      title: "Curso de Programação em Python",
      description: "Série de vídeos ensinando os conceitos básicos de programação usando Python",
      type: "video",
      level: "beginner",
      subject: "programming",
      format: "video",
      tags: ["Python", "Programação", "Iniciantes"],
      popularity: 752,
      dateAdded: "2023-10-05",
      estimatedTime: "8 horas",
      link: "#",
      downloadable: false,
      author: "Ana Oliveira",
      institution: "CodeAcademy Brasil",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=2"
    },
    {
      id: 3,
      title: "Lista de Exercícios - Física Mecânica",
      description: "Exercícios práticos sobre leis de Newton, conservação de energia e movimento retilíneo",
      type: "exercises",
      level: "intermediate",
      subject: "physics",
      format: "pdf",
      tags: ["Física", "Mecânica", "Exercícios"],
      popularity: 315,
      dateAdded: "2023-11-22",
      estimatedTime: "3 horas",
      link: "#",
      downloadable: true,
      author: "Dr. Ricardo Mello",
      institution: "Instituto de Física - USP",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=3"
    },
    {
      id: 4,
      title: "Técnicas de Memorização Eficiente",
      description: "Guia com métodos científicos para melhorar sua capacidade de memorização durante os estudos",
      type: "tips",
      level: "all",
      subject: "all",
      format: "pdf",
      tags: ["Memorização", "Produtividade", "Estudo"],
      popularity: 628,
      dateAdded: "2024-01-10",
      link: "#",
      downloadable: true,
      author: "Dra. Juliana Campos",
      institution: "Instituto Brasileiro de Neurociência",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=4"
    },
    {
      id: 5,
      title: "Programação Orientada a Objetos em Java",
      description: "Material avançado sobre padrões de projeto e princípios SOLID em Java",
      type: "study",
      level: "advanced",
      subject: "programming",
      format: "pdf",
      tags: ["Java", "OOP", "SOLID", "Padrões de Projeto"],
      popularity: 286,
      dateAdded: "2023-09-18",
      estimatedTime: "6 horas",
      link: "#",
      downloadable: true,
      author: "Prof. Marcelo Alves",
      institution: "Universidade Tecnológica",
      prerequisites: ["Conhecimentos básicos de Java", "Lógica de programação"],
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=5"
    },
    {
      id: 6,
      title: "Aulas de Inglês para Conversação",
      description: "Série de vídeos com diálogos e exercícios práticos para melhorar sua fluência em inglês",
      type: "video",
      level: "intermediate",
      subject: "languages",
      format: "video",
      tags: ["Inglês", "Conversação", "Idiomas"],
      popularity: 492,
      dateAdded: "2024-02-05",
      estimatedTime: "5 horas",
      link: "#",
      downloadable: false,
      author: "Sarah Johnson",
      institution: "English Academy",
      language: "Inglês/Português",
      featuredImage: "https://i.pravatar.cc/300?img=6"
    },
    {
      id: 7,
      title: "Pomodoro e outras técnicas de foco",
      description: "Aprenda a usar o método Pomodoro e outras técnicas para aumentar sua concentração nos estudos",
      type: "tips",
      level: "beginner",
      subject: "all",
      format: "pdf",
      tags: ["Produtividade", "Foco", "Técnicas de Estudo"],
      popularity: 531,
      dateAdded: "2024-03-12",
      link: "#",
      downloadable: true,
      author: "Carolina Mendes",
      institution: "Instituto de Produtividade Acadêmica",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=7"
    },
    {
      id: 8,
      title: "Lista de Problemas de Algoritmos",
      description: "Exercícios de programação com diferentes níveis de dificuldade para praticar lógica e algoritmos",
      type: "exercises",
      level: "intermediate",
      subject: "programming",
      format: "interactive",
      tags: ["Algoritmos", "Programação", "Lógica"],
      popularity: 347,
      dateAdded: "2023-12-08",
      estimatedTime: "4 horas",
      link: "#",
      downloadable: true,
      author: "Prof. Fernando Costa",
      institution: "Universidade Federal do Brasil",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=8"
    },
    {
      id: 9,
      title: "Quiz Interativo de Biologia Celular",
      description: "Teste seus conhecimentos sobre biologia celular com este quiz interativo completo",
      type: "quizzes",
      level: "intermediate",
      subject: "biology",
      format: "interactive",
      tags: ["Biologia", "Células", "Quiz", "Interativo"],
      popularity: 412,
      dateAdded: "2024-01-15",
      estimatedTime: "1 hora",
      link: "#",
      downloadable: false,
      author: "Profa. Amanda Ribeiro",
      institution: "Departamento de Biologia - UFRJ",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=9"
    },
    {
      id: 10,
      title: "Curso Completo de História do Brasil",
      description: "Do descobrimento à república: curso completo sobre a história brasileira com material de apoio",
      type: "courses",
      level: "beginner",
      subject: "history",
      format: "video",
      tags: ["História", "Brasil", "Curso", "Colonial"],
      popularity: 623,
      dateAdded: "2023-11-10",
      estimatedTime: "12 horas",
      link: "#",
      downloadable: true,
      author: "Prof. André Oliveira",
      institution: "Universidade de São Paulo",
      certification: true,
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=10"
    },
    {
      id: 11,
      title: "Projeto Integrador: Aplicação Web Sustentável",
      description: "Desenvolva uma aplicação web com foco em sustentabilidade utilizando tecnologias modernas",
      type: "projects",
      level: "advanced",
      subject: "programming",
      format: "interactive",
      tags: ["Projeto", "Web", "Sustentabilidade", "React"],
      popularity: 289,
      dateAdded: "2024-02-22",
      estimatedTime: "20 horas",
      link: "#",
      downloadable: true,
      author: "Equipe CodeGreen",
      institution: "Instituto de Tecnologia Sustentável",
      prerequisites: ["Conhecimentos de React", "HTML/CSS avançado", "JavaScript"],
      certification: true,
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=11"
    },
    {
      id: 12,
      title: "Apresentação: Fundamentos da Química Orgânica",
      description: "Slides detalhados sobre os princípios fundamentais da química orgânica com exemplos e exercícios",
      type: "presentations",
      level: "beginner",
      subject: "chemistry",
      format: "pdf",
      tags: ["Química", "Orgânica", "Slides", "Fundamentos"],
      popularity: 378,
      dateAdded: "2023-10-18",
      estimatedTime: "2 horas",
      link: "#",
      downloadable: true,
      author: "Dra. Renata Campos",
      institution: "Departamento de Química - UNICAMP",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=12"
    },
    {
      id: 13,
      title: "Artigo Científico: Impactos da IA na Educação",
      description: "Artigo acadêmico sobre como a Inteligência Artificial está transformando os métodos educacionais",
      type: "papers",
      level: "advanced",
      subject: "all",
      format: "pdf",
      tags: ["IA", "Educação", "Artigo", "Pesquisa"],
      popularity: 265,
      dateAdded: "2024-03-05",
      estimatedTime: "1 hora",
      link: "#",
      downloadable: true,
      author: "Prof. Dr. Gustavo Mendes",
      institution: "Instituto de Pesquisas Educacionais",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=13"
    },
    {
      id: 14,
      title: "Realidade Aumentada na Educação Geográfica",
      description: "Aprenda a utilizar recursos de realidade aumentada para o ensino de geografia e cartografia",
      type: "courses",
      level: "intermediate",
      subject: "geography",
      format: "interactive",
      tags: ["Geografia", "Realidade Aumentada", "Tecnologia", "Educação"],
      popularity: 342,
      dateAdded: "2024-01-28",
      estimatedTime: "6 horas",
      link: "#",
      downloadable: false,
      author: "Profa. Dra. Luciana Ferreira",
      institution: "Centro de Tecnologias Educacionais",
      certification: true,
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=14"
    },
    {
      id: 15,
      title: "Técnicas Avançadas de Pesquisa Acadêmica",
      description: "Guia completo para a realização de pesquisas acadêmicas de alto nível com metodologias atuais",
      type: "tips",
      level: "advanced",
      subject: "all",
      format: "pdf",
      tags: ["Pesquisa", "Academia", "Metodologia", "Referências"],
      popularity: 419,
      dateAdded: "2023-12-15",
      estimatedTime: "3 horas",
      link: "#",
      downloadable: true,
      author: "Prof. Dr. Roberto Almeida",
      institution: "Departamento de Metodologia Científica - UFMG",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=15"
    },
    {
      id: 16,
      title: "Podcast: Debates Filosóficos Contemporâneos",
      description: "Série de episódios discutindo temas filosóficos atuais com professores e especialistas",
      type: "video",
      level: "intermediate",
      subject: "history",
      format: "audio",
      tags: ["Filosofia", "Podcast", "Debates", "Contemporâneo"],
      popularity: 287,
      dateAdded: "2024-02-10",
      estimatedTime: "8 horas",
      link: "#",
      downloadable: true,
      author: "Pedro Carvalho",
      institution: "Podcast Filosofando",
      language: "Português",
      featuredImage: "https://i.pravatar.cc/300?img=16"
    }
  ];

  const getResourceIcon = (type: ResourceType) => {
    switch(type) {
      case 'study': return <BookOpen className="h-6 w-6" />;
      case 'video': return <Video className="h-6 w-6" />;
      case 'exercises': return <PenTool className="h-6 w-6" />;
      case 'tips': return <Lightbulb className="h-6 w-6" />;
      case 'quizzes': return <Target className="h-6 w-6" />;
      case 'projects': return <FolderKanban className="h-6 w-6" />;
      case 'courses': return <School className="h-6 w-6" />;
      case 'presentations': return <BookText className="h-6 w-6" />;
      case 'papers': return <FileBadge className="h-6 w-6" />;
      default: return <Library className="h-6 w-6" />;
    }
  };

  const getResourceTypeColor = (type: ResourceType) => {
    switch(type) {
      case 'study': return "bg-blue-600";
      case 'video': return "bg-red-600";
      case 'exercises': return "bg-green-600";
      case 'tips': return "bg-yellow-600";
      case 'quizzes': return "bg-purple-600";
      case 'projects': return "bg-indigo-600";
      case 'courses': return "bg-pink-600";
      case 'presentations': return "bg-cyan-600";
      case 'papers': return "bg-emerald-600";
      default: return "bg-tydrapi-gray";
    }
  };

  const getResourceTypeLabel = (type: ResourceType) => {
    switch(type) {
      case 'study': return "Material de Estudo";
      case 'video': return "Vídeo Aula";
      case 'exercises': return "Exercícios";
      case 'tips': return "Dicas";
      case 'quizzes': return "Quiz";
      case 'projects': return "Projeto";
      case 'courses': return "Curso";
      case 'presentations': return "Apresentação";
      case 'papers': return "Artigo Científico";
      default: return "Recurso";
    }
  };

  const getLevelColor = (level: ResourceLevel) => {
    switch(level) {
      case 'beginner': return "bg-green-500";
      case 'intermediate': return "bg-yellow-500";
      case 'advanced': return "bg-red-500";
      default: return "bg-tydrapi-gray";
    }
  };

  const getLevelLabel = (level: ResourceLevel) => {
    switch(level) {
      case 'beginner': return "Iniciante";
      case 'intermediate': return "Intermediário";
      case 'advanced': return "Avançado";
      default: return "Todos os níveis";
    }
  };

  const getSubjectLabel = (subject: ResourceSubject) => {
    switch(subject) {
      case 'math': return "Matemática";
      case 'physics': return "Física";
      case 'programming': return "Programação";
      case 'languages': return "Idiomas";
      case 'history': return "História";
      case 'geography': return "Geografia";
      case 'biology': return "Biologia";
      case 'chemistry': return "Química";
      default: return "Geral";
    }
  };

  const getFormatLabel = (format: ResourceFormat) => {
    switch(format) {
      case 'pdf': return "PDF/Documento";
      case 'video': return "Vídeo";
      case 'audio': return "Áudio";
      case 'interactive': return "Interativo";
      default: return "Todos";
    }
  };

  const handleDownload = (resource: Resource) => {
    toast({
      title: "Download iniciado",
      description: `${resource.title} será baixado em instantes.`,
      academicType: "homework",
    });
  };

  const handleOpenResource = (resource: Resource) => {
    toast({
      title: "Recurso aberto",
      description: `Abrindo ${resource.title}`,
      academicType: "homework",
    });
  };

  const sortResources = (resources: Resource[]) => {
    switch (sortBy) {
      case 'recent':
        return [...resources].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case 'popular':
        return [...resources].sort((a, b) => b.popularity - a.popularity);
      case 'duration':
        return [...resources].sort((a, b) => {
          if (!a.estimatedTime) return 1;
          if (!b.estimatedTime) return -1;
          return a.estimatedTime.localeCompare(b.estimatedTime);
        });
      default:
        return resources;
    }
  };

  let filteredResources = resources.filter(resource => {
    // Filtrar por tipo
    if (activeTab !== 'all' && resource.type !== activeTab) return false;
    
    // Filtrar por nível
    if (levelFilter !== 'all' && resource.level !== levelFilter) return false;
    
    // Filtrar por assunto
    if (subjectFilter !== 'all' && resource.subject !== subjectFilter) return false;
    
    // Filtrar por formato
    if (formatFilter !== 'all' && resource.format !== formatFilter) return false;
    
    // Filtrar por certificação
    if (showCertification && !resource.certification) return false;
    
    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return resource.title.toLowerCase().includes(query) || 
             resource.description.toLowerCase().includes(query) ||
             resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
             (resource.author && resource.author.toLowerCase().includes(query)) ||
             (resource.institution && resource.institution.toLowerCase().includes(query));
    }
    
    return true;
  });
  
  // Aplicar ordenação
  filteredResources = sortResources(filteredResources);

  return (
    <MainLayout>
      <div className="tydrapi-container py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Recursos Educacionais</h1>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tydrapi-gray" size={18} />
              <Input 
                placeholder="Buscar recursos..." 
                className="pl-10 bg-tydrapi-darkgray border-tydrapi-darkgray focus:border-tydrapi-red" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline"
              className="border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray flex items-center gap-2"
            >
              <Filter size={18} /> Filtros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <Card className="tydrapi-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Filtrar por Nível</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={levelFilter === 'all' ? "default" : "outline"}
                  className={levelFilter === 'all' ? "bg-tydrapi-red hover:bg-tydrapi-darkred" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setLevelFilter('all')}
                >
                  Todos os Níveis
                </Button>
                <Button 
                  variant={levelFilter === 'beginner' ? "default" : "outline"}
                  className={levelFilter === 'beginner' ? "bg-green-600 hover:bg-green-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setLevelFilter('beginner')}
                >
                  Iniciante
                </Button>
                <Button 
                  variant={levelFilter === 'intermediate' ? "default" : "outline"}
                  className={levelFilter === 'intermediate' ? "bg-yellow-600 hover:bg-yellow-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setLevelFilter('intermediate')}
                >
                  Intermediário
                </Button>
                <Button 
                  variant={levelFilter === 'advanced' ? "default" : "outline"}
                  className={levelFilter === 'advanced' ? "bg-red-600 hover:bg-red-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setLevelFilter('advanced')}
                >
                  Avançado
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="tydrapi-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Filtrar por Assunto</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] overflow-y-auto pr-2">
              <div className="flex flex-col gap-2">
                <Button 
                  variant={subjectFilter === 'all' ? "default" : "outline"}
                  className={subjectFilter === 'all' ? "bg-tydrapi-red hover:bg-tydrapi-darkred" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('all')}
                >
                  Todos os Assuntos
                </Button>
                <Button 
                  variant={subjectFilter === 'math' ? "default" : "outline"}
                  className={subjectFilter === 'math' ? "bg-blue-600 hover:bg-blue-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('math')}
                >
                  Matemática
                </Button>
                <Button 
                  variant={subjectFilter === 'physics' ? "default" : "outline"}
                  className={subjectFilter === 'physics' ? "bg-purple-600 hover:bg-purple-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('physics')}
                >
                  Física
                </Button>
                <Button 
                  variant={subjectFilter === 'programming' ? "default" : "outline"}
                  className={subjectFilter === 'programming' ? "bg-green-600 hover:bg-green-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('programming')}
                >
                  Programação
                </Button>
                <Button 
                  variant={subjectFilter === 'languages' ? "default" : "outline"}
                  className={subjectFilter === 'languages' ? "bg-yellow-600 hover:bg-yellow-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('languages')}
                >
                  Idiomas
                </Button>
                <Button 
                  variant={subjectFilter === 'history' ? "default" : "outline"}
                  className={subjectFilter === 'history' ? "bg-amber-600 hover:bg-amber-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('history')}
                >
                  História
                </Button>
                <Button 
                  variant={subjectFilter === 'geography' ? "default" : "outline"}
                  className={subjectFilter === 'geography' ? "bg-emerald-600 hover:bg-emerald-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('geography')}
                >
                  Geografia
                </Button>
                <Button 
                  variant={subjectFilter === 'biology' ? "default" : "outline"}
                  className={subjectFilter === 'biology' ? "bg-lime-600 hover:bg-lime-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('biology')}
                >
                  Biologia
                </Button>
                <Button 
                  variant={subjectFilter === 'chemistry' ? "default" : "outline"}
                  className={subjectFilter === 'chemistry' ? "bg-fuchsia-600 hover:bg-fuchsia-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setSubjectFilter('chemistry')}
                >
                  Química
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="tydrapi-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Formato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={formatFilter === 'all' ? "default" : "outline"}
                  className={formatFilter === 'all' ? "bg-tydrapi-red hover:bg-tydrapi-darkred" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setFormatFilter('all')}
                >
                  Todos os Formatos
                </Button>
                <Button 
                  variant={formatFilter === 'pdf' ? "default" : "outline"}
                  className={formatFilter === 'pdf' ? "bg-blue-600 hover:bg-blue-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setFormatFilter('pdf')}
                >
                  PDF/Documento
                </Button>
                <Button 
                  variant={formatFilter === 'video' ? "default" : "outline"}
                  className={formatFilter === 'video' ? "bg-red-600 hover:bg-red-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setFormatFilter('video')}
                >
                  Vídeo
                </Button>
                <Button 
                  variant={formatFilter === 'audio' ? "default" : "outline"}
                  className={formatFilter === 'audio' ? "bg-yellow-600 hover:bg-yellow-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setFormatFilter('audio')}
                >
                  Áudio
                </Button>
                <Button 
                  variant={formatFilter === 'interactive' ? "default" : "outline"}
                  className={formatFilter === 'interactive' ? "bg-green-600 hover:bg-green-700" : "border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray"}
                  onClick={() => setFormatFilter('interactive')}
                >
                  Interativo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="tydrapi-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Opções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="sort-by">Ordenar por</Label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as 'recent' | 'popular' | 'duration')}
                  >
                    <SelectTrigger id="sort-by" className="mt-1 bg-tydrapi-darkgray border-tydrapi-darkgray">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Mais recentes</SelectItem>
                      <SelectItem value="popular">Mais populares</SelectItem>
                      <SelectItem value="duration">Duração</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="certification" 
                    checked={showCertification}
                    onCheckedChange={(checked) => setShowCertification(checked as boolean)}
                  />
                  <Label htmlFor="certification">Com certificação</Label>
                </div>
                
                <div>
                  <Label className="mb-2 block">Exibição</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={displayMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      className={displayMode === 'grid' ? 'bg-tydrapi-red hover:bg-tydrapi-darkred' : 'border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray'}
                      onClick={() => setDisplayMode('grid')}
                    >
                      Grade
                    </Button>
                    <Button 
                      variant={displayMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      className={displayMode === 'list' ? 'bg-tydrapi-red hover:bg-tydrapi-darkred' : 'border-tydrapi-darkgray text-tydrapi-gray hover:bg-tydrapi-darkgray'}
                      onClick={() => setDisplayMode('list')}
                    >
                      Lista
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="tydrapi-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Encontre diversos recursos educacionais para aprimorar seus estudos. Filtre por tipo, nível e assunto para encontrar exatamente o que você precisa.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Material de Estudo</p>
                    <p className="text-xs text-tydrapi-gray">Textos, PDFs e referências</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-red-600">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vídeo Aulas</p>
                    <p className="text-xs text-tydrapi-gray">Aulas e tutoriais em vídeo</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-600">
                    <PenTool className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Exercícios</p>
                    <p className="text-xs text-tydrapi-gray">Prática e fixação de conteúdo</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-yellow-600">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dicas de Estudo</p>
                    <p className="text-xs text-tydrapi-gray">Métodos e técnicas para aprender</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          defaultValue={activeTab} 
          className="w-full"
          onValueChange={(value) => setActiveTab(value as ResourceType)}
        >
          <TabsList className="grid grid-cols-10 mb-6 bg-tydrapi-darkgray overflow-x-auto">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-tydrapi-red data-[state=active]:text-white"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger 
              value="study" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <BookOpen size={16} className="mr-2" /> Material de Estudo
            </TabsTrigger>
            <TabsTrigger 
              value="video" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <Video size={16} className="mr-2" /> Vídeo Aulas
            </TabsTrigger>
            <TabsTrigger 
              value="exercises" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <PenTool size={16} className="mr-2" /> Exercícios
            </TabsTrigger>
            <TabsTrigger 
              value="tips" 
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
            >
              <Lightbulb size={16} className="mr-2" /> Dicas
            </TabsTrigger>
            <TabsTrigger 
              value="quizzes" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Target size={16} className="mr-2" /> Quizzes
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <FolderKanban size={16} className="mr-2" /> Projetos
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
            >
              <School size={16} className="mr-2" /> Cursos
            </TabsTrigger>
            <TabsTrigger 
              value="presentations" 
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
            >
              <BookText size={16} className="mr-2" /> Apresentações
            </TabsTrigger>
            <TabsTrigger 
              value="papers" 
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              <FileBadge size={16} className="mr-2" /> Artigos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredResources.length > 0 ? (
              <div className={displayMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                {filteredResources.map(resource => (
                  <Card key={resource.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg mr-3 ${getResourceTypeColor(resource.type)}`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <div className="flex flex-wrap items-center mt-1 gap-1">
                              <Badge className={`${getResourceTypeColor(resource.type)}`}>
                                {getResourceTypeLabel(resource.type)}
                              </Badge>
                              <Badge className={`${getLevelColor(resource.level)}`}>
                                {getLevelLabel(resource.level)}
                              </Badge>
                              <Badge variant="outline">
                                {getSubjectLabel(resource.subject)}
                              </Badge>
                              {resource.certification && (
                                <Badge className="bg-blue-500">
                                  <GraduationCap size={12} className="mr-1" /> Certificado
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      {resource.featuredImage && displayMode === 'grid' && (
                        <div className="mb-3 rounded-md overflow-hidden">
                          <img src={resource.featuredImage} alt={resource.title} className="w-full h-40 object-cover" />
                        </div>
                      )}
                      <p className="text-sm mb-3">{resource.description}</p>
                      
                      {resource.author && (
                        <div className="text-xs text-tydrapi-gray mb-2">
                          <span className="font-medium">Autor:</span> {resource.author} 
                          {resource.institution && (
                            <span> ({resource.institution})</span>
                          )}
                        </div>
                      )}
                      
                      {resource.prerequisites && resource.prerequisites.length > 0 && (
                        <div className="text-xs text-tydrapi-gray mb-2">
                          <span className="font-medium">Pré-requisitos:</span> {resource.prerequisites.join(", ")}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-tydrapi-darkgray">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-tydrapi-gray mt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{resource.popularity} utilizações</span>
                          </div>
                          {resource.estimatedTime && (
                            <div className="flex items-center ml-3">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{resource.estimatedTime}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Adicionado em {resource.dateAdded}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        className="flex-1 bg-tydrapi-red hover:bg-tydrapi-darkred"
                        onClick={() => handleOpenResource(resource)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Abrir
                      </Button>
                      {resource.downloadable && (
                        <Button 
                          variant="outline"
                          className="flex-1 border-tydrapi-gray text-tydrapi-gray hover:bg-tydrapi-darkgray"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="bg-tydrapi-darkgray"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-tydrapi-gray">Nenhum recurso encontrado com os filtros selecionados.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EducationalResources;
