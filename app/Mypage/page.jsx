import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Mypage() {
    let session = await getServerSession(authOptions);

    return (
        <div className="mypage">
            <div className="container">
                <div className="my_name">{session?.user?.name}</div>
            </div>
        </div>
    );
}
