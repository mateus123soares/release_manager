import { useState } from 'react'
import { NavLink } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card'
import { Button } from '../../components/button'
import { Badge } from '../../components/badge'
import { 
  FileTextIcon, 
  RocketIcon, 
  TagIcon,
  CalendarIcon,
  PlusIcon
} from 'lucide-react'

import type { Project } from '../../types/projects'


interface DashboardProps {
  projects: Project[]
}

export function Dashboard({
  projects,
  // onNewProject,
}: DashboardProps) {
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground">
            Gerencie seus projetos, documentações e deployments
          </p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          <NavLink to="/project/create" end>
            Novo Projeto
          </NavLink>
        </Button>
      </div>

      {selectedProject ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedProject.name}</CardTitle>
              <CardDescription>{selectedProject.description}</CardDescription>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                Criado em {new Date(selectedProject.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentação</CardTitle>
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedProject.documentation.length}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedProject.documentation.length === 1 ? 'documento' : 'documentos'}
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deployments</CardTitle>
                <RocketIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedProject.deployments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedProject.deployments.length === 1 ? 'deployment' : 'deployments'}
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Releases</CardTitle>
                <TagIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedProject.releases.length}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedProject.releases.length === 1 ? 'release' : 'releases'}
                </p>
              </CardContent>
            </Card>
          </div>

          {selectedProject.releases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Últimas Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProject.releases.slice(-3).reverse().map((release) => (
                    <div key={release.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={release.status === 'released' ? 'default' : 'secondary'}>
                            {release.version}
                          </Badge>
                          <span className="text-sm">{release.description}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(release.releasedAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge variant={release.status === 'released' ? 'default' : 'outline'}>
                        {release.status === 'released' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="space-y-4">
            <h2>Bem-vindo ao Gerenciador de Projetos</h2>
            <p className="text-muted-foreground">
              Selecione um projeto na barra lateral ou crie um novo projeto para começar.
            </p>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </div>
        </div>
      )}

      {projects.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Todos os Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${
                    selectedProject?.id === project.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <CardDescription className="text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.documentation.length} docs</span>
                      <span>{project.deployments.length} deploys</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}