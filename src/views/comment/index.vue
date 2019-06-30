<template>
  <div>
    <el-table
      :data="fsList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="获取粉丝数">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="允许评论">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page"
      :total="total_count"
      @current-change="getPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'AppComment',
  data () {
    return {
      per_page: 10,
      page: 1,
      total_count: 0,
      fsList: []
    }
  },
  created() {
    this.lodingFollowers()
  },
  methods: {
    async lodingFollowers() {
      try {
        const res = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment',
            page: this.page
          }
        })
        this.fsList = res.results
        this.total_count = res.total_count
      } catch (err) {
        this.$message.error("粉丝列表获取失败")
      }
    },
    getPage(page) {
      this.page = page
      this.lodingFollowers()
    },
    async handleChangeStatus(data) {
      try {
        const allow_comment = data.comment_status
        const res = await this.$http({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: data.id.toString()
          },
          data: {
            allow_comment
          }
        })
        this.$message({
          type: 'success',
          message: `${!allow_comment?'禁止':'允许'}用户状态成功`
        })
      } catch (err) {
        this.$message.error(`${!allow_comment?'禁止':'允许'}用户状态失败`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>