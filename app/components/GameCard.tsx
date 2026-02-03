"use client";
// tarjeta de juego
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Game } from "../types/types";

import EditModal from "./editModal";

// props de la tarjeta de juego
type TarjetaJuegoProps = {
  game: Game;
  onGameDeleted?: () => void;
  onGameDetails?: () => void;
  onGameEdited?: () => void;
};

export default function TarjetaJuego({
  game,
  onGameDeleted,
  onGameDetails,
  onGameEdited,
}: TarjetaJuegoProps) {
  const router = useRouter();
  //estados
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // funcion para manejar eliminado
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar este juego?",
    );

    if (!confirmed) return;

    const response = await fetch(`/api/games/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el juego");
    }

    const result = await response.json();

    console.log(result);
    onGameDeleted?.(); // recargar la lista de juegos
  };

  const handleDetails = () => {
    onGameDetails?.();
    router.push(`/${game.id}`);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleFavorite = async () => {
    const nuevoValor = !game.isFavorite;

    console.log("Actualizando favorito...");
    const response = await fetch(`/api/games/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite: nuevoValor }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el juego");
    }
    const data = await response.json();

    console.log(data);
    onGameEdited?.();

    console.log("Nuevo valor: ", nuevoValor);
  };

  return (
    <Card className="py-4 h-auto sm:h-[700px] lg:h-[800px] flex flex-col">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex-shrink-0">
        <p className="text-tiny uppercase font-bold line-clamp-1">
          {game.title}
        </p>
        <small className="text-default-500 line-clamp-2 sm:line-clamp-3">
          {game.description}
        </small>
        <h4 className="font-bold text-large">{game.genre}</h4>
      </CardHeader>

      <CardBody className="overflow-visible py-2 flex items-center justify-center flex-grow">
        <Image
          alt={game.title}
          className="object-cover rounded-xl w-full h-auto max-w-[270px]"
          height={375}
          src={game.cover}
          width={270}
        />
      </CardBody>

      <div className="flex flex-col gap-2 px-4 pb-4 mt-auto">
        {" "}
        {/* ← mt-auto empuja abajo */}
        <Button
          className={`w-full ${game.isFavorite ? "bg-slate-600 hover:bg-red-500" : "bg-slate-500 hover:bg-purple-600"}`}
          onPress={handleFavorite}
        >
          {game.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        </Button>
        <Button className="hover:bg-slate-500 w-full" onPress={handleDetails}>
          Ver más
        </Button>
        <Button className="hover:bg-yellow-500 w-full" onPress={handleEdit}>
          Editar
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 w-full"
          onPress={() => handleDelete(game.id)}
        >
          Eliminar
        </Button>
      </div>

      <EditModal
        game={game}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          setIsEditModalOpen(false);
          onGameEdited?.();
        }}
      />
    </Card>
  );
}
