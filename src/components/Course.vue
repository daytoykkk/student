<template>
  <div class="course">
    <div v-for="(course,index) in courses" :key="index" @click="toCoursemsg(course.coursename)">
      <img :src="course.url">
      <p>{{course.coursename}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: []
    };
  },
  mounted(){
      this.getMsg();
  },
  methods:{
    toCoursemsg(name){
      localStorage.setItem("HomeWorkK",name);
      this.$router.push({path:'/coursemsg'});
    },
    getMsg(){
      let that=this;
      this.$axios("/consumer/getStudentK/")
      .then(res=>{
        console.log(res.data);
        let data=new Object();
        data=res.data.AllKe2;
        let len=data.length;
        for(let i=0;i<len;i++){
          let course={
            coursename:data[i].kN,
            url:"http://111.230.173.74:7001/consumer/showEInvoiceP"+"?Name="+data[i].kN+".jpg"
          }
        that.courses.push(course);
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }
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
  width: 12em;
  height: auto;
  cursor: pointer;
}
p{
  cursor: pointer;
}
</style>