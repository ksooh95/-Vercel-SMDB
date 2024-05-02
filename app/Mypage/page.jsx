import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Mypage() {
    let session = await getServerSession(authOptions);
    console.log('마이페이지 계정', session);
    return (
        <div className="mypage">
            <div className="container">
                <div className="my_name">{session?.user?.name}</div>
            </div>
        </div>
    );
}
