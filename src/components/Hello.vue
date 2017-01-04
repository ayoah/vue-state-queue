<template>
    <div class="hello">
        <button type="button"
                :disabled="!preAvailable"
                class="btn btn-success"
                @click="preState">pre</button>
        <button type="button"
                :disabled="!postAvailable"
                class="btn btn-success"
                @click="postState">post</button>
        <input type="text"
               class="form-control"
               id="exampleInput"
               placeholder="Enter text here"
               @keydown="enterEvent"
               :value="message.data">
        <span class="help-block">Enter same massage then you can undo or redo your input.</span>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters,
} from 'vuex';
export default {
    name: 'hello',
    props: {
        message: Object
    },
    computed: {
        ...mapGetters([
            'preAvailable',
            'postAvailable'
        ])
    },
    methods: {
        ...mapActions([
            "enterMessage",
            'undo',
            'redo'
        ]),
        preState() {
            if (this.preAvailable) {
                this.undo();
            }
        },
        postState() {
            if (this.postAvailable) {
                this.redo();
            }
        },
        enterEvent: function(e) {
	        let theEvent = e || window.event;
	        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	        if (code == 13) {
	            //enter key down event
	            theEvent.returnValue = false;
	            this.enterMessage({
	                data: $('#exampleInput').val()
	            })
	            this.num ++;
            }
        }
    },
    data () {
        return {
            num: 0
        }
    }
}


</script>

<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


</style>
