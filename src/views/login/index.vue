<template>
  <div class="loginIndex">
    <div class="appLogin">
      <img src="@/assets/logo_index.png" alt="">
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <el-button style="width:100%;" :disabled="setInterval.isExist" @click="authCode">
              {{setInterval.isExist ? '请('+setInterval.time+')秒后在试' : '获取验证码'}}
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import '@/vendor/gt'
import { setUser } from '@/utils/auth'
import initGeetest from '@/utils/init-geetest'

// 导出
export default {
  name: 'app-login',
  data() {
    return {
      captchaObj: '',
      initializeTime: 3,
      form: {
        mobile: '',
        code: ''
      },
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /\d{11}/, message: '手机号必须是11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /\d{6}/, message: '验证码必须6位', trigger: 'blur' }
        ]
      },
      setInterval: {
        isExist: false,
        time: 3,
        setIntervalCode: 0
      }
    }
  },
  methods: {
    // async登录
    onSubmit() {
      this.$refs['form'].validate(async valid => {
        try {
          if (!valid) return false
          const res = await this.$http({
            method: 'post',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            data: {
              mobile: this.form.mobile,
              code: this.form.code
            }
          })
          setUser(JSON.stringify(res.data.data))
          this.$router.push('/')
        } catch(err) {
          console.log(err)
          this.$message.error('验证码错误')
        }
      })
    },

    // 发送验证按钮
    authCode() {
      // 局部验证手机号
      this.$refs['form'].validateField('mobile', errForm => {
        if (errForm.trim() !== '') {
          return
        }
        let that = this.setInterval
        that.isExist = true
        that.setIntervalCode = setInterval(() => {
          that.time--
          if (that.time === 0) {
            that.isExist = false
            // 给指定代号清除定时器
            clearInterval(that.setIntervalCode)
            that.time = this.initializeTime
          }
        }, 1000)
        this.yzm()
      })
    },
    async yzm() {
      const that = this
      const { mobile } = this.form
      try {
        // 获取验证码必须数据
        let captchas = await this.$http({
          method: 'GET',
          url: 'http://ttapi.research.itcast.cn/mp/v1_0/captchas/' + mobile
        })
        // 配置验证码
        const { data } = captchas.data
        const captchaObj = await initGeetest({
          // 必填参数
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: true,
          // 验证方式
          product: 'bind'
        })
        captchaObj.onReady(function() {
          // 显示验证模块
          captchaObj.verify()
        }).onSuccess(async function() {
          const {
            geetest_challenge: challenge,
            geetest_seccode: seccode,
            geetest_validate: validate
          } =
          captchaObj.getValidate()
          // this指向windo
          // const smsCode = await this.$http({
          const smsCode = await that.$http({
            method: 'get',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/' + mobile,
            params: {
              challenge,
              seccode,
              validate
            }
          })
          console.log(smsCode)
        })
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loginIndex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .appLogin {
    border: 1px solid #000;
    padding: 30px 80px;

  }
}
</style>
