<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current': item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="form-item">
          <label for="username">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" id="username"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="form-item">
          <label for="password">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
            id="password"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="form-item" v-show="model === 'register'">
          <label for="passwords">确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
            id="passwords"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="form-item">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6" id="code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="blcok" @click="getSms()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="blcok login-btn"
            :disabled="loginButtonStatus"
          >{{ model == 'login'? '登录': '注册'}}</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单 end -->
    </div>
  </div>
</template>

<script>
import { GetSms } from "@/api/login";
import {
  stripscript,
  validateEmail,
  validateCodes,
  validatePass
} from "@/utils/validate";
export default {
  name: "",
  data() {
    // 邮箱校验
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!validateEmail(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback(); // true
      }
    };
    // 密码校验
    var validatePassword = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePass(value)) {
        callback(new Error("密码为6-20位数字+字母"));
      } else {
        callback();
      }
    };
    // 确认密码校验
    var validatePasswords = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("两次输入密码不相同"));
      } else {
        callback();
      }
    };
    // 验证码校验
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!validateCodes(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback(); // true
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      // 模块值
      model: "login",
      // 登陆按钮禁用状态
      loginButtonStatus: true,
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      // 校验规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  // 挂载完成后自动执行
  mounted() {},
  methods: {
    // 获取验证码
    getSms() {
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空!");
        return;
      }
      if (!validateEmail(this.ruleForm.username)) {
        this.$message.error("邮箱格式有误请重新输入!");
        return;
      }
      GetSms({ username: this.ruleForm.username })
        .then(res => {
          let code = res.data.message.substring(res.data.message.length - 6);
          localStorage.setItem("code", code);
          console.log(code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleMneu(data) {
      // 点击初始化状态
      this.menuTab.forEach(item => (item.current = false));
      // 高光显示
      data.current = true;
      // 模块改变
      this.model = data.type;
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.code == localStorage.getItem("code")) {
            this.$message.success("提交成功");
          }else{
            this.$message.success("验证码错误!");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #344a5f;
  // background-image: url("http://g-shot.oss-cn-hangzhou.aliyuncs.com/h5/Vue/static/images/loginBackGround.jpg");
  // background-size: 100% 100%;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    color: #fff;
    border-radius: 2px;
    line-height: 36px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 2px;
  }
  .form-item {
    margin-bottom: 13px;
  }
  .blcok {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>