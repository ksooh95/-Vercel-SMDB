'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Percent from './percent';

export default function NowTrending() {
    // const [movie, setMovie] = useState();
    const [trend, setTrend] = useState();
    const [trendWeek, setTrendWeek] = useState();
    const [hoverIndex, setHoverIndex] = useState(null);
    const [slidePx, setSlidePx] = useState(0);

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

    console.log('현재트렌드', trend?.results);
    // console.log('일주일트렌드', trendWeek?.results);
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
                <div className="main_movie_bar">
                    <h3 className="main_movie_list_title">일일 트렌딩 영화 & TV</h3>
                    <div className="all_week"></div>
                </div>

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
                {/* 현재트렌드 */}
                <ul>
                    {trend?.results.map((e, i) => {
                        return (
                            <li key={i} style={{ transform: `translateX(${slidePx}px)`, transition: '0.5s ease all' }}>
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
                {/* 일주일트렌드 */}
                {/* <ul>
                    {trendWeek?.results.map((e, i) => {
                        return (
                            <li key={i} style={{ transform: `translateX(${slidePx}px)`, transition: '0.5s ease all' }}>
                                <Link href="/">
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
                                        <span className="movie_average">{e.vote_average.toFixed(1)}</span>
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul> */}
            </div>
        </div>
    );
}
