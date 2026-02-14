const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos de películas de ejemplo
const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    rating: 8.8,
    description: 'Un ladrón especializado en infiltrarse en los sueños de personas es contratado para realizar lo imposible: implantar una idea.',
    poster: 'https://www.tallengestore.com/cdn/shop/products/Inception-LeonardoDiCaprio-ChristopherNolan-HollywoodSciFiMoviePoster_66029b94-50ae-494c-b11d-60a3d91268b5.jpg?v=1685582036'
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    rating: 9.3,
    description: 'La historia de la amistad entre dos hombres condenados a cadena perpetua, frente a los horrores de la prisión de Shawshank.',
    poster: 'https://play-lh.googleusercontent.com/VPQQg8y0oTqnBk7NPdklj7P_dOmfk5K7dheS3LSAEXNuh-CeP8yLXeqxeoLYxlbVdov3LQRh51WCLMbtpcLI'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    director: 'Christopher Nolan',
    rating: 9.0,
    description: 'Cuando el Joker emerge como un nuevo enemigo criminal en Gotham, Batman debe enfrentar una amenaza aún mayor a la ciudad.',
    poster: 'https://rukminim2.flixcart.com/image/480/480/k8xduvk0/poster/j/m/z/medium-the-dark-knight-poster-decorative-wall-poster-wall-d-cor-original-imafqu8euacqngyh.jpeg?q=90'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    rating: 8.9,
    description: 'Las historias de varios criminales de Los Ángeles, un boxeador, una esposa de un gánster y un par de actores se entrelazan.',
    poster: 'https://www.theoriginalunderground.com/cdn/shop/files/pulp-fiction-film-poster-print-591645_1024x.jpg?v=1762198286'
  },
  {
    id: 5,
    title: 'Forrest Gump',
    year: 1994,
    director: 'Robert Zemeckis',
    rating: 8.8,
    description: 'La vida es como una caja de chocolates: Forrest Gump narra su fascinante e inesperada vida de éxito sin quererlo.',
    poster: 'https://m.media-amazon.com/images/I/61gJ0U3mAiL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: 6,
    title: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    rating: 8.6,
    description: 'Un grupo de astronautas viaja a través de un agujero de gusano para intentar salvar a la humanidad de la extinción.',
    poster: 'https://i.etsystatic.com/36541132/r/il/72181f/7047437338/il_570xN.7047437338_fncs.jpg'
  }
];

// Rutas

// GET - Obtener todas las películas
app.get('/api/movies', (req, res) => {
  try {
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// GET - Obtener una película por ID
app.get('/api/movies/:id', (req, res) => {
  try {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    
    if (!movie) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la película' });
  }
});

// POST - Crear una nueva película
app.post('/api/movies', (req, res) => {
  try {
    const { title, year, director, rating, description, poster } = req.body;
    
    // Validación básica
    if (!title || !year || !director) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    
    const newMovie = {
      id: Math.max(...movies.map(m => m.id), 0) + 1,
      title,
      year,
      director,
      rating: rating || 0,
      description: description || '',
      poster: poster || 'https://via.placeholder.com/200x300?text=Sin+imagen'
    };
    
    movies.push(newMovie);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la película' });
  }
});

// PUT - Actualizar una película
app.put('/api/movies/:id', (req, res) => {
  try {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    
    if (!movie) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    
    const { title, year, director, rating, description, poster } = req.body;
    
    if (title) movie.title = title;
    if (year) movie.year = year;
    if (director) movie.director = director;
    if (rating) movie.rating = rating;
    if (description) movie.description = description;
    if (poster) movie.poster = poster;
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la película' });
  }
});

// DELETE - Eliminar una película
app.delete('/api/movies/:id', (req, res) => {
  try {
    const index = movies.findIndex(m => m.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    
    const deletedMovie = movies.splice(index, 1);
    res.json(deletedMovie[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
});

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend está funcionando' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api/movies`);
});

module.exports = app;
