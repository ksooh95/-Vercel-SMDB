'use client';

import { useEffect, useState } from 'react';

export default function Percent({ per }) {
    const [percent, setPercent] = useState(0);
    let average = per;
    useEffect(() => {
        // 여기에서 percent 상태를 점진적으로 증가시켜 애니메이션 효과를 구현할 수 있습니다.
        const interval = setInterval(() => {
            setPercent((prevPercent) => {
                if (prevPercent >= average) {
                    clearInterval(interval);
                    return average;
                }
                return prevPercent + 1; // 조정하여 애니메이션 속도를 변경할 수 있습니다.
            });
        }, 7); // 10ms 마다 percent 상태를 증가시킵니다.

        return () => clearInterval(interval);
    }, [average]);
    return (
        <>
            <div
                className="donut"
                percent_data={average}
                // style={
                //     average == 0
                //         ? { background: `conic-gradient(#3f8bc9 0% 100%)` }
                //         : { background: `conic-gradient(#3f8bc9 0% ${percent}%, #f2f2f2 ${percent}% 100%)` }
                // }
                style={
                    average >= 75
                        ? { background: `conic-gradient(#0ca678 0% ${percent}%, #172036 ${percent}% 100%)` }
                        : average >= 50
                        ? { background: `conic-gradient(#f59f00 0% ${percent}%, #172036 ${percent}% 100%)` }
                        : average < 50
                        ? { background: `conic-gradient(#f03e3e 0% ${percent}%, #172036 ${percent}% 100%)` }
                        : average == 0
                        ? { background: `conic-gradient(#ddd ${percent}% 100%)` }
                        : null
                }
            >
                <span className="per">{percent == 0 ? ' -- ' : percent + '%'}</span>
            </div>
        </>
    );
}
