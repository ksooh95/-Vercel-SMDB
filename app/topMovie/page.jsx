'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Percent from '../percent';

export default function TopMovie() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [trend, setTrend] = useState({ results: [] });
    const [page, setPage] = useState(1); // 페이지 번호 상태 추가

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=KR&page=${page}`
                );
                const data = await res.json();
                setTrend((prev) => ({ ...data, results: [...prev.results, ...data.results] })); // 기존 목록에 새로운 목록 추가
                // setTrend(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY, page]);
    // 더보기 함수
    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    };
    console.log('trend :', trend);
    return (
        <div className="main_movie_list2">
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
                    <button className="more_btn" onClick={handleLoadMore}>
                        더보기
                    </button>{' '}
                    {/* 더보기 버튼 */}
                </div>
            </div>
        </div>
    );
}
