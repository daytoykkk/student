<template>
  <div>
    <div class="main">
      <!--课程图片-->
      <div class="block">
        <el-image :src="coursesrc">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>

      <div class="title">
        <p style="font-size:1.5em;">{{coursename}}</p>
        <p>
          <i class="el-icon-s-custom"></i>
          教师：{{teachername}}
        </p>
      </div>

      <div class="class-box" @click="toChat()">
        <img src="../assets/group.png" style="cursor: pointer;width:2em;height:2em;margin-top:5em;" />
        <p>进入群聊</p>
      </div>
    </div>

    <div class="show-box" style="display:flex">
      <!--左边部分-->
      <div class="left-box">
        <el-card class="card" shadow="always">
          <center>
            <img :src="teacherPicUrl" style="width:5em;height:5em;border-radius:50%;" />
          </center>
          <center>
            <p>教师姓名：{{teachername}}</p>
          </center>
        </el-card>
         <img
        src="../assets/back.png"
        @click="tohk()"
        style="float:left;margin-top:1em;margin-left:10%;width:2em;padding-right:5px;cursor:pointer;"
        title="返回作业列表"
      />
      </div>
      <!--右边部分-->
      <div class="right-box">
        <div class="menu">
          <el-menu default-active="/test" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/res">课程资源</el-menu-item>
            <el-menu-item index="/test">作业考试</el-menu-item>
            <el-menu-item index="/video">群聊</el-menu-item>
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
export default {
  data() {
    return {
      coursename: "",
      teachername: "",
      teacherpic:"",
      teacherPicUrl:"",
      coursesrc: "",
      homeworks: []
    };
  },
  mounted() {
    this.getCourseMsg();
  },
  methods: {
    getCourseMsg() {
      let that = this;
      let coursename = localStorage.getItem("HomeWorkK");
      that.coursename = coursename;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      let form = new FormData();
      form.append("Ke", coursename);
      this.$axios
        .post("/consumer/getStudentKOne/", form, config)
        .then(res => {
          console.log(res.data);
          let data = new Object();

          data = res.data.Teacher2;
          that.teachername = data.teacherName;
          that.teacherpic=data.teacherFace;

          data=res.data.Ke2;
          that.coursesrc="http://111.230.173.74:7001/consumer/showEInvoiceP"+"?Name="+data.kN+".jpg";

          data = res.data.AllHomeWork2;
          let len = data.length;
          for (let i = 0; i < len; i++) {
            let oldDate = new Date(data[i].pTime);
            let hk = {
              name: data[i].pL,
              ddl:
                oldDate.getFullYear() +
                "-" +
                (oldDate.getMonth() + 1) +
                "-" +
                oldDate.getDate(),
                tag:data[i].pT=="1"?"未批改":"已批改",
                score:data[i].pT,
                more:"",
                comment:data[i].pneiron,
                teachername:data[i].teacherName
            };
            that.homeworks.push(hk);
          }
          localStorage.setItem("AllHk",JSON.stringify(that.homeworks))

            let form1=new FormData();
        form1.append("Name",that.teacherpic);
        this.$axios("/consumer/showEInvoiceP/",form1,config)
        .then(res=>{
          if(res.data=="OK"){
            that.teacherPicUrl="http://111.230.173.74:7001/consumer/showEInvoiceP"+"?Name="+that.teacherpic;
          }
        })
        .catch(error=>{
          console.log(error)
        })

        })
        .catch(error => {
          console.log(error);
        });

      
    },
    toChat(){
      this.$router.push({ path: "/video" });
    },
    tohk(){
      this.$router.push({ path: "/course" });
    }
  }
};
</script>

<style scoped>
.main {
  height: 14em;
  background: url("../assets/bg1.png") no-repeat;
  background-size: 100% 14em;
  display: flex;
}
.el-image {
  width: 10em;
  height: auto;
  border-radius: 6%;
  margin-top: 2em;
}
.block {
  margin-left: 10%;
}
.title {
  color: hsla(0, 0%, 100%, 0.863);
  margin-left: 4%;
  margin-top: 2em;
}
.class-box {
  display: flex;
  justify-content: center;
  height: 10em;
  float: right;
  margin-left: 45%;
  margin-top: 3em;
}
.class-box p {
  font-size: 1.1em;
  color: hsla(0, 0%, 100%, 0.863);
  margin-left: 0.5em;
  margin-top: 5em;
  cursor: pointer;
}
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