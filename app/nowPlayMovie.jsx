'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Percent from './percent';

export default function NowPlayMovie() {
    const [movie, setMovie] = useState();
    const [hoverIndex, setHoverIndex] = useState(null);
    const [slidePx, setSlidePx] = useState(0);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`
                );
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY]);

    // console.log('지금 상영중', movie);
    const prevBtn = () => {
        if (slidePx < 0) {
            setSlidePx(slidePx + 790);
        }
    };
    const nextBtn = () => {
        if (slidePx > -3900) {
            setSlidePx(slidePx - 790);
        } else {
        }
    };
    return (
        <div>
            <div className="main_movie_list">
                <h3 className="main_movie_list_title">현재 상영중 영화</h3>
                <button
                    className="prevBtn"
                    type="button"
                    onClick={prevBtn}
                    style={{ display: slidePx == 0 ? 'none' : 'block' }}
                >
                    ⬅
                </button>
                <button
                    className="nextBtn"
                    type="button"
                    onClick={nextBtn}
                    style={{ display: slidePx == -3950 ? 'none' : 'block' }}
                >
                    ➡
                </button>
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
                            <li key={i} style={{ transform: `translateX(${slidePx}px)`, transition: '0.5s ease all' }}>
                                <Link href={`/detail/${e.id}` + `?id=${e.id}&media_type=movie`}>
                                    <span className="movie_title">{e.title}</span>
                                    <span className="movie_date">{formattedMovieDate}</span>
                                    <span
                                        className={hoverIndex === i ? 'poster mouseOn' : 'poster'}
                                        onMouseOver={() => setHoverIndex(i)}
                                        onMouseOut={() => setHoverIndex(null)}
                                    >
                                        <span className="movie_hover">
                                            {e.title} <br />
                                            자세히 보러가기
                                        </span>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                                            alt="movie_poster"
                                        />
                                        <Percent per={(e.vote_average * 10).toFixed()} />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    );
}
