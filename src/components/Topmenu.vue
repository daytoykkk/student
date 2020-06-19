<template>
  <div class="home">
    <div id="daohang">
      <el-menu class="el-menu-demo" mode="horizontal" style="display:flex; align-items: center; ">
        <img src="../assets/home.png" style="margin-left:10%;width:3em;height:3em;" />
        <el-dropdown style="margin-left:2%;">
          <span class="el-dropdown-link">
            课程
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>课程1</el-dropdown-item>
            <el-dropdown-item>课程2</el-dropdown-item>
            <el-dropdown-item>课程3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <p>学校</p>

        <div class="search">
          <input type="text" placeholder="搜索感兴趣的课程" />
          <img src="../assets/search.png" alt />
        </div>
        <p @click="toHome()">个人中心</p>

        <!--个人信息-->
        <el-dropdown style="margin-left:2%;" v-if="isLogin">
          <span class="el-dropdown-link" style="display:flex;align-items:center;">
            <img class="dh_tx" :src="txurl" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息通知</el-dropdown-item>
            <el-dropdown-item @click.native="toSelf()">个人信息</el-dropdown-item>
            <el-dropdown-item divided @click.native="tuichu()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <p v-if="!isLogin" class="loginbtn" @click="dialogFormVisible = true">登陆 | 注册</p>

        <!--登陆弹窗-->
        <div class="loginWin">
          <el-dialog class="loginDialog" title="登陆/注册" :visible.sync="dialogFormVisible">
            <el-tabs v-model="activeName">
              <!--邮箱登录-->
              <el-tab-pane label="邮箱登陆" name="first">
                <div class="emailForm">
                  <el-form :model="form1" :rules="secondRules" ref="form1">
                    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                      <el-input v-model="form1.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                      <el-input v-model="form1.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
                      <el-input v-model="form1.code" autocomplete="off" style="width:100px;"></el-input>
                      <img
                        :src="codeurl"
                        @click="refreshCode()"
                        title="看不清点击刷新"
                        style="width:50px;height:auto;margin-left:10px;cursor:pointer;"
                      />
                    </el-form-item>
                    <el-form-item>
                      <center>
                        <el-button class="loginel" type="primary" @click="loginEmail()">登 陆</el-button>
                      </center>
                    </el-form-item>
                    <hr class="divide" />
                    <el-checkbox class="chbox" v-model="checked">七天内免密登陆</el-checkbox>
                    <span>|</span>
                    <span class="forgetpass">忘记密码</span>
                  </el-form>
                </div>
              </el-tab-pane>
              <!--学号登陆-->
              <el-tab-pane label="学号登陆" name="second">
                <div class="schoolForm">
                  <el-form :model="form2" :rules="secondRules" ref="form3">
                    <el-form-item label="学校" prop="school" :label-width="formLabelWidth">
                      <el-select v-model="form2.school" placeholder="请选择学校">
                        <el-option label="清华大学" value="清华大学"></el-option>
                        <el-option label="北京大学" value="北京大学"></el-option>
                        <el-option label="福州大学" value="福州大学"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="学号" prop="number" :label-width="formLabelWidth">
                      <el-input v-model="form2.number" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                      <el-input v-model="form2.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
                      <el-input v-model="form2.code" autocomplete="off" style="width:100px;"></el-input>
                      <img
                        :src="codeurl"
                        @click="refreshCode()"
                        title="看不清点击刷新"
                        style="width:50px;height:auto;margin-left:10px;cursor:pointer;"
                      />
                    </el-form-item>
                    <el-form-item>
                      <center>
                        <el-button class="loginel" type="primary" @click="loginNum()">登 陆</el-button>
                      </center>
                    </el-form-item>
                    <hr class="divide" />
                    <el-checkbox class="chbox" v-model="checked">七天内免密登陆</el-checkbox>
                    <span>|</span>
                    <span class="forgetpass">忘记密码</span>
                  </el-form>
                </div>
              </el-tab-pane>
              <!--注册-->
              <el-tab-pane label="注册" name="third">
                <div class="registerForm">
                  <el-form :model="form3" :rules="thirdRules" ref="form3">
                    <el-form-item label="学校" prop="school" :label-width="formLabelWidth">
                      <el-select v-model="form3.school" placeholder="请选择学校">
                        <el-option label="清华大学" value="清华大学"></el-option>
                        <el-option label="北京大学" value="北京大学"></el-option>
                        <el-option label="福州大学" value="福州大学"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="学号" prop="number" :label-width="formLabelWidth">
                      <el-input v-model="form3.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="name" :label-width="formLabelWidth">
                      <el-input v-model="form3.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                      <el-input v-model="form3.email" autocomplete="off"></el-input>
                      <br />
                      <el-button
                        v-if="!isSend"
                        type="warning"
                        plain
                        style="margin-top:5px;"
                        @click="sendEmail(form3.email)"
                      >邮箱验证</el-button>
                      <el-button
                        v-if="isSend"
                        type="warning"
                        plain
                        disabled
                        style="margin-top:5px;"
                      >{{count}}秒后重试</el-button>
                      <el-input v-model="form3.code" placeholder="请输入验证码" v-if="isYanzheng"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                      <el-input v-model="form3.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <center>
                        <el-button type="primary" @click="register('form3')">注册账号</el-button>
                      </center>
                    </el-form-item>
                  </el-form>
                </div>
              </el-tab-pane>
              <!--教职工登陆-->
              <el-tab-pane label="教职工登录" name="fourth">
                <div class="teacherForm">
                  <el-form :model="form4" :rules="secondRules" ref="form4">
                    <el-form-item label="教职工号" prop="number" :label-width="formLabelWidth">
                      <el-input v-model="form4.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                      <el-input v-model="form4.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
                      <el-input v-model="form4.code" autocomplete="off" style="width:100px;"></el-input>
                      <img
                        :src="codeurl"
                        @click="refreshCode()"
                        title="看不清点击刷新"
                        style="width:50px;height:auto;margin-left:10px;cursor:pointer;"
                      />
                    </el-form-item>
                    <el-form-item>
                      <center>
                        <el-button class="loginel" type="primary" @click="loginTeacher()">登 陆</el-button>
                      </center>
                    </el-form-item>
                    <hr class="divide" />
                    <el-checkbox class="chbox" v-model="checked">七天内免密登陆</el-checkbox>
                    <span>|</span>
                    <span class="forgetpass">忘记密码</span>
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    var reCount = 1;
    let isNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学号不能为空"));
      } else if (value.length != 9) {
        return callback(new Error("学号长度为9位数"));
      }

      let name = new FormData();
      name.append("LoginName", value);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios.post("/consumer/yStudent/", name, config).then(res => {
        let isValid = res.data;
        if (isValid == false) {
          return callback(new Error("该学号已注册"));
        } else {
          callback();
        }
      });
    };
    return {
      isYanzheng: false,
      isSend: false,
      count: 5,
      isLogin: false,
      checked: false,
      codeurl: "http://111.230.173.74:7001/consumer/CheckCodeServlet",
      txurl: "http://111.230.173.74:7001/consumer/showEInvoice/",
      activeName: "second",
      dialogFormVisible: false,
      form1: {
        email: "",
        password: "",
        code: ""
      },
      form2: {
        school: "",
        number: "",
        password: "",
        code: ""
      },
      form3: {
        school: "",
        number: "",
        name: "",
        email: "",
        password: "",
        code: ""
      },
      form4: {
        number: "",
        password: "",
        code: ""
      },
      formLabelWidth: "100px",
      thirdRules: {
        school: [{ required: true, trigger: "blur" }],
        number: [{ required: true, validator: isNumber, trigger: "blur" }],
        name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在2到15个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      secondRules: {
        number: [{ required: true, trigger: "blur" }],
        school: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message:
              "密码为数字，小写字母，大写字母，特殊符号 至少包含三种，至少8位"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    count(val) {
      if (val == 0) {
        this.isSend = false;
        this.count = 5;
        clearInterval(this.reCount);
      }
    }
  },
  mounted() {
    this.getLogin();
  },
  methods: {
    toHome() {
      //到个人首页
      this.$router.push({ path: "/" });
    },
    toSelf() {
      //到个人信息设置页
      if(localStorage.getItem("LoginJob")=="S"){
      this.$router.push({ path: "/selfmsg" })  
      }else if(localStorage.getItem("LoginJob")=="T"){
        this.$router.push({path:"/teachermsg"})
      }else{
        this.$message({
          type:'warning',
          message:'请先登录！'
        })
      }
    },
    getLogin() {
      //加载是否登陆状态
      if (localStorage.getItem("isLogin") == "true") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      console.log(this.isLogin);
    },
    tuichu() {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("LoginJob");
      localStorage.removeItem("txurl");
      this.txurl="";
      this.isLogin=false;
      this.$router.push({path:"/"})
      window.location.reload();
    },
    sendEmail(email) {
      //发送邮箱验证码
      let that = this;
      if (email == "") {
        this.$message({
          message: "邮箱不能为空",
          type: "error"
        });
        return false;
      }
      let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email != "" && !regEmail.test(email)) {
        this.$message({
          message: "邮箱格式不正确",
          type: "error"
        });
        return false;
      }

      this.isSend = true;
      this.isYanzheng = true;
      let _email = new FormData();
      _email.append("UserEmail", email);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios
        .post("/consumer/SendEmail/", _email, config)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.reCount = setInterval(function() {
        that.count--;
      }, 1000);
    },
    register(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          let form3 = new FormData();
          form3.append("School", that.form3.school);
          form3.append("StudentEmail", that.form3.email);
          form3.append("LoginName", that.form3.number);
          form3.append("LoginPassword", that.form3.password);
          form3.append("StudentName", that.form3.name);
          form3.append("Code", that.form3.code);
          let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          };

          this.$axios
            .post("/consumer/setStudent/", form3, config)
            .then(function(res) {
              that.$message({
                message: "注册成功！请登陆。",
                type: "success"
              });
              that.reload();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("错的");
        }
      });
    },
    refreshCode() {
      //登陆刷新验证码
      this.codeurl =
        "http://111.230.173.74:7001/consumer/CheckCodeServlet?time" +
        new Date().getTime();
    },
    loginNum() {
      //学号登陆
      let that = this;
      let form = new FormData();

      if (that.checked == true) {
        form.append("isAutoLogin", "yes");
      } else {
        form.append("isAutoLogin", "no");
      }

      form.append("LoginName", that.form2.number);
      form.append("LoginPassword", that.form2.password);
      form.append("Code", that.form2.code);
      form.append("E", "no");
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      this.$axios
        .post("/consumer/LoginStudent/", form, config)
        .then(res => {
          if (res.data == "OK") {
            that.$message({
              type: "success",
              message: "登陆成功"
            });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("LoginJob", "S");
            that.dialogFormVisible = false;
            this.$router.push({ path: "/home" });
            that.getLogin();
          } else {
            console.log(res);
            that.$message({
              type: "error",
              message: "登陆失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loginEmail() {
      //邮箱登录
      let that = this;
      let form = new FormData();

      if (that.checked == true) {
        form.append("isAutoLogin", "yes");
      } else {
        form.append("isAutoLogin", "no");
      }

      form.append("LoginName", that.form1.email);
      form.append("LoginPassword", that.form1.password);
      form.append("Code", that.form1.code);
      form.append("E", "yes");
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      this.$axios
        .post("/consumer/LoginStudent/", form, config)
        .then(res => {
          if (res.data == "OK") {
            that.$message({
              type: "success",
              message: "登陆成功"
            });
            that.isLogin = true;
            localStorage.setItem("isLogin", true);
            localStorage.setItem("LoginJob", "S");
            that.dialogFormVisible = false;
            this.$router.push({ path: "/home" });
            that.getLogin();
          } else {
            console.log(res);
            that.$message({
              type: "error",
              message: "登陆失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loginTeacher() {
      //教职工登录
      let that = this;
      let form = new FormData();

      if (that.checked == true) {
        form.append("isAutoLogin", "yes");
      } else {
        form.append("isAutoLogin", "no");
      }

      form.append("LoginName", that.form4.number);
      form.append("LoginPassword", that.form4.password);
      form.append("Code", that.form4.code);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      this.$axios
        .post("/consumer/LoginTeacher/", form, config)
        .then(res => {
          if (res.data == "OK") {
            that.$message({
              type: "success",
              message: "登陆成功"
            });
            that.isLogin = true;
            localStorage.setItem("isLogin", true);
              that.txurl="http://111.230.173.74:7001/consumer/showEInvoiceT/"
            localStorage.setItem("LoginJob", "T");
            that.dialogFormVisible = false;
            this.$router.push({ path: "/teacher" });
            that.getLogin();
          } else {
            console.log(res);
            that.$message({
              type: "error",
              message: "登陆失败"
            });
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
#daohang p {
  font-size: 1.2em;
  margin-left: 2%;
  cursor: pointer;
}
.search {
  width: 20em;
  height: 2.5em;
  border: 1px solid cornflowerblue;
  border-radius: 50px;
  margin-left: 30%;
  display: flex;
  align-items: center;
}
.search img {
  width: 2em;
  height: 2em;
  cursor: pointer;
}
.search input {
  font-size: 1em;
  height: 2em;
  margin-left: 1.5em;
  width: 15em;
  border: none;
  line-height: 3.2em;
  color: #666666;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
  font-size: 1.4em;
}
.dh_tx {
  width: 2em;
  height: 2em;
  border-radius: 50%;
}
.loginbtn {
  cursor: pointer;
}
.loginbtn:hover {
  color: #8fbcaf;
}
.divide {
  width: 100%;
  margin: 0 auto 0.5em 0;
  border: 0;
  height: 1.5px;
  background-image: linear-gradient(
    to right,
    rgba(144, 204, 221, 0.1),
    rgba(118, 131, 174, 0.3),
    rgba(144, 204, 221, 0.1)
  );
}
.forgetpass {
  cursor: pointer;
}
.forgetpass:hover {
  color: #909399;
}
</style>

<style>
.loginWin .el-dialog {
  width: 36%;
}
.loginel {
  width: 20em;
  margin-top: 1em;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #909399;
}
</style>