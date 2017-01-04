import * as types from './mutation-types'

//undo action
export const enterMessage = ({ commit }, payload) => {
    commit(types.ENTER_MESSAGE, payload)
}

//undo action
export const undo = ({ commit }) => {
    commit(types.UNDO);
}

//redo action
export const redo = ({ commit }) => {
    commit(types.REDO);
}