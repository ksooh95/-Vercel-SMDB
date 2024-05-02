'use client';
import { signOut } from 'next-auth/react';

export default function LogOutBtn({ name }) {
    return (
        <div className="logout">
            <div className="name">{name}</div>
            <button
                className="logout_btn"
                onClick={() => {
                    signOut();
                }}
            >
                로그아웃
            </button>
        </div>
    );
}
