export interface Tag {
  name: string
  color: string
}

export interface Task {
  id: number,
  title: string,
  tags: Tag[],
  createdAt: string,
  description: string
}

export interface TaskColumn {
  id: number
  title: string
  tasks: Task[]
}

export interface TaskBoard {
  id: number
  title: string
  isStarred: boolean
  columns: TaskColumn[]
  createdAt: Date
  updatedAt: Date
  isOptimistic?: boolean
}


