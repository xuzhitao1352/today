<template>
  <div>
    <el-select :clearable="isClearable" :value="value" @change="$emit('input',$event)" placeholder="全部">
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    isClearable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      channels: ''
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    // 获取频道列表
    async getChannels() {
      try {
        const res = await this.$http({
          method: 'get',
          url: '/channels'
        })
        this.channels = res.channels
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>