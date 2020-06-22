<template>
  <div>
    <div class="main">
      <div class="tx">
        <img :src="tx_url" />
      </div>
      <div class="msg">
        <h1>{{username}}</h1>
        <p style="cursor:pointer" title="点我修改信息" @click="toTacherMsg()">
          {{slogan}}
          <i style="cursor:pointer;" class="el-icon-edit"></i>
        </p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tx_url: "",
      username: "",
      slogan: "个人信息修改"
    };
  },
  methods: {
    toTacherMsg() {
      this.$router.push({ path: "/teachermsg" });
    }
  },
  created: function() {
    let isLogin = sessionStorage.getItem("isLogin");
    if (isLogin == "true") {
      this.$axios
        .get("/consumer/getTeacher")
        .then(res => {
          console.log(res.data)
          let data = res.data;
          this.tx_url = "http://111.230.173.74:7001/consumer/showEInvoiceT/";
          this.username = data.TeacherName;
          localStorage.setItem("id",data.TeacherId)
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      return;
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
</style>