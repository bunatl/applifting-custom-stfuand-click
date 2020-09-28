//  -------------------
// ===== Header ======
//  -------------------
export interface IPathParams {
    slug: string;
}

//  -------------------
// ====== Leaderboard ========
//  -------------------
export interface ILeaderboardEntry {
    _id: string;
    team: string;
    clicks: number;
}