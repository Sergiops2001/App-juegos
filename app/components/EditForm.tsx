"use client";
import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditGameFormData, editGameSchema } from "../schemas/editGame.schema";
import { Game } from "../types/types";

type EditFormProps = {
  game: Game;
  onGameEdited?: () => void | Promise<void>; // callback para recargar los juegos
  onCancel?: () => void; // callback para cerrar el modal
};

export default function EditForm({
  onGameEdited,
  onCancel,
  game,
}: EditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editGameSchema),
    defaultValues: {
      title: game.title || "",
      platform: game.platform || "",
      genre: game.genre || "",
      releaseDate: game.releaseDate || "",
      cover: game.cover || "",
      isFavorite: !!game.isFavorite,
      description: game.description || "",
    },
  });
  const [message, setMessage] = React.useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit = async (data: EditGameFormData) => {
    try {
      console.log("Datos enviados:", data);
      const response = await fetch(`/api/games/${game.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log("Respuesta servidor:", result);

      if (!response.ok) {
        setMessage({
          text: result.message || "Error al editar",
          type: "error",
        });

        return;
      }

      setMessage({ text: "¡Juego editado!", type: "success" });
      if (onGameEdited) {
        await onGameEdited();
      }
    } catch (error) {
      console.error("Error en onSubmit:", error);
      setMessage({ text: "Error al editar el juego", type: "error" });
    }
  };

  return (
    <div className="bg-gray-600 p-4 rounded-lg w-full">
      <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Título"
          placeholder="Introduce el título del juego"
          type="text"
          {...register("title")}
          errorMessage={errors.title?.message}
          isInvalid={!!errors.title}
        />
        <Input
          label="Plataforma"
          placeholder="Introduce la plataforma del juego"
          type="text"
          {...register("platform")}
          errorMessage={errors.platform?.message}
          isInvalid={!!errors.platform}
        />
        <Input
          label="Género"
          placeholder="Introduce el género del juego"
          type="text"
          {...register("genre")}
          errorMessage={errors.genre?.message}
          isInvalid={!!errors.genre}
        />
        <Input
          label="Fecha de lanzamiento"
          placeholder="Introduce la fecha de lanzamiento"
          type="date"
          {...register("releaseDate")}
          errorMessage={errors.releaseDate?.message}
          isInvalid={!!errors.releaseDate}
        />
        <Input
          label="Portada"
          placeholder="URL de la imagen"
          type="text"
          {...register("cover")}
          errorMessage={errors.cover?.message}
          isInvalid={!!errors.cover}
        />
        <Checkbox {...register("isFavorite")} isInvalid={!!errors.isFavorite}>
          Favorito
        </Checkbox>
        <Input
          label="Descripción"
          placeholder="Introduce la descripción"
          type="text"
          {...register("description")}
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
        />

        {message && (
          <p
            className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}
          >
            {message.text}
          </p>
        )}

        <div className="flex justify-end gap-4 mt-4">
          <Button type="button" variant="flat" onPress={onCancel}>
            Cancelar
          </Button>
          <Button color="primary" isLoading={isSubmitting} type="submit">
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
