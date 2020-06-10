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
      <el-table-column property="name" label="姓名" width="120"></el-table-column>
      <el-table-column property="number" label="学号" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱" width="120"></el-table-column>
      <el-table-column property="slogan" label="个性签名" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            stuData:[{
                name:'刘雨昕',
                number:'2020053001',
                email:'156564561561',
                slogan:'C位出道'
            },{
                name:'虞书欣',
                number:'2020053002',
                email:'464561564894',
                slogan:'别爱我我作得很'
            },{
                name:'安崎',
                number:'2020053006',
                email:'456456451564',
                slogan:'放饭了吗'
            },{
                name:'谢可寅',
                number:'2020053005',
                email:'156156484561',
                slogan:'堂堂正正风风火火'
            },{
                name:'赵小棠',
                number:'2020053007',
                email:'515615315656',
                slogan:'真好看'
            }]
        }
    }
}
</script>