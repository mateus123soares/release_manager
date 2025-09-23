import type { Documentation } from "./documentation"
import type { Deployment } from "./deployment"
import type { Release } from "./release"

export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  documentation: Documentation[]
  deployments: Deployment[]
  releases: Release[]
}