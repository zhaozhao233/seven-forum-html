<template>
  <div class="page-container">
    <div class="main">
      <div class="ba-head">
        <div class="ba-img">
          <img :src="postBarInfo.postBarLogoUrl">
        </div>
        <div class="ba-info">
          <div class="ba-name">
            <a href="">{{postBarInfo.postBarName}}</a>
          </div>
          <div class="ba-button">
            <el-popconfirm :title="'确定不再关注' + postBarInfo.postBarName + '吗？'"
                           confirmButtonText='确定'
                           cancelButtonText='取消'
                           icon="el-icon-info"
                           iconColor="red">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-plus">关注</el-button>
            </el-popconfirm>
          </div>
          <div class="ba-count">
            <span class="card-numLabel">关注：</span>
            <span class="card-num">{{postBarInfo.userCount}}</span>
            <span class="card-numLable">帖子：</span>
            <span class="card-num">{{postBarInfo.postCount}}</span>
          </div>
          <div class="ba-slogan">
            <p>{{postBarInfo.postBarExplain}}</p>
          </div>
          <div class="card-info">
            <span>目录：</span>
            <a :href="'/forumcatalogue?catalogueId=' + catalogue.catalogueId">{{catalogue.catalogueName}}</a>
          </div>
        </div>
      </div>
      <div class="ba-post">
        <el-menu
          @select="switch_column"
          :default-active="'/postbar?postbarid=' + this.postBarId +  '&tab=main'"
          router
          mode="horizontal"
          background-color="white"
          text-color="#222"
          active-text-color="red"
          style="min-width: 100%">
          <el-menu-item :index="'/postbar?postbarid=' + this.postBarId + '&tab=main'">
            看帖
          </el-menu-item>
          <el-menu-item :index="'/postbar?postbarid=' + this.postBarId + '&tab=good'">
            精品
          </el-menu-item>
        </el-menu>
        <div class="ba-posts">
          <div class="post-info" v-for="postInfo in postInfos">
            <div class="post-num">
              <p>回复数：</p>
              <p>{{postInfo.replyCount - 1}}</p>
            </div>
            <div class="post-context">
              <p>
                <span class="icon-top" v-show=postInfo.topPost>置顶</span>
                <span class="icon-good" v-show=postInfo.wonderfulPost>精</span>
                <a :href="'/postinfo?postid=' + postInfo.postId">
                  <span class="post-title">{{postInfo.postTitle | ellipsis_title}}</span>
                </a>
              </p>
              <p>{{postInfo.postContent | eliminate_tag | ellipsis_content}}</p>
            </div>
            <div class="post-user">
              <p>
                <i class="el-icon-user"></i>
                <span class="user-name">
                  <!--记得改-->
                  <a :href="'userInfo?userid=' + postInfo.userId">{{postInfo.userName}}</a>
                </span>
              </p>
            </div>
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
      <div class="post_div">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入标题,不可超过128个字符"
          v-model="textarea">
        </el-input>
        <span class="tip left">{{titleTip}}</span>
        <div class="total_reply">
          <div class="special_button">
            <div class="upload_iv">
              <el-upload action=""
                         :http-request="fnUploadRequest"
                         :show-file-list="false">
                <span class="el-icon-picture">上传本地图片</span>
              </el-upload>
            </div>
          </div>
        </div>
        <div id="editorElem"></div>
        <div class="upload_image_fail left">
          <span class="tip">{{postTip}}</span>
        </div>
        <div class="reply_post_div">
          <el-button id="reply_post_button" type="primary" size="mini" @click="insertPost">发表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../javascript/postBar.js">

</script>

<style scoped>
  @import "../../style/postBar.css";
</style>
