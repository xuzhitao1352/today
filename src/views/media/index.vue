<template>
  <div class="app-media">

  	<el-card class="box-card">
  		<div slot="header" class="clearfix">
		    <span>素材管理</span>
		  </div>
		  <el-row style="margin-bottom: 20px">
		  	<el-col class="fl" :span="5">
		  		<el-radio-group v-model="active">
		        <el-radio-button label="全部" @click.native="lodingImageList(false)"></el-radio-button>
		        <el-radio-button label="收藏" @click.native="lodingImageList(true)"></el-radio-button>
		      </el-radio-group>
		  	</el-col>
		  	<el-col class="fr" :span="5">
			  	<el-upload
			    style="float: right;"
					class="upload-demo"
					action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
					:headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
					name="image"
					:on-success="handleUploadImage"
					:show-file-list="false">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
		  	</el-col>
		  </el-row>
		  <el-row :gutter="50">
		  	<el-col class="medias" :span="6" v-for="(item, index) in imageFiles" :key="item.id">
			    <el-card>
			      <img :src="item.url" class="image">
			      <div style="padding: 14px;">
			        <div class="bottom clearfix">
								<span @click="handleCollect(index,item.id)" :class="{fl: true, iconfont:true, 'icon-star': !item.is_collected,'icon-star-fill': item.is_collected}"></span>
								<span @click="handleDelImage(item.id)" class="fr iconfont icon-delete"></span>
			        </div>
			      </div>
			    </el-card>
			  </el-col>
			</el-row>
      <el-pagination
        background
        @current-change="getPage"
        layout="prev, pager, next"
        :page-size="8"
        :total="total_count">
      </el-pagination>
		</el-card>
  </div>
</template>
<script>
export default {
  name: 'AppMedia',
  data () {
	  return {
      total_count: 1,
      active: '全部',
	  	isFill: true,
	  	imageParams: {
	  		collect: false,
	  		page: 1,
	  		per_page: 8
	  	},
	  	imageFiles: []
	  }
  },
  created() {
  	this.lodingImageList()
  },
  methods: {
    getPage(page) {
      console.log(page)
      this.imageParams.page = page
      if(this.active === '全部') {
        this.lodingImageList()
      }else {
        this.lodingImageList(true)
      }
    },
    async handleDelImage(id) {
      try {
        if(!window.confirm("确定要删除吗?")){
          return
        }
        await this.$http({
          method: 'delete',
          url: 'user/images/' + id
        })
        if(this.active === '全部'){
          this.lodingImageList()
        }else {
          this.lodingImageList(true)
        }
      } catch (err) {
        this.$message.error("删除素材失败",err)
      }
    },
  	async handleCollect(index,id) {
  		try {
	  		const res = await this.$http({
	  			method: 'PUT',
	  			url: '/user/images/' + id,
	  			data: {
	  				collect: !this.imageFiles[index].is_collected
	  			}
	  		})
	  		this.lodingImageList()
  		} catch (err) {
  			this.$message.error('收藏失败')
  		}
  	},
		handleUploadImage() {
      this.active = '全部'
      this.lodingImageList()
		},
		async lodingImageList(collect) {
      this.imageParams.collect = collect
			try {
				const res = await this.$http({
					method: 'get',
					url: '/user/images',
					params: this.imageParams
				})
        this.total_count = res.total_count
				this.imageFiles = res.results
			} catch (err) {
				this.$message.error("获取图片列表失败")
			}
		}
  }
}
</script>

<style lang="less" scoped>
.image {
	width: 100%;
}
.medias {
  height: 320px;
}
</style>