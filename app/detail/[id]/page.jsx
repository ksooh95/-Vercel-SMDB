'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Detail() {
    const [detail, setDetail] = useState();
    const [detailV, setDetailV] = useState();
    const [percent, setPercent] = useState(0);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const media_type = searchParams.get('media_type');
    console.log(media_type);
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=ko-KR`
                );
                const data = await res.json();
                setDetail(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=ko-KR`
                );
                const data = await res.json();
                setDetailV(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [API_KEY]);

    const average = (detail?.vote_average * 10).toFixed();

    useEffect(() => {
        // 여기에서 percent 상태를 점진적으로 증가시켜 애니메이션 효과를 구현할 수 있습니다.
        const interval = setInterval(() => {
            setPercent((prevPercent) => {
                if (prevPercent >= average) {
                    clearInterval(interval);
                    return average;
                }
                return prevPercent + 1; // 조정하여 애니메이션 속도를 변경할 수 있습니다.
            });
        }, 15); // 10ms 마다 percent 상태를 증가시킵니다.

        return () => clearInterval(interval);
    }, [average]);

    console.log(detail);
    // console.log(detailImg);
    console.log('비디여', detailV);

    return (
        <div className="detail">
            <div
                className="banner"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail?.backdrop_path})` }}
            >
                <div className="content">
                    <div className="left">
                        <img src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`} alt="" />
                        <div className="imdb">
                            <Link href={`https://www.imdb.com/title/${detail?.imdb_id}`}>IMDB</Link> 확인하러 가기
                        </div>
                    </div>
                    <div className="right">
                        <h2 className="d_title">
                            {media_type === 'tv' ? detail?.name : detail?.title}
                            {media_type === 'tv' ? (
                                <span>({detail?.last_air_date?.substring(0, 4)})</span>
                            ) : (
                                <span>({detail?.release_date?.substring(0, 4)})</span>
                            )}
                        </h2>
                        <h3 className="d_genres">
                            {detail?.genres.map((a, i) => {
                                return (
                                    <span key={i}>
                                        {a?.name}
                                        {i < detail.genres.length - 1 ? ',' : ''}
                                    </span>
                                );
                            })}
                        </h3>
                        <p className="d_info">
                            {media_type === 'tv' ? (
                                <span className="run_time">
                                    시즌{detail?.number_of_seasons}, {detail?.number_of_episodes}개의 에피소드
                                </span>
                            ) : (
                                <span className="run_time">{detail?.runtime}m</span>
                            )}
                        </p>
                        {/* <h4 className="d_average">{detail?.vote_average.toFixed(1)}</h4> */}
                        <div
                            className="detail_donut"
                            percent_data={average}
                            style={
                                average >= 75
                                    ? { background: `conic-gradient(#0ca678 0% ${percent}%, #172036 ${percent}% 100%)` }
                                    : average >= 50
                                    ? { background: `conic-gradient(#f59f00 0% ${percent}%, #172036 ${percent}% 100%)` }
                                    : average < 50
                                    ? { background: `conic-gradient(#f03e3e 0% ${percent}%, #172036 ${percent}% 100%)` }
                                    : average == 0
                                    ? { background: `conic-gradient(#ddd ${percent}% 100%)` }
                                    : null
                            }
                        >
                            <span className="per">{percent + '%'}</span>
                        </div>
                        <div className="d_trail">
                            <p>트레일러보기</p>
                            <div className="d_trail_youtube">
                                <iframe
                                    src={`https://www.youtube.com/embed/${detailV?.results[0]?.key}`}
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <div className="d_overview">
                            <p>줄거리</p>
                            <span>{detail?.overview}</span>
                        </div>
                    </div>
                </div>
                <div className="opacity"></div>
                {/* <img src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`} alt="" /> */}
            </div>
        </div>
    );
}
