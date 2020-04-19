<template>
  <div class="class-table">
    <div class="table-wrapper">
      <div class="tabel-container">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th
                v-for="(weekNum, weekIndex) in classTableData.courses.length"
                :key="weekIndex+1"
              >{{'周' + digital2Chinese(weekIndex+1, 'week')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
              <td>
                <p>{{'第' + digital2Chinese(lessonIndex+1) + "节"}}</p>
                <p class="period">{{ lesson }}</p>
              </td>

              <td
                v-for="(course, courseIndex) in classTableData.courses"
                :key="courseIndex"
              >{{classTableData.courses[courseIndex][lessonIndex] || '-'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classTableData: {
        lessons: [
          "08:00-09:00",
          "09:00-10:00",
          "10:00-11:00",
          "11:00-12:00",
          "13:00-14:00",
          "14:00-15:00",
          "15:00-16:00",
          "16:00-17:00",
          "19:00-19:45",
          "19:55-20:35",
          "20:45-21:30"
        ],
        courses: [
          ["高数", "高数", "数逻", "数逻", "军事理论", "军事理论", "中国近代史纲要", "中国近代史纲要"],
          ["面向对象程序设计", "面向对象程序设计", "大学物理", "大学物理", "面向对象程序设计", "面向对象程序设计", "", ""],
          ["", "", "高数", "高数", "中国近现代史纲要", "中国近现代史纲要", "体育", "体育"],
          ["", "", "大学英语", "大学英语", "", "", "", "","英语谈话节目赏析"],
          ["", "", "高数", "高数", "大物实验", "大物实验", "大物实验", "大物实验"],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""]
        ]
      }
    };
  },
  methods: {
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    }
  }
};
</script>

<style scoped>
.class-table{
    width: 80%;
    margin-left: 3em;
    margin-top: -2em;
}
.table-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.tabel-container {
  margin: 0.8em;
}
.tabel-container table {
  table-layout: fixed;
  width: 100%;
}

.tabel-container thead {
  background-color: #67a1ff;
  height: 2em;
}
.tabel-container th {
  color: #fff;
  line-height: 3em;
  font-weight: normal;
}
.tabel-container tbody {
  background-color: #eaf2ff;
}
.tabel-container td {
  color: #677998;
  line-height: 1em;
}

td {
  width: 3em;
  padding: 12px 2px;
  font-size: 1em;
  text-align: center;
}

.tabel-container tr td:first-child {
  color: #333;
}
</style>