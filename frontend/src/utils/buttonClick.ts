import {
    updateLeaderboard,
    incrementClicks,
    setTeamClicksCount
} from '../actions';
import { useDispatch } from 'react-redux'

const dispatch = useDispatch();

const axios = require('axios');

export const click = async (teamName: any) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_DB_URI}/api/click`,
            header: {
                type: 'application/json'
            },
            data: {
                team: teamName,
            }
        });

        // get total count for team clicks
        dispatch(incrementClicks());
        dispatch(setTeamClicksCount(res.data.data.clicks));

        // update leadership board
        dispatch(updateLeaderboard());
    } catch (err) {
        console.log(err);
    }
}
