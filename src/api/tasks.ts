import type { newTask, ReorderTask, Response, Task } from "../types/types"
import { api } from "../utils/api"

interface reqAuth<T = null> {
  token: string | null
  body?: T
  id?: string | number
}

export const createTask = async (req: reqAuth<newTask>) => {
  try {
    const res = await api.post<Response<Task>>('/priv/tasks', {
      headers: { Authorization: `Bearer ${req.token}` },
      body: req.body
    })
    return res.data
  } catch (err) {
    console.error('Error al crear la tarea:', err)
    return null
  }
}

export const editTask = async (req: reqAuth<Partial<Task>>) => {
  try {
    const res = await api.patch<Response<Task>>(`/priv/tasks/${req.id}`, {
      headers: { Authorization: `Bearer ${req.token}` },
      body: req.body
    })
    return res.ok
  } catch (err) {
    console.error('Error al editar la tarea:', err)
    return false
  }
}

export const deleteTask = async (req: reqAuth) => {
  try {
    const res = await api.delete<Response<Task>>(`/priv/tasks/${req.id}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.ok
  } catch (err) {
    console.error('Error al eliminar la tarea:', err)
    return false
  }
}

export const updateTasksOrder = async (req: reqAuth<ReorderTask[]>) => {
  try {
    const res = await api.patch<Response<null>>(`/priv/tasks/reorder`, {
      headers: { Authorization: `Bearer ${req.token}` },
      body: req.body
    })
    return res.ok
  } catch (err) {
    console.error('Error al actualizar el orden de las tareas:', err)
    return false
  }
}