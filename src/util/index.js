export const diffUtil = require('jsondiffpatch').create({
    propertyFilter: function(name, context) {
        return name.slice(0, 1) !== '$';
    }
});