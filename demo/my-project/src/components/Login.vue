<template>

    <div id="Hellow">
        <div class="Hellow" style="text-align: center;">
            <div style="text-align: center;">
                <mu-paper class="demo-paper" circle :zDepth="2"><img src="./../assets/logo.png"></mu-paper>
            </div>
            <mu-auto-complete id="account" hintText="请输入账号" labelFloat label="账号" @input="accountInput"/>
            <br>
            <mu-text-field id="password" label="密码" hintText="请输入密码" type="password" labelFloat @input="passwordInput"/>
            <br>
            <mu-raised-button label="登录" class="demo-raised-button" primary @click="LoginChange" />
            <!--<router-link v-bind:to = "urls">登录</router-link>-->
            <mu-toast v-if="toast" v-bind:message="msg" @close="hideToast" style="background: #999;"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                msg: '建立第一个注册页面',
                account: '',
                password: '',
                snackbar: false,
                toast: false
            }
        },
        methods: {
            hideToast () {
                this.toast = false
                if (this.toastTimer) clearTimeout(this.toastTimer)
            },
            showToast () {
                this.toast = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
            },
            accountInput (val) {
                this.account = val
            },
            passwordInput (val) {
                this.password = val
            },
            LoginChange (val) {


                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast = false }, 2000)

                let account = this.account
                let password = this.password

                if (account != 'admin') {
                    this.msg = '请输入正确账号'
                    this.toast = true
                    $("#account input").focus();
                    return false
                } else if (password != '123456') {
                    this.msg = '请输入正确密码'
                    this.toast = true
                    $("#password input").focus();
                    return false;
                } else {
                    this.msg = '登录成功'
                    this.toast = true
                    this.toastTimer =  setTimeout(() => {
                        location.href ='http://localhost:8080/#/Content'
                     }, 2000)
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>-->
<style>
    #Hellow {
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
        color: #2c3e50;
        margin-top: 20px;
    }

    h1, h2 {
        font-weight: normal;
    }

    #Hellow span {
        color: #ffffff;
    }

    .demo-raised-button {
        width: 200px;
    }

    .demo-paper {
        display: inline-block;
        height: 100px;
        width: 100px;
        margin: 20px;
        text-align: center;
    }

    .demo-paper img {
        display: inline-block;
        height: 80px;
        width: 80px;
        margin: 20px 10px 10px 10px;
        text-align: center;
        overflow: hidden;
    }

    .mu-text-field-hint {
        text-align: left;
    }

    .demo-raised-button {
        margin-top: 10px;
    }
</style>
