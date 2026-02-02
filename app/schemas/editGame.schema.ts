// esquema de edición de un juego
import { z } from "zod";

export const editGameSchema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    platform: z.string().min(1, "La plataforma es obligatoria"),
    genre: z.string().min(1, "El género es obligatorio"),
    releaseDate: z.string().min(1, "La fecha de lanzamiento es obligatoria"),
    cover: z.string().url("La URL de la portada no es válida"),
    isFavorite: z.boolean(),
    description: z.string().min(1, "La descripción es obligatoria")
});

export type EditGameFormData = z.infer<typeof editGameSchema>;