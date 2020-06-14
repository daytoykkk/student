<template>
  <div>
    <el-table :data="homework" style="width: 100%" height="310">
        <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="500" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column sortable prop="ddl" label="截止日期" width="180"></el-table-column>
      <el-table-column sortable prop="finishNumber" label="提交人数" width="120"></el-table-column>
    <el-table-column label="操作">
        <el-button size="mini" @click="toHomeWork()">查看详情</el-button>
    </el-table-column>
    </el-table>
    <el-button type="warning" plain style="margin-top:20px;margin-left:38%;cursor:pointer;" @click="posthk()">发布作业</el-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            homework:[{
                title:'7.1',
                ddl:'2020-05-26',
                finishNumber:'23'
            },{
                title:'7.2',
                ddl:'2020-05-28',
                finishNumber:'45'
            },{
                title:'7.3',
                ddl:'2020-05-30',
                finishNumber:'23'
            },{
                title:'7.5',
                ddl:'2020-06-05',
                finishNumber:'10'
            },{
                title:'6.2',
                ddl:'2020-04-30',
                finishNumber:'30'
            },{
                title:'7.9',
                ddl:'2020-04-23',
                finishNumber:'51'
            },{
                title:'5.3',
                ddl:'2020-05-13',
                finishNumber:'45'
            }]
        }
    },
    methods:{
        posthk(){
           this.$router.push({path:"/newhomework"})
        },
        toHomeWork(){
            this.$router.push({path:"/teacherhkmsg"})
        }
    }
}
</script>