/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";
import { Movie } from "../types/Movie";

export async function fetchMoviesData(setData:Function) {
    try {
        const response = await axios.get("http://localhost:5000/movies");
        console.log(response.data);
        setData(response.data.movies)
    } catch(error:any) {
        console.error(`Error when fetching data from movies: ${error.message}`);
    }
}

export async function saveData(data:Movie) {
    try {
        const payload = {
            title: data.title,
            actors: data.actors,
            ageRange: data.ageRange,
            genre: data.genre
        }

        const response = await axios.post("https://localhost:5000/movies", payload);
        console.log(response.data);
    } catch(error:any) {
        console.error(`Error when saving data: ${error.message}`);
    }
}