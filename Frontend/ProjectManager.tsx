import { useState } from 'react'
// import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from './ui/sidebar'
// import { ProjectSidebar } from './ProjectSidebar'
// import { Dashboard } from './Dashboard'
// import { ProjectForm } from './ProjectForm'
// import { DocumentationEditor } from './DocumentationEditor'
// import { DeploymentManager } from './DeploymentManager'
// import { ReleaseManager } from './ReleaseManager'

export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  documentation: Documentation[]
  deployments: Deployment[]
  releases: Release[]
}

export interface Documentation {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Deployment {
  id: string
  name: string
  environment: string
  variables: { [key: string]: string }
  scheduledAt?: string
  status: 'pending' | 'running' | 'completed' | 'failed'
}

export interface Release {
  id: string
  version: string
  description: string
  deploymentId: string
  releasedAt: string
  status: 'draft' | 'released'
}

export type ViewMode = 'dashboard' | 'new-project' | 'documentation' | 'deployments' | 'releases'

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Sistema de e-commerce para vendas online',
      createdAt: '2024-01-15',
      documentation: [
        {
          id: 'doc1',
          title: 'Arquitetura do Sistema',
          content: '# Arquitetura do Sistema\n\nEste documento descreve a arquitetura do sistema de e-commerce...',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: 'doc2',
          title: 'Guia de Instalação',
          content: '# Guia de Instalação\n\n## Pré-requisitos\n\n- Node.js 18+\n- Docker\n- PostgreSQL',
          createdAt: '2024-01-16',
          updatedAt: '2024-01-16'
        }
      ],
      deployments: [
        {
          id: 'dep1',
          name: 'Production Deploy',
          environment: 'production',
          variables: { 'DATABASE_URL': 'prod-db-url', 'API_KEY': 'prod-key' },
          status: 'completed'
        }
      ],
      releases: [
        {
          id: 'rel1',
          version: 'v1.0.0',
          description: 'Lançamento inicial do sistema',
          deploymentId: 'dep1',
          releasedAt: '2024-01-20',
          status: 'released'
        }
      ]
    }
  ])
}

//   const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null)
//   const [currentView, setCurrentView] = useState<ViewMode>('dashboard')
//   const [selectedDocumentation, setSelectedDocumentation] = useState<Documentation | null>(null)

//   const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'documentation' | 'deployments' | 'releases'>) => {
//     const newProject: Project = {
//       ...project,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString().split('T')[0],
//       documentation: [],
//       deployments: [],
//       releases: []
//     }
//     setProjects(prev => [...prev, newProject])
//     setSelectedProject(newProject)
//     setCurrentView('dashboard')
//   }

//   const addDocumentation = (projectId: string, doc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>) => {
//     const newDoc: Documentation = {
//       ...doc,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString().split('T')[0],
//       updatedAt: new Date().toISOString().split('T')[0]
//     }
    
//     setProjects(prev => prev.map(project => 
//       project.id === projectId 
//         ? { ...project, documentation: [...project.documentation, newDoc] }
//         : project
//     ))
//   }

//   const updateDocumentation = (projectId: string, docId: string, updates: Partial<Documentation>) => {
//     setProjects(prev => prev.map(project => 
//       project.id === projectId 
//         ? {
//             ...project,
//             documentation: project.documentation.map(doc =>
//               doc.id === docId
//                 ? { ...doc, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
//                 : doc
//             )
//           }
//         : project
//     ))
//   }

//   const addDeployment = (projectId: string, deployment: Omit<Deployment, 'id'>) => {
//     const newDeployment: Deployment = {
//       ...deployment,
//       id: Date.now().toString()
//     }
    
//     setProjects(prev => prev.map(project => 
//       project.id === projectId 
//         ? { ...project, deployments: [...project.deployments, newDeployment] }
//         : project
//     ))
//   }

//   const addRelease = (projectId: string, release: Omit<Release, 'id'>) => {
//     const newRelease: Release = {
//       ...release,
//       id: Date.now().toString()
//     }
    
//     setProjects(prev => prev.map(project => 
//       project.id === projectId 
//         ? { ...project, releases: [...project.releases, newRelease] }
//         : project
//     ))
//   }

//   const renderContent = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return (
//           <Dashboard 
//             projects={projects}
//             selectedProject={selectedProject}
//             onSelectProject={setSelectedProject}
//             onNewProject={() => setCurrentView('new-project')}
//             onViewDocumentation={() => setCurrentView('documentation')}
//             onViewDeployments={() => setCurrentView('deployments')}
//             onViewReleases={() => setCurrentView('releases')}
//           />
//         )
//       case 'new-project':
//         return (
//           <ProjectForm 
//             onSubmit={addProject}
//             onCancel={() => setCurrentView('dashboard')}
//           />
//         )
//       case 'documentation':
//         return (
//           <DocumentationEditor
//             project={selectedProject}
//             selectedDoc={selectedDocumentation}
//             onAddDocumentation={addDocumentation}
//             onUpdateDocumentation={updateDocumentation}
//             onSelectDocumentation={setSelectedDocumentation}
//             onBack={() => setCurrentView('dashboard')}
//           />
//         )
//       case 'deployments':
//         return (
//           <DeploymentManager
//             project={selectedProject}
//             onAddDeployment={addDeployment}
//             onBack={() => setCurrentView('dashboard')}
//           />
//         )
//       case 'releases':
//         return (
//           <ReleaseManager
//             project={selectedProject}
//             onAddRelease={addRelease}
//             onBack={() => setCurrentView('dashboard')}
//           />
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full">
//         <ProjectSidebar
//           projects={projects}
//           selectedProject={selectedProject}
//           currentView={currentView}
//           onSelectProject={setSelectedProject}
//           onViewChange={setCurrentView}
//           onSelectDocumentation={setSelectedDocumentation}
//         />
//         <main className="flex-1 p-6">
//           <div className="mb-4">
//             <SidebarTrigger className="lg:hidden" />
//           </div>
//           {renderContent()}
//         </main>
//       </div>
//     </SidebarProvider>
//   )
// }