import * as types from './mutation-types'
import { diffUtil } from '../util'

export default {
    [types.ENTER_MESSAGE] (state,  message) {
        state.message = message
    },

    //undo mutation
    [types.UNDO](state) {
        if(state.snapShotOffset > -1) {

            let currentInfo = _.cloneDeep(state.message);
            let currentOffset = state.snapShotOffset;
            let delta = _.cloneDeep(state.snapShots[currentOffset]);
            diffUtil.patch(currentInfo, delta);
            diffUtil.reverse(delta);
            state.message = currentInfo;
            state.snapShotOffset --;
        } else {
            console.log('到底了！');
        }

    },

    //redo mutation
    [types.REDO](state) {

        if(state.snapShots.length > 0 && ((state.snapShotOffset+1) < state.snapShots.length)) {
            state.snapShotOffset ++;
            let currentInfo = _.cloneDeep(state.message);
            let currentOffset = state.snapShotOffset;
            let delta = _.cloneDeep(state.snapShots[currentOffset]);
            diffUtil.unpatch(currentInfo, delta);
            diffUtil.reverse(delta);
            state.message = currentInfo;
        } else {
            console.log('到顶了！');
        }
    }
}