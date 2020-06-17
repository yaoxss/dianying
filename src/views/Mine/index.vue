<template>
    <div>
        <Header :title="this.title" ></Header>
        <LoginYao v-show="this.switch === 'LoginYao'"></LoginYao>
        <Register v-show="this.switch === 'Register'" ></Register>
        <UserInfo v-show="this.switch === 'UserInfo'" ></UserInfo>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import TabBar from '@/components/TabBar';
    import LoginYao from '@/components/Login';
    import Register from '@/components/Register';
    import UserInfo from '@/components/UserInfo';
    export default {
        name: "Mine",
        data(){
            return {
                switch: 'Register',
                title: '注册'
            }
        },
        components: {
            Header,
            TabBar,
            LoginYao,
            Register,
            UserInfo
        },
        created(){
          this.switchFunction();
        },
        methods: {
            switchFunction(){
                if(window.localStorage.getItem('isLogin') == 'ok'){
                    this.switch = 'UserInfo';
                    this.title = '个人信息';
                    return true;
                }
                let viewName = this.$route.params.viewname;
                if(viewName == 'LoginYao'){
                    this.switch = viewName;
                    this.title = '登陆';
                }else if(viewName == 'Register'){
                    this.switch = viewName;
                    this.title = '注册';
                }else if(viewName == 'UserInfo'){
                    this.switch = viewName;
                    this.title = '个人信息';
                }
            }
        }
    }
</script>

<style scoped>

</style>