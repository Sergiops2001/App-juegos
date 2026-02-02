import { NextResponse } from 'next/server';
import { games } from './data';

// GET /api/games 
export async function GET(request) {
  // Obtener parámetros de búsqueda (para filtros)
  const { searchParams } = new URL(request.url); 
  const genre = searchParams.get('genre'); 
  const platform = searchParams.get('platform');
  const favorites = searchParams.get('favorites');

  let filteredGames = [...games];

  // Filtrar por género
  if (genre) {
    filteredGames = filteredGames.filter(game => 
      game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  // Filtrar por plataforma
  if (platform) {
    filteredGames = filteredGames.filter(game => 
      game.platform.toLowerCase().includes(platform.toLowerCase())
    );
  }

  // Filtrar solo favoritos
  if (favorites === 'true') {
    filteredGames = filteredGames.filter(game => game.isFavorite);
  }

  return NextResponse.json(filteredGames); // Devuelve los juegos filtrados
}

// POST /api/games - Crear un nuevo juego
export async function POST(request) {
  try {
    const body = await request.json(); 
    
    // Validación básica
    if (!body.title || !body.platform || !body.genre) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios: title, platform, genre' },
        { status: 400 }
      );
    }

    // Crear el nuevo juego
    const newGame = {
      id: games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1, 
      title: body.title,
      platform: body.platform,
      genre: body.genre,
      releaseDate: body.releaseDate || new Date().toISOString().split('T')[0],
      cover: body.cover || '/placeholder-game.jpg',
      isFavorite: body.isFavorite || false,
      description: body.description || ''
    };

    games.push(newGame);

    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el juego' },
      { status: 500 }
    );
  }
}