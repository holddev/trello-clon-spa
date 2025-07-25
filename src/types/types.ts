export type Theme = 'light' | 'dark';

export interface Tag {
  id?: number;
  task_id?: number;
  text: string;
  color: string;
}

export interface Task {
  id: number;
  column_id: number;
  title: string;
  description: string | null;
  position: number;
  created_at: string | null;
  tags: Tag[];
  isOptimistic?: boolean;
}

export type newTask = Pick<Task, 'column_id' | 'title' | 'description' | 'position' | 'tags'>

export interface Column {
  id: number;
  board_id: number;
  title: string;
  position: number;
  created_at: string | null;
  updated_at: string | null;
  tasks: Task[];
}

export type newColumn = Pick<Column, 'title' | 'board_id' | 'position'>


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

export interface Response<T> {
  ok: boolean
  message?: string
  data: T
  status: number
}

export interface Board {
  id: number;
  user_id: string;
  title: string;
  is_favorite: boolean;
  order: number;
  created_at: string;
  isOptimistic?: boolean
  cols?: number
}

export interface BoardDetails {
  id: number;
  user_id: string;
  title: string;
  is_favorite: boolean;
  order: number;
  created_at: string;
  columns: Column[]
}

export type newBoard = Pick<Board, 'user_id' | 'title' | 'order' | 'isOptimistic'>

export type ReorderBoard = Pick<Board, 'id' | 'order'>

export type ReorderTask = Pick<Task, 'id' | 'column_id' | 'position'>
