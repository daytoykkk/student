<template>
  <div>
    <Topmenu></Topmenu>
    <CourseTop></CourseTop>

    <div class="show-box" style="display:flex">
      <!--左边部分-->
      <div class="left-box">
        <el-card class="card" shadow="always">
          <center>
            <img src="../assets/tx.jpg" style="width:5em;height:5em;border-radius:50%;" />
          </center>
          <center><p>老师的个人简介</p></center>
        </el-card>
      </div>
      <!--右边部分-->
      <div class="right-box">
        <div class="menu">
          <el-menu default-active="/res" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/res">课程资源</el-menu-item>
            <el-menu-item index="/test">作业考试</el-menu-item>
            <el-menu-item index="/video">直播间</el-menu-item>
            <el-menu-item index="/qanda">问答区</el-menu-item>
          </el-menu>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topmenu from "./Topmenu";
import CourseTop from "./CourseTop";

export default {
  components: {
    Topmenu,
    CourseTop
  },
  methods: {
    toVideo() {
      this.$router.push({ path: "/video" });
    }
  }
};
</script>

<style scoped>
.card {
  width: 97%;
  height: 15em;
  margin-left: 3%;
  margin-top: 2em;
}
.left-box {
  width: 21%;
}
.right-box {
  width: 75%;
  margin-left: 2%;
  margin-top: 2em;
}
</style>