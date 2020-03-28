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
            <a href="">
              <p class="lzonly">
                只看楼主
              </p>
            </a>
          </li>
          <li>
            <div class="p_favthr_main">
              <p>收藏</p>
            </div>
          </li>
          <li class="quick_reply">
            <a href="" id="quick_reply">
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
              <p><a href="#">{{replyPostInfo.nfUser.userName}}</a></p>
            </div>

            <div v-if="replyPostInfo.nfUser.vipId" class="text">
              <p>会员</p>
            </div>
          </div>

          <div class="post_content">
            <div v-html="replyPostInfo.replyPostContent" style="min-height: 350px">
              <!--
              先看看共同点：
              float和绝对定位都脱离了普通文档流
              总结了一下，区别如下：
              1、float脱离普通文档流，但是文字会环绕它的周围，也就是说文字将不会重叠放置在浮动元素之上；而绝对定位中，其他所有元素都将会放置在绝对定位的元素之上。
              需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。
              而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。
              先看看共同点：
              absolute
              生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位。
              ★★
              relative
              生成相对定位的元素，相对于其在文档流正常位置进行定位。
              ★★
              fixed
              生成绝对定位的元素，相对于浏览器窗口进行定位。
              ★☆
              static
              默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）
              float和绝对定位都脱离了普通文档流
              总结了一下，区别如下：
              1、float脱离普通文档流，但是文字会环绕它的周围，也就是说文字将不会重叠放置在浮动元素之上；而绝对定位中，其他所有元素都将会放置在绝对定位的元素之上。
              需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。
              而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。
              导航位于左侧，内容div位于右侧。 内容div的信息通过PHP引入，因此每次都不同。
              我如何垂直缩放导航，使其高度与内容div的高度相同，无论加载哪个页面？

              #1楼
              注意 ：此答案适用于不支持Flexbox标准的旧版浏览器。 有关现代方法，请参阅： https ： //stackoverflow.com/a/23300532/1155721

              我建议你看一下使用跨浏览器CSS和无黑客的Equal Height Columns 。
              基本上，使用CSS以浏览器兼容的方式执行此操作并非易事（但对于表格而言是微不足道的），因此请找到适合您的预打包解决方案。
              此外，答案取决于您是想要100％高度还是相同高度。 通常它的高度相等。 如果它是100％高度，答案会略有不同。
              先看看共同点：
              float和绝对定位都脱离了普通文档流
              总结了一下，区别如下：
              1、float脱离普通文档流，但是文字会环绕它的周围，也就是说文字将不会重叠放置在浮动元素之上；而绝对定位中，其他所有元素都将会放置在绝对定位的元素之上。
              需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。
              而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。
              先看看共同点：
              absolute
              生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位。
              ★★
              relative
              生成相对定位的元素，相对于其在文档流正常位置进行定位。
              ★★
              fixed
              生成绝对定位的元素，相对于浏览器窗口进行定位。
              ★☆
              static
              默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）
              float和绝对定位都脱离了普通文档流
              总结了一下，区别如下：
              1、float脱离普通文档流，但是文字会环绕它的周围，也就是说文字将不会重叠放置在浮动元素之上；而绝对定位中，其他所有元素都将会放置在绝对定位的元素之上。
              需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。
              而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。
              导航位于左侧，内容div位于右侧。 内容div的信息通过PHP引入，因此每次都不同。
              我如何垂直缩放导航，使其高度与内容div的高度相同，无论加载哪个页面？
              <img src="/static/postBars/gaiya.jpg"/>
              #1楼
              注意 ：此答案适用于不支持Flexbox标准的旧版浏览器。 有关现代方法，请参阅： https ： //stackoverflow.com/a/23300532/1155721

              我建议你看一下使用跨浏览器CSS和无黑客的Equal Height Columns 。
              基本上，使用CSS以浏览器兼容的方式执行此操作并非易事（但对于表格而言是微不足道的），因此请找到适合您的预打包解决方案。
              此外，答案取决于您是想要100％高度还是相同高度。 通常它的高度相等。 如果它是100％高度，答案会略有不同。
              <div style="display: none">
                <img src="/static/postBars/gaiya.jpg"/>
              </div>
              -->
            </div>
            <!--<div v-if="false">测试赛所所撒</div>-->
            <div class="common_bottom">
              <ul>
                <li v-if="replyPostInfo.replyCount - 1 === 0"><a href="#"
                                                                 @click.prevent="controlShowReplies(replyPostInfo.storey)">回复</a>
                </li>
                <li style="background-color: #F7F8FA;" v-if="replyPostInfo.replyCount - 1 > 0"><a href="#"
                                                                                                  @click.prevent="controlShowReplies(replyPostInfo.storey)">回复({{replyPostInfo.replyCount}})</a>
                </li>
                <li><span>2020-03-21 10:13</span></li>
                <li><span>{{replyPostInfo.storey}}楼</span></li>
              </ul>
            </div>
            <div class="reply" :id="replyPostInfo.storey"
                 style="display:none;width: 640px;background-color: #F7F8FA;float: right;margin-right: 20px">
              <ul class="reply_info" style="margin-right: 18px">
                <li class="reply_read" v-for="replyInfo in replyInfos">
                  <div class="reply_replies" v-if="replyInfo.replyPostId === replyPostInfo.replyPostId"
                       style="border-bottom: 1px dotted black">
                    <div class="reply_user_img" style="float: left;margin-right: 10px">
                      <a href="#">
                        <img style="width: 32px;height: 32px" :src="replyInfo.nfUser.userImgUrl"/>
                      </a>
                    </div>

                    <div class="reply_content" style="width: 550px;float: left;word-break: break-all">
                      <!--此处的a标签的用户id是 replyInfo.userId-->
                      <a href="#" class="a_user_name">
                        {{replyInfo.nfUser.userName}}
                      </a>
                      <span v-if="replyInfo.replyUserName != replyPostInfo.nfUser.userName">
                        回复
                        <!--此处的a标签的用户id是 replyInfo.replyUserId-->
                        <a href="#" class="a_user_name">
                          {{replyInfo.replyUserName}}
                        </a>
                      </span>
                      <span>：{{replyInfo.replyContent}}</span>
                    </div>
                    <div class="reply_reply" style="float: right">
                      <span>{{replyInfo.replyTime}}</span>
                      <a href="#" @click.prevent="beginReply(replyPostInfo.replyPostId, replyInfo.nfUser.userName, replyInfo.userId)">回复</a>
                    </div>
                    <br/>
                    <br/>
                  </div>
                </li>
                <li>
                  <div style="height: 20px">
                    <a href="#" @click.prevent="controlReply(replyPostInfo.replyPostId)"
                       style="display:block;width:80px;height:20px;border:1px solid #CCC;background:#FFF;float: right">我也说一句</a>
                  </div>
                </li>
                <!--
                  此处需要保留dispaly的行内样式，
                  因为script中使用了getElementById.style.disylay,
                  .style只对行内样式起效，虽然重新在script后赋值也可以取到
                -->
                <div class="reply_write" :id="replyPostInfo.replyPostId">
                  <div  contenteditable="true"
                       style="background-color: white;height: 40px;border: 1px solid #D6DFFA;display: block"></div>
                  <!--<el-button type="primary" size="mini" style="float: right;margin-top: 10px;margin-bottom: 10px;">发表</el-button>-->
                  <a href="#" style="height: 21px;
            line-height: 21px;
            padding: 0 11px;
            background: #02bafa;
            border: 1px #26bbdb solid;
            border-radius: 3px;
            /*color: #fff;*/
            display: inline-block;
            text-decoration: none;
            font-size: 20px;
            outline: none;
float: right;margin: 10px 0px 10px 0px;">发表</a>
                </div>
              </ul>

            </div>
          </div>
        </div>
        <hr/>

        <div class="post_info">
          <div class="post_author">
            <div class="author_img">
              <img class="img_author" src="/static/postBars/gaiya.jpg"/>
            </div>
            <div class="author_name">
              <p><a href="#">清水一叶州</a></p>
            </div>
            <div class="text">
              <p>会员</p>
            </div>
          </div>

          <div class="post_content">
            <div style="min-height: 350px">
              先看看共同点：

            </div>
            <div class="common_bottom">
              <ul>
                <li><a href="#">回复</a></li>
                <li><span>2020-03-21 10:13</span></li>
                <li><span>1楼</span></li>
              </ul>
            </div>
          </div>
        </div>
        <hr/>

        <div class="post_info">
          <div class="post_author">
            <div class="author_img">
              <img class="img_author" src="/static/postBars/gaiya.jpg"/>
            </div>
            <div class="author_name">
              <p><a href="#">清水一叶州</a></p>
            </div>
            <div class="text">
              <p>会员</p>
            </div>
          </div>

          <div class="post_content">
            <div style="min-height: 350px">
              <!--
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              <img src="/static/postBars/gaiya.jpg"/>
              -->
            </div>
            <div class="common_bottom">
              <ul>
                <li><a href="#">回复</a></li>
                <li><span>2020-03-21 10:13</span></li>
                <li><span>1楼</span></li>
              </ul>
            </div>
          </div>
        </div>
        <hr/>

        <div class="post_info">
          <div class="post_author">
            <div class="author_img">
              <img class="img_author" src="/static/postBars/gaiya.jpg"/>
            </div>
            <div class="author_name">
              <p><a href="#">清水一叶州</a></p>
            </div>
            <div class="text">
              <p>会员</p>
            </div>
          </div>

          <div class="post_content">
            <div style="min-height: 350px">

            </div>
            <div class="common_bottom">
              <ul>
                <li><a href="#">回复</a></li>
                <li><span>2020-03-21 10:13</span></li>
                <li><span>1楼</span></li>
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
                             :show-file-list="true"
                             :limit=2
                             :file-list="a"
                             :on-exceed="beyondFile"
                             :on-success="handleVideoSuccess"
                             :before-upload="beforeUploadVideo">
                    <span class="el-icon-picture">图片</span>
                  </el-upload>
                </div>

                <div class="upload_iv">
                  <el-upload action=""
                             :http-request="fnUploadRequest"
                             :show-file-list="true"
                             :limit=2
                             :on-exceed="beyondFile"
                             :on-success="handleVideoSuccess"
                             :before-upload="beforeUploadVideo">
                    <span class="el-icon-video-camera-solid">视频</span>
                  </el-upload>
                </div>

              </div>


            </div>
            <div id="editorElem" style="text-align:left"></div>
            <button v-on:click="getContent">发表</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Utils from '../myjs/util'

  var OSS = require('ali-oss')
  import E from 'wangeditor';

  export default {
    name: 'PostInfo',
    data() {
      return {
        dataCount: '10000',
        pageSize: '20',
        editorContent: '',
        postId: '',
        postBarInfo: '',
        replyPostInfos: '',
        replyInfos: '',

      }
    },
    created() {
      this.postId = this.$route.query.postid
      this.$axios.get('/postInfos/postBars/postBarInfos', {
        params: {
          postId: this.postId
        }
      }).then(successResponse => {
        this.postBarInfo = successResponse.data.data
      }).catch(error => {
        console.log(error)
      })

      this.$axios.get('/postInfos/postBars/posts', {
        params: {
          postId: this.postId
        }
      }).then(successResponse => {
        this.replyPostInfos = successResponse.data.data
        console.log(this.replyPostInfo)
      }).catch(error => {
        console.log(error)
      })

      this.$axios.get('/postInfos/replies/byPostId', {
        params: {
          postId: this.postId
        }
      }).then(successResponse => {
        this.replyInfos = successResponse.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      controlShowReplies(e) {
        var replyToReply = document.getElementById(e)
        var replyToReplyDispaly = replyToReply.style.display
        replyToReply.style.display = replyToReplyDispaly === "none" ? "block" : "none"
      },
      controlReply(e) {
        console.log(e)
        var replyDiv = document.getElementById(e)
        var replyDivDisplay = replyDiv.style.display
        replyDiv.style.display = replyDivDisplay === "none" ? "block" : "none"
        if (replyDiv.style.display === "block") {
          replyDiv.firstChild.focus()
        }
      },
      // replyPostId: 该楼层的回帖的id，用来寻找回复用的可编辑div（该div绑定的id是该楼层的回帖的id）
      // replyUserName: 回复谁，相当于@的功能
      // replyUserId: 被回复的用户的id，用于绑定“发表”按钮的class
      beginReply(replyPostId, replyUserName, replyUserId) {
        var replyDiv = document.getElementById(replyPostId)
        var editableDiv = replyDiv.firstChild
        var submitButton = replyDiv.lastChild
        submitButton.className = ""
        submitButton.className = replyUserId
        editableDiv.innerText = "回复 " + replyUserName + "："
        var range = document.createRange();
        range.selectNodeContents(editableDiv);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      },
      getContent: function () {
        this.a.txt.append('<img src="https://sevenforum.oss-cn-shanghai.aliyuncs.com/video/20200324/2020032409075325_2079a13f-ec52-42b7-a483-a11093f4bdd5.jpg">')
        console.log(this.editorContent);
      },
      setImg(imgUrl) {
        this.a.txt.append('<img src="' + imgUrl + '">')
      },
      switch_column() {

      },
      fnUploadRequest(option) {
        if (!/image\/\w+/.test(option.file.type)) {
          alert('上传的不是图片');
          return false;
        }
        //在此限制图片的大小
        var imgSize = option.file.size;
        console.log(imgSize);
        //35160  计算机存储数据最为常用的单位是字节(B)
        //在此处我们限制图片大小为2M
        if (imgSize > 3 * 1024 * 1024) {
          alert('上传的图片的大于3M,请重新选择');
          $(this).val('')
          return false;
        }
        console.log("false了还进来了")
        const client = new OSS({
          region: 'oss-cn-shanghai',
          accessKeyId: 'LTAI4FpTkn8F1HptUPiRrSPV',
          accessKeySecret: 'ELkOTI31FEHonj2qjQBRQXejeIPbqQ',
          bucket: 'sevenforum'
        });
        let date = Utils.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
        let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
        let uuid = this.generateUUID();
        let extensionName = option.file.name.substr(option.file.name.indexOf('.')) // 文件扩展名
        console.log("extensionName:" + extensionName)
        let fileName = 'post/' + date + '/' + dateTime + '_' + uuid + extensionName // 文件名字（相对于根目录的路径 + 文件名）
        var self = this
        client.put(fileName, option.file).then(function (successResponse) {
          // this.a.txt.append('<img src="' + successResponse.url + '">')
          self.a.txt.append('<img src="' + successResponse.url + '">')
        })
      },
      // 视频上传
      beforeUploadVideo(file) {
        //todo

      },
      //视频上传成功后
      handleVideoSuccess(response, file, fileList) {
        console.log("视频上传成功后response:" + response)
        console.log("视频上传成功后file:" + file)
        console.log("视频上传成功后fileList:" + fileList)
      },
      // 视频添加多个视频文件事件
      beyondFile(files, fileList) {
        alert("不能再上传了")
        console.log("不能再file:" + files)
        console.log("不能再fileList:" + fileList)
      },
      generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
          d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      },
      test1() {
        console.log("啊哈")
      },
      timer() {
        console.log(this.textarea)
      },

    },
    mounted() {
      var editor = new E('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      };
      editor.create()
      this.a = editor
    },
  }
</script>

<style scoped>
  .a_user_name {
    color: blue;
  }

  .reply_info {
    list-style: none;
    padding-left: 10px;
  }

  .reply_info li {
    margin-bottom: 5px;
  }

  .rich_poster_container {
    height: 400px;
    background-color: #F4F4F4;
  }

  .special_button {
    width: 120px;
    border: 1px solid blue;
    margin: auto;
    overflow: hidden;

  }

  .upload_iv {
    width: 60px;
    height: 18px;
    float: left;
  }

  .post_info {
    min-height: 400px;
    display: -webkit-box;
  }

  .post_author {
    background-color: #FAFBFC;
    width: 140px;
    height: auto;
  }

  .img_author {
    width: 80px;
    height: 80px
  }

  .author_name p {
    display: inline;
  }

  .post_content {
    width: 800px;
    margin-top: 0px;
    padding: 0px;
    display: inline-block;
    text-align: left;
  }

  hr {
    margin: 0px;
  }

  .common_bottom {
    display: block;
    bottom: 1%;
    z-index: 9999
  }

  .common_bottom ul {
    margin: 20px 10px 0px 0px;
    float: right;
  }

  .common_bottom li {
    display: inline;
    float: right;
    margin-right: 10px;
  }

  .common_bottom li > span, .reply_reply {
    color: #999;
    font-size: 12px;
  }

  .common_bottom li > a {
    color: blue;
    font-size: 12px;
  }

  .core_reply_tail span {
    font-size: 12px;
    color: #999;
  }

  .core_reply_tail ul {
    list-style: none;
    float: right;
    margin: 5px;
    padding: 0px;
  }

  .core_reply_tail li {
    float: left;
    margin-left: 15px;
  }


  .d_author ul {
    list-style: none;
    padding-left: 0px;
  }

  .text {
    background-image: -webkit-linear-gradient(left, blue, #66ffff 10%, #cc00ff 20%, #CC00CC 30%, #CCCCFF 40%, #00FFFF 50%, #CCCCFF 60%, #CC00CC 70%, #CC00FF 80%, #66FFFF 90%, blue 100%);
    -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
    -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
    font-size: 20px;
  }

  @keyframes masked-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  .page-container {
    width: 1230px;
    /*height:500px;*/
    MARGIN-RIGHT: auto;
    MARGIN-LEFT: auto;
    border: 1px solid black;
  }

  .main {
    width: 980px;
    border: 1px solid black;
    margin: auto;
  }

  .card_top_wrap {
    height: 82px;
  }

  .card_head {
    width: 52px;
    height: 52px;
    float: left;
    margin: 15px;
  }

  .card_img_head {
    width: 48px;
    height: 48px;
    /*margin: 20px;*/
  }

  .card_title {
    width: 600px;
    height: 40px;
    float: left;
    margin-top: 20px;
    text-align: left;
  }

  .card_title_fname {
    font-size: 20px;
    float: left;
    margin: 5px;
  }

  .follow {
    margin: 2px 10px 0px 20px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .card_num {
    margin: 13px;
    font-size: 10px;
  }

  .card_numLabel {
    color: #AAA;
  }

  .card_menNum, .card_infoNum {
    margin-right: 15px;
    color: #ff7f3e;
  }

  .nav_warp {
    height: 46px;
    background-color: #E4E6E9;
  }

  .nav_warp ul, .core_title ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .nav_warp li, .core_title li {
    float: left;
    margin-left: 15px;
    /*border-right: 1px solid white;*/
  }

  h4 {
    float: left;
    color: red;
    margin-left: 20px;
    margin-bottom: 5px;
  }

  .page_button {
    width: 120px;
  }

  .core_title {
    border-bottom: 1px solid #D7DBDE;
    height: 56px;
    border-top: 1px solid #D7DBDE;
    /*position: fixed;*/
    /*width: 980px; height: 56px; position: fixed;background-color: white;*/
  }

  .core_title_btns {
    float: right;
  }

  .core_title_btns p {
    display: inline-block;
  / / display: block;
    width: 100px;
    height: 30px;
    border: 1px solid black;
    color: black;
    background: #C0C0C0;
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
  }

  .text p {
    display: inline;
  }
</style>
