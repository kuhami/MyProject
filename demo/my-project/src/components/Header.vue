<template>
    <mu-appbar title="Home">
        <!--侧边导航-->
        <v-drawer></v-drawer>
        <mu-flat-button label="Home" slot="right" to="/"/>
        <mu-icon-menu icon="more_vert" slot="right">
            <mu-menu-item title="菜单 1"/>
            <mu-menu-item title="菜单 2"/>
            <mu-menu-item title="菜单 3"/>
            <mu-menu-item title="菜单 4"/>
            <mu-menu-item title="菜单 5"/>
        </mu-icon-menu>
    </mu-appbar>
</template>

<script>
    import Drawer from '@/components/Drawer'
    export default {
        data () {
            return {
                bottomNav:'/Content'
            }
        },
        components: {
            'v-drawer': Drawer
        }
    }
</script>


