<template>
    <div class="page-container">
      <div class="page-main">
        <div class="post-bars">
          <div class="post-bar" :id="postBar.postBarId" v-for="postBar in postBars">
            <div class="div-img">
              <img src="/static/postBars/gaiya.jpg">
            </div>
            <div class="ba-content">
              <p class="ba-name">{{postBar.postBarName}}</p>
              <p class="ba-num">
                <span class="el-icon-user-solid">{{postBar.userCount}}</span>
                <span class="el-icon-edit-outline">{{postBar.postCount}}</span>
              </p>
              <p class="ba-explain">{{postBar.postBarExplain}}</p>
            </div>
          </div>
        </div>
        <div class="page-button">
          <el-pagination
            background
            :total=parseInt(dataCount)
            :page-size=pageSize
          @current-change="current_change">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'ForumPark',
      data() {
        return {

        }
      },
      methods: {

      },
      created: function () {

      }
    }
</script>

<style scoped>
  .page-main {
    width: 800px;
    border: 1px solid red;
    margin: 50px auto;
  }
  .post-bar {
    width: 376px;
    height: 179px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 10px;
    float: left;
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
    /*margin-top: 0px;*/
    padding-left: 3px;
  }
  span {
    margin: 0px 5px ;
  }
  p {
    text-align: left;
  }
</style>
