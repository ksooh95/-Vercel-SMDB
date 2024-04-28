'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MovieList() {
    const [movie, setMovie] = useState();
    const [hoverIndex, setHoverIndex] = useState(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`);
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY]);

    return (
        <div>
            <div className="movie_list">
                <div className="container">
                    <ul>
                        {movie?.results.map((e, i) => {
                            let movie_date = e.release_date;
                            // 날짜 포맷을 변경합니다.
                            const formattedMovieDate = new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }).format(new Date(movie_date));
                            return (
                                <li key={i}>
                                    <Link href="/">
                                        <span className="movie_title">{e.title}</span>
                                        <span className="movie_date">{formattedMovieDate}</span>
                                        <span
                                            className={hoverIndex === i ? 'poster mouseOn' : 'poster'}
                                            onMouseOver={() => setHoverIndex(i)}
                                            onMouseOut={() => setHoverIndex(null)}
                                        >
                                            <span className="movie_hover">
                                                <Link href="/">
                                                    {e.title} <br />
                                                    자세히 보러가기
                                                </Link>
                                            </span>
                                            <img
                                                src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                                                alt="movie_poster"
                                            />
                                            <span className="movie_average">{e.vote_average.toFixed(1)}</span>
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
