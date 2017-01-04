import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import { diffUtil } from '../util'

Vue.use(Vuex)

const state = {
    message: {
        data:'',
        $data:''
    },
    snapShots: [],
    preState: false,
    snapShotOffset: -1
}

const snapshot = store => {

    state.preState = _.cloneDeep(state.message)

    store.subscribe((mutation, state) => {
        let currentState = _.cloneDeep(state.message); //deep clone state
        if (state.preState) {
            let preState = _.cloneDeep(state.preState); //deep clone preState
            let delta = diffUtil.diff(currentState,preState); //diff delta

            if (delta !== undefined) { //if has diff

                if (state.preState && mutation.type !== 'UNDO' && mutation.type !== 'REDO') {

                    if(state.snapShotOffset == (state.snapShots.length - 1)) {
                        state.snapShotOffset ++ ;
                    } else {
                        state.snapShotOffset = state.snapShots.length;
                    }
                    state.snapShots.push(delta);
                }
                state.preState = currentState; //copy current state to preState for next diff
            }

        }

    })
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [snapshot]
})