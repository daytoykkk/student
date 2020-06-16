<template>
    <div>
        <div class="allClass">
        <div v-for="(course,index) in courses" :key="index" @click="toCoursemsg()">
      <img :src="course.url">
      <p>{{course.coursename}}</p>
    </div>
     <el-button plain style="margin-top:20px;margin-left:38%;cursor:pointer;" @click="getMsg()">查看作业</el-button>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
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
    },
     getMsg() {
      /* let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      
    let form=new FormData();
    form.append("PK","高等数学")*/

      this.$axios
        .get("/consumer/FindK/")
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
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