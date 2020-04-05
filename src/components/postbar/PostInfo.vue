<template>
  <div class="page-container">
    <div class="main">
      <div class="card_top_wrap">
        <div class="card_top">
          <div class="card_head">
            <a :href="'/postbar?postbarid=' + postBarInfo.postBarId">
              <img class="card_img_head" :src="postBarInfo.postBarLogoUrl"/>
            </a>
          </div>
          <div class="card_title">
            <a :href="'/postbar?postbarid=' + postBarInfo.postBarId" class="card_title_fname">{{postBarInfo.postBarName}}</a>
            <a class="follow" href="#">
              <!--用''是因为后端传过来的是字符串而不是数字-->
              <el-popconfirm v-if="isFollow === '1'" :title="'确定不再关注' + postBarInfo.postBarName + '吗？'"
                             confirmButtonText='确定'
                             cancelButtonText='取消'
                             icon="el-icon-info"
                             iconColor="red" @onConfirm="cancelFollowPostBar">
                <el-button slot="reference" type="danger" size="small" icon="el-icon-plus">已关注</el-button>
              </el-popconfirm>
              <el-button v-if="isFollow !== '1'" slot="reference" type="danger" size="small" icon="el-icon-plus"
                         @click="followPostBar">关注
              </el-button>
            </a>
            <span class="card_num">
              <span class="card_numLabel">关注：</span>
              <span class="card_menNum">{{postBarInfo.userCount}}</span>
              <span class="card_numLabel">帖子：</span>
              <span class="card_infoNum">{{postBarInfo.postCount}}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="nav_warp">
        <ul class="nav_list">
          <li class="nav_tab ">
            <div class="nav_tab_inner">
              <p class="space">
                <a class="nav_tab_a el-icon-document" :href="'/postbar?postbarid=' + postBarInfo.postBarId">看帖</a>
              </p>
            </div>
          </li>
          <li class="nav_tab">
            <div class="nav_tab_inner">
              <p class="space">
                <a class="nav_tab_a el-icon-star-on"
                   :href="'/postbar?postbarid=' + postBarInfo.postBarId + '&tab=good'">精品</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="nav_page">
        <div class="page_button">
          <el-pagination
            small
            :total=parseInt(dataCount)
            :page-size=pageSize
            :hide-on-single-page="true"
            @current-change="current_change">
          </el-pagination>
        </div>
      </div>
      <div class="core_title">
        <h4 class="core_title_txt">
          {{postTitle | ellipsis_title}}
        </h4>
        <ul class="core_title_btns">
          <li>
            <a href="#" @click.prevent="just_look_landlord">
              <p v-if="pageSize === 20" class="lzonly">
                只看楼主
              </p>
              <p v-if="pageSize !== 20" class="lzonly">
                取消只看楼主
              </p>
            </a>
          </li>
          <li>
            <a v-if="isCollection === '1'" href="#" @click.prevent="cancelCollectPost()">
              <p>取消收藏</p>
            </a>
            <a v-if="isCollection !== '1'" href="#" @click.prevent="showCollectionList()">
              <p>收藏</p>
            </a>
          </li>
          <li class="quick_reply">
            <a href="#" id="quick_reply" @click.prevent="quick_positioning_reply_box">
              <p>
                回复
              </p>
            </a>
          </li>
        </ul>
      </div>
      <div class="post_list">
        <div class="post_info" v-for="replyPostInfo in replyPostInfos">
          <div class="post_author">
            <div class="author_img">
              <img class="img_author" :src="replyPostInfo.nfUser.userImgUrl"/>
            </div>
            <div class="author_name">
              <!--记得改，看用户个人信息-->
              <p><a :href="replyPostInfo.userId">{{replyPostInfo.nfUser.userName}}</a></p>
            </div>
            <div class="landlord" v-if="replyPostInfo.userId === landlordId">
              楼主
            </div>
            <div v-if="replyPostInfo.nfUser.vipId" class="text">
              <p>会员</p>
            </div>
          </div>

          <div class="post_content">
            <div v-html="replyPostInfo.replyPostContent" class="user_reply_post_content">

            </div>
            <div class="common_bottom">
              <ul>
                <li v-if="replyPostInfo.replyCount === 0">
                  <a href="#" @click.prevent="controlShowReplies(replyPostInfo.storey)">回复</a>
                </li>
                <li class="have_reply" v-if="replyPostInfo.replyCount > 0">
                  <a href="#"
                     @click.prevent="controlShowReplies(replyPostInfo.storey)">回复({{replyPostInfo.replyCount}})</a>
                </li>
                <li><span>2020-03-21 10:13</span></li>
                <li><span>{{replyPostInfo.storey}}楼</span></li>
                <li v-if="userId === replyPostInfo.userId">
                  <!--<span><a href="#" @click.prevent="deleteReplyPost(replyPostInfo.replyPostId)">删除</a></span>-->
                  <el-popconfirm @onConfirm="deleteReplyPost(replyPostInfo.replyPostId)"
                                 title="删除后可在回收站撤回！"
                  >
                    <el-button class="collection_delete" slot="reference" type="danger">删除</el-button>
                  </el-popconfirm>
                </li>
              </ul>
            </div>
            <div class="reply" :id="replyPostInfo.storey"
                 style="display:none;">
              <ul class="reply_info" style="margin-right: 18px">
                <li class="reply_read"
                    v-for="replyInfo in replyInfos" v-if="replyInfo.replyPostId === replyPostInfo.replyPostId">
                  <div class="reply_replies">
                    <div class="reply_user_img">
                      <!--记得改，用户信息链接-->
                      <a :href="replyInfo.userId">
                        <img :src="replyInfo.nfUser.userImgUrl"/>
                      </a>
                    </div>

                    <div class="reply_content">
                      <!--记得改，用户链接，个人信息-->
                      <a :href="replyInfo.userId" class="a_user_name">
                        {{replyInfo.nfUser.userName}}
                      </a>
                      <span v-if="replyInfo.replyUserName != replyPostInfo.nfUser.userName">
                        回复
                        <!--记得改，个人信息链接-->
                        <a :href="replyInfo.replyUserId" class="a_user_name">
                          {{replyInfo.replyUserName}}
                        </a>
                      </span>
                      <span>：{{replyInfo.replyContent}}</span>
                    </div>
                    <div class="reply_reply">
                      <el-popconfirm @onConfirm="deleteReply(replyInfo.replyId)"
                                     title="删除后可在回收站撤回！"
                      >
                        <el-button v-if="userId === replyInfo.userId" class="collection_delete" slot="reference" type="danger">删除</el-button>
                      </el-popconfirm>
                      <!--<a v-if="userId === replyInfo.userId" href="#"-->
                         <!--@click.prevent="deleteReply(replyInfo.replyId)">删除</a>-->
                      <span>{{replyInfo.replyTime}}</span>
                      <a href="#"
                         @click.prevent="beginReply(replyPostInfo.replyPostId, replyInfo.nfUser.userName, replyInfo.userId)">回复</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="control_reply">
                    <a href="#" @click.prevent="controlReply(replyPostInfo.replyPostId)">我也说一句</a>
                  </div>
                </li>
                <!--
                  此处需要保留dispaly的行内样式，
                  因为script中使用了getElementById.style.disylay,
                  .style只对行内样式起效，虽然重新在script后赋值也可以取到
                -->
                <div class="reply_write" :id="replyPostInfo.replyPostId">
                  <div contenteditable="true" @input="restrictLength($event)"
                       style="display: block;"></div>
                  <a href="#" :data-layermaster="replyPostInfo.userId" @click.prevent="submitReply($event)"
                     style="">发表</a>
                </div>
                <span class="tip">{{replyTip}}</span>
              </ul>

            </div>
          </div>
        </div>
        <hr/>

        <div class="nav_page">
          <div class="page_button">
            <el-pagination
              small
              :total=parseInt(dataCount)
              :page-size=pageSize
              :hide-on-single-page="true"
              @current-change="current_change">
            </el-pagination>
          </div>
        </div>

        <div class="rich_poster_container">
          <div class="reply_container">
            <h3 style="margin: 0px">发表回复</h3>
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
              <span class="tip">{{replyPostTip}}</span>
            </div>
            <div class="reply_post_div">
              <el-button id="reply_post_button" type="primary" size="mini" @click="replyPost">发表</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="left">添加收藏</span>
        <el-button icon="el-icon-close" class="close_collection" type="info" @click="closeCollectionList"></el-button>
      </div>
      <div class="collection_list">
        <ul>
          <li v-for="collection in collectionList">
            <p class="title">
              <a class="collect" data-clicks="1" data-collectId="" href="#"
                 @click.prevent="insertCollection(collection.collectGroupId, $event)">收藏</a>
              {{collection.groupName}}
            </p>
            <p class="info">
              <el-popconfirm @onConfirm="deleteCollection"
                             title="删除后不可恢复，确认删除？"
              >
                <el-button class="collection_delete" slot="reference" type="danger"
                           @click="getCollectGroupId(collection.collectGroupId)">删除
                </el-button>
              </el-popconfirm>
              {{collection.totalNum}}条内容
            </p>
          </li>
        </ul>
      </div>

      <div class="createCollection">
        <el-input v-model="favoritesName" placeholder="文件夹名称"></el-input>
        <span class="left tip">{{createFavoritesTip}}</span>
        <div class="right">
          <el-switch
            v-model="isPrivate"
            active-text="公开"
            inactive-text="私密">
          </el-switch>
          <el-button type="danger" size="mini" icon="el-icon-plus" @click="createFavorites">新建收藏夹</el-button>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script src="../../javascript/postInfo.js">

</script>

<style scoped>
  @import "../../style/postInfo.css";
</style>
