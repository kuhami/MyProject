<template>
    <div id="Hellow">
        <div class="Hellow">
            <img src="./../assets/logo.png">
            <h1 @click="handleChange">{{msg}}</h1>
            <router-link v-bind:to = "urls">进入</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Hellow',
        data () {
            return {
                msg: '建立第一个VUE实例',
                urls:'/Login'
            }
        },
        methods: {
            handleChange (val) {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>-->
<style>
    #Hellow{
        width: 100%;
        height: 100%;
        background: #ffffff;
        position: absolute;
        top: 0px;
        bottom: 0px;
        z-index: 10;
    }
    .Hellow {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    h1, h2 {
        font-weight: normal;
    }
</style>
