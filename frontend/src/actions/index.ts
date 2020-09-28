import {
    UpdateLeaderboardActions,
    ClickTeamActions,
    ClickCounterActions
} from '../types/reducerTypes'

export const incrementClicks = (): ClickCounterActions => ({ type: 'INCREMENT' });

export const setTeamName = (x: string): ClickTeamActions => ({ type: 'SETTEAMNAME', payload: x });
export const setTeamClicksCount = (x: number): ClickTeamActions => ({ type: 'SETTEAMCLICKS', payload: x });

export const updateLeaderboard = (): UpdateLeaderboardActions => ({ type: 'UPDATE' });