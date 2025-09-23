import { useState } from 'react'
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Label } from '../../components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog'
import { Badge } from '../../components/badge'
import { ArrowLeftIcon, PlusIcon, RocketIcon, SettingsIcon, TrashIcon } from 'lucide-react'

import type {Deployment} from '../../types/deployment'
import type {Project} from '../../types/projects'

interface DeploymentManagerProps {
  project: Project | null
  //onAddDeployment: (projectId: string, deployment: Omit<Deployment, 'id'>) => void
}

export function DeploymentManager({ project }: DeploymentManagerProps) {
    let navigate = useNavigate();

  const [isNewDeploymentOpen, setIsNewDeploymentOpen] = useState(false)
  const [newDeployment, setNewDeployment] = useState({
    name: '',
    environment: '',
    variables: {} as { [key: string]: string },
    scheduledAt: '',
    status: 'pending' as const
  })
  const [newVariable, setNewVariable] = useState({ key: '', value: '' })

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

  const handleCreateDeployment = () => {
    if (newDeployment.name.trim() && newDeployment.environment.trim()) {
      //onAddDeployment(project.id, newDeployment)
      setNewDeployment({
        name: '',
        environment: '',
        variables: {},
        scheduledAt: '',
        status: 'pending'
      })
      setIsNewDeploymentOpen(false)
    }
  }

  const addVariable = () => {
    if (newVariable.key.trim() && newVariable.value.trim()) {
      setNewDeployment(prev => ({
        ...prev,
        variables: {
          ...prev.variables,
          [newVariable.key]: newVariable.value
        }
      }))
      setNewVariable({ key: '', value: '' })
    }
  }

  const removeVariable = (key: string) => {
    setNewDeployment(prev => {
      const newVariables = { ...prev.variables }
      delete newVariables[key]
      return { ...prev, variables: newVariables }
    })
  }

  const getStatusColor = (status: Deployment['status']) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'running':
        return 'secondary'
      case 'failed':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status: Deployment['status']) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'running':
        return 'Executando'
      case 'failed':
        return 'Falhou'
      default:
        return 'Pendente'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1>Deployments - {project.name}</h1>
            <p className="text-muted-foreground">
              Configure e gerencie deployments do projeto
            </p>
          </div>
        </div>
        
        <Dialog open={isNewDeploymentOpen} onOpenChange={setIsNewDeploymentOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Novo Deployment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Configurar Novo Deployment</DialogTitle>
              <DialogDescription>
                Configure as variáveis e parâmetros para o deployment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deployment-name">Nome do Deployment</Label>
                  <Input
                    id="deployment-name"
                    value={newDeployment.name}
                    onChange={(e) => setNewDeployment(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Production Deploy"
                  />
                </div>
                <div>
                  <Label htmlFor="environment">Ambiente</Label>
                  <Select value={newDeployment.environment} onValueChange={(value) => setNewDeployment(prev => ({ ...prev, environment: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="scheduled-at">Agendamento (opcional)</Label>
                <Input
                  id="scheduled-at"
                  type="datetime-local"
                  value={newDeployment.scheduledAt}
                  onChange={(e) => setNewDeployment(prev => ({ ...prev, scheduledAt: e.target.value }))}
                />
              </div>

              <div className="space-y-3">
                <Label>Variáveis de Ambiente</Label>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome da variável"
                    value={newVariable.key}
                    onChange={(e) => setNewVariable(prev => ({ ...prev, key: e.target.value }))}
                  />
                  <Input
                    placeholder="Valor"
                    value={newVariable.value}
                    onChange={(e) => setNewVariable(prev => ({ ...prev, value: e.target.value }))}
                  />
                  <Button type="button" onClick={addVariable}>
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>

                {Object.entries(newDeployment.variables).length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-auto">
                    {Object.entries(newDeployment.variables).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="font-mono text-sm">
                          <strong>{key}</strong> = {value}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariable(key)}
                        >
                          <TrashIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateDeployment}>
                  Criar Deployment
                </Button>
                <Button variant="outline" onClick={() => setIsNewDeploymentOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {project.deployments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <RocketIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3>Nenhum deployment configurado</h3>
            <p className="text-muted-foreground mb-4">
              Configure seu primeiro deployment para começar
            </p>
            <Button onClick={() => setIsNewDeploymentOpen(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Configurar Primeiro Deployment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {project.deployments.map((deployment) => (
            <Card key={deployment.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <RocketIcon className="w-5 h-5" />
                      {deployment.name}
                    </CardTitle>
                    <CardDescription>
                      Ambiente: {deployment.environment}
                      {deployment.scheduledAt && (
                        <span> • Agendado para: {new Date(deployment.scheduledAt).toLocaleString('pt-BR')}</span>
                      )}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(deployment.status)}>
                    {getStatusText(deployment.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {Object.keys(deployment.variables).length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <SettingsIcon className="w-4 h-4" />
                      <span className="font-medium">Variáveis de Ambiente</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(deployment.variables).map(([key, value]) => (
                        <div key={key} className="p-2 bg-muted rounded font-mono text-sm">
                          <strong>{key}</strong>: {value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}