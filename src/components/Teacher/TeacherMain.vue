<template>
    <div>
       <div class="main">
      <div class="tx">
        <img :src="tx_url" />
      </div>
      <div class="msg">
        <h1>{{username}}</h1>
        <p>
          {{slogan}}
          <i style="cursor:pointer;" class="el-icon-edit"></i>
        </p>
      </div>
    </div>

    <div class="allClass">
        <div v-for="(course,index) in courses" :key="index" @click="toCoursemsg()">
      <img :src="course.url">
      <p>{{course.coursename}}</p>
    </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tx_url: require("../../assets/tx.jpg"),
      username: "平平无奇的老师",
      slogan: "个人签名",
      courses: [
        {
          coursename: "高等数学",
          url: require("../../assets/1.jpg")
        },
        {
          coursename: "大学物理",
           url: require("../../assets/1.jpg")
        },
        {
          coursename: "军事理论",
           url: require("../../assets/1.jpg")
        },
        {
          coursename: "大学英语",
           url: require("../../assets/1.jpg")
        },
        {
          coursename: "数字电路与逻辑设计",
           url: require("../../assets/1.jpg")
        },
        {
          coursename: "高级语言程序设计",
           url: require("../../assets/1.jpg")
        },
        {
          coursename: "中国近现代史纲要",
           url: require("../../assets/1.jpg")
        }
      ]
    };
  },
   methods:{
    toCoursemsg(){
      this.$router.push({path:'/teachercourse'});
    }
  }
};
</script>

<style scoped>
.main {
  height: 9.5em;
  background: url("../../assets/bg.png") no-repeat;
  background-size: 100% 8em;
  display: flex;
}
.tx {
  width: 7em;
  height: 7em;
  border: 3px solid #838cb4c9;
  border-radius: 50%;
  margin-left: 8.5em;
  margin-top: 2em;
}
.tx img {
  width: 7em;
  height: 7em;
  border-radius: 50%;
}
.msg {
  width: 20em;
  height: 8em;
  margin-top: 1em;
  margin-left: 3em;
  color: hsla(0, 0%, 100%, 0.863);
}
.allClass{
    display: flex;
    flex-wrap: wrap;
}
.allClass div {
  width: 15em;
  margin-left: 3em;
  text-align: center;
}
.allClass div img {
  width: 15em;
  height: auto;
  cursor: pointer;
}
p{
  cursor: pointer;
}
</style>