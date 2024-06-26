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
    const [loadingMore, setLoadingMore] = useState(false); // 더보기

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

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
        setLoadingMore(true); // 더보기 로딩 시작
    };
    console.log('trend :', trend);
    // ✅ 타겟 요소를 지정합니다.
    // React에서는 useRef를 활용하여 DOM을 선택합니다.
    let target = useRef(null);
    // ✅ observer를 선언합니다.
    // 첫 번째 인자로 관측되었을 경우 실행할 콜백함수를 넣습니다.
    // 두 번째 인자로 관측에 대한 옵션을 지정합니다.
    // ✅ 관측되었을 경우 실행할 콜백함수입니다.
    let callback = () => {
        console.log('관측되었습니다.');
    };
    // ✅ 관측에 적용할 수 있는 옵션입니다.
    let options = {
        root: null, // 타켓 요소가 "어디에" 들어왔을때 콜백함수를 실행할 것인지 결정합니다. null이면 viewport가 root로 지정됩니다.
        //root: document.querySelector('#scrollArea'), => 특정 요소를 선택할 수도 있습니다.
        rootMargin: '20px', // root에 마진값을 주어 범위를 확장 가능합니다.
        threshold: 1.0, // 타겟 요소가 얼마나 들어왔을때 백함수를 실행할 것인지 결정합니다. 1이면 타겟 요소 전체가 들어와야 합니다.
    };
    let observer = new IntersectionObserver(callback, options);

    useEffect(() => {
        if (target.current) {
            observer.observe(target.current);
        }
        return () => {
            if (target.current) {
                observer.unobserve(target.current);
            }
        };
    }, [target.current]);

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
                            <li ref={target} style={{ height: '100px' }}></li>
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
