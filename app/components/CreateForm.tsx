// formulario de creación de juego
"use client";
import React from "react";
import {Form, Input, Select, SelectItem, Checkbox, Button} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newGameSchema } from "../schemas/newGame.schema";
import { NewGameFormData } from "../schemas/newGame.schema";
import { Game } from "../types/types";

type CreateFormProps = {
    onGameCreated?: () => void | Promise<void>; // callback para recargar los juegos
};

export default function CreateForm({ onGameCreated }: CreateFormProps) {
    //definicion de constantes 
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
        console.log(data);
        //aqui tenemos que hacer la peticion post para añadir el juego
        const response = await fetch("/api/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al crear el juego");
        }
        const result = await response.json();
        console.log(result);
        setMessage({ text: '¡Juego creado!', type: 'success' });
        await onGameCreated?.();
        reset();

        // body: JSON.stringify(data),
    };
    return (
        <div className="px-4 mb-8">
            <h2 className="text-center text-xl sm:text-2xl mb-4">Crear Juego</h2>
            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-8 bg-gray-900 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
                <Input
                    type="text"
                    label="Título"
                    classNames={{
                        label: "mb-4",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce el título del juego"
                    {...register("title")}
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                />
                <Input
                    type="text"
                    label="Plataforma"
                    classNames={{
                        label: "mb-4",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce la plataforma del juego"
                    {...register("platform")}
                    isInvalid={!!errors.platform}
                    errorMessage={errors.platform?.message}
                />
                <Input
                    type="text"
                    label="Género"
                    classNames={{
                        label: "mb-4",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce el género del juego"
                    {...register("genre")}
                    isInvalid={!!errors.genre}
                    errorMessage={errors.genre?.message}
                />
                <Input
                    type="date"
                    label="Fecha de lanzamiento"
                    classNames={{
                        label: "mb-4",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce la fecha de lanzamiento del juego"
                    {...register("releaseDate")}
                    isInvalid={!!errors.releaseDate}
                    errorMessage={errors.releaseDate?.message}
                />
                <Input
                    type="text"
                    label="Portada"
                    classNames={{
                        label: "mb-4",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce la portada del juego"
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
                {errors.isFavorite?.message && (
                    <p className="text-danger text-small">
                        {errors.isFavorite.message}
                    </p>
                )}
                <Input
                    type="text"
                    label="Descripción"
                    classNames={{
                        label: "mb-4",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce la descripción del juego"
                    {...register("description")}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                />
                <Button 
                    type="submit"
                    isLoading={isSubmitting}>
                    Crear Juego
                </Button>
            </Form>
        </div>
    );
}
