<template>
    <mu-paper>
        <mu-bottom-nav :value="bottomNav" @change="handleChange" >
            <mu-bottom-nav-item value="recents" title="Recents" icon="restore" to="/Content"/>
            <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite" to="/Favorite"/>
            <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on" to="/Nearby"/>
        </mu-bottom-nav>
    </mu-paper>
</template>

<script>

    export default {
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
//                console.log(to);
//                console.log(from);
                if(to.name == 'Content'){
                    this.bottomNav = 'recents'
                }
            }
        },
        data () {
            return {
                bottomNav: 'recents'
            }
        },
        methods: {
            handleChange (val) {
                if(val == "recents"){
                    console.log(val)
                }else if(val == 'favorites'){
                    console.log(val)
                }else if(val == 'nearby'){
                    console.log(val)
                }
                this.bottomNav = val

            }
        }
    }
</script>