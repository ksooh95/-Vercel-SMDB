'use client';
import Link from 'next/link';

import { useState } from 'react';
export default function Header({ session }) {
    let name = session?.user?.name;
    const [fold, setFold] = useState(false);

    const menuFold = () => {
        setFold(!fold);
    };

    return (
        <div className={fold === true ? 'header fold' : 'header'}>
            <div className="header_top">
                <button
                    type="button"
                    onClick={() => {
                        menuFold();
                    }}
                    style={{ width: '28px', display: 'block' }}
                >
                    <img src="/ham.png" alt="" style={{ width: '100%' }} />
                </button>
            </div>

            <div className="nav">
                <Link href="/">
                    <img src="/menu3.png" alt="" />홈
                </Link>
                <Link href="/Mypage">
                    <img src="/menu1.png" alt="" /> 마이페이지
                </Link>
                <Link href="/list">
                    <img src="/menu4.png" alt="" /> 자유게시판
                </Link>
                <Link href="/trending2">
                    <img src="/menu5.png" alt="" /> 일일 트렌딩
                </Link>
                <Link href="/nowPlaying">
                    <img src="/menu7.png" alt="" /> 현재 상영중
                </Link>
                {/* <Link href="/topMovie">
                    <img src="/menu6.png" alt="" /> 역대 TOP MOVIE
                </Link> */}
            </div>
        </div>
    );
}
