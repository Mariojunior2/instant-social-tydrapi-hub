
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Video, PenTool, Lightbulb, Filter, Search, Clock, Calendar, Star, Download, External, ExternalLink, Share2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type ResourceType = 'study' | 'video' | 'exercises' | 'tips' | 'all';
type ResourceLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';
type ResourceSubject = 'math' | 'physics' | 'programming' | 'languages' | 'all';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: ResourceType;
  level: ResourceLevel;
  subject: ResourceSubject;
  tags: string[];
  popularity: number;
  dateAdded: string;
  estimatedTime?: string;
  link: string;
  downloadable: boolean;
}

const EducationalResources = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') as ResourceType || 'all';
  
  const [activeTab, setActiveTab] = useState<ResourceType>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<ResourceLevel>('all');
  const [subjectFilter, setSubjectFilter] = useState<ResourceSubject>('all');

  const resources: Resource[] = [
    {
      id: 1,
      title: "Fundamentos de Cálculo I",
      description: "Material completo com teoria e exercícios resolvidos sobre limites, derivadas e integrais",
      type: "study",
      level: "beginner",
      subject: "math",
      tags: ["Cálculo", "Matemática", "Limites", "Derivadas"],
      popularity: 428,
      dateAdded: "2023-08-15",
      estimatedTime: "4 horas",
      link: "#",
      downloadable: true
    },
    {
      id: 2,
      title: "Curso de Programação em Python",
      description: "Série de vídeos ensinando os conceitos básicos de programação usando Python",
      type: "video",
      level: "beginner",
      subject: "programming",
      tags: ["Python", "Programação", "Iniciantes"],
      popularity: 752,
      dateAdded: "2023-10-05",
      estimatedTime: "8 horas",
      link: "#",
      downloadable: false
    },
    {
      id: 3,
      title: "Lista de Exercícios - Física Mecânica",
      description: "Exercícios práticos sobre leis de Newton, conservação de energia e movimento retilíneo",
      type: "exercises",
      level: "intermediate",
      subject: "physics",
      tags: ["Física", "Mecânica", "Exercícios"],
      popularity: 315,
      dateAdded: "2023-11-22",
      estimatedTime: "3 horas",
      link: "#",
      downloadable: true
    },
    {
      id: 4,
      title: "Técnicas de Memorização Eficiente",
      description: "Guia com métodos científicos para melhorar sua capacidade de memorização durante os estudos",
      type: "tips",
      level: "all",
      subject: "all",
      tags: ["Memorização", "Produtividade", "Estudo"],
      popularity: 628,
      dateAdded: "2024-01-10",
      link: "#",
      downloadable: true
    },
    {
      id: 5,
      title: "Programação Orientada a Objetos em Java",
      description: "Material avançado sobre padrões de projeto e princípios SOLID em Java",
      type: "study",
      level: "advanced",
      subject: "programming",
      tags: ["Java", "OOP", "SOLID", "Padrões de Projeto"],
      popularity: 286,
      dateAdded: "2023-09-18",
      estimatedTime: "6 horas",
      link: "#",
      downloadable: true
    },
    {
      id: 6,
      title: "Aulas de Inglês para Conversação",
      description: "Série de vídeos com diálogos e exercícios práticos para melhorar sua fluência em inglês",
      type: "video",
      level: "intermediate",
      subject: "languages",
      tags: ["Inglês", "Conversação", "Idiomas"],
      popularity: 492,
      dateAdded: "2024-02-05",
      estimatedTime: "5 horas",
      link: "#",
      downloadable: false
    },
    {
      id: 7,
      title: "Pomodoro e outras técnicas de foco",
      description: "Aprenda a usar o método Pomodoro e outras técnicas para aumentar sua concentração nos estudos",
      type: "tips",
      level: "beginner",
      subject: "all",
      tags: ["Produtividade", "Foco", "Técnicas de Estudo"],
      popularity: 531,
      dateAdded: "2024-03-12",
      link: "#",
      downloadable: true
    },
    {
      id: 8,
      title: "Lista de Problemas de Algoritmos",
      description: "Exercícios de programação com diferentes níveis de dificuldade para praticar lógica e algoritmos",
      type: "exercises",
      level: "intermediate",
      subject: "programming",
      tags: ["Algoritmos", "Programação", "Lógica"],
      popularity: 347,
      dateAdded: "2023-12-08",
      estimatedTime: "4 horas",
      link: "#",
      downloadable: true
    }
  ];

  const getResourceIcon = (type: ResourceType) => {
    switch(type) {
      case 'study': return <BookOpen className="h-6 w-6" />;
      case 'video': return <Video className="h-6 w-6" />;
      case 'exercises': return <PenTool className="h-6 w-6" />;
      case 'tips': return <Lightbulb className="h-6 w-6" />;
      default: return <BookOpen className="h-6 w-6" />;
    }
  };

  const getResourceTypeColor = (type: ResourceType) => {
    switch(type) {
      case 'study': return "bg-blue-600";
      case 'video': return "bg-red-600";
      case 'exercises': return "bg-green-600";
      case 'tips': return "bg-yellow-600";
      default: return "bg-tydrapi-gray";
    }
  };

  const getResourceTypeLabel = (type: ResourceType) => {
    switch(type) {
      case 'study': return "Material de Estudo";
      case 'video': return "Vídeo Aula";
      case 'exercises': return "Exercícios";
      case 'tips': return "Dicas";
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
      default: return "Geral";
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

  const filteredResources = resources.filter(resource => {
    // Filtrar por tipo
    if (activeTab !== 'all' && resource.type !== activeTab) return false;
    
    // Filtrar por nível
    if (levelFilter !== 'all' && resource.level !== levelFilter) return false;
    
    // Filtrar por assunto
    if (subjectFilter !== 'all' && resource.subject !== subjectFilter) return false;
    
    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return resource.title.toLowerCase().includes(query) || 
             resource.description.toLowerCase().includes(query) ||
             resource.tags.some(tag => tag.toLowerCase().includes(query));
    }
    
    return true;
  });

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
            <CardContent>
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
              </div>
            </CardContent>
          </Card>

          <Card className="tydrapi-card col-span-2">
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
          <TabsList className="grid grid-cols-5 mb-6 bg-tydrapi-darkgray">
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
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <Card key={resource.id} className="tydrapi-card hover:border-tydrapi-red/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg mr-3 ${getResourceTypeColor(resource.type)}`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <div className="flex items-center mt-1 gap-2">
                              <Badge className={`${getResourceTypeColor(resource.type)}`}>
                                {getResourceTypeLabel(resource.type)}
                              </Badge>
                              <Badge className={`${getLevelColor(resource.level)}`}>
                                {getLevelLabel(resource.level)}
                              </Badge>
                              <Badge variant="outline">
                                {getSubjectLabel(resource.subject)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm mb-3">{resource.description}</p>
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
                ))
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-tydrapi-gray">Nenhum recurso encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EducationalResources;
