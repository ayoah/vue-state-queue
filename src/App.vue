<template>
  <div id="app">
    <hello :message="message"></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    name: 'app',
    components: {
        Hello
    },
    computed: {
        ...mapGetters([
            "message"
        ]),
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
