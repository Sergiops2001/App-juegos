// formulario de creación de juego
"use client";
import React from "react";
import {Form, Input, Select, SelectItem, Checkbox, Button, Modal} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditGameFormData, editGameSchema } from "../schemas/editGame.schema"; 
import { Game } from "../types/types";

type EditFormProps = {
    game: Game;
    onGameEdited?: () => void | Promise<void>; // callback para recargar los juegos
    onCancel?: () => void; // callback para cerrar el modal
};

export default function EditForm({ onGameEdited, onCancel, game }: EditFormProps) {
    //definicion de constantes 
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(editGameSchema),
        defaultValues: {
            title: game.title,
            platform: game.platform,
            genre: game.genre,
            releaseDate: game.releaseDate,
            cover: game.cover,
            isFavorite: game.isFavorite,
            description: game.description
        },
    });
    const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
    
    const onSubmit = async (data: EditGameFormData) => {
        try {
        console.log(data);
        //aqui tenemos que hacer la peticion post para añadir el juego
        const response = await fetch(`/api/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(!response.ok) {
            const errorData = await response.json();
            setMessage({ text: errorData.message, type: 'error' });
        }
        const result = await response.json();
        console.log(result);
        setMessage({ text: '¡Juego editado!', type: 'success' });
        await onGameEdited?.();
        reset();
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Error al editar el juego', type: 'error' });
        }

        // body: JSON.stringify(data),
    };
    return (
        <div className="bg-gray-600 p-4 m-4 rounded-lg">
            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-8  p-4 rounded-lg">
                <Input
                    type="text"
                    label="Título"
                    classNames={{
                        label: "mb-2",  // ← Margen inferior al label
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
                        label: "mb-2",  // ← Margen inferior al label
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
                        label: "mb-2",  // ← Margen inferior al label
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
                        label: "mb-2",  // ← Margen inferior al label
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
                        label: "mb-2",  // ← Margen inferior al label
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
                        label: "mb-2",  // ← Margen inferior al label
                    }}
                    placeholder="Introduce la descripción del juego"
                    {...register("description")}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                />
                <div className="flex justify-end gap-4">
                <Button 
                    type="button"
                    onPress={onCancel}>
                    Cancelar
                </Button>
                <Button 
                    type="submit"
                    isLoading={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
                </div>
            </Form>
        </div>
    );
}
