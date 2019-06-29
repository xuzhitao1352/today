<template>
  <div class="lay-com-sidebar">
  	<div class="logo">
  		<img src="@/assets/logo_admin.png" width="120" alt="">
  	</div>
    <!-- @open="handleOpen"
    @close="handleClose" -->
  	<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="rgba(0,0,0,0)"
      text-color="rgb(173, 175, 181)"
      active-text-color="#66CCFF"
      :router="true">
      <el-menu-item index="1">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

			<el-submenu index="2">
				<template slot="title">
          <i class="iconfont icon-menu"></i>
          <span>内容</span>
				</template>
				<el-menu-item-group>
          <el-menu-item index="/publish">
            <i class="iconfont icon-edit-fill"></i>
            <span slot="title">发布</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/article">
            <i class="iconfont icon-unorderedlist"></i>
            <span slot="title">内容列表</span>
          </el-menu-item>
        </el-menu-item-group>
			</el-submenu>

			<el-menu-item index="/comment">
        <i class="iconfont icon-comment"></i>
        <span slot="title">评论</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont icon-image"></i>
        <span slot="title">素材</span>
      </el-menu-item>
      <el-menu-item index="/followers">
        <i class="iconfont icon-team"></i>
        <span slot="title">粉丝</span>
      </el-menu-item>
      <el-menu-item index="/account">
        <i class="iconfont icon-user"></i>
        <span slot="title">账户</span>
      </el-menu-item>
			
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'layout-sidebar',
  data(){
	  return{}
  }
}
</script>

<style lang="less" scoped>
.lay-com-sidebar {
	height: 100%;
	background: #323745;
	color: rgb(173, 175, 181);

	.logo {
		padding: 15px;
		text-align: center;
		line-height: 1px;
	}
}
</style>