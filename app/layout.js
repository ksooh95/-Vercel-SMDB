import './globals.css';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';
export const metadata = {
    title: 'Soo Movie !',
    description: 'Movie project',
};

export default async function RootLayout({ children }) {
    let session = await getServerSession(authOptions);
    let name = session?.user?.name;
    return (
        <html lang="en">
            <body>
                <div className="header">
                    <Link href="/" passHref className="logo">
                        <img src="/logo3.png" alt="로고" />
                    </Link>
                    <div className="nav">
                        <Link href="/">홈</Link>
                        <Link href="/Mypage">마이페이지</Link>
                    </div>
                    <div className="header_right">{session === null ? <LoginBtn /> : <LogoutBtn name={name} />}</div>
                </div>
                {children}
            </body>
        </html>
    );
}
