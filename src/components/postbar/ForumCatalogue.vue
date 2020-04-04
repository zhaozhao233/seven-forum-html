<template>
  <div class="page-container">
    <div class="page-main">
      <div class="post-bars">
        <div @click="postbar(postBar.postBarId)" class="post-bar" v-for="postBar in postBars">
          <div class="div-img">
            <img :src="postBar.postBarLogoUrl">
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
          :hide-on-single-page="true"
          @current-change="current_change">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script src="../../javascript/forumCatalogue.js">

</script>

<style scoped>
  @import "../../style/forumPartition.css";
</style>
