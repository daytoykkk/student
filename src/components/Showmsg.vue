<template>
  <div class="about" style="width:100%;">
    <!--个人信息展示-->
    <div class="main">
      <div class="tx">
        <img :src="txurl" />
      </div>
      <div class="msg">
        <h1>{{username}}</h1>
        <p>
           <i class="el-icon-edit"></i>
          {{slogan}}
        </p>
      </div>
      <div class="self_msg">
        <div class="follow">
          <span>关注</span>
          <p>{{follows}}</p>
        </div>
        <div class="fans">
          <span>粉丝</span>
          <p>{{fans}}</p>
        </div>
        <div class="self_class">
          <span>所在班级</span>
          <p>{{classid}}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Msg from './Msg.js' ;
export default {
  inject: ["reload"],
  data() {
    return {
      username: "",
      slogan: "个人签名",
      fans: 0,
      follows: 0,
      classid:"XX专业_X班",
      txurl:"http://111.230.173.74:7001/consumer/showEInvoice/"
    };
  },
  mounted(){
      this.getMsg();
  },
  watch:{ 
    username(val){
      let that=this;
     Msg.$on("name",function(name){
        that.username=name
     })
    },
    slogan(val){
       let that=this;
     Msg.$on("slogan",function(slogan){
        that.slogan=slogan
     })
    }
  },
  methods:{
    getMsg(){
      //this.txurl=localStorage.getItem("txurl");
       this.$axios
          .get("/consumer/getStudent/")
          .then(res => {
            let data = res.data;
            this.username = data.StudentName;
            this.slogan = data.StudentSign;
            localStorage.setItem("id",data.StudentId)
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>

<style scoped>
.main {
  height: 9.5em;
  background: url("../assets/bg.png") no-repeat;
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
.self_msg {
  width: 25em;
  height: 7em;
  margin-top: 2em;
  margin-left: 25%;
  display: flex;
  color: hsla(0, 0%, 100%, 0.863);
}
.self_msg div{
  margin-left: 3em;
}
.self_msg span{
  font-size: 1.5em;
  cursor: pointer;
}
.self_msg p{
  font-size: 1.2em;
  text-align: center;
}
</style>

