import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
export default async function Handler(req, res) {
    // console.log('~~~~~~~~~ 쿼리 ~~~~~~~~~~~~ :', req.query);
    if (req.method == 'GET') {
        const db = (await connectDB).db('forum');
        let result = await db.collection('post').findOne({ _id: new ObjectId(req.query) });
        return res.status(200).json(result);
    }
}
