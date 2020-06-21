<template>
    <div>
        <div class="allClass">
        <div v-for="(course,index) in courses" :key="index" @click="toCoursemsg(index)">
      <img :src="course.url" >
      <p>{{course.coursename}}</p>
    </div>
    
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
    toCoursemsg(index){
      localStorage.setItem("courseId",this.courses[index].courseId);
      localStorage.setItem("HomeWorkK",this.courses[index].coursename);
      localStorage.setItem("courseUrl",this.courses[index].url);
      this.$router.push({path:'/teachercourse'});
    },
     getMsg() {
       let that=this;
      this.$axios
        .get("/consumer/FindK/")
        .then(res => {
          console.log(res.data);
          let data=new Object();
           data=res.data.K;
          let len=data.length;
          for(let i=0;i<len;i++){
            let course ={
              coursename:data[i].kN,
              url:"http://111.230.173.74:7001/consumer/showEInvoiceP"+"?Name="+data[i].kN+".jpg",
              courseId:data[i].kC
            }
            that.courses.push(course);
          }
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
  width: 12em;
  height: auto;
  cursor: pointer;
}
p{
  cursor: pointer;
}
</style>