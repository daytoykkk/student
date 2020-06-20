<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
  
    <p style="font-size:1.5em;margin-left:10%;">
      <img src="../../assets/back.png" @click="toAllcourse()" style="width:1.2em;padding-right:5px;cursor:pointer;" title="返回主页">
      教师基本信息</p>
    <el-form-item label="修改头像" style="margin-left:10%;margin-top:40px">
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

    <el-form-item prop="number" label="工号" style="margin-left:10%;margin-top:40px">
      <el-input v-model="ruleForm.number" :disabled="true"></el-input>
      <el-button type="text" @click="dialogFormVisible1 = true;refreshCode();" style="margin-left:1em;">点击修改</el-button>
      <el-dialog title="修改工号" :visible.sync="dialogFormVisible1">
        <label for="yz-number" style="margin-left:2em;">工号</label>
        <el-input id="yz-number" v-model="yzNumber" style="margin-left:1em;"></el-input>
        <span v-if="!isOnlyNumber" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 该工号已存在
        </span>
        <span v-if="!isValidNumber" style="color:red;margin-left:10px">
          <span class="el-icon-warning"></span> 工号格式错误
        </span>
        <br />
        <label for="yz-code" style="margin-left:1em;">验证码</label>
        <el-input
          id="yz-code"
          v-model="code"
          autocomplete="off"
          style="margin-left:1em;width:10em;margin-top:1.5em"
        ></el-input>
        <img
          :src="codeurl"
          @click="refreshCode()"
          title="看不清点击刷新"
          style="width:50px;height:auto;margin-left:10px;cursor:pointer;"
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify('number')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form-item>

    <el-form-item prop="password" label="密码"  style="margin-left:10%;margin-top:40px">
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
       
        <br />
        <br />
         <label for="yz-code" style="margin-left:2em;">验证码</label>
        <el-input
          id="yz-code"
          v-model="code"
          autocomplete="off"
          style="margin-left:1em;width:10em;"
        ></el-input>
        <img
          :src="codeurl"
          @click="refreshCode()"
          title="看不清点击刷新"
          style="width:50px;height:auto;margin-left:10px;cursor:pointer;"
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify('password')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form-item>
  </el-form>
</template>


<style>
.el-input{
  width: 300px;
}
</style>

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
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      code: "",
      codeurl: "http://111.230.173.74:7001/consumer/CheckCodeServlet",
      imageUrl: "",
      yzPassword: "",
      yzPasswordSec: "",
      isSamePass: true, //两次密码是否一致
      isValidPass: true, //密码的合法性
      yzNumber: "",
      isValidNumber: true,
      isOnlyNumber: true,
      ruleForm: {
        password: "",
        number: ""
      }
    };
  },
  watch: {
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
          .get("/consumer/getTeacher")
          .then(res => {
            let data = res.data;
            this.ruleForm.number = data.TeacherLoginName;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    refreshCode() {
      //登陆刷新验证码
      this.codeurl =
        "http://111.230.173.74:7001/consumer/CheckCodeServlet?time" +
        new Date().getTime();
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
      if (type == "blob") {
        that.$refs.cropper.getCropData(data => {
          let arr = data.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr,
            length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }

          let img = new File([u8arr], that.fileName, { type: mime });

          form.append("file", img);
          this.$axios
            .post("/consumer/touxiang/", form, {
              contentType: false,
              processData: false,
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
              if (res.data == "OK") {
                localStorage.setItem("tx", that.options.img); //存头像
                console.log(that.options.img);
                //刷新
                that.$message({
                  type: "success",
                  message: "上传成功"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          console.log(data);
        });
      }
    },
    modify(type) {
      //修改
      let that = this;
      let form = new FormData();
      let msg = "";
      if (that.code != "") {
        form.append("Code", that.code);
      }

      if (type == "password") {
        form.append("LoginPassword", that.yzPassword);
        form.append("E", "LP");
        msg = "密码";
      } else if (type == "number") {
        form.append("LoginName", that.yzNumber);
        form.append("E", "LN");
        msg = "学号";
      }

      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      this.$axios
        .post("/consumer/XiuTeacher/", form, config)
        .then(function(res) {
          that.code = "";
          console.log(res);
          if (type == "password") {
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
    },
    toAllcourse(){
      this.$router.push({ path: "/allcourse" });
    }
  }
};
</script>