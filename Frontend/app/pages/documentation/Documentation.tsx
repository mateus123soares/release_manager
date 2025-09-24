import { useState, useMemo } from 'react'
import { useNavigate } from "react-router";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Markdown from 'react-markdown'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Textarea } from '../../components/textarea'
import { Label } from '../../components/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog'
import { ArrowLeftIcon, PlusIcon, EditIcon, EyeIcon } from 'lucide-react'

import type {Document} from '../../types/documentation'
import type { Documentation } from 'ProjectManager';

interface DocumentationEditorProps {
  documents: Document | null
}

export function Documentation({
  documents: documents,
}: DocumentationEditorProps) {
  const [isNewDocOpen, setIsNewDocOpen] = useState(false)
  const [newDocForm, setNewDocForm] = useState({ title: '', content: '' })
  const [selectedDocumentation, setSelectedDocumentation] = useState(documents?.documentation[0])
  const editor = useMemo(() => withReact(createEditor()), [])

  let navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  }

  if (!documents) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum projeto selecionado</p>
      </div>
    )
  }

  const handleCreateDoc = () => {
    if (newDocForm.title.trim() && newDocForm.content.trim()) {
      setNewDocForm({ title: '', content: '' })
      setIsNewDocOpen(false)
    }
  }

  const generateMarkdown = (data) => {
  // Use flatMap para "achatar" o array de arrays de texto,
  // enquanto mapeia cada parágrafo para uma única string.
  const paragraphTexts = data.flatMap(item => {
    if (item.type === 'paragraph' && Array.isArray(item.children)) {
      // Concatena todos os textos dentro do mesmo parágrafo em uma única string.
      const paragraphText = item.children.map(child => child.text).join('');
      // Retorna a string do parágrafo.
      return paragraphText;
    }
    // Retorna uma string vazia para tipos de nó que não são parágrafos.
    return '';
  });

  // Concatena as strings de cada parágrafo com uma quebra de linha.
  return paragraphTexts.join('\n');
  }

  const handleEditDoc = (id: string) => {
    console.log(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1>Documentação - {documents.name}</h1>
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

      {documents.documentation.length === 0 ? (
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
                  {documents.documentation.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocumentation(doc)}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                        selectedDocumentation?.id === doc.id ? 'bg-accent border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{doc.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditDoc(doc.id)
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
                      <Markdown>{generateMarkdown(selectedDocumentation.content)}</Markdown>
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
    </div>
  )
}