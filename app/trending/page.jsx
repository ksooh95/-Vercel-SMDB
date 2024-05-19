'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Percent from '../percent';
import Skeleton from '../skeleton';

export default function Trending() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [trend, setTrend] = useState({ results: [] });
    const [page, setPage] = useState(1); // 페이지 번호 상태 추가
    const [loading, setLoading] = useState(true);
    // const [loadingMore, setLoadingMore] = useState(false); // 더보기
    const loader = useRef(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (page === 1) {
                    setLoading(true); // 첫 페이지 로딩인 경우만 전체 로딩 상태 활성화
                }
                const res = await fetch(
                    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=ko-KR&region=KR&page=${page}`
                );
                const data = await res.json();
                setTimeout(() => {
                    setTrend((prev) => ({ ...data, results: [...prev.results, ...data.results] }));
                    if (page === 1) {
                        setLoading(false); // 첫 페이지 로딩인 경우만 전체 로딩 상태 비활성화
                    } else {
                        setLoadingMore(false); // 더보기 로딩 상태 비활성화
                    }
                }, 500); // .5초 후에 실행
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY, page]);
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => observer.disconnect();
    }, []);
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };
    // 더보기 함수
    // const handleLoadMore = () => {
    //     setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    //     setLoadingMore(true); // 더보기 로딩 시작
    // };
    console.log('trend :', trend);
    return (
        <div className="main_movie_list2">
            <div className="trending">
                <div className="container">
                    {/* 로딩 중이면 스켈레톤 UI를 표시 */}
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
                            <div ref={loader} />
                        </ul>
                    )}
                    {/* <ul className="trending_list">
                        {loadingMore && Array.from({ length: 20 }).map((_, i) => <Skeleton key={i} />)}
                    </ul>
                    <button className="more_btn" onClick={handleLoadMore} disabled={loadingMore}>
                        {loadingMore ? '로딩 중...' : '더보기'}
                    </button> */}
                    {/* 더보기 버튼 */}
                </div>
            </div>
        </div>
    );
}
