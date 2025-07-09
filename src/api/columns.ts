import type { Column, newColumn, Response } from "../types/types"
import { api } from "../utils/api"

interface reqAuth<T = null> {
  token: string | null
  body?: T
  id?: string | number
}

export const createColumn = async (req: reqAuth<newColumn>) => {
  try {
    const res = await api.post<Response<Column>>('/priv/columns', {
      headers: { Authorization: `Bearer ${req.token}` },
      body: req.body
    })
    return res.data
  } catch (err) {
    console.error('Error crear una columna: ', err)
    return null
  }
}

export const editColumn = async (req: reqAuth<Partial<Column>>) => {
  try {
    const res = await api.patch<Response<Column>>(`/priv/columns/${req.id}`, {
      headers: {
        Authorization: `Bearer ${req.token}`
      },
      body: req.body
    })
    return res.data
  } catch (error) {
    console.error("Error al editar la columna: ", error)
    return null
  }
}

export const deleteColumn = async (req: reqAuth) => {
  try {
    const res = await api.delete<Response<Column>>(`/priv/columns/${req.id}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.ok
  } catch (error) {
    console.error("No se pudo eliminar la columna: ", error)
    return false
  }
}