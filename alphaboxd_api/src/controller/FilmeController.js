import FilmeModel from "../model/FilmeModel.js";

export default class FilmeController {

    static async findAll(request, response) {
        try {
            const filmes = await FilmeModel.findAll();

            if (!filmes || filmes.length === 0) {
                return response.status(404).json({ error: 'Nenhum filme encontrado' });
            }

            response.status(200).json(filmes);
        } catch (error) {
            response.status(500).json({ error: 'Erro ao buscar filmes', detalhes: error.message });
        }
    }

    static async findById(request, response) {
        const { id } = request.params;

        try {
            const filme = await FilmeModel.findByPk(id);

            if (!filme) {
                return response.status(404).json({ error: 'Filme nao encontrado' });
            }

            response.status(200).json(filme);
        } catch (error) {
            response.status(500).json({ error: 'Erro ao encontrar filme', details: error.message });
        }
    }

    static async save(request, response) {
        const { titulo, ator, faixa_etaria, genero } = request.body;

        if (!titulo || !ator|| !faixa_etaria || !genero) {
            return response.status(400).json({ error: 'Todos atributos (titulo, autor, faixa_etaria, genero) sao requeridos' });
        }

        try {
            const filmeExistente = await FilmeModel.findOne({
                where: { titulo, ator}
            });

            if (filmeExistente) {
                return response.status(409).json({ error: 'Um filme com este titulo ja existe' });
            }

            const filme = { titulo, ator, faixa_etaria, genero };
            const filmeCriado = await FilmeModel.create(filme);

            response.status(201).json({ filme: filmeCriado });
        } catch (error) {
            response.status(500).json({ error: 'Erro ao criar filme', details: error.message });
        }
    }


    static async update (request, response) {
        const {id} = request.params;
        const {titulo, autor, faixa_etaria, genero} = request.body;

        try {
           const filme = await FilmeModel.findByPk(id); 

            if (!filme) {
                return response.status(404).json({ erro: 'Filme nao encontrado'});
            }

            filme.titulo = titulo;
            filme.autor = autor;
            filme.faixa_etaria = faixa_etaria;
            filme.genero = genero;

            await filme.save();

            response.status(200).json ({filme});
        } catch (error) {
            response.status(500).json ({erro: 'Erro ao atualizar filme'});
        }
    }

    static async deleteById(request, response) {
    const { id } = request.params;

    try {
        const filme = await FilmeModel.findByPk(id);

        if (!filme) {
            return response.status(404).json({ error: 'Filme nao encontrado' });
        }

        await filme.destroy();

        response.status(204).send(); // No content response
    } catch (error) {
        response.status(500).json({ error: 'Erro ao deletar filme' });
    }
}
}
