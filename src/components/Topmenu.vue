<template>
  <div class="home">
   <div id="daohang">
      <el-menu class="el-menu-demo" mode="horizontal" style="display:flex; align-items: center; ">
        <img src="../assets/home.png" style="margin-left:10%;width:3em;height:3em;" />
        <el-dropdown style="margin-left:2%;">
          <span class="el-dropdown-link">
            课程
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>课程1</el-dropdown-item>
            <el-dropdown-item>课程2</el-dropdown-item>
            <el-dropdown-item>课程3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <p>学校</p>

        <div class="search">
          <input type="text" placeholder="搜索感兴趣的课程" />
          <img src="../assets/search.png" alt />
        </div>
        <p @click="toHome()">个人中心</p>
        <el-dropdown style="margin-left:2%;">
          <span class="el-dropdown-link" style="display:flex;align-items:center;">
            <img class="dh_tx" src="../assets/tx.jpg" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息通知</el-dropdown-item>
            <el-dropdown-item @click.native="toSelf()">个人信息</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </div>
    
  </div>
</template>

<script>
export default {
  methods:{
    toHome(){
      this.$router.push({path:'/'});
    },
    toSelf(){
      this.$router.push({path:'/selfmsg'});
    }
  }
  
}
</script>

<style scoped>
#daohang p {
  font-size: 1.2em;
  margin-left: 2%;
  cursor: pointer;
}
.search {
  width: 20em;
  height: 2.5em;
  border: 1px solid cornflowerblue;
  border-radius: 50px;
  margin-left: 30%;
  display: flex;
  align-items: center;
}
.search img {
  width: 2em;
  height: 2em;
  cursor: pointer;
}
.search input {
  font-size: 1em;
  height: 2em;
  margin-left: 1.5em;
  width: 15em;
  border: none;
  line-height: 3.2em;
  color: #666666;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
  font-size: 1.4em;
}
.dh_tx {
  width: 2em;
  height: 2em;
  border-radius: 50%;
}
</style>