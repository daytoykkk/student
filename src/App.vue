<template>
  <div id="app" style="width:100%;">
    <router-view />
    <Main></Main>

    <Menu></Menu>
    <Schedule v-if="kk==1"></Schedule>
    <Course v-if="kk==2"></Course>
    <Homework v-if="kk==3"></Homework>
    <SelfMsg v-if="kk==4"></SelfMsg>
    
  </div>
</template>

<script>
import Msg from './components/Msg'
import Main from './views/Main'
import Menu from './components/Menu'
import Course from './components/Course'
import Schedule from './components/Schedule'
import SelfMsg from './components/SelfMsg'
import Homework from './components/Homework'

export default {
  data(){
    return {
      kk:1
    }
  },
  components: {
   Main,
   Menu,
   Course,
   Schedule,
   SelfMsg,
   Homework
  },
  methods:{
    getKK(){
      let _this=this;
      Msg.$on("val",function(m){
        _this.kk=m;
      });
    }
  },
   created(){
    this.getKK()
  }
};
</script>

<style scoped>

</style>
