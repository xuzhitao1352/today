<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="box-header clearfix">
        <span>发布文章</span>
        <div class="handle">
          <el-button type="primary" @click="handleArticle(false)">发布</el-button>
          <el-button type="primary" @click="handleArticle(true)" plain>存入草稿</el-button>
        </div>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form ref="form" :model="articleParams" label-width="80px">
        <el-col :span="20">
          <el-form-item class="title" label="标题">
            <el-input v-model="articleParams.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor v-model="articleParams.content"
              ref="myQuillEditor"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="频道">
            <ArticleChannel :isClearable="false" v-model="articleParams.channel_id"></ArticleChannel>
          </el-form-item>
          <el-form-item label="封面">
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入富文本组件
import { quillEditor } from 'vue-quill-editor'
import './quill.user.css'

import ArticleChannel from '@/components/article-channel'
export default {
  name: 'AppPublish',
  data() {
    return {
      // 富文本配置选项
      editorOption: {},
      articleParams: {
        title: '', // 标题
        content: '', // 内容
        channel_id: 3, // 频道
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      }
    }
  },
  components: {
    ArticleChannel,
    quillEditor
  },
  created() {
    if(this.$route.name === 'publish-edit'){
      this.lodingArticle()
    }
  },
  methods: {
    // 获取单个文章
    async lodingArticle() {
      try {
        const res = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}`
        })
        console.log(res)
        this.articleParams = res
      } catch (err) {
        this.$message.error("获取用户列表失败")
      }
    },
    async handleArticle(draft) {
      // 如果是当前publish页面发送创建新闻请求
      try {
        if(this.$router.name === 'publish'){
          let res = await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.articleParams
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        } else {
          let res = await this.$http({
            method: 'put',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.articleParams
          })
          this.$message({
            type: 'success',
            message: '修改完毕'
          })
          this.$router.push('/article')
        }
      } catch (err) {
        this.$message.error('发布失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box-card .handle {
  float: right;
  position: relative;
  top: -10px;
}
.title {
  width: 50%;
}
</style>
