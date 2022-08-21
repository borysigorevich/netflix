export type MovieType = {
    adult: boolean
    backdrop_path: string
    id: number
    name: string
    original_language: string
    original_name: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    first_air_date: string
    vote_average: number
    vote_count: number
    release_date?: string
    video?: boolean
    origin_country: string[]
    title: string
}

export type HomeResponseType = {
    netflixOriginals: MovieType[]
    trending: MovieType[]
    topRated: MovieType[]
    actionMovies: MovieType[]
    comedyMovies: MovieType[]
    horrorMovies: MovieType[]
    romanceMovies: MovieType[]
    documentaries: MovieType[]
}