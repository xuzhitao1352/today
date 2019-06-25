<template>
  <div class="layout">
		<el-container>
			<!-- 侧边栏 -->
		  <el-aside width="200px">
				<app-sidebar></app-sidebar>
		  </el-aside>
		  <el-container>
		  	<!-- 头部 -->
		    <el-header height="50px" class="layout-header">
		    	<app-header></app-header>
		    </el-header>
		    <el-main>
					<!-- 待填充 -->
		    </el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
import appHeader from './components/AppHeader'
import appSidebar from './components/AppSidebar'

export default {
	name: '',
	components: {
		'app-header': appHeader,
		'app-sidebar': appSidebar
	},
	data() {
		return{}
	}
}
</script>

<style lang="less" scoped>
.layout {
	height: 100%;

	section {
		height: 100%;

		.layout-header {
			padding: 0;
		}
	}
}
</style>