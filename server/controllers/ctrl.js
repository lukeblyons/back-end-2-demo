const movies = require('../db.json')
let globalId = 11

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies)
    },

    deleteMovie: (req, res) => {
        const { id } = req.params
        const idx = movies.findIndex(movie => movie.id === +id)
        console.log(idx)
        if(idx >= 0){
            movies.splice(idx, 1)
            res.status(200).send(movies)
        } else {
            res.sendStatus(404)
        }
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { type} = req.body;
        const idx = movies.findIndex(movie => movie.id === +id)
        if(type === "plus") {
            if(movies[idx].rating < 5) movies[idx].rating++
            res.status(200).send(movies)
        } else {
            if(movies[idx].rating > 1) movies[idx].rating--
            res.status(200).send(movies)
        }
    },
    addMovie: (req,res) => {
        const { title, rating, imageURL } = req.body
        if(!title || !rating  || !imageURL){
            res.sendStatus(400)
        }
        const copy = { ...req.body, id: globalId }
        movies.push(copy)
        globalId++
        res.status(200).send(movies)
    }
}
