import type { Document } from "~/types/documentation"

export const Documents: Document[] = [
    {
      id: "2",
      name: "E-commerce Platform 2",
      description: "Sistema de e-commerce para vendas online",
      createdAt: "2024-01-15",
      documentation: [
        {
          id: "doc1",
          title: "Arquitetura do Sistema",
          content: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [{ text: '## Try it out!' }],
            },
            {
              type: 'paragraph',
              children: [{ text: 'Try it out for yourself!' }],
            },
          ],
          authorId: "user_456",
          version: 3,
          createdAt: "2025-09-23T20:00:00Z",
          updatedAt: "2025-09-23T21:00:00Z"
        },
        {
          id: "doc2",
          title: "Arquitetura do Sistema2",
          content: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Slate is flexible enough to add that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [{ text: '## Try it out!' }],
            },
            {
              type: 'paragraph',
              children: [{ text: 'Try it out for yourself!' }],
            },
          ],
          authorId: "user_456",
          version: 3,
          createdAt: "2025-09-23T20:00:00Z",
          updatedAt: "2025-09-23T21:00:00Z"
        }
      ],
    }]