<template>
  <div class="page-container">
    <div class="page-main">
      <div class="post-bars">
        <div @click="postbar(postBar.postBarId)" class="post-bar" v-for="postBar in postBars">
          <div class="div-img">
            <img src="/static/postBars/gaiya.jpg">
          </div>
          <div class="ba-content">
            <p class="ba-name">{{postBar.postBarName}}:{{postBar.postBarId}}</p>
            <p class="ba-num">
              <span class="el-icon-user-solid">{{postBar.userCount}}</span>
              <span class="el-icon-edit-outline">{{postBar.postCount}}</span>
            </p>
            <p class="ba-explain">{{postBar.postBarExplain}}</p>
          </div>
        </div>
        <hr/>

      </div>
      <div class="page-button">
        <el-pagination
          background
          :total=parseInt(dataCount)
          :page-size=pageSize
          :hide-on-single-page="true"
          @current-change="current_change">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>

<style scoped>
  .page-container {
    width:1230px;
    height:500px;
    MARGIN-RIGHT: auto;
    MARGIN-LEFT: auto;
  }
  .page-main {
    width: 800px;
    margin: 50px auto;
  }
  .post-bar {
    width: 376px;
    height: 179px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 10px;
    float: left;
    cursor: pointer;
  }
  .page-button {
    float: left;
    margin-left: 200px;
  }
  img {
    width: 105px;
    height: 105px;
    margin: 5px;
  }
  .div-img {
    float: left;
  }
  .ba-content {
    float: left;
    width: 226px;
    height: 113px;
  }
  .ba-name {
    line-height: 0px;
    padding-left: 3px;
  }
  .ba-explain {
    word-break: normal;
    padding-left: 3px;
  }
  span {
    margin: 0px 5px ;
  }
  p {
    text-align: left;
  }
</style>
