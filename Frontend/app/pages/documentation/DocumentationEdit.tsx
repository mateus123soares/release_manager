import { useMemo, useState } from 'react'
import { useNavigate } from "react-router";

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import { Card } from '../../components/card'
import { Button } from '../../components/button'
import { ArrowLeftIcon} from 'lucide-react'

import type {Document} from '../../types/documentation'
import type { Documentation } from 'ProjectManager';

interface DocumentationEditorProps {
  documents: Document | null
}

export function Documentation({
  documents: documents,
}: DocumentationEditorProps) {
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]


  let navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1>Documentação</h1>
            <p className="text-muted-foreground">
              Editar a documentação do projeto
            </p>
          </div>
        </div>
      </div>
      <div>
        <Card>
        <Slate 
          editor={editor} 
          initialValue={initialValue}
          onChange={value => {
            const isAstChange = editor.operations.some(
              op => 'set_selection' !== op.type
            )
            if (isAstChange) {
              // Save the value to Local Storage.
              const content = JSON.stringify(value)
              localStorage.setItem('content', content)
            }
          }}
        >
          <Editable />
        </Slate>
        </Card>
      </div>
    </div>
  )
}