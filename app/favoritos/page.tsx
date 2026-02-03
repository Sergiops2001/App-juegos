"use client";
import React from "react";

import FavouritesList from "../components/FavouritesList";

interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  releaseDate: string;
  cover: string;
  isFavorite: boolean;
  description: string;
}

export default function FavoritesPage() {
  const [games, setGames] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const cargarFavoritos = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/games?favorites=true");
      const data = await response.json();

      setGames(data);
    } catch (error) {
      console.error("Error al cargar los juegos favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  //cargar al montar el componenente
  React.useEffect(() => {
    cargarFavoritos();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Lista de juegos favoritos</h1>
      <FavouritesList games={games} onGameEdited={cargarFavoritos} />
    </div>
  );
}
