import NowPlayMovie from './nowPlayMovie';
import PopularMovie from './popularMovie';
import NowTrending from './nowTrending';

export default function Home() {
    return (
        <div className="main">
            <div className="container">
                <NowTrending />
                <NowPlayMovie />
                <PopularMovie />
            </div>
        </div>
    );
}
