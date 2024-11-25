/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Movie } from "../types/Movie";

export async function fetchMoviesData(setData: Function) {
    try {
        const response = await axios.get("http://localhost:5000/movies");
        console.log(response.data);
        setData(response.data.movies);
    } catch (error: any) {
        console.error(`Erro ao buscar filmes na api: ${error.message}`);
    }
}

export async function saveData(data: Movie) {
    try {
        const payload = {
            moviePosterUrl: data.moviePosterUrl,
            title: data.title,
            actors: data.actors,
            ageRange: data.ageRange,
            genre: data.genre
        }

        const response = await axios.post("http://localhost:5000/movies", payload);
        console.log(response.data);
        return response.data;  // Adicione isso para retornar a resposta
    } catch (error: any) {
        console.log(`Erro ao enviar dados para api: ${error.message}`);
        return null;  // Adicione um valor de retorno aqui em caso de erro
    }
}

export async function updateData(data: Movie) {
    try {
        const payload = {
            moviePosterUrl: data.moviePosterUrl,
            title: data.title,
            actors: data.actors,
            ageRange: data.ageRange,
            genre: data.genre
        }

        const response = await axios.put(`http://localhost:5000/movies/${data.id}`, payload);
        console.log(response.data);
        return response.data;  // Adicione isso para retornar a resposta
    } catch (error: any) {
        console.log(`Erro ao atualizar dados na api: ${error.message}`);
        return null;  // Adicione um valor de retorno aqui em caso de erro
    }
}

export async function deleteData(id: number) {
    try {
        const response = await axios.delete(`http://localhost:5000/movies/${id}`);
        console.log(response.data);
        return true;  // Retorne true para indicar sucesso
    } catch (error: any) {
        console.log(`Erro ao deletar dados na api: ${error.message}`);
        return false;  // Retorne false para indicar falha
    }
}