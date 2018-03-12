<template>
    <div id="app">
        <div id="home">
            <div id="header">
                <v-header></v-header>
            </div>
            <keep-alive>
                <router-view> </router-view>
            </keep-alive>
            <div id="Footer">
                <v-footer></v-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
        components: {
            name: 'App',
            'v-header': Header,
            'v-footer': Footer
        }
    }

</script>

<style>
    #Footer {
        width: 100%;
        position: fixed;
        bottom: 0px;
    }
</style>

