<template>
    <Loading v-if="loading"></Loading>
    <div v-else class="movie_body" ref="movie_body">
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li v-for="item in movieList" :key="item.id">
                    <!--                setWH过滤方法在 main.js里面-->
                    <div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)" >{{ item.nm }} <img  v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                        <p>主演: {{ item.star }}</p>
                        <p>{{ item.showInfo }}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
                <li class="pullDown"><div>{{ pullDownMsg }}</div></li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
    // 正在热映组件
    export default {
        name: "nowPlaying",
        data(){
            return {
                movieList: [],
                pullDownMsg: '往上拉获取更多内容.....',
                loading: true,
                prevCityId: -1
            }
        },
        activated() {
            let cityId = this.$store.state.city.id;
            if( this.prevCityId === cityId){
                return ;
            }
            this.loading = true;
            this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
                let msg = res.data.msg;
                if( msg === 'ok'){
                    this.movieList = res.data.data.movieList;
                    this.loading = false;
                    this.prevCityId = cityId;
                }
            });
        },
        methods : {
            handleToDetail(movieId) {
                // console.log(movieId);
                this.$router.push('/movie/detail/1/' + movieId);
            },
            handleToScroll(pos) {
                // pos坐标
                let movieBodyHeight = 0 - this.$refs.movie_body.offsetHeight;
                if (pos.y > movieBodyHeight - 60) {
                    this.pullDownMsg = '往上拉获取更多内容.....';
                }
            },
            handleToTouchEnd(pos) {
                let movieBodyHeight = 0 - this.$refs.movie_body.offsetHeight;
                if (pos.y > movieBodyHeight - 60) {
                    // this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                    //     var msg = res.data.msg;
                    //     if (msg === 'ok') {
                    //         this.pullDownMsg = '更新成功';
                    //         setTimeout(() => {
                    //             this.movieList = res.data.data.movieList;
                    //             this.pullDownMsg = '';
                    //         }, 1000);
                    //
                    //     }
                    // });
                    this.pullDownMsg = "已经没有更多数据了...."
                }
            }
        }
    }
</script>

<style scoped>
    .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .pullDown div{ width:100%;text-align: center;color:#999999}
</style>