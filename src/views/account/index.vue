<template>
  <div id="app-account">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="accountInfo" label-position="top" label-width="80px">
          <el-form-item label="媒体名称">
            <el-input v-model="accountInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="accountInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号">
            <el-input disabled :value="accountInfo.id"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="accountInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="accountInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="saveEdit" type="primary">保存更改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" :offset="2">
        <p>用户头像上传</p>
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :http-request="uploadPhoto">
          <img v-if="user.photo" :src="user.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
      
  </div>
</template>

<script>
export default {
  name: 'AppAccount',
  data () {
    return {
      user: {
        photo: false
      },
      accountInfo: {
        id: '',
        email: '',
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }
    }
  },
  created() {
    this.lodingAccount()
  },
  methods: {
    async lodingAccount() {
      const res = await this.$http({
        method: 'get',
        url: '/user/profile'
      })  
      res.id = res.id.toString()
      this.accountInfo = res
    },
    async saveEdit() {
      try {
        const res = await this.$http({
          method: 'PATCH',
          url: '/user/profile',
          data: {
            name:  this.accountInfo.name,
            intro: this.accountInfo.intro,
            email: this.accountInfo.email
          }
        })
        console.log(res)
        this.$store.commit('editUser', res)
        this.$message({
          type: 'success',
          message: '保存完毕'
        })
      } catch (err) {
        this.$message.error("保存异常")
      }
    },
    async uploadPhoto(uploadConfig) {
      // 将文件添加到FromData中
      const fd = new FormData()
      fd.append('photo', uploadConfig.file)
      try {
        const res = await this.$http({
          method: 'PATCH',
          url: 'user/photo',
          // 传入文件对象
          data: fd
        })
        this.user.photo = res.photo
        this.$store.commit('editUser', this.user)
        this.$message({
          type: 'success',
          message: '用户头像更新成功'
        })
      } catch (err) {
        this.$message.error("头像更新异常")
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>