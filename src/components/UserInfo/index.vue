<template>
    <div id="content">
        <div class="login_body">
            <div>
                <h5>用户名：{{userName}}</h5>
            </div>
            <div class="login_btn">
                <input type="submit"  @touchstart="cancellation()" value="注销">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userInfo",
        data(){
            return {
                userName: window.localStorage.getItem('loginUserName')
            }
        },
        methods:{
            cancellation(){
                window.localStorage.setItem('loginUserName','');
                window.localStorage.setItem('isLogin','0');
                this.$router.push('LoginYao');
                location.reload();
            }
        }
    }
</script>

<style scoped>
    #content .login_body{  width:100%;}
    #content .login_body h5{ text-align: center ; margin: 50px 0;}
    .login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
    .login_body .login_btn{ height:50px; margin:10px;}
    .login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
    .login_body .login_link{ display: flex; justify-content:space-between;}
    .login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>