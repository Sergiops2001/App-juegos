import { NextResponse } from 'next/server';
import { games } from '../data';

// GET /api/games/[id] - GET BY ID 
export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const game = games.find(g => g.id === id);

  if (!game) {
    return NextResponse.json(
      { error: 'Juego no encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(game);
}

// PUT /api/games/[id] - UPDATE BY ID
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const index = games.findIndex(g => g.id === id);

    if (index === -1) { 
      return NextResponse.json(
        { error: 'Juego no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar el juego manteniendo el ID
    games[index] = {
      ...games[index],
      ...body,
      id: id // Asegurar que el ID no cambie
    };

    return NextResponse.json(games[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el juego' },
      { status: 500 }
    );
  }
}

// DELETE /api/games/[id] - DELETE BY ID
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  const index = games.findIndex(g => g.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'Juego no encontrado' },
      { status: 404 }
    );
  }

  const deletedGame = games.splice(index, 1)[0]; 

  return NextResponse.json(deletedGame);
}