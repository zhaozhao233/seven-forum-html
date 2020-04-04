import Utils from './util'
export default {
  name: "ForumPartition",
  data() {
    return {
      byId: 0,
      // 总数据条数
      dataCount: 0,
      pageSize: 20,
      postBars: []
    }
  },
  methods: {
    current_change(pageNum) {
      this.$axios.get('/partitions/postBars', {
        params: {
          partitionId: this.byId,
          pageNum: pageNum,
          pageSize: this.pageSize
        }
      }).then(successResponse => {
        this.postBars = successResponse.data.data
        this.dataCount = successResponse.data.message
        Utils.backtop()
      }).catch(error => {
        console.log(error)
      })
    },
    postbar(id) {
      this.$router.push('/postbar?postbarid=' + id)
    }
  },
  created: function () {
    this.byId = this.$route.query.partitionId
    this.current_change(1)
  }
}
