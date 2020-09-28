import React from 'react';
import { useSelector } from 'react-redux'

function TotalClicks() {
    const yourClickCount = useSelector<any>(state => state.clicksReducer.clickCounter);
    const teamCountCounter = useSelector<any>(state => state.teamReducer.teamClickCount);

    return (
        <div className="clicksScore">
            <div>
                <div>Your clicks:</div>
                <div className="clicksCount">{yourClickCount} </div>
            </div>
            <div>
                <div>Team clicks:</div>
                <div className="clicksCount">{teamCountCounter} </div>
            </div>
        </div>
    );
}

export default TotalClicks;
