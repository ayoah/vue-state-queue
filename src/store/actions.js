import * as types from './mutation-types'

export const enterMessage = ({ commit }, payload) => {
    commit(types.ENTER_MESSAGE, payload)
}

//撤销
export const undo = ({ commit }) => {
    commit(types.UNDO);
}

//恢复
export const redo = ({ commit }) => {
    commit(types.REDO);
}