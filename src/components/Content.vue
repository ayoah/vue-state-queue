<template>
    <div>
        <div contenteditable="true">{{ msg }}</div>
    </div>
</template>
<script>
    export default{
        name: "content",
        data(){
            msg:'hello vue'
        }
    }
</script>
