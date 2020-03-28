<template>
  <div class="page-container">
    <div class="main">
      <div class="card_top_wrap">
        <div class="card_top">
          <div class="card_head">
            <a href="">
              <img class="card_img_head" src="/static/postBars/gaiya.jpg"/>
            </a>
          </div>
          <div class="card_title">
            <a href="#" class="card_title_fname">戒色吧</a>
            <a class="follow" href="#">
                <el-popconfirm :title="'确定不再关注' + '戒色吧' + '吗？'"
                               confirmButtonText='确定'
                               cancelButtonText='取消'
                               icon="el-icon-info"
                               iconColor="red">
                  <el-button slot="reference" type="danger" size="small" icon="el-icon-plus">关注</el-button>
                </el-popconfirm>
            </a>
            <span class="card_num">
              <span class="card_numLabel">关注：</span>
              <span class="card_menNum">5321477</span>
              <span class="card_numLabel">帖子：</span>
              <span class="card_infoNum">77672035</span>
            </span>
          </div>
        </div>
      </div>
      <div class="nav_warp">
        <ul class="nav_list">
          <li class="nav_tab ">
            <div class="nav_tab_inner">
              <p class="space ">
                <a class="nav_tab_a el-icon-document" href="#">看帖</a>
              </p>
            </div>
          </li>
          <li class="nav_tab">
            <div class="nav_tab_inner">
              <p class="space" >
                <a class="nav_tab_a el-icon-star-on" href="#">精品</a>
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
      <!--<div class="a" style="width: 980px;height: 400px">-->
        <!--<div style="width: 100px;height:200px;float: left;border: 1px solid red">-->

        <!--</div>-->
      <!--</div>-->
      <div class="post_list">
        <div class="l_post">
          <div class="d_author">
            <ul>
              <li class="icon">
                <div class="icon_card">
                  <a href="" target="_blank" class="p_author_face">
                    <img class="user_img" src="/static/postBars/gaiya.jpg"/>
                  </a>
                </div>
              </li>
              <li class="d_name">

                <a href="" target="_blank">
                  清水一叶州
                </a>
                <div class="text">
                  <p>会员</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="d_post_content_main">
            <div class="" >
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
              <img src="/static/postBars/gaiya.jpg"/>
            </div>
            <div class="core_reply_tail">
              <ul class="p_reply">
                <li>
                  <a href="#" class="p_reply_first">回复</a>
                </li>
              </ul>
              <ul class="p_tail">
                <li>
                  <span>1楼</span>
                </li>
                <li>
                  <span>2020-03-21 10:13</span>
                </li>
              </ul>
              <!--<ul class="p_mtail">-->
                <!--<li class="j_jb_ele complaint"></li>-->
              <!--</ul>-->
            </div>
          </div>
        </div>
        <!--<hr/>-->

        <div class="l_post">
          <div class="d_author">
            <ul>
              <li class="icon">
                <div class="icon_card">
                  <a href="" target="_blank" class="p_author_face">
                    <img class="user_img" src="/static/postBars/gaiya.jpg"/>
                  </a>
                </div>
              </li>
              <li class="d_name">

                <a href="" target="_blank">
                  清水一叶州
                </a>
                <div class="text">
                  <p>会员</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="d_post_content_main">
            <div class="">
              先看看共同点：
              float和绝对定位都脱离了普通文档流
              总结了一下，区别如下：
              1、float脱离普通文档流，但是文字会环绕它的周围，也就是说文字将不会重叠放置在浮动元素之上；而绝对定位中，其他所有元素都将会放置在绝对定位的元素之上。
              需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。
              而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。
              <img src="/static/postBars/gaiya.jpg"/>
            </div>
            <div class="core_reply_tail">
              <ul class="p_reply">
                <li>
                  <a href="#" class="p_reply_first">回复</a>
                </li>
              </ul>
              <ul class="p_tail">
                <li>
                  <span>1楼</span>
                </li>
                <li>
                  <span>2020-03-21 10:13</span>
                </li>
              </ul>
              <!--<ul class="p_mtail">-->
              <!--<li class="j_jb_ele complaint"></li>-->
              <!--</ul>-->
            </div>
          </div>
        </div>


        <div class="l_post">
          <div class="d_author">
            <ul>
              <li class="icon">
                <div class="icon_card">
                  <a href="" target="_blank" class="p_author_face">
                    <img class="user_img" src="/static/postBars/gaiya.jpg"/>
                  </a>
                </div>
              </li>
              <li class="d_name">

                <a href="" target="_blank">
                  清水一叶州
                </a>
                <div class="text">
                  <p>会员</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="d_post_content_main">
            <div class="">
              aa
              <!--<img src="/static/postBars/gaiya.jpg"/>-->
            </div>

          </div>
          <div class="core_reply_tail" style="width: 500px;height: 100px">
            <ul class="p_reply">
              <li>
                <a href="#" class="p_reply_first">回复</a>
              </li>
            </ul>
            <ul class="p_tail">
              <li>
                <span>1楼</span>
              </li>
              <li>
                <span>2020-03-21 10:13</span>
              </li>
            </ul>
            <!--<ul class="p_mtail">-->
            <!--<li class="j_jb_ele complaint"></li>-->
            <!--</ul>-->
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'PostInfo',
      data() {
        return {
          dataCount: '10000',
          pageSize: '20',
          test: '<img src="/static/postBars/gaiya.jpg">你好啊<span style="color: red;">哦吼'
        }
      },
      methods: {
        switch_column() {

        }
      }
    }
</script>

<style scoped>
  .d_post_content_main {
    float: right;
    width: 830px;
    height: 100%;
    /*position: absolute;*/
    top: 0px;
    right: 0px;
  }
  .core_reply_tail span {
    font-size: 12px;
    color: #999;
  }
  .core_reply_tail {
    position:absolute;
    height: 20px;
    right:5px;
    bottom:5px;
    background-color: red;
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
  .l_post {
    margin: 0px;
    padding: 0px;
    min-height: 400px;
    clear: both;
    /*position: relative;*/
    border-top: 1px solid red;
    height: auto;
    /*overflow:auto;*/
  }
  .d_author {
    /*margin: 0px;*/
    width: 120px;
    min-height: 390px;
    /*height: 400px;*/
    /*margin-right: 200px;*/
    /*height: 400px;*/
    padding: 10px 10px 0 10px;
    /*overflow: hidden;*/
    /*top: 0px;*/
    /*left: 0px;*/
    /*position: relative;*/
    background-color: #FAFBFC;
    border-bottom: 1px solid #D7DBDE;
    float: left;
  }
  .d_author ul {
    list-style: none;
    padding-left: 0px;
  }
  /*.d_author li {*/
    /*width: 200px;*/

  /*}*/
  .user_img {
    width: 80px;
    height: 80px;
  }
  .text{
    /*width: 200px;*/
    /*height: 200px;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*margin-left: -150px;*/
    background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
    font-size: 20px;
  }

  @keyframes masked-animation {
    0% {
      background-position: 0  0;
    }
    100% {
      background-position: -100%  0;
    }
  }
  .page-container {
    width:1230px;
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
    /*border: 1px solid red;*/
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
  .card_menNum,.card_infoNum {
    margin-right: 15px;
    color: #ff7f3e;
  }
  .nav_warp {
    height: 46px;
    background-color: #E4E6E9;
  }
  /*.nav_page {*/
    /*!*background-color: #F5F7FA;*!*/
  /*}*/
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
    /*width: 980px; height: 56px; position: fixed; top: 0;background-color: white;*/
  }
  .core_title_btns {
    float: right;
  }
  .core_title_btns p {
    /*background-color: #E4E6E9;*/
    /*border-radius: 4px ;*/
    /*border: 1px solid red;*/
    display:inline-block; // display:block;
    width:100px;
    height:30px;
    border:1px solid black;
    color:black;
    background:#C0C0C0;
    border-radius:3px;
    text-align:center;
    line-height:30px;
  }
  .text p {
    display: inline;
  }
</style>
