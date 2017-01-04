import * as types from './mutation-types'

export default {
    [types.ENTER_MESSAGE] (state,  message) {
        state.message = message
    },

    //撤销
    [types.UNDO](state) {
        if(state.snapShotOffset > -1) {
            let jsondiffpatch = require('jsondiffpatch').create({
                propertyFilter: function(name, context) {
                    return name.slice(0, 1) !== '$';
                }
            });
            let currentInfo = _.cloneDeep(state.message);
            let currentOffset = state.snapShotOffset;
            let delta = _.cloneDeep(state.snapShots[currentOffset]);
            jsondiffpatch.patch(currentInfo, delta);
            jsondiffpatch.reverse(delta);
            state.message = currentInfo;
            state.snapShotOffset --;
        } else {
            console.log('到底了！');
        }

    },

    [types.REDO](state) {

        if(state.snapShots.length > 0 && ((state.snapShotOffset+1) < state.snapShots.length)) {
            let jsondiffpatch = require('jsondiffpatch').create({
                propertyFilter: function(name, context) {
                    return name.slice(0, 1) !== '$';
                }
            });
            state.snapShotOffset ++;
            let currentInfo = _.cloneDeep(state.message);
            let currentOffset = state.snapShotOffset;
            let delta = _.cloneDeep(state.snapShots[currentOffset]);
            jsondiffpatch.unpatch(currentInfo, delta);
            jsondiffpatch.reverse(delta);
            state.message = currentInfo;
        } else {
            console.log('到顶了！');
        }
    }
}