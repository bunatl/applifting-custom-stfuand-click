// ----------------------
// === clicks reducer ===
// ----------------------
export type ClickCounterActions =
    | { type: 'INCREMENT' }

export interface ICounterState {
    clickCounter: number;
}
// ----------------------
// === team reducer ===
// ----------------------
export type ClickTeamActions =
    | { type: 'SETTEAMNAME', payload: string }
    | { type: 'SETTEAMCLICKS', payload: number }

export interface ITeamState {
    teamName: string;
    teamClickCount: number;
}

// ----------------------
// === updateLeaderboard reducer ===
// ----------------------
export type UpdateLeaderboardActions =
    | { type: 'UPDATE' }

export interface IUpdateState {
    update: boolean;
}
