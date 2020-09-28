import { UpdateLeaderboardActions, IUpdateState } from '../types/reducerTypes'

const initUpdate: IUpdateState = {
    update: false
}

const updateLeaderboardReducer = (state: IUpdateState = initUpdate, action: UpdateLeaderboardActions) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                update: !state.update
            };
        default:
            return state;
    }
}

export default updateLeaderboardReducer;