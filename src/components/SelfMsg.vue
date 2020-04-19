<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
   <p style="margin-left:3em;color:#606266;">上传头像</p>
   <el-card>
           
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <span v-if="imageUrl" class="el-upload-action" @click.stop="handleRemove()">
                    <i class="el-icon-delete"></i>
                </span>
                <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
            </el-upload>
        </el-card>
    <el-form-item label="昵称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
    >
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="个性签名" prop="slogan">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="ruleForm.slogan"
        maxlength="30"
        show-word-limit
        style="width:30em"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      imageUrl:'',
      ruleForm: {
        name: "",
        sex: "",
        slogan: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },
      dynamicValidateForm: {
        
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     handleRemove() {
      this.imageUrl = ''
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.url;
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!type) {
        this.$message.error('图片格式不正确!(只能包含jpg，png，webp，JPEG)')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return type && isLt2M
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 20em;
}
.el-card{
  width: 18%;
  margin-left: 8em;
  margin-bottom: 2em;
  padding-left: 3em;
}
.avatar-uploader{
  width: 120PX;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: url('../assets//tx.jpg') no-repeat;
  background-size: 100% 100%;
}
.avatar-uploader-icon{
  font-size: 0;
  color: #fff;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar-uploader-icon:hover{
  font-size: 28px;
  background-color: rgba(0, 0, 0, .3);
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
  background-color: rgba(0, 0, 0, .3)
}
</style>