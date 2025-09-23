import { useState } from 'react'
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Textarea } from '../../components/textarea'
import { Label } from '../../components/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog'
import { ArrowLeftIcon, PlusIcon, EditIcon, EyeIcon } from 'lucide-react'

import type {Documentation} from '../../types/documentation'
import type {Project} from '../../types/projects'

interface DocumentationEditorProps {
  project: Project | null
}

export function Documentation({
  project,
}: DocumentationEditorProps) {
  const [isNewDocOpen, setIsNewDocOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Documentation | null>(null)
  const [newDocForm, setNewDocForm] = useState({ title: '', content: '' })
  const [editForm, setEditForm] = useState({ title: '', content: '' })
  const [selectedDocumentation, setSelectedDocumentation] = useState(project?.documentation[0])

  let navigate = useNavigate();

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

  const handleCreateDoc = () => {
    if (newDocForm.title.trim() && newDocForm.content.trim()) {
      //onAddDocumentation(project.id, newDocForm)
      setNewDocForm({ title: '', content: '' })
      setIsNewDocOpen(false)
    }
  }

  const handleEditDoc = (doc: Documentation) => {
    setEditingDoc(doc)
    setEditForm({ title: doc.title, content: doc.content })
  }

  const handleSaveEdit = () => {
    if (editingDoc && editForm.title.trim() && editForm.content.trim()) {
      // onUpdateDocumentation(project.id, editingDoc.id, {
      //   title: editForm.title,
      //   content: editForm.content
      // })
      setEditingDoc(null)
      setEditForm({ title: '', content: '' })
    }
  }

  const renderMarkdown = (content: string) => {
    // Simples renderização de markdown (apenas headers e parágrafos)
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-semibold mb-3">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-medium mb-2">{line.substring(4)}</h3>
        }
        if (line.trim() === '') {
          return <br key={index} />
        }
        return <p key={index} className="mb-2">{line}</p>
      })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1>Documentação - {project.name}</h1>
            <p className="text-muted-foreground">
              Gerencie a documentação do projeto
            </p>
          </div>
        </div>
        
        <Dialog open={isNewDocOpen} onOpenChange={setIsNewDocOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nova Documentação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Nova Documentação</DialogTitle>
              <DialogDescription>
                Crie uma nova documentação em Markdown
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-title">Título</Label>
                <Input
                  id="new-title"
                  value={newDocForm.title}
                  onChange={(e) => setNewDocForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Guia de Instalação"
                />
              </div>
              <div>
                <Label htmlFor="new-content">Conteúdo (Markdown)</Label>
                <Textarea
                  id="new-content"
                  value={newDocForm.content}
                  onChange={(e) => setNewDocForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="# Título&#10;&#10;Escreva sua documentação em Markdown..."
                  rows={15}
                  className="font-mono"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateDoc}>Criar</Button>
                <Button variant="outline" onClick={() => setIsNewDocOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {project.documentation.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3>Nenhuma documentação criada</h3>
            <p className="text-muted-foreground mb-4">
              Comece criando sua primeira documentação do projeto
            </p>
            <Button onClick={() => setIsNewDocOpen(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Criar Primeira Documentação
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Documentações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {project.documentation.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocumentation(doc)}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                        selectedDocumentation?.id === doc.id ? 'bg-accent border-primary' : ''
                      }`}
                      //onClick={() => onSelectDocumentation(doc)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{doc.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditDoc(doc)
                          }}
                        >
                          <EditIcon className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Atualizado em {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedDocumentation ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <EyeIcon className="w-5 h-5" />
                    {selectedDocumentation.title}
                  </CardTitle>
                  <CardDescription>
                    Criado em {new Date(selectedDocumentation.createdAt).toLocaleDateString('pt-BR')} • 
                    Atualizado em {new Date(selectedDocumentation.updatedAt).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {renderMarkdown(selectedDocumentation.content)}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">
                    Selecione uma documentação para visualizar
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {editingDoc && (
        <Dialog open={!!editingDoc} onOpenChange={() => setEditingDoc(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Editar Documentação</DialogTitle>
              <DialogDescription>
                Edite o conteúdo da documentação em Markdown
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Editar</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Título</Label>
                  <Input
                    id="edit-title"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Conteúdo (Markdown)</Label>
                  <Textarea
                    id="edit-content"
                    value={editForm.content}
                    onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    className="font-mono"
                  />
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>{editForm.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      {renderMarkdown(editForm.content)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit}>Salvar Alterações</Button>
              <Button variant="outline" onClick={() => setEditingDoc(null)}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}