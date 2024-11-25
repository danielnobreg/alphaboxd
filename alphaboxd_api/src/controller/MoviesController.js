import MovieModel from "../model/MovieModel.js";

class MoviesController {
  static async findAll(request, response) {
    try {
      const movies = await MovieModel.findAll();

      if (!movies || movies.length === 0) {
        return response.status(404).json({ error: "Nenhum filme encontrado!" });
      }
      response.status(200).json({ movies: movies });
    } catch (error) {
      response.status(500).json({ error: "Erro ao buscar filmes!" });
    }
  }

  static async findById(request, response) {
    const { id } = request.params;

    try {
      const movie = await MovieModel.findByPk(id);

      if (!movie) {
        return response.status(404).json({ message: "Filme não encontrado" });
      }

      response.status(200).json({ movie });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Erro ao encontrar filme!", details: error.message });
    }
  }

  static async save(request, response) {
    const { moviePosterUrl, title, actors, ageRange, genre } = request.body;

    if (!moviePosterUrl || !title || !actors || !ageRange || !genre) {
      return response
        .status(400)
        .json({
          error:
            "Todos os atributos (moviePosterUrl, title, actors, ageRange, genre) são requeridos",
        });
    }

    try {
      const filmeExistente = await MovieModel.findOne({
        where: { title, actors },
      });

      if (filmeExistente) {
        return response
          .status(409)
          .json({ error: "Um filme com este título já existe" });
      }

      const filme = { moviePosterUrl, title, actors, ageRange, genre };
      const filmeCriado = await MovieModel.create(filme);

      response.status(201).json({ filme: filmeCriado });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Erro ao criar filme", details: error.message });
    }
  }

  static async update(request, response) {
    const { id } = request.params;
    const { moviePosterUrl, title, actors, ageRange, genre } = request.body;

    try {
      const movie = await MovieModel.findByPk(id);

      if (!movie) {
        return response.status(404).json({ message: "Filme não encontrado." });
      }

      movie.moviePosterUrl = moviePosterUrl;
      movie.title = title;
      movie.actors = actors;
      movie.ageRange = ageRange;
      movie.genre = genre;

      await movie.save();

      response.status(200).json({ movie });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Erro ao atualizar filme", details: error.message });
    }
  }

  // Certifique-se de que o método deleteById no Controller está assim:
  static async deleteById(request, response) {
    const { id } = request.params;

    try {
      const movie = await MovieModel.findByPk(id);

      if (!movie) {
        return response.status(404).json({ error: "Filme não encontrado" });
      }

      await movie.destroy();

      response.status(204).send(); // No content response
    } catch (error) {
      response
        .status(500)
        .json({ error: "Erro ao deletar filme", details: error.message });
    }
  }
}

export default MoviesController;
