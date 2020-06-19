<template>
  <div class="main">
    <!--课程图片-->
    <div class="block">
      <el-image :src="src">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>

    <div class="title">
      <p style="font-size:1.5em;">{{name}}</p>
      <p><i class="el-icon-s-custom"></i> 教师：{{teachername}}</p>
    </div>

  <div class="class-box">
    <img src="../assets/group.png" style="cursor: pointer;width:2em;height:2em;margin-top:5em;">
    <p>进入群聊</p>
  </div>

  </div>
</template>

<style scoped>
.main {
  height: 14em;
  background: url("../assets/bg1.png") no-repeat;
  background-size: 100% 14em;
  display: flex;
}
.el-image{
  width: 13em;
  height:auto;
  border-radius: 6%;
  margin-top: 2em;
}
.block{
  margin-left: 10%;
}
.title{
  color:hsla(0, 0%, 100%, 0.863);
  margin-left: 4%;
  margin-top: 2em;
}
.class-box{
  display: flex;
  justify-content: center;
  height: 10em;
  float: right;
  margin-left: 45%;
  margin-top: 3em;
}
.class-box p{
  font-size: 1.1em;
  color:hsla(0, 0%, 100%, 0.863);
  margin-left: 0.5em;
  margin-top: 5em;
  cursor: pointer;
}
</style>

<script>
import Msg from "./Msg.js";
export default {
  inject: ["reload"],
  data() {
    return {
      src: require("../assets/1.jpg"),
      name:"",
      teachername:""
    };
  },
  mounted(){
  },
  methods:{
    getMsg(){
    }
  }
};
</script>