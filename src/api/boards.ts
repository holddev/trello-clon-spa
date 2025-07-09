import type { Board, BoardDetails, newBoard, ReorderBoard, Response } from "../types/types"
import { api } from "../utils/api"

interface reqAuth<T = null> {
  token: string | null
  body?: T
  id?: string | number
}

export const getBoards = async (req: reqAuth) => {
  try {
    const res = await api.get<Response<Board[]>>('/priv/boards', {
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.data
  } catch (err) {
    console.error('Error al obtener los tableros:', err)
    return []
  }
}

export const getBoardById = async (req: reqAuth) => {
  try {
    const res = await api.get<Response<BoardDetails>>(`/priv/boards/${req.id}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.data
  } catch (err) {
    console.error('Error al obtener el tablero por id:', err)
    return null
  }
}

export const createBoard = async (req: reqAuth<newBoard>): Promise<Board | null> => {
  try {
    const res = await api.post<Response<Board>>('/priv/boards', {
      body: req.body,
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.data
  } catch (err) {
    console.error('Error al crear el tablero: ', err)
    return null
  }
}

export const editBoard = async (req: reqAuth<Partial<Board>>): Promise<Board | null> => {
  try {
    const res = await api.patch<Response<Board>>(`/priv/boards/${req.id}`, {
      body: req.body,
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.data
  } catch (err) {
    console.error('Error al editar el tablero: ', err)
    return null
  }
}

export const deleteBoard = async (req: reqAuth) => {
  try {
    const res = await api.delete<Response<Board>>(`/priv/boards/${req.id}`, {
      headers: { Authorization: `Bearer ${req.token}` }
    })
    return res.data
  } catch (err) {
    console.error('Error al editar el tablero: ', err)
    return {}
  }
}

export const updateBoardOrder = async (req: reqAuth<ReorderBoard[]>) => {
  try {
    const res = await api.patch<Response<null>>(`/priv/boards/reorder`, {
      headers: { Authorization: `Bearer ${req.token}` },
      body: req.body
    })
    return res.ok
  } catch (err) {
    console.error('Error al editar el tablero: ', err)
    return false
  }
}

