import { SubmitHandler, useForm } from "react-hook-form";
import { Movie } from "../types/Movie";
import { saveData } from "../services/api";

export function MovieForm() {

    const { handleSubmit, register } = useForm<Movie>();

    const handleFormSubmit: SubmitHandler<Movie> = (data) => {
        console.log(data);
        saveData(data);
    }
}