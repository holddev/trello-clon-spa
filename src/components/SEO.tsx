interface Props {
  title?: string,
  description?: string,
}
export const GenerateSEO = ({ title, description }: Props) => {
  return (
    <>
      <title>{title ?? "TrelloClon - Organiza tus tareas"}</title>
      <meta name="description" content={description ?? "Clon de Trello para gestionar tareas de forma simple y rápida.."} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0079BF" />

      {/* Open Graph */}
      <meta property="og:title" content={title ?? "TrelloClon - Clon de Trello"} />
      <meta property="og:description" content={description ?? "Organiza tus tareas en tableros visuales. Basado en la experiencia de Trello."} />
      <meta property="og:image" content="/favicon-512.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tusitio.com" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/logo.png" />


    </>
  )
}