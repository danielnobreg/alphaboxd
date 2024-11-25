import { Container, Table, Button } from "react-bootstrap";
import { fetchMoviesData, deleteData } from "../services/api";
import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { FormMovies } from "./FormMovies";

export function ListMovies() {
    const [data, setData] = useState<Array<Movie>>([]);
    const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

    const loadMovies = () => {
        fetchMoviesData(setData);
    };

    const handleEdit = (movie: Movie) => {
        setMovieToEdit(movie);
    };

    const handleDelete = async (id: number | undefined) => {
        if (!id) return;
        
        try {
            const response = await deleteData(id);
            if (response) {
                alert('Filme deletado com sucesso!');
                loadMovies();
            } else {
                alert('Erro ao deletar filme.');
            }
        } catch (error) {
            console.error('Erro ao deletar filme:', error);
            alert('Erro ao deletar filme.');
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    return (
        <section>
            <Container className="mt-5">
                <FormMovies onMovieAddedOrUpdated={loadMovies} movieToEdit={movieToEdit} />
                <h2 className="mt-5">Listar Filmes</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Pôster do Filme</th>
                            <th>Título</th>
                            <th>Atores</th>
                            <th>Classificação Etária</th>
                            <th>Gênero</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 &&
                            data.map(movie => (
                                <tr key={movie.id?.toString() ?? "0"}>
                                    <td>
                                        <img
                                            width="50px"
                                            src={movie.moviePosterUrl ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fmovie-poster&psig=AOvVaw3yo814Gw00Bha554U_KvVW&ust=1732657315982000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCX9ue5-IkDFQAAAAAdAAAAABAE"}
                                            alt="movie poster"
                                        />
                                    </td>
                                    <td>{movie.title}</td>
                                    <td>{movie.actors}</td>
                                    <td>{movie.ageRange}</td>
                                    <td>{movie.genre}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEdit(movie)}>Editar</Button>
                                        {' '}
                                        <Button variant="danger" onClick={() => handleDelete(movie.id)}>Deletar</Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        </section>
    );
}