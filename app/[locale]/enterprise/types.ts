export type Case = {
  name: string
  content: string | React.ReactNode
}

export type Feature = {
  header: string
  content: string[]
  iconName: string
}

export type EcosystemPlayer = {
  name: string
  Logo: React.FC<React.SVGProps<SVGElement>>
  className?: string
}
