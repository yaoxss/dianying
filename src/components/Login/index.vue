<template>
    <div id="content">
        <div class="login_body">
            <div>
                <input class="login_text" type="text" v-model="userName" placeHolder="账户名/手机号/Email" >
            </div>
            <div>
                <input class="login_text" type="password"  v-model="password" placeHolder="请输入您的密码" >
            </div>
            <div class="login_btn">
                <input type="submit" value="登录" @touchstart="login()">
            </div>
            <div class="login_link">
                <a href="#"></a>
                <a href="javascript:void(0)" @touchstart="register()">立即注册</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { messageBox } from '@/components/JS';
    export default {
        name: "login",
        data(){
            return {
                userName: '',
                password: ''
            }
        },
        methods: {
            register(){
                this.$router.push('Register');
                location.reload();
            },
            login(){
                let messageInfo = {
                    title: '提示',
                    content: '账号或者密码错误',
                    cancel: '',
                    ok: '确定',
                }

                let registerInfo = window.localStorage.getItem("registerInfo");
                registerInfo = JSON.parse(registerInfo);
                for(let i in registerInfo){
                    if(registerInfo[i]['userName'] == this.userName && registerInfo[i]['password'] == this.password){
                        window.localStorage.setItem("isLogin",'ok');
                        window.localStorage.setItem("loginUserName",registerInfo[i]['userName']);
                        messageInfo.content= "登陆成功";
                        messageInfo.handleOk = function(){
                            window.Vue.$router.push('UserInfo');
                            location.reload();
                        };
                        messageBox(messageInfo);
                        return true;
                    }
                }
                messageBox(messageInfo);
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