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
            description: ""
        },
    });
    const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

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
            setMessage({ text: '¡Juego creado!', type: 'success' });
            await onGameCreated?.();
            reset();
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Error al crear el juego', type: 'error' });
        }
    };

    return (
        <div className="px-4 mb-8">
            <h2 className="text-center text-xl sm:text-2xl mb-4">Crear Juego</h2>
            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-8 bg-gray-900 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
                <Input
                    type="text"
                    label="Título"
                    placeholder="Introduce el título del juego"
                    {...register("title")}
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                />
                <Input
                    type="text"
                    label="Plataforma"
                    placeholder="Introduce la plataforma del juego"
                    {...register("platform")}
                    isInvalid={!!errors.platform}
                    errorMessage={errors.platform?.message}
                />
                <Input
                    type="text"
                    label="Género"
                    placeholder="Introduce el género del juego"
                    {...register("genre")}
                    isInvalid={!!errors.genre}
                    errorMessage={errors.genre?.message}
                />
                <Input
                    type="date"
                    label="Fecha de lanzamiento"
                    placeholder="Introduce la fecha"
                    {...register("releaseDate")}
                    isInvalid={!!errors.releaseDate}
                    errorMessage={errors.releaseDate?.message}
                />
                <Input
                    type="text"
                    label="Portada"
                    placeholder="Introduce la URL de la portada"
                    {...register("cover")}
                    isInvalid={!!errors.cover}
                    errorMessage={errors.cover?.message}
                />
                <Checkbox
                    {...register("isFavorite")}
                    isInvalid={!!errors.isFavorite}
                >
                    Favorito
                </Checkbox>
                <Input
                    type="text"
                    label="Descripción"
                    placeholder="Introduce la descripción"
                    {...register("description")}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                />

                {message && (
                    <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {message.text}
                    </p>
                )}

                <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}>
                    Crear Juego
                </Button>
            </Form>
        </div>
    );
}
