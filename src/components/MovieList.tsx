import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { fetchMoviesData } from "../services/api";
import { Container, Table } from "react-bootstrap";

export default function MovieList() {
    const [data, setData] = useState(Array<Movie>);

    useEffect(()=>{fetchMoviesData(setData)}, []);
    return(
        <section>
            <Container className="mt-5">
                <h2>List Movies</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Actors</th>
                            <th>Age Range</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map(movie=>{
                            return(
                                <tr key={movie.id?.toString() ?? "0"}>
                                    <td><img width="50px" src={movie.moviePosterUrl ?? "https://media.istockphoto.com/id/995815438/vector/movie-and-film-modern-retro-vintage-poster-background.jpg?s=612x612&w=0&k=20&c=UvRsJaKcp0EKIuqDKp6S7Dwhltt0D5rbegPkS-B8nDQ="} alt="Movie Poster"/></td>
                                    <td>{movie.title}</td>
                                    <td>{movie.actors}</td>
                                    <td>{movie.ageRange}</td>
                                    <td>{movie.genre}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </section>
    )
}