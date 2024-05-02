import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import WriteForm from './writeForm';

export default async function Write() {
    const session = await getServerSession(authOptions);
    return <WriteForm session={session}/>;
}
