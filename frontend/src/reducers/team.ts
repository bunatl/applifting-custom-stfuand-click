import { ClickTeamActions, ITeamState } from '../types/reducerTypes'

const initTeam: ITeamState = {
    teamName: '',
    teamClickCount: 0
}

const teamReducer = (state: ITeamState = initTeam, action: ClickTeamActions) => {
    switch (action.type) {
        case 'SETTEAMNAME':
            return {
                ...state,
                teamName: action.payload
            };
        case 'SETTEAMCLICKS':
            return {
                ...state,
                teamClickCount: action.payload
            };
        default:
            return state;
    }
}

export default teamReducer;