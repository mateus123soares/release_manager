import { Link } from "react-router";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInput
} from '../components/sidebar'

import { 
  FolderIcon, 
  FileTextIcon, 
  RocketIcon, 
  TagIcon,
  PlusIcon,
  HomeIcon
} from 'lucide-react'

export function ProjectSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <img className='rounded-[30px]' src='/logo.jpg' alt="Release Manager" width="50" height="50"/>
        <h2 className="text-lg font-semibold">Release Manager</h2>
      </SidebarHeader>

      <SidebarContent className="p-4">

        <SidebarGroup>
          <SidebarGroupLabel>Buscar Projetos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarInput/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <HomeIcon className="w-4 h-4" />
                  <Link to="/">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PlusIcon className="w-4 h-4" />
                  <Link to="/project/create">Novo Projeto</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projetos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="1">
                <SidebarMenuButton>
                  <FolderIcon className="w-4 h-4" />
                  Release Manager
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ações do Projeto</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileTextIcon className="w-4 h-4" />
                  <Link to="/docs/1">Documentação</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <RocketIcon className="w-4 h-4" />
                  <Link to="/deployment/1">Deployments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <TagIcon className="w-4 h-4" />
                  <Link to="/release/1">Releases</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Documentações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem key="1">
                  <SidebarMenuButton 
                    className="text-sm">
                    <FileTextIcon className="w-3 h-3" />
                    Configurando projeto
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}