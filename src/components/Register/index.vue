<template>
    <div id="content">
        <div class="login_body">
            <div>
                <input class="login_text" type="text"  v-model="userName" placeHolder="账户名/手机号/Email" >
            </div>
            <div>
                <input class="login_text" type="password"  v-model="password" placeHolder="设置密码" >
            </div>
            <div>
                <input class="login_text" type="password"  v-model="password1" placeHolder="确认密码" >
            </div>
            <div class="login_btn">
                <input type="submit"  @touchstart="register()" value="注册">
            </div>
            <div class="login_link">
                <a href="javascript:void(0);"></a>
                <a href="javascript:void(0);" @touchstart="loginView()">返回登录页面</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { messageBox } from '@/components/JS';

    export default {
        name: "register",
        data(){
            return {
                userName: '',
                password: '',
                password1: ''
            }
        },
        methods: {
            register(){
                let messageInfo = {
                    title: '注册失败',
                    content: '注册失败',
                    cancel: '',
                    ok: '确定',
                }

                if(this.userName == '' || this.password == '' || this.password1 == ''){
                    messageBox(messageInfo);
                    return false;
                }
                let registerInfo = window.localStorage.getItem('registerInfo');
                if(registerInfo == null){
                    registerInfo = [];
                }else{
                    registerInfo = JSON.parse(registerInfo);
                    // console.log(registerInfo);
                }

                let register = {
                    userName: this.userName,
                    password: this.password,
                    password1: this.password1
                }

                registerInfo[registerInfo.length] = register;
                window.localStorage.setItem('registerInfo',JSON.stringify(registerInfo));

                messageInfo.title = "注册成功";
                messageInfo.content = "注册成功";
                messageInfo.handleOk = function(){
                    window.Vue.$router.push('LoginYao');
                    location.reload();
                };
                messageBox(messageInfo);
            },
            loginView(){
                this.$router.push("LoginYao");
                location.reload();
            }
        }
    }
</script>

<style scoped>
    #content .login_body{  width:100%;}
    .login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
    .login_body .login_btn{ height:50px; margin:10px;}
    .login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
    .login_body .login_link{ display: flex; justify-content:space-between;}
    .login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>