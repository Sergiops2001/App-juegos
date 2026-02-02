// pagina de detalle de un juego
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";


type Game = {
  id: number;
  title: string;
  platform: string;
  genre: string;
  releaseDate?: string;
  cover?: string;
  isFavorite?: boolean;
  description?: string;
};

type Params = {
    id: string;
  onGameDeleted?: () => void;
}; 

export default function GamePage({ params, onGameDeleted }: { params: Params, onGameDeleted?: () => void }) {
    const [ game, setGame ] = React.useState<Game | null>(null); // devuelve o un juego o null
    const [ loading, setLoading ] = React.useState(true);
    const [ deleting, setDeleting ] = React.useState(false);
    const { id } = params;
    const router = useRouter();

  const cargarJuego = async () => {
    setLoading(true);
    try {
    const response = await fetch(`/api/games/${id}`); // obtener el juego por id
    const data = await response.json();
    setGame(data); // actualizar el estado con los juegos cargados
    setLoading(false);
  } catch (error) {
    console.error(error); 
    setLoading(false);
  }
  };
  // cargar los datos al iniciar 
  React.useEffect(() => {
    cargarJuego();
  }, [id]); 
  //funcion para eliminar juego
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Seguro que quieres eliminar este juego?");
    if (!confirmed) return;

    setDeleting(true); // activar loading

    try {
      const response = await fetch(`/api/games/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el juego");
      }

      const result = await response.json();
      console.log(result);
      onGameDeleted?.();// recargar la lista de juegos
      router.push("/"); 
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el juego");
    } finally {
      setDeleting(false); // desactivar loading
    }
  };
  // manejo de estados
  if (loading) {
    return <div>Loading...</div>;
  } 
  if(!game) {
    return <div>Game not found</div>;
  } 

  return(
    <Card className="py-4 justify-center">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <p className="text-2xl uppercase font-bold">{game.title}</p>
        <small className="text-default-500">{game.description}</small>
        <h4 className="font-bold text-large">{game.genre}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={game.cover}
          width={270}
        />
        <Button className="mt-4 hover:bg-yellow-500 w-full">Añadir a favoritos</Button>
        <Button className="mt-4 hover:bg-slate-500 w-full" onPress={() => router.push("/")}>Volver a inicio</Button>
        <Button
          className="mt-4 bg-red-500 hover:bg-red-600 w-full"
          isLoading={deleting}
          onPress={() => handleDelete(game.id)}
        >
          {deleting ? "Eliminando..." : "Eliminar"}
        </Button>
      </CardBody>
    </Card>
  )
}