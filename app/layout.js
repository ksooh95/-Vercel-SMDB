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
    return (
        <html lang="en">
            <body>
                <div className="header">
                    <Link href="/" passHref className="logo">
                        <img src="/logo3.png" alt="로고" />
                    </Link>
                    <div className="nav">
                        <Link href="/">홈</Link>
                        {session === null ? <LoginBtn /> : <LogoutBtn />}
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
