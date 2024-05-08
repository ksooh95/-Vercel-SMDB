'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Percent from '../percent';

export default function Trending() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [trend, setTrend] = useState();

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=ko-KR&region=KR`
                );
                const data = await res.json();
                setTrend(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY]);
    return (
        <div className="trending">
            <div className="container">
                <ul className="trending_list">
                    {trend?.results.map((e, i) => {
                        return (
                            <li key={i}>
                                <Link href={`/detail/${e.id}` + `?id=${e.id}&media_type=${e.media_type}`}>
                                    <span className="movie_title">
                                        {e.name}
                                        {e.title}
                                    </span>
                                    <span className="movie_date">{e.media_type}</span>
                                    <span
                                        className={hoverIndex === i ? 'poster mouseOn' : 'poster'}
                                        onMouseOver={() => setHoverIndex(i)}
                                        onMouseOut={() => setHoverIndex(null)}
                                    >
                                        <span className="movie_hover">
                                            {e.name}
                                            {e.title} <br />
                                            자세히 보러가기
                                        </span>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                                            alt="movie_poster"
                                        />
                                        {/* <span className="movie_average"></span> */}
                                        <Percent per={(e.vote_average * 10).toFixed()} />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
