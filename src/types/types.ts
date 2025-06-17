export interface Tag {
  name: string
  color: string
}

export interface Task {
  id?: number,
  title: string,
  tags: Tag[],
  createdAt: Date,
  description: string,
  isOptimistic?: boolean
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


export type ReorderType = {
  type: "reorder"
  columnId: number
  updatedTasks: Task[]
} | {
  type: "move"
  fromColumnId: number
  toColumnId: number
  fromTasks: Task[]
  toTasks: Task[]
}


