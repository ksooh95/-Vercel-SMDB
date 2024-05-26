import './globals.css';

import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Header from './header';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';

export const metadata = {
    title: 'Soo Movie !',
    description: 'Movie project',
};

export default async function RootLayout({ children }) {
    let session = await getServerSession(authOptions);
    let name = session.name;
    return (
        <html lang="ko">
            <body>
                <div class="body_wrap">
                    <Header session={session} />
                    <div class="con">
                        <div class="con_header">
                            <div class="logo">
                                <img src="/logo3.png" alt="" />
                            </div>
                            <div className="header_right">
                                {session === null ? <LoginBtn /> : <LogoutBtn name={name} />}
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
