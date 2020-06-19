<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <p style="font-size:1.5em;">基本信息</p>
    <el-form-item label="修改头像">
      <el-button @click="dialogVisible=true">上传头像</el-button>
    </el-form-item>

    <!--弹出窗剪裁-->
    <el-dialog title="编辑头像" :visible.sync="dialogVisible" :before-close="handleClose">
      <span>
        <el-row>
          <input
            type="file"
            ref="filElem"
            id="uploads"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            @change="uploadImg($event,1)"
            class="el-button hide"
            style="margin-bottom:15px;display:none;"
          />
          <div class="upload-img" @click="clickUpload">点击上传图片</div>
        </el-row>

        <el-row>
          <el-col :span="14">
            <vueCropper
              style="width:100%;height:300px"
              ref="cropper"
              :img="options.img"
              :autoCrop="options.autoCrop"
              :fixedBox="options.fixedBox"
              :canMoveBox="options.canMoveBox"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :centerBox="options.centerBox"
              @realTime="realTime"
            ></vueCropper>
          </el-col>
          <el-col :span="6.5">
            <h2 align="center" style="margin-left:50px;margin-top:-10px;">头像预览</h2>
            <div class="show-preview">
              <div :style="previews.div" class="preview">
                <img
                  :src="previews.url"
                  style="text-align:center;"
                  :style="previews.img"
                  width="100%"
                />
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="footerBtn" align="center">
          <el-button type="primary" size="medium" round @click="confirm('blob')">确认上传</el-button>
          <el-button
            type="info"
            size="medium"
            round
            @click="handleClose"
            style="margin-left:15px"
          >取消上传</el-button>
        </el-row>
      </span>
    </el-dialog>

    <el-form-item label="真实姓名" prop="name">
      <el-input v-model="ruleForm.name" @blur="modify('name')"></el-input>
    </el-form-item>

    <el-form-item label="学校" prop="school">
      <el-select @change="modify('school')" v-model="ruleForm.school" placeholder="请选择学校">
        <el-option label="清华大学" value="清华大学"></el-option>
        <el-option label="北京大学" value="北京大学"></el-option>
        <el-option label="福州大学" value="福州大学"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-radio-group @change="modify('sex')" v-model="ruleForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="个性签名" prop="sign">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="ruleForm.sign"
        maxlength="20"
        show-word-limit
        style="width:30em;"
        @blur="modify('sign')"
      ></el-input>
    </el-form-item>

    <p style="font-size:1.5em;">账号安全</p>

    <el-form-item prop="email" label="邮箱">
      <el-input v-model="ruleForm.email" :disabled="true"></el-input>
      <el-button type="text" @click="dialogFormVisible = true;refreshCode();" style="margin-left:1em;">点击修改</el-button>
      <el-dialog title="修改邮箱" :visible.sync="dialogFormVisible">
        <label for="yz-email" style="margin-left:1em;">邮箱</label>
        <el-input id="yz-email" v-model="yzEmail" style="margin-left:1em;"></el-input>
        <el-button
          :disabled="!isOnlyEmail||!isValidEmail"
          type="primary"
          style="margin-left:10px;"
          @click="sendEmail()"
        >发送验证</el-button>
        <span v-if="!isOnlyEmail" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 该邮箱已绑定
        </span>
        <span v-if="!isValidEmail" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 邮箱格式不正确
        </span>
        <br />
        <label for="yz-code">验证码</label>
        <el-input id="yz-code" v-model="code" style="margin-top:1.5em;margin-left:1em;width:10em;">
          <span slot="suffix" v-if="isYz">{{count}}</span>
          <span
            slot="suffix"
            v-if="!isYz"
            style="cursor:pointer;color:#3a8fe7"
            @click="sendEmail()"
          >重新获取</span>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify('email')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form-item>

    <el-form-item prop="number" label="学号">
      <el-input v-model="ruleForm.number" :disabled="true"></el-input>
      <el-button type="text" @click="dialogFormVisible1 = true;refreshCode();" style="margin-left:1em;">点击修改</el-button>
      <el-dialog title="修改学号" :visible.sync="dialogFormVisible1">
        <label for="yz-number" style="margin-left:1em;">学号</label>
        <el-input id="yz-number" v-model="yzNumber" style="margin-left:1em;"></el-input>
        <el-button
          :disabled="!isOnlyNumber||!isValidNumber"
          type="primary"
          style="margin-left:10px;"
          @click="sendEmail()"
        >发送邮箱验证</el-button>
        <span v-if="!isOnlyNumber" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 该学号已存在
        </span>
        <span v-if="!isValidNumber" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 学号格式错误
        </span>
        <br />
        <label for="yz-code">验证码</label>
        <el-input id="yz-code" v-model="code" style="margin-top:1.5em;margin-left:1em;width:10em;">
          <span slot="suffix" v-if="isYz">{{count}}</span>
          <span
            slot="suffix"
            v-if="!isYz"
            style="cursor:pointer;color:#3a8fe7"
            @click="sendEmail()"
          >重新获取</span>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify('number')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form-item>

    <el-form-item prop="password" label="密码">
      <el-input v-model="ruleForm.password" show-password :disabled="true"></el-input>
      <el-button type="text" @click="dialogFormVisible2 = true;refreshCode();" style="margin-left:1em;">点击修改</el-button>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible2">
        <label for="yz-password" style="margin-left:3em;">密码</label>
        <el-input id="yz-password" v-model="yzPassword" show-password style="margin-left:1em;"></el-input>
        <span v-if="!isSamePass" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 两次密码不一致
        </span>
        <span v-if="!isValidPass" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 密码为数字，小写字母，大写字母，特殊符号 至少包含三种，至少8位
        </span>
        <br />
        <br />
        <label for="yz-passwordsec" style="margin-left:1em;">确认密码</label>
        <el-input
          id="yz-passwordsec"
          v-model="yzPasswordSec"
          show-password
          style="margin-left:1em;"
        ></el-input>
        <el-button
          type="primary"
          :disabled="!isSamePass||!isValidPass"
          style="margin-left:10px;"
          @click="sendEmail()"
        >发送验证</el-button>
        <br />
        <br />
        <label for="yz-code" style="margin-left:2em;">验证码</label>
        <el-input id="yz-code" v-model="code" style="margin-left:1em;width:10em;">
          <span slot="suffix" v-if="isYz">{{count}}</span>
          <span
            slot="suffix"
            v-if="!isYz"
            style="cursor:pointer;color:#3a8fe7"
            @click="sendEmail()"
          >重新获取</span>
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify('password')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var reCount = 1;
    return {
      dialogVisible: false,
      options: {
        img: "",
        info: true,
        autoCrop: true,
        fixedBox: true,
        canMoveBox: false,
        centerBox: false,
        autoCropWidth: 150,
        autoCropHeight: 150
      },
      previews: {},
      fileName: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      isYz: true, //true倒计时
      count: 60,
      code: "",
      imageUrl: "",
      yzEmail: "",
      isOnlyEmail: true,
      isValidEmail: true,
      yzPassword: "",
      yzPasswordSec: "",
      isSamePass: true, //两次密码是否一致
      isValidPass: true, //密码的合法性
      yzNumber: "",
      isValidNumber: true,
      isOnlyNumber: true,
      ruleForm: {
        name: "",
        sex: "",
        sign: "",
        email: "",
        password: "",
        number: "",
        school: ""
      },
      rules: {
        name: [
          { message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { message: "请输入邮箱地址", trigger: "blur" },
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
        this.isYz = false;
        this.count = 60;
        clearInterval(this.reCount);
      }
    },
    yzEmail: function() {
      let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.yzEmail != "" && regEmail.test(this.yzEmail)) {
        this.isValidEmail = true;
        let form = new FormData();
        form.append("StudentEmail", this);
        this.$axios
          .get("/consumer/yStudentE", {
            params: { StudentEmail: this.yzEmail }
          })
          .then(res => {
            if (res.data == true) {
              this.isOnlyEmail = true;
            } else {
              this.isOnlyEmail = false;
            }
          });
      } else {
        this.isValidEmail = false;
      }
    },
    yzPassword: function() {
      let passRule = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/;
      if (this.yzPassword != "" && !passRule.test(this.yzPassword)) {
        this.isValidPass = false;
      } else {
        this.isValidPass = true;
      }
    },
    yzPasswordSec(val) {
      if (val != this.yzPassword) {
        this.isSamePass = false;
      } else {
        this.isSamePass = true;
      }
    },
    yzNumber: function() {
      let n = this.yzNumber;
      if (n.length != 9) {
        this.isValidNumber = false;
        return;
      } else {
        this.isValidNumber = true;
      }

      let name = new FormData();
      name.append("LoginName", n);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$axios.post("/consumer/yStudent/", name, config).then(res => {
        let isValid = res.data;
        if (isValid == false) {
          this.isOnlyNumber = false;
        } else {
          this.isOnlyNumber = true;
        }
      });
    }
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      //获取个人信息
      let isLogin = localStorage.getItem("isLogin");
      if (isLogin == "true") {
        this.$axios
          .get("/consumer/getStudent")
          .then(res => {
            let data = res.data;
            this.ruleForm.name = data.StudentName;
            this.ruleForm.sign = data.StudentSign;
            this.ruleForm.email = data.StudentEmail;
            this.ruleForm.sex = data.StudentSex;
            this.ruleForm.password = data.StudentPassword;
            this.ruleForm.number = data.LoginName;
            this.ruleForm.school = data.StudentSchool;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    realTime(data) {
      this.previews = data;
    },
    clickUpload() {
      //触发uploadImg
      this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
    },
    uploadImg(e, num) {
      //选头像
      let that = this;
      let file = e.target.files[0];
      that.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message.error("图片类型错误！");
        return false;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        that.options.img = data;
      };
    },
    confirm(type) {
      //上传头像
      let that = this;
      let form = new FormData();
        that.$refs.cropper.getCropBlob((data) => {
          form.append("files", data,that.fileName);
         
          this.$axios
            .post("/consumer/touxiang/", form, {
              //contentType: false,
              //processData: false,
              headers: { "Content-Type": "multipart/form-data" }
            })
            .then(res => {
              if (res.data == "OK") {
                //显示上传成功并刷新
                that.$message({
                  type: "success",
                  message: "上传成功"
                });
               setTimeout(function(){
                   window.location.reload();
                },1000)
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
    },
    //邮箱验证
    daojishi() {
      let _this = this;
      _this.count--;
      if (count == 0) {
        _this.isYz = false;
      }
    },
    sendEmail() {
      let that = this;
      let email = "";
      if (that.yzEmail != "") {
        email = that.email;
      } else {
        email = that.ruleForm.email;
      }
      that.isYz = true;
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
    modify(type) {
      //修改
      let that = this;
      let form = new FormData();
      let msg = "";
      if (that.code != "") {
        form.append("Code", that.code);
      }

      if (type == "email") {
        form.append("StudentEmail", that.yzEmail);
        form.append("E", "E");
        msg = "邮箱";
      } else if (type == "password") {
        form.append("LoginPassword", that.yzPassword);
        form.append("E", "LP");
        msg = "密码";
      } else if (type == "number") {
        form.append("LoginName", that.yzNumber);
        form.append("E", "LN");
        msg = "学号";
      } else if (type == "school") {
        form.append("StudentSchool", that.ruleForm.school);
        form.append("E", "S");
        msg = "学校";
      } else if (type == "name") {
        form.append("StudentName", that.ruleForm.name);
        form.append("E", "N");
        msg = "姓名";
      } else if (type == "sign") {
        form.append("StudentSign", that.ruleForm.sign);
        form.append("E", "Sign");
        msg = "个签";
      } else if (type == "sex") {
        form.append("SthdentSex", that.ruleForm.sex);
        msg = "性别";
      }

      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      this.$axios
        .post("/consumer/XiuStudent/", form, config)
        .then(function(res) {
          that.code = "";
          console.log(res);
          if (type == "email") {
            that.ruleForm.email = that.yzEmail;
            that.yzEmail = "";
          } else if (type == "password") {
            that.ruleForm.password = that.yzPassword;
            that.yzPassword = "";
            that.yzPasswordSec = "";
          } else if (type == "number") {
            that.ruleForm.number = that.yzNumber;
            that.yzNumber = "";
          }

          that.$message({
            message: msg + "修改成功！",
            type: "success"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 20em;
}
.el-card {
  width: 18%;
  margin-left: 8em;
  margin-bottom: 2em;
  padding-left: 3em;
}
.avatar-uploader {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: url("../assets//tx.jpg") no-repeat;
  background-size: 100% 100%;
}
.avatar-uploader-icon {
  font-size: 0;
  color: #fff;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  font-size: 28px;
  background-color: rgba(0, 0, 0, 0.3);
}
.avatar {
  position: relative;
  width: 120px;
  height: 120px;
  display: block;
}
.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: #fff;
  text-align: center;
  line-height: 120px;
}
.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.3);
}
.show-preview {
  display: flex;
  justify-content: center;
}
.preview {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #d1d1d1;
  background: #d1d1d1;
  width: 150px !important;
  height: 150px !important;
  margin-left: 50px;
  margin-top: 25px;
}
.upload-img {
  width: 100px;
  height: 30px;
  border: 2px solid #409eff;
  border-radius: 10px;
  margin-bottom: 10px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.footerBtn {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>

<style>
.el-textarea .el-textarea__inner {
  resize: none;
}
.el-dialog {
  width: 700px !important;
  height: auto;
}
</style>