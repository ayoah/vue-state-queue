import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    message: {
        data:''
    },
    snapShots: [],
    preState: false,
    snapShotOffset: -1
}

const snapshot = store => {
    state.preState = _.cloneDeep(state.message)
    store.subscribe((mutation, state) => {
        let jsondiffpatch = require('jsondiffpatch').create({
            propertyFilter: function(name, context) {
                return name.slice(0, 1) !== '$';
            }
        });
        let currentState = _.cloneDeep(state.message); //深拷贝当前状态
        if (state.preState) {
            let preState = _.cloneDeep(state.preState); //深拷贝前一次状态
            let delta = jsondiffpatch.diff(currentState,preState); //diff delta

            if (delta !== undefined) { //如果有差异

                if (state.preState && mutation.type !== 'UNDO' && mutation.type !== 'REDO') {

                    if(state.snapShotOffset == (state.snapShots.length - 1)) {
                        state.snapShotOffset ++ ;
                    } else {
                        state.snapShotOffset = state.snapShots.length;
                    }
                    state.snapShots.push(delta);
                }
                state.preState = currentState; //把当前的状态拷贝到preState状态中
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