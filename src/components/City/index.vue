<template>
    <Loading v-if="loading"></Loading>
    <div v-else class="city_body">
        <div class="city_list">
            <Scroller ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)" >{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)" >{{ itemList.nm }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>

        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)" >{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "city",
        data(){
          return {
              cityList: [],
              hotList: [],
              loading: true
          }
        },
        mounted() {
            let cityList = window.localStorage.getItem('cityList');
            let hotList = window.localStorage.getItem('hotList');

            if(cityList && hotList){
                this.cityList = JSON.parse(cityList);
                this.hotList = JSON.parse(hotList);
                this.loading = false;
            }else{
                this.axios.get('/api/cityList').then((res)=>{
                    let msg = res.data.msg;
                    if(msg === 'ok'){
                        let cities =  res.data.data.cities;
                        // [{ index: 'A', list: [{ nm : '阿城',id: 123}] }]
                        let {cityList,hotList} = this.formatCityList(cities);
                        this.cityList = cityList;
                        this.hotList = hotList;
                        this.loading = false;

                        window.localStorage.setItem('cityList',JSON.stringify(cityList));
                        window.localStorage.setItem('hotList',JSON.stringify(hotList));
                        // console.log(cityList);
                    }
                });
            }
        },
        methods: {
            formatCityList(cities){
                let cityList = [];
                let hotList = [];

                for(let i=0;i<cities.length;++i){
                    let firstLetter = cities[i]['py'].substring(0,1).toUpperCase();
                    let data = {
                        nm: cities[i]['nm'],
                        id: cities[i]['id']
                    };
                    // 在eslint-loader中不允许使用hasOwnProperty方法 cityList.hasOwnProperty(firstLetter)
                    // 使用cityList[firstLetter] === undefined 报错
                    // if(cityList[firstLetter] === undefined){
                    //     cityList[firstLetter]['list'].push(data);
                    // }else{
                    //     cityList[firstLetter] = {
                    //         index: firstLetter,
                    //         list: [data]
                    //     }
                    // }

                    let key = this.isPresenceKey(cityList,firstLetter);
                    if(key !== false){
                        cityList[key]['list'].push(data);
                    }else{
                        let obj = {
                            index: firstLetter,
                            list: [data]
                        }
                        cityList.push(obj);
                    }

                    if(cities[i]['isHot'] == 1){
                        hotList.push(cities[i]);
                    }
                }

                cityList.sort(( n1,n2 ) => {
                    if( n1.index > n2.index){
                        return 1;
                    }else{
                        return -1;
                    }
                });

                return {
                    cityList,
                    hotList
                };
            },
            isPresenceKey(cityList,firstLetter){
                for(let key in cityList){
                    if(cityList[key]['index'] === firstLetter){
                        return key;
                    }
                }
                return false;
            },

            handleToIndex(index){
                let h2 = this.$refs.city_sort.getElementsByTagName('h2');
                //  scrollTop到达指定位置
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
                this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
            },

            handleToCity(nm,id){
                this.$store.commit('city/CITY_INFO',{ nm ,id });
                window.localStorage.setItem("cityName",nm);
                window.localStorage.setItem("cityId",id);
                this.$router.push("/movie/nowPlaying");
            }
        }
    }
</script>

<style scoped>
    .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>