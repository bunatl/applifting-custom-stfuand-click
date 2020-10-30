import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading';
import { Ribbon } from './Ribbon'
import { ILeaderboardEntry } from '../../types/componentTypes'
const axios = require('axios');

export const Leaderboard = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ leaderboard, setLeaderboard ] = useState<ILeaderboardEntry[]>([]);

    const teamName = useSelector<any>(state => state.teamReducer.teamName);
    const updateLeaderboard = useSelector<any>(state => state.updateReducer.update);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            // add delay for spinner popup (prevents spinner flash)
            // as suggested: https://stackoverflow.com/questions/51602428/react-throttle-debounce-spinner-loading-message-not-show-if-request-is-fas
            const timer = setTimeout(() => setLoading(true), 750);

            try {
                const res = await axios.get(`/api/leaderboard`);
                setLeaderboard(res.data.response);
            } catch (err) {
                console.error(`Cannot fetch leaderboard: ${err}`);
            }
            clearTimeout(timer);
            setLoading(false);
        }
        fetchLeaderboard();
    }, [ updateLeaderboard ]);


    return (
        <div className="leaderboard">
            <Ribbon />
            {loading
                ? <ReactLoading
                    type={"spinningBubbles"}
                    color={"cornflowerblue"}
                    className="spinner"
                />
                : <table className="leaderboardTable">
                    <thead>
                        <tr style={{ background: "#E8E8E8" }}>
                            <th className="colNumber">#</th>
                            <th className="colTeam">Team</th>
                            <th className="colClicks">Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((leaderboardEntry, i) => (
                            <tr key={i} className={(leaderboardEntry.team === teamName) ? 'currentTeamRow' : ''}>
                                <td className="colNumber">{i + 1}</td>
                                <td className="colTeam">{leaderboardEntry.team}</td>
                                <td className="colClicks">{leaderboardEntry.clicks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}
