<template>
    <div>
        <Header title="个人信息"></Header>
        <LoginYao></LoginYao>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import TabBar from '@/components/TabBar';
    import LoginYao from '@/components/Login';
    export default {
        name: "Mine",
        components: {
            Header,
            TabBar,
            LoginYao
        }
    }
</script>

<style scoped>

</style>