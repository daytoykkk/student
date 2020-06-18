<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix main-title">
        <div class="hk-title">
          <span>{{title}}</span>
          <span style="font-size:1em;color:#c9c9cb"> {{coursename}}</span>
          <p class="p-ddl">
            <i class="el-icon-time"></i>
            截止时间: {{ddl}}
          </p>
        </div>
        <el-button type="primary" icon="el-icon-edit">上传答案</el-button>
      </div>
      <div class="text item">{{hkdata}}</div>
    </el-card>

    <p style="font-size:1.4em;margin-left:10%;margin-top:3em;">作业提交情况</p>
    <el-table :data="tableData" style="width: 80%;margin-left:10%;" empty-text="暂无提交学生">
      <el-table-column prop="number" label="学号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="homework" label="作业"></el-table-column>
      <el-table-column prop="time" label="提交时间" width="180"></el-table-column>
      <el-table-column prop="score" label="评分">
        <template slot-scope="scope">
          <el-input
            size="small"
            v-model="scope.row.score"
            @blur="handleEdit(scope.$index, scope.row.score)"
            style="width:8em;"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
      prop="isP"
      label="批改情况"
      width="100"
      :filters="[{ text: '未批改', value: '未批改' },{ text: '已批改', value: '已批改' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.isP === '未批改' ? 'danger' : 'success'"
          disable-transitions>{{scope.row.isP}}</el-tag>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:"",
      hkdata:"",
      ddl: "",
      coursename:"",
      tableData: []
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg(){
        let that=this;
        let hkname=localStorage.getItem("HomeWorkName");
        let coursename=localStorage.getItem("HomeWorkK");
       let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
       let form=new FormData();
       form.append("PK",coursename);
       form.append("PL",hkname);

       //作业信息
         this.$axios
        .post("/consumer/FindHomeWorkOne/", form, config)
        .then(res=>{
           let data = new Object();
           data=res.data.H;
           that.coursename=data[0].pK;
           that.title=data[0].pL;
            let oldDate = new Date(data[0].pTime);
            that.ddl=
              oldDate.getFullYear() +
              "-" +
              (oldDate.getMonth() + 1) +
              "-" +
              oldDate.getDate();
              that.hkdata=data[0].pneiron;
          })
        .catch(error=>{
          console.log(error)
        })

        //提交情况
        let form1=new FormData();
        form1.append("HomeWorkName",hkname);
        form1.append("HomeWorkK",coursename);
        this.$axios.post("/consumer/getHome/",form1,config)
        .then(res=>{
          console.log(res.data)
          let data=new Object();
          data=res.data.HomeWork;
          let len=data.length;
            for (let i = 0; i < len; i++) {
            let oldDate = new Date(data[i].homeWorkTime);
            let newDate =
              oldDate.getFullYear() +
              "-" +
              (oldDate.getMonth() + 1) +
              "-" +
              oldDate.getDate();
            let hk = {
              number: data[i].homeWorkS,
              time: newDate,
              name: data[i].homeWorkT,
              homework: "",
              score: "",
              isP:data[i].homeWorkP
            };
            that.tableData.push(hk);
          }
        })
        .catch(error=>{
          console.log(error);
        })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
     filterTag(value, row) {
        return row.tag === value;
      }
  }
};
</script>

<style scoped>
.text {
  font-size: 1em;
}

.item {
  margin-bottom: 2em;
}
.main-title {
  display: flex;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 80%;
  margin-left: 10%;
  margin-top: 2em;
}
.box-card span {
  font-size: 1.5em;
}
.p-ddl {
  font-size: 0.9em;
  color: #777993;
}
.el-button {
  height: 3.5em;
  margin-left: 75%;
  margin-top: 1em;
}
</style>

