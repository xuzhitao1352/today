<template>
  <div class="lay-com-header">
    <el-row>
      <el-col :span="8" class="fl">
        <span class="iconfont icon-indent"></span>
        <span class="">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="8" :offset="8" class="fr">
        <div class="userInfo">
          <img :src="photo" width="30">
          <el-dropdown>
          <span class="el-dropdown-link">
            {{mobile}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid">用户信息</el-dropdown-item>
            <!-- native绑定到组件根元素 -->
            <el-dropdown-item @click.native="handleOut" icon="el-icon-s-fold">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { getUser,removeUser } from '@/utils/auth'
export default {
  name: 'layout-header',
  data() {
    return {
      mobile: getUser().name,
      photo: getUser().photo
    }
  },
  methods: {
    handleOut() {
      removeUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.lay-com-header {
  height: 100%;
  font-size: 16px;
  line-height: 50px;
  background-color: skyblue;
  
  .fl {
    :first-child {
      margin: 0 10px
    }
  }
  .userInfo {
    float: right;

    img {
      border-radius: 50%;
    }
    span {
      margin: 0 10px;
    }
  }
  
}
</style>
