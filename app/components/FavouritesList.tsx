"use client";
import React from "react";

import { Game } from "../types/types";

import TarjetaJuego from "./GameCard";

type FavoritesListProps = {
  games: Game[];
  onGameEdited?: () => void;
};

export default function FavoritesList({
  games,
  onGameEdited,
}: FavoritesListProps) {
  // Filtrar solo los favoritos
  const favoritos = games.filter((game) => game.isFavorite);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Mis Favoritos ({favoritos.length})
      </h2>

      {favoritos.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400 text-xl">
            No tienes juegos favoritos aún
          </p>
          <p className="text-gray-500 mt-2">
            Marca algunos juegos como favoritos para verlos aquí
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {favoritos.map((game) => (
            <div key={game.id} className="w-full">
              <TarjetaJuego
                game={game}
                onGameDeleted={onGameEdited}
                onGameEdited={onGameEdited}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
