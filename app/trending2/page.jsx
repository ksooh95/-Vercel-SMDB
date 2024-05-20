'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Percent from '../percent';
import Skeleton from '../skeleton';

export default function Trending() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [trend, setTrend] = useState({ results: [] });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로드 상태 관리를 위

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const lastElementRef = useRef(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (page === 1) {
                    setLoading(true);
                } else {
                    setLoadingMore(true);
                }
                const res = await fetch(
                    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=ko-KR&region=KR&page=${page}`
                );
                const data = await res.json();
                setTimeout(() => {
                    setTrend((prev) => ({ ...data, results: [...prev.results, ...data.results] }));
                    setLoading(false);
                    setLoadingMore(false);

                    // 새로운 데이터가 로드된 후, 마지막 요소로 스크롤
                    if (page > 1 && lastElementRef.current) {
                        lastElementRef.current.scrollIntoView();
                    }
                }, 1000 + Math.random() * 1000);
            } catch (err) {
                console.error(err);
                setLoading(false);
                setLoadingMore(false);
            }
        };

        fetchMovies();
    }, [API_KEY, page]);

    console.log('trend :', trend);

    let target = useRef(null);

    useEffect(() => {
        const callback = (entries) => {
            const [entry] = entries;
            console.log('도착');
            // 여기에 `loading` 상태도 체크를 추가합니다.
            if (entry.isIntersecting && !loadingMore && !loading && !isInitialLoad) {
                setPage((prevPage) => prevPage + 1);
            } else if (isInitialLoad) {
                setIsInitialLoad(false); // 초기 로드 상태를 false로 변경
            }
        };

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(callback, options);

        if (target.current) {
            observer.observe(target.current);
        }

        return () => {
            if (target.current) {
                observer.unobserve(target.current);
            }
        };
        // 여기에 `loading` 상태를 의존성 배열에 추가합니다.
    }, [loadingMore, loading, isInitialLoad]);

    return (
        <div className="main_movie_list2">
            <div className="trending">
                <div className="container">
                    {loading ? (
                        <ul className="trending_list">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <Skeleton key={i} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="trending_list">
                            {trend?.results.map((e, i) => {
                                return (
                                    <li key={i} ref={i === trend.results.length - 1 ? lastElementRef : null}>
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
                                                <Percent per={(e.vote_average * 10).toFixed()} />
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <ul className="trending_list">
                        {loadingMore && Array.from({ length: 20 }).map((_, i) => <Skeleton key={i} />)}
                    </ul>
                    <div ref={target}></div>
                </div>
            </div>
        </div>
    );
}
