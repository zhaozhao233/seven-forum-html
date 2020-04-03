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
              <el-popconfirm :title="'确定不再关注' + postBarInfo.postBarName + '吗？'"
                             confirmButtonText='确定'
                             cancelButtonText='取消'
                             icon="el-icon-info"
                             iconColor="red">
                <el-button slot="reference" type="danger" size="small" icon="el-icon-plus">关注</el-button>
              </el-popconfirm>
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
          我控制不住我自己
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
            <a href="#">
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
              <img class="img_author" src="/static/postBars/gaiya.jpg"/>
            </div>
            <div class="author_name">
              <!--replyPostInfo.userId-->
              <p><a :href="replyPostInfo.userId">{{replyPostInfo.nfUser.userName}}</a></p>
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
                <li v-if="replyPostInfo.replyCount - 1 === 0"><a href="#"
                                                                 @click.prevent="controlShowReplies(replyPostInfo.storey)">回复</a>
                </li>
                <li class="have_reply" v-if="replyPostInfo.replyCount - 1 > 0"><a href="#"
                                                                                  @click.prevent="controlShowReplies(replyPostInfo.storey)">回复({{replyPostInfo.replyCount}})</a>
                </li>
                <li><span>2020-03-21 10:13</span></li>
                <li><span>{{replyPostInfo.storey}}楼</span></li>
              </ul>
            </div>
            <div class="reply" :id="replyPostInfo.storey"
                 style="display:none;">
              <ul class="reply_info" style="margin-right: 18px">
                <li class="reply_read"
                    v-for="replyInfo in replyInfos" v-if="replyInfo.replyPostId === replyPostInfo.replyPostId">
                  <div class="reply_replies">
                    <div class="reply_user_img">
                      <a href="#">
                        <img :src="replyInfo.nfUser.userImgUrl"/>
                      </a>
                    </div>

                    <div class="reply_content">
                      <!--此处的a标签的用户id是 replyInfo.userId，可能，不太确定-->
                      <a href="#" class="a_user_name">
                        {{replyInfo.nfUser.userName}}
                      </a>
                      <span v-if="replyInfo.replyUserName != replyPostInfo.nfUser.userName">
                        回复
                        <!--此处的a标签的用户id是 replyInfo.replyUserId,可能，不太确定-->
                        <a href="#" class="a_user_name">
                          {{replyInfo.replyUserName}}
                        </a>
                      </span>
                      <span>：{{replyInfo.replyContent}}</span>
                    </div>
                    <div class="reply_reply">
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
            <div id="editorElem" style="text-align:left"></div>
            <div class="upload_image_fail" style="float: left">
              <span class="tip">{{replyPostTip}}</span>
            </div>
            <div class="reply_post_div">
              <el-button id="reply_post_button" type="primary" size="mini" @click="replyPost">发表</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script src="../../javascript/postInfo.js">

</script>

<style scoped>
  @import "../../style/postInfo.css";
</style>
