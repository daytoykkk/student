<template>
  <div class="course">
    <div v-for="(course,index) in courses" :key="index">
      <img :src="course.url">
      <p>{{course.coursename}}</p>
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
          url: require("../assets/1.jpg")
        },
        {
          coursename: "大学物理",
           url: require("../assets/1.jpg")
        },
        {
          coursename: "军事理论",
           url: require("../assets/1.jpg")
        },
        {
          coursename: "大学英语",
           url: require("../assets/1.jpg")
        },
        {
          coursename: "数字电路与逻辑设计",
           url: require("../assets/1.jpg")
        },
        {
          coursename: "高级语言程序设计",
           url: require("../assets/1.jpg")
        },
        {
          coursename: "中国近现代史纲要",
           url: require("../assets/1.jpg")
        }
      ]
    };
  }
};
</script>

<style scoped>
.course {
  display: flex;
  flex-wrap: wrap;
}
.course div {
  width: 15em;
  margin-left: 3em;
  text-align: center;
}
.course div img {
  width: 15em;
  height: auto;
}
</style>