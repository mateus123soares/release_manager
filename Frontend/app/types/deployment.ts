export interface Deployment {
  id: string
  name: string
  environment: string
  variables: { [key: string]: string }
  scheduledAt?: string
  status: string
}