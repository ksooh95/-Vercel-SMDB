import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function Handler(req, res) {
    let session = await getServerSession(req, res, authOptions);
    // console.log('너 계정', session);
    if (session) {
        req.body.author = session.user.email;
    }
    // console.log('reqbody~~~~~~~~~~~~~', req.body);
    if (req.method == 'POST') {
        const db = (await connectDB).db('forum');
        let result = await db.collection('post').insertOne(req.body);
        return res.status(200).json('작성완료');
    }
}
