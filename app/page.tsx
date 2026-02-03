"use client";
import React from "react";

import TarjetaJuego from "./components/GameCard";
import CreateForm from "./components/CreateForm";
import { Game } from "./types/types";

export default function Home() {
  // estado para almacenar los juegos
  const [games, setGames] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [game, setGame] = React.useState<Game | null>(null); // devuelve o un juego o null
  // funcion para cargar los juegos
  const cargarJuegos = async () => {
    const response = await fetch("/api/games");
    const data = await response.json();

    setGames(data); // actualizar el estado con los juegos cargados
  };

  // cargar los datos al iniciar
  React.useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div>
      <div className="text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 mt-4 sm:mt-6">
          Bienvenido a la pagina de juegos
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 px-2 sm:px-0">
          En esta pagina puedes buscar, agregar y eliminar juegos de tu lista de
          favoritos
        </p>
      </div>
      <CreateForm onGameCreated={cargarJuegos} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {games.map((game) => (
          <div key={game.id} className="w-full">
            <TarjetaJuego
              game={game}
              onGameDeleted={cargarJuegos}
              onGameEdited={cargarJuegos}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
