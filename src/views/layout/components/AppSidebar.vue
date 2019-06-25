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
      active-text-color="#66CCFF">
      <el-menu-item index="1">
        <span slot="title">首页</span>
      </el-menu-item>

			<el-submenu index="2">
				<template slot="title">
          <span>内容管理</span>
				</template>
				<el-menu-item-group>
          <el-menu-item index="1-3">选项1</el-menu-item>
        </el-menu-item-group>
			</el-submenu>

			<el-submenu index="3">
				<template slot="title">
          <span>导航三</span>
				</template>
				<el-menu-item-group>
          <el-menu-item index="1-3">选项1</el-menu-item>
        </el-menu-item-group>
			</el-submenu>
      
			<el-menu-item index="4">
        <span slot="title">账号信息</span>
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