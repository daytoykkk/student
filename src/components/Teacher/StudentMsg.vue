<template>
  <div>
    <el-table
      ref="studentMsg"
      :data="stuData"
      highlight-current-row
      style="width: 90%"
      empty-text="暂无数据"
    >
      <el-table-column type="index" width="60" label="序号" style="text-align:center"></el-table-column>
      <el-table-column property="name" label="姓名" width="180"></el-table-column>
      <el-table-column property="number" label="学号" width="180"></el-table-column>
      <el-table-column property="email" label="邮箱" width="200"></el-table-column>
      <el-table-column property="slogan" label="个性签名" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            stuData:[]
        }
    },
    mounted(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        let that=this;
        let form=new FormData();
        form.append("KC",localStorage.getItem("courseId"));
        this.$axios.post("/consumer/getST/",form,{
           headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res=>{
         let data=new Object();
         data=res.data.AllS;
         let len=data.length;
         for(let i=0;i<len;i++){
           let stu={
             name:data[i].studentName,
             number:data[i].studentId,
             email:data[i].studentEmail,
             slogan:data[i].studentSign
           }
            that.stuData.push(stu)
         }
        }).catch(error=>{
          console.log(error)
        })
      }
    }
}
</script>