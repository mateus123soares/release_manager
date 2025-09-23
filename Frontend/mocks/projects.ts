
export const Projects = [{
      id: "1",
      name: "E-commerce Platform",
      description: "Sistema de e-commerce para vendas online",
      createdAt: "2024-01-15",
      documentation: [
        {
          id: "doc1",
          title: "Arquitetura do Sistema",
          content: "# Arquitetura do Sistema\n\nEste documento descreve a arquitetura do sistema de e-commerce...",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15"
        },
        {
          id: "doc2",
          title: "Guia de Instalação",
          content: "# Guia de Instalação\n\n## Pré-requisitos\n\n- Node.js 18+\n- Docker\n- PostgreSQL",
          createdAt: "2024-01-16",
          updatedAt: "2024-01-16"
        }
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
    },
{
      id: "2",
      name: "E-commerce Platform 2",
      description: "Sistema de e-commerce para vendas online",
      createdAt: "2024-01-15",
      documentation: [
        {
          id: "doc1",
          title: "Arquitetura do Sistema",
          content: "# Arquitetura do Sistema\n\nEste documento descreve a arquitetura do sistema de e-commerce...",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15"
        },
        {
          id: "doc2",
          title: "Guia de Instalação",
          content: "# Guia de Instalação\n\n## Pré-requisitos\n\n- Node.js 18+\n- Docker\n- PostgreSQL",
          createdAt: "2024-01-16",
          updatedAt: "2024-01-16"
        }
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