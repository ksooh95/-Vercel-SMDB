// SkeletonMovie.js
import React from 'react';
export default function Skeleton() {
    return (
        <li className="skeleton-wrapper">
            <a href="#">
                <span className="skeleton-title"></span>
                <span className="skeleton-poster"></span>
            </a>
        </li>
    );
}
