import './globals.css';
import Link from 'next/link';
export const metadata = {
    title: 'Soo Movie !',
    description: 'Movie project',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="header">
                    <Link href="/" passHref className="logo">
                        <img src="/logo3.png" alt="로고" />
                        {/* <p class="gra">SMDB</p> */}
                    </Link>
                    <div className="nav">
                        <Link href="/">홈</Link>
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
