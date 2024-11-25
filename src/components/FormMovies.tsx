import { Button, Container, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Movie } from "../types/Movie";
import { saveData, updateData } from "../services/api";
import { useEffect } from "react";

interface FormMoviesProps {
    onMovieAddedOrUpdated: () => void;
    movieToEdit?: Movie;
}

export function FormMovies({ onMovieAddedOrUpdated, movieToEdit }: FormMoviesProps) {
    const { handleSubmit, register, reset } = useForm<Movie>({ defaultValues: movieToEdit });

    useEffect(() => {
        if (movieToEdit) {
            reset(movieToEdit);
        }
    }, [movieToEdit, reset]);

    const handleFormSubmit: SubmitHandler<Movie> = async (data) => {

        console.log(data);

        try {
            let response;
            if (movieToEdit) {
                response = await updateData(data);
            } else {
                response = await saveData(data);
            }

            if (response) {
                alert(movieToEdit ? 'Filme atualizado com sucesso!' : 'Filme cadastrado com sucesso!');
                onMovieAddedOrUpdated();  // Chame a função para atualizar a tabela
                reset();  // Limpar o formulário após a submissão
            } else {
                alert('Erro ao cadastrar/atualizar filme.');
            }
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            alert('Erro ao cadastrar/atualizar filme.');
        }
    };

    return (
        <section>
            <Container className="mt-5">
                <h2>{movieToEdit ? 'Editar Filme' : 'Cadastrar Filme'}</h2>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Poster URL</Form.Label>
                        <Form.Control {...register("moviePosterUrl")} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control {...register("title")} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Actors</Form.Label>
                        <Form.Control {...register("actors")} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Age Range</Form.Label>
                        <Form.Control {...register("ageRange")} type="number" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control {...register("genre")} type="text" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">{movieToEdit ? 'Atualizar' : 'Cadastrar'}</Button>
                </Form>
            </Container>
        </section>
    );
}