'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListDetail() {
    const params = useSearchParams();
    const [view, setView] = useState();
    const route = useRouter();

    useEffect(() => {
        fetch(`/api/post/view?id=${params.get('id')}`)
            .then((res) => res.json())
            .then((data) => setView(data));
    }, []);

    console.log('게시글 디테일 :', view);

    return (
        <div className="list_detail">
            <div className="container">
                <div className="ld_title">{view?.title}</div>
                <div className="ld_dn">
                    <div className="ld_name">{view?.author.split('@')[0]}</div> •
                    <div className="ld_date">{view?.date.split('T')[0]}</div>
                </div>
                <div className="ld_text">{view?.content}</div>
                <div className="ld_btn_wrap">
                    <button
                        type="button"
                        onClick={() => {
                            fetch(`/api/post/delete?id=${view?._id}`, {
                                method: 'DELETE',
                            }).then(() => {
                                alert('게시글이 삭제되었습니다.');
                                route.push('/list');
                            });
                        }}
                    >
                        삭제
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            route.push('/list');
                        }}
                    >
                        목록
                    </button>
                </div>
            </div>
        </div>
    );
}
