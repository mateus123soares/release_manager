import { useState } from 'react'
import { useNavigate } from "react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Textarea } from '../../components/textarea'
import { Label } from '../../components/label'
import { ArrowLeftIcon } from 'lucide-react'


export function ProjectForm() {
  let navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  }

  const onSubmit = (data: {name: string, description: string}) => {
    navigate(-1);
  }

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome do projeto é obrigatório'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição do projeto é obrigatória'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onCancel}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1>Novo Projeto</h1>
          <p className="text-muted-foreground">
            Crie um novo projeto para gerenciar documentações e deployments
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informações do Projeto</CardTitle>
          <CardDescription>
            Preencha as informações básicas do seu projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: Sistema de E-commerce"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Descreva o objetivo e funcionalidades principais do projeto..."
                rows={4}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">
                Criar Projeto
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}