export const message = state => state.message;

export const preAvailable = state => {
    return state.snapShotOffset > -1;
}

export const postAvailable = state => {
    return state.snapShots.length > 0 && ((state.snapShotOffset+1) < state.snapShots.length);
}