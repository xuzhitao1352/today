<template>
  <div class="app-article">
  	<!-- 数据筛选 -->
  	<el-card class="box-card screen">
		  <div slot="header" class="clearfix">
		    <span>数据筛选</span>
		  </div>
		  <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="filter.status">
            <el-radio label="">全部</el-radio>
            <el-radio v-for="(item,index) in tagStatus" :key="item.text" :label="index">{{ item.text }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <ArticleChannel :isClearable="true" v-model="filter.channel_id"></ArticleChannel>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="range_date"
            @change="handleDateChange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
        </el-form-item>
      </el-form>
		</el-card>

		<!-- 新闻列表 -->
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>一共有{{ total_count }}条数据</span>
		  </div>
		  <!-- <div v-for="o in 4" :key="o" class="text item">
		    {{'列表内容 ' + o }}
		  </div> -->
			<template>
		    <el-table
		    	class="new-list"
		      :data="newList"
          style="width: 100%">
		      <el-table-column
		        prop="cover"
		        label="图片地址">
            <template slot-scope="scope">
              <!-- <span v-text='scope.row.cover.images[0]'></span> -->
              <img :src="scope.row.cover.images[0]">
            </template>
		      </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="tagStatus[scope.row.status].type">{{ tagStatus[scope.row.status].text }}</el-tag>
              <!-- <span v-text='tagStatus[scope.row.status]'></span> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布日期">
          </el-table-column>

          <el-table-column
            prop='id'
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="$router.push(`/publish/${scope.row.id}`)" plain>编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelect(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <el-pagination
          :current-page="filter.page"
          :total="total_count"
          :page-size="filter.per_page"
          @current-change="getPage"
				  background
				  layout="prev, pager, next">
				</el-pagination>
		  </template>
			
		</el-card>

  </div>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import { getUser } from '@/utils/auth'

export default {
  name: 'AppArticle',
  data () {
	  return {
      range_date: '',
      newList: [],
      total_count: 1,
      tagStatus: [
        { text:'草稿', type:'' },
        { text:'待审核', type:'warning' },
        { text:'审核通过', type:'success' },
        { text:'审核失败', type:'danger' },
        { text:'已删除', type:'info' }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      filter: {
        page: 1,
        per_page: 10,
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      }
	  }
  },
  created() {
  	this.lodingNewList()
  },
  components: {
    ArticleChannel
  },
  methods: {
    async handleDelect(id) {
      if(!window.confirm("确定要删除吗")){
        return
      }
      try {
        // id是JSONbig第三方转换的数组，使用需要转成.toString
        const nId = id.toString()
        const res = await this.$http({
          method: 'DELETE',
          url: `/articles/${id}`
        })
        console.log(res)
        this.lodingNewList()
        this.$message({
          type: 'success',
          message: "删除成功"
        })
      } catch(err) {
        this.$message.error("删除失败")
      }
    },
    // 绑定过滤时间
    handleDateChange(time) {
      this.filter.begin_pubdate = time[0]
      this.filter.end_pubdate = time[1]
    },
    // 过滤新闻
    handleFilter() {
      this.lodingNewList()
    },
  	async lodingNewList() {
  		try {
        // 过滤参数
        const filter = this.filter
        const filterParams = {};
        for(let key in filter) {
          const item =  filter[key]
          if(item !== '' && item !== null && item !== undefined){
            filterParams[key] = item
          }
        }
  			// const token = getUser().token
	  		const res = await this.$http({
	  			method: 'get',
	  			url: '/articles',
	  			params: filterParams
	  		})
        // console.log(res)
        this.total_count = res.total_count
        this.newList = res.results
  		} catch(err) {
  			console.log(err)
  		}
  	},
    getPage(page) {
      this.filter.page = page
      this.lodingNewList()
    }
  }
}
</script>

<style lang="less" scoped>
.app-article {
	.text {
	  font-size: 14px;
	}

	.item {
	  margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
	  display: table;
	  content: "";
	}
	.clearfix:after {
	  clear: both
	}

	.box-card {
	  width: 100%;

	  .new-list {
	  	margin-bottom: 10px;
	  }
	}
	.screen {
		margin-bottom: 20px;
	}

}
</style>