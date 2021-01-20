<template>
  <v-container>
    <v-row>
      <v-col sm="6" v-for="movie in movies" :key="movie.id">
        <v-card class="mx-auto">
          <v-container>
            <v-row>
              <v-col sm="8"
                ><v-img :src="movieImage(movie.poster_path)"></v-img
              ></v-col>
              <v-col sm="8" class="mt-2">
                <v-list-item-title class="headline">
                  {{ movie.title }}
                </v-list-item-title>
                <p class="mt-3">
                  {{ movie.overview }}
                </p>
                <br />
                <h2>Average vote {{ movie.vote_average }}</h2>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    movies: [],
  }),
  created() {
    this.fetchTopMovies();
  },
  methods: {
    async fetchTopMovies() {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=57fb50d9335d50ef51a139c9e1acd3f6&language=en-US&page=1"
      );

      if (res.data) {
        console.log(res.data.results);
        this.movies = res.data.results;
      }
    },
    movieImage(posterPath) {
      return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : "";
    },
  },
  computed: {},
};
</script>