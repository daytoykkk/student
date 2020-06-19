<template>
    <div>
        <CourseTop></CourseTop>
        <el-container>
        <!--左侧菜单-->
        <el-aside>
        <el-menu default-active="/teacherhk" class="el-menu-vertical-demo" router>
          <el-menu-item index="/studentmsg">
            <i class="el-icon-date"></i>
            <span slot="title">学生信息</span>
          </el-menu-item>
          <el-menu-item index="/teacherhk">
            <i class="el-icon-document"></i>
            <span slot="title">作业列表</span>
          </el-menu-item>
          <el-menu-item index="/groupchat">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">群聊</span>
          </el-menu-item>
          <el-menu-item index="/courseware">
            <i class="el-icon-setting"></i>
            <span slot="title">课程资料</span>
          </el-menu-item>
          <el-menu-item index="/allcourse">
            <i class="el-icon-setting"></i>
            <span slot="title">返回</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

       <el-main>
        <router-view></router-view>
      </el-main>

      </el-container>
    </div>
</template>

<script>
import CourseTop from "../CourseTop";
export default {
    components:{
        CourseTop
    }
}
</script>

<style scoped>
.el-aside {
  height: 25em;
  width: 15em;
}

.el-menu-vertical-demo {
margin-left: 3em;
margin-top: 3em;
width: 12em;
}
</style>