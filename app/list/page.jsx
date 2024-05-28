'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function List() {
    const params = useSearchParams();
    console.log(params);
    const [list, setList] = useState();

    useEffect(() => {
        fetch('/api/post/list', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => setList(data));
    }, []);
    console.log('게시글 리스트 :', list);
    return (
        <div className="list">
            <div className="container">
                <div className="search">
                    <div className="search_content">
                        <input type="text" placeholder="검색어를 입력해주세요" />
                        <button>🔍</button>
                    </div>
                </div>
                <div className="list_btn_wrap">
                    <Link href="/write">글쓰기</Link>
                </div>
                <div className="list_content">
                    <div className="list_head">
                        <span className="lh1">번호</span>
                        <span className="lh2">제목</span>
                        <span className="lh3">등록일</span>
                    </div>
                    {list?.map((a, i) => {
                        let displayDate = '';
                        // 날짜가 유효한지 확인
                        if (!isNaN(new Date(a.date).getTime())) {
                            // 유효한 경우, ISO 문자열로 변환
                            displayDate = new Date(a.date).toISOString().split('T')[0];
                            // displayDate = new Date();
                        } else {
                            // 유효하지 않은 경우, 기본 값 설정 또는 오류 처리
                            displayDate = '유효하지 않은 날짜';
                        }
                        return (
                            <div className="list_body" key={i}>
                                <span className="lb1">{i + 1}</span>
                                <span className="lb2">
                                    <Link href={`/listDetail?id=${a._id}`}>{a.title}</Link>
                                </span>
                                <span className="lb3">날짜수정</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
