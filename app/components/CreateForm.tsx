"use client";
import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { newGameSchema, NewGameFormData } from "../schemas/newGame.schema";

type CreateFormProps = {
  onGameCreated?: () => void | Promise<void>;
};

export default function CreateForm({ onGameCreated }: CreateFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newGameSchema),
    defaultValues: {
      title: "",
      platform: "",
      genre: "",
      releaseDate: "",
      cover: "",
      isFavorite: false,
      description: "",
    },
  });
  const [message, setMessage] = React.useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit = async (data: NewGameFormData) => {
    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Error al crear el juego");
      }
      setMessage({ text: "¡Juego creado!", type: "success" });
      await onGameCreated?.();
      reset();
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error al crear el juego", type: "error" });
    }
  };

  return (
    <div className="px-4 mb-8">
      <h2 className="text-center text-xl sm:text-2xl mb-4">Crear Juego</h2>
      <Form
        className="flex flex-col gap-4 mb-8 bg-gray-900 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          placeholder="Introduce la fecha"
          type="date"
          {...register("releaseDate")}
          errorMessage={errors.releaseDate?.message}
          isInvalid={!!errors.releaseDate}
        />
        <Input
          label="Portada"
          placeholder="Introduce la URL de la portada"
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

        <Button color="primary" isLoading={isSubmitting} type="submit">
          Crear Juego
        </Button>
      </Form>
    </div>
  );
}
