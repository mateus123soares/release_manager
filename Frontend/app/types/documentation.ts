import type { Descendant } from 'slate'

export interface Documentation {
  id: string
  title: string
  content: Descendant[]
  authorId: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  name: string
  documentation: Documentation[]
  createdAt: string
}