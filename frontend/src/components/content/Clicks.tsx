import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setTeamName } from '../../actions'
import { useParams } from "react-router-dom";
import { IPathParams } from '../../types/componentTypes'
import {
    updateLeaderboard,
    incrementClicks,
    setTeamClicksCount
} from '../../actions';

const axios = require('axios');

export const Clicks = () => {
    const [ teamNameInput, setTeamNameInput ] = useState<string>('');
    const dispatch = useDispatch();
    const handleUserInputForTeamName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        // validate user input (check if lastly added char is valid)
        const regex = /[[A-Z\][a-z\][0-9\]\-._~:?#[\]@!$&'()*+,;%]/g;
        if (value.charAt(value.length - 1).match(regex) === null) {
            alert(`Character ${value.charAt(value.length - 1)} that you have entered isn't valid. Please enter different one.`);
            return;
        };
        // set user input
        setTeamNameInput(value)
    }

    return (
        <div className="header">
            <div className="team">
                <div className="inputLabelDiv">Enter your team name:</div>
                <div className="inputDiv">
                    <input
                        placeholder="Your mom"
                        value={teamNameInput}
                        onChange={e => handleUserInputForTeamName(e)}
                    ></input>
                </div>
            </div>
            <Link
                to={`/${teamNameInput}`}
                className="startClickingButton"
                onClick={() => dispatch(setTeamName(teamNameInput))}>
                <button>Start clicking</button>
            </Link>
        </div>
    );
}

export const MainClickingButton = () => {
    const dispatch = useDispatch();
    const { slug } = useParams<IPathParams>();

    let teamName = useSelector<any>(state => state.teamReducer.teamName);
    // if user go straight to url, team name needs to be set here
    if (teamName === '') {
        teamName = slug;
        dispatch(setTeamName(slug));
    }

    const click = async () => {
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

    return (
        <div className="mainClikignButton">
            <button onClick={click}>Click Meee!</button>
        </div>
    );
}
