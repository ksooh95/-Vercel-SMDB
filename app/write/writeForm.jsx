'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
export default function WriteForm({ session }) {
    const route = useRouter();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const date = new Date();

    useEffect(() => {
        if (!session) {
            alert('로그인해야합니다');
            route.replace('/');
        }
    }, []);

    const fetchPost = () => {
        fetch('/api/post/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
                date: date,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <div className="write">
            <div className="container">
                <div className="write_content">
                    <input
                        type="text"
                        placeholder="제목"
                        onChange={(e) => {
                            setTitle(e.target.value);
                            console.log(title);
                        }}
                        defaultValue={title}
                    />
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="내용"
                        onChange={(e) => {
                            setContent(e.target.value);
                            console.log(content);
                        }}
                        defaultValue={content}
                    ></textarea>
                    <div className="write_btn">
                        <button type="button" onClick={fetchPost}>
                            작성
                        </button>
                        <button type="button" onClick={route.back}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
