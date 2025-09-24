
export const Projects = [
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
              type: 'paragraph', children: [{text: 'This example shows what happens when the Editor is set to readOnly, it is not editable',},],
            },
            {
              type: 'paragraph', children: [{text: 'This example shows what happens when the Editor is set to readOnly, it is not editable',},],
            },
          ],
          authorId: "user_456",
          createdAt: "2025-09-23T20:00:00Z",
          updatedAt: "2025-09-23T21:00:00Z",
          version: 3
        },
        {
          id: "doc2",
          title: "Arquitetura do Sistema2",
          content: [
            {
              type: 'paragraph', children: [{text: 'arquitetura 2',},],
            },
            {
              type: 'paragraph', children: [{text: 'arquitetura 2',},],
            },
          ],
          authorId: "user_456",
          createdAt: "2025-09-24T20:00:00Z",
          updatedAt: "2025-09-24T21:00:00Z",
          version: 3
        },
      ],
      deployments: [
        {
          id: "dep1",
          name: "Production Deploy",
          environment: "production",
          variables: { "DATABASE_URL": "prod-db-url", "API_KEY": "prod-key" },
          status: "completed"
        }
      ],
      releases: [
        {
          id: "rel1",
          version: "v1.0.0",
          description: "Lançamento inicial do sistema",
          deploymentId: "dep1",
          releasedAt: "2024-01-20",
          status: "released"
        }
      ]
    }]