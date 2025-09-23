import { useState } from 'react'
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Textarea } from '../../components/textarea'
import { Label } from '../../components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog'
import { Badge } from '../../components/badge'
import { ArrowLeftIcon, PlusIcon, TagIcon, CalendarIcon, RocketIcon } from 'lucide-react'

import type {Release} from '../../types/release'
import type {Project} from '../../types/projects'

interface ReleaseManagerProps {
  project: Project | null
  //onAddRelease: (projectId: string, release: Omit<Release, 'id'>) => void
}

export function ReleaseManager({ project }: ReleaseManagerProps) {
    let navigate = useNavigate();
  const [isNewReleaseOpen, setIsNewReleaseOpen] = useState(false)
  const [newRelease, setNewRelease] = useState({
    version: '',
    description: '',
    deploymentId: '',
    releasedAt: '',
    status: 'draft' as const
  })

  const onBack = () => {
    navigate(-1);
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum projeto selecionado</p>
      </div>
    )
  }

  const handleCreateRelease = () => {
    if (newRelease.version.trim() && newRelease.description.trim() && newRelease.deploymentId) {
      const releaseData = {
        ...newRelease,
        releasedAt: newRelease.releasedAt || new Date().toISOString().split('T')[0]
      }
      //onAddRelease(project.id, releaseData)
      setNewRelease({
        version: '',
        description: '',
        deploymentId: '',
        releasedAt: '',
        status: 'draft'
      })
      setIsNewReleaseOpen(false)
    }
  }

  const getStatusColor = (status: Release['status']) => {
    switch (status) {
      case 'released':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status: Release['status']) => {
    switch (status) {
      case 'released':
        return 'Publicado'
      default:
        return 'Rascunho'
    }
  }

  const getDeploymentName = (deploymentId: string) => {
    const deployment = project.deployments.find(d => d.id === deploymentId)
    return deployment ? deployment.name : 'Deployment não encontrado'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1>Releases - {project.name}</h1>
            <p className="text-muted-foreground">
              Gerencie as releases e versões do projeto
            </p>
          </div>
        </div>
        
        <Dialog open={isNewReleaseOpen} onOpenChange={setIsNewReleaseOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nova Release
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Release</DialogTitle>
              <DialogDescription>
                Configure os detalhes da nova release do projeto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="version">Versão</Label>
                  <Input
                    id="version"
                    value={newRelease.version}
                    onChange={(e) => setNewRelease(prev => ({ ...prev, version: e.target.value }))}
                    placeholder="v1.0.0"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newRelease.status} onValueChange={(value: 'draft' | 'released') => setNewRelease(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="released">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="deployment">Deployment Relacionado</Label>
                <Select value={newRelease.deploymentId} onValueChange={(value) => setNewRelease(prev => ({ ...prev, deploymentId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um deployment" />
                  </SelectTrigger>
                  <SelectContent>
                    {project.deployments.map((deployment) => (
                      <SelectItem key={deployment.id} value={deployment.id}>
                        {deployment.name} ({deployment.environment})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {project.deployments.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Nenhum deployment disponível. Crie um deployment primeiro.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="release-date">Data de Release</Label>
                <Input
                  id="release-date"
                  type="date"
                  value={newRelease.releasedAt}
                  onChange={(e) => setNewRelease(prev => ({ ...prev, releasedAt: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Se não especificado, será usado a data atual
                </p>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newRelease.description}
                  onChange={(e) => setNewRelease(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva as principais mudanças e melhorias desta release..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleCreateRelease}
                  disabled={project.deployments.length === 0}
                >
                  Criar Release
                </Button>
                <Button variant="outline" onClick={() => setIsNewReleaseOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {project.releases.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <TagIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3>Nenhuma release criada</h3>
            <p className="text-muted-foreground mb-4">
              Crie sua primeira release para marcar versões do projeto
            </p>
            <Button 
              onClick={() => setIsNewReleaseOpen(true)}
              disabled={project.deployments.length === 0}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Criar Primeira Release
            </Button>
            {project.deployments.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Você precisa criar um deployment primeiro
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {project.releases
            .sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime())
            .map((release) => (
            <Card key={release.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TagIcon className="w-5 h-5" />
                      {release.version}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(release.releasedAt).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <RocketIcon className="w-3 h-3" />
                        {getDeploymentName(release.deploymentId)}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(release.status)}>
                    {getStatusText(release.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{release.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {project.releases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{project.releases.length}</div>
                <p className="text-sm text-muted-foreground">Total de Releases</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {project.releases.filter(r => r.status === 'released').length}
                </div>
                <p className="text-sm text-muted-foreground">Publicadas</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {project.releases.filter(r => r.status === 'draft').length}
                </div>
                <p className="text-sm text-muted-foreground">Rascunhos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}