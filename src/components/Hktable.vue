 <template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="作业名称" width="180"></el-table-column>
    <el-table-column prop="teacherName" label="指导老师" width="180"></el-table-column>
    <el-table-column prop="ddl" label="截止时间" width="180" sortable></el-table-column>
    <el-table-column
      prop="tag"
      label="提交状态"
      width="180"
      :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '已提交' ? 'primary' : 'success'"
          disable-transitions
        >{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="score" label="作业评分"></el-table-column>
    <el-table-column prop="more" label="查看详情">
      <template slot-scope="scope">
        <el-button @click="toHkmsg(scope.row.tag)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>

export default {
  data() {
    return {
      tableData: [
      ]
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    toHkmsg(m){
        localStorage.setItem("isSubmit",m);
        this.$router.push({path:'/hkmsg'});
    }
  }
};
</script>