import { useEffect, useState } from "react"
import type { TaskBoard } from "../types/types"
import { BoardContext } from "./BoardContext"

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boards, setBoads] = useState<TaskBoard[]>([])
  console.log("el estado ha cambiado")
  useEffect(() => {
    const initialBoards: TaskBoard[] = [
      {
        id: 1,
        title: "Landing Page",
        isStarred: true,
        createdAt: new Date("2025-06-01"),
        updatedAt: new Date("2025-06-06"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: [
              {
                id: 1,
                title: "Diseñar sección hero",
                tags: [{ name: "UI", color: "blue" }],
                createdAt: "2025-06-01",
                description: "Crear el encabezado principal de la landing."
              },
              {
                id: 2,
                title: "Crear sección de servicios",
                tags: [{ name: "UI", color: "blue" }],
                createdAt: "2025-06-02",
                description: "Mostrar los servicios con imágenes y descripciones."
              },
              {
                id: 3,
                title: "Agregar formulario de contacto",
                tags: [{ name: "Frontend", color: "green" }],
                createdAt: "2025-06-03",
                description: "Formulario interactivo para mensajes."
              }
            ]
          },
          {
            id: 2,
            title: "En progreso",
            tasks: [
              {
                id: 2,
                title: "Implementar formulario",
                tags: [{ name: "Frontend", color: "green" }],
                createdAt: "2025-06-02",
                description: "Formulario de contacto funcional con validaciones."
              }
            ]
          },
          {
            id: 3,
            title: "Hecho",
            tasks: []
          }
        ]
      },
      {
        id: 2,
        title: "App de Notas",
        isStarred: false,
        createdAt: new Date("2025-05-20"),
        updatedAt: new Date("2025-06-01"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: [
              {
                id: 3,
                title: "Diseño general",
                tags: [{ name: "Diseño", color: "purple" }],
                createdAt: "2025-05-20",
                description: "Mockup de todas las pantallas."
              },
              {
                id: 4,
                title: "Configurar Firebase",
                tags: [{ name: "Backend", color: "red" }],
                createdAt: "2025-05-21",
                description: "Auth y Firestore para guardar notas."
              }
            ]
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: []
          }
        ]
      },
      {
        id: 3,
        title: "Panel Administrativo",
        isStarred: false,
        createdAt: new Date("2025-04-10"),
        updatedAt: new Date("2025-05-01"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: []
          },
          {
            id: 2,
            title: "En progreso",
            tasks: [
              {
                id: 5,
                title: "Login con roles",
                tags: [{ name: "Seguridad", color: "orange" }],
                createdAt: "2025-04-12",
                description: "Usuarios admin y empleados."
              }
            ]
          },
          {
            id: 3,
            title: "Hecho",
            tasks: [
              {
                id: 6,
                title: "Dashboard básico",
                tags: [{ name: "UI", color: "blue" }],
                createdAt: "2025-04-11",
                description: "Métricas de ejemplo en cards."
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: "E-commerce App",
        isStarred: true,
        createdAt: new Date("2025-03-01"),
        updatedAt: new Date("2025-04-01"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: [
              {
                id: 7,
                title: "Carrito de compras",
                tags: [{ name: "Lógica", color: "teal" }],
                createdAt: "2025-03-05",
                description: "Añadir, eliminar productos y totalizar."
              }
            ]
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: [
              {
                id: 8,
                title: "Catálogo de productos",
                tags: [{ name: "Frontend", color: "green" }],
                createdAt: "2025-03-03",
                description: "Grid con imágenes, precio y botón de compra."
              }
            ]
          }
        ]
      },
      {
        id: 5,
        title: "Blog Personal",
        isStarred: false,
        createdAt: new Date("2025-05-01"),
        updatedAt: new Date("2025-06-01"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: []
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: [
              {
                id: 9,
                title: "Publicación automática",
                tags: [{ name: "Markdown", color: "gray" }],
                createdAt: "2025-05-10",
                description: "Subida desde CMS personalizado."
              }
            ]
          }
        ]
      },
      {
        id: 6,
        title: "Sistema de Tickets",
        isStarred: false,
        createdAt: new Date("2025-06-01"),
        updatedAt: new Date("2025-06-07"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: [
              {
                id: 10,
                title: "Crear modelo de ticket",
                tags: [{ name: "Modelo", color: "pink" }],
                createdAt: "2025-06-01",
                description: "Definir estructura base con estado y prioridad."
              }
            ]
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: []
          }
        ]
      },
      {
        id: 7,
        title: "Portafolio Profesional",
        isStarred: true,
        createdAt: new Date("2025-05-15"),
        updatedAt: new Date("2025-06-01"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: []
          },
          {
            id: 2,
            title: "En progreso",
            tasks: [
              {
                id: 11,
                title: "Optimización SEO",
                tags: [{ name: "SEO", color: "lime" }],
                createdAt: "2025-05-20",
                description: "Título, meta descripción y sitemap."
              }
            ]
          },
          {
            id: 3,
            title: "Hecho",
            tasks: []
          }
        ]
      },
      {
        id: 8,
        title: "Sistema de Reservas",
        isStarred: false,
        createdAt: new Date("2025-04-10"),
        updatedAt: new Date("2025-05-20"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: []
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: [
              {
                id: 12,
                title: "Calendario de disponibilidad",
                tags: [{ name: "Calendario", color: "indigo" }],
                createdAt: "2025-04-11",
                description: "Componente para elegir fechas disponibles."
              }
            ]
          }
        ]
      },
      {
        id: 9,
        title: "Gestor de Tareas",
        isStarred: true,
        createdAt: new Date("2025-06-02"),
        updatedAt: new Date("2025-06-06"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: [
              {
                id: 13,
                title: "Reordenar tareas",
                tags: [{ name: "Drag&Drop", color: "yellow" }],
                createdAt: "2025-06-02",
                description: "Permitir reorganizar tareas con el mouse."
              }
            ]
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: []
          }
        ]
      },
      {
        id: 10,
        title: "App de Clima",
        isStarred: false,
        createdAt: new Date("2025-03-05"),
        updatedAt: new Date("2025-04-10"),
        columns: [
          {
            id: 1,
            title: "Por hacer",
            tasks: []
          },
          {
            id: 2,
            title: "En progreso",
            tasks: []
          },
          {
            id: 3,
            title: "Hecho",
            tasks: [
              {
                id: 14,
                title: "Integración con API OpenWeather",
                tags: [{ name: "API", color: "sky" }],
                createdAt: "2025-03-06",
                description: "Mostrar clima actual y pronóstico."
              }
            ]
          }
        ]
      }
    ];

    setBoads(initialBoards)
  }, [])

  const addBoard = (board: TaskBoard) => {
    const newBoards = [...boards, board]
    setBoads(newBoards)
  }

  const removeBoard = ({ id }: { id: number }) => {
    const newBoards = boards.filter((board) => board.id !== id)
    setBoads(newBoards)
  }

  const updateBoard = (board: TaskBoard) => {
    const newBoards = boards.map((b) => {
      if (b.id === board.id) {
        return board
      }
      return b
    })
    setBoads(newBoards)
  }

  const reorderBoard = (boards: TaskBoard[]) => {
    setBoads(boards)
  }

  return (
    <BoardContext value={{
      boards,
      addBoard,
      removeBoard,
      updateBoard,
      reorderBoard,
    }}>
      {children}
    </BoardContext>
  )
}