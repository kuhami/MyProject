<template>
    <div>
        <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <mu-appbar title="Muse UI"></mu-appbar>
            <mu-list @itemClick="docked ? '' : toggle()">
                <mu-list-item title="Menu Item 1"></mu-list-item>
                <mu-list-item title="Menu Item 2"/>
                <mu-list-item title="Menu Item 3"/>
                <template>
                    <div style="padding: 0 16px 0 16px;">
                        <mu-date-picker hintText="选择时间"/>
                    </div>
                </template>
                <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                open: false,
                docked: true
            }
        },
        methods: {
            toggle (flag) {
                this.open = !this.open
                this.docked = !flag
            }
        }
    }
</script>