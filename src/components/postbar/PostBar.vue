<template>
  <div class="page-container">
    <div class="main">
      <div class="ba-head">
        <div class="ba-img">
          <img src="/static/postBars/gaiya.jpg">
        </div>
        <div class="ba-info">
          <div class="ba-name">
            <a href="#">{{postBarInfo.postBarName}}</a>
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
            <a href="">{{catalogue.catalogueName}}</a>
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
          <!--<el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">-->
            <!--{{ item.navItem }}-->
          <!--</el-menu-item>-->
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
                <a :href="'/test?postid=' + postInfo.postId">
                  <span class="post-title">{{postInfo.postTitle | ellipsis_title}}</span>
                </a>
              </p>
              <p>{{postInfo.postContent | ellipsis_content}}</p>
            </div>
            <div class="post-user">
              <p >
                <i class="el-icon-user"></i>
                <span class="user-name">
                  <a href="#">{{postInfo.userName}}</a>
                </span>
              </p>
              <!--<p>-->
                <!--<i class="el-icon-chat-square"></i>-->
                <!--<span class="user-name">-->
                  <!--<a href="#">我是二号ssssssssssss</a>-->
                <!--</span>-->
              <!--</p>-->
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
    </div>
  </div>
</template>

<script>
    export default {
      name: 'PostBar',
      data() {
        return {
          dataCount: '100',
          pageSize: 50,
          postBarId: '',
          postBarInfo: [],
          postInfos: [],
          // replyCount: '',
          catalogue: [],
          // navList: [
          //   {name: '/postbar?postbarid=' + this.postBarId + '&tab=main', navItem: '看帖'},
          //   {name: '/postbar?postbarid=' + this.postBarId + '&tab=good', navItem: '精品'}
          // ],
          tab: ''
        }
      },
      filters: {
        ellipsis_content (value) {
          let len=value.length;
          if (!value) return ''
          if (value.length > 45) {
            return value.substring(0,30) + '......' +value.substring(len-15,len)
          }
          return value
        },
        ellipsis_title (value) {
          let len=value.length;
          if (!value) return ''
          if (value.length > 45) {
            return value.substring(0,45) + '......'
          }
          return value
        }
      },
      created: function () {
        this.postBarId = this.$route.query.postbarid
        this.$axios.get('/postBars/' + this.postBarId)
          .then(successResponse => {
            this.postBarInfo = successResponse.data.data
          }).catch(error => {
            console.log(error)
        })
        this.$axios.get('/postBars/catalogues', {
          params: {
            postBarId: this.postBarId
          }
        }).then(successResponse => {
          this.catalogue = successResponse.data.data
        }).catch(error => {
          console.log(error)
        })
        // this.$axios.get('/postBars/posts/' + this.postBarId + "/1/" + this.pageSize)
        //   .then(successResponse => {
        //     this.postInfos = successResponse.data.data
        //     this.dataCount = successResponse.data.message
        //   }).catch(error => {
        //     console.log(error)
        // })
        this.tab = this.$route.query.tab
        if (this.tab === 'good') {
          this.$axios.get('/postBars/posts/goods/' + this.postBarId + "/1/" + this.pageSize)
            .then(successResponse => {
              this.postInfos = successResponse.data.data
              this.dataCount = successResponse.data.message
            }).catch(error => {
            console.log(error)
          })
        } else {
          this.$axios.get('/postBars/posts/' + this.postBarId + "/1/" + this.pageSize)
            .then(successResponse => {
              this.postInfos = successResponse.data.data
              this.dataCount = successResponse.data.message
            }).catch(error => {
            console.log(error)
          })
        }
      },
      methods: {
        switch_column(indexPath, index) {
          var tabs = index + '';
          this.tab = tabs.substring(tabs.lastIndexOf('=') + 1)
          if (this.tab === 'main') {
            this.$axios.get('/postBars/posts/' + this.postBarId + "/1/" + this.pageSize)
              .then(successResponse => {
                this.postInfos = successResponse.data.data
                this.dataCount = successResponse.data.message
              }).catch(error => {
              console.log(error)
            })
          } else if (this.tab === 'good') {
            this.$axios.get('/postBars/posts/goods/' + this.postBarId + "/1/" + this.pageSize)
              .then(successResponse => {
                this.postInfos = successResponse.data.data
                this.dataCount = successResponse.data.message
              }).catch(error => {
              console.log(error)
            })
          }
        },
        current_change(pageNum) {
          this.$axios.get('/postBars/posts/' + this.postBarId + '/' + pageNum + '/' + this.pageSize)
            .then(successResponse => {
              this.postInfos = successResponse.data.data
              this.dataCount = successResponse.data.message
              this.backtop()
            }).catch(error => {
              console.log(error)
          })
        },
        /**
         * 回到顶部功能实现过程：
         * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
         * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
         * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
         * 4. 最后记得在移动到顶部时，清除定时器
         */
        backtop(){
          var timer = setInterval(function(){
            let osTop = document.documentElement.scrollTop || document.body.scrollTop;
            let ispeed = Math.floor(-osTop / 5);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
            this.isTop = true;
            if(osTop === 0){
              clearInterval(timer);
            }
          },10)
        }
      },
      mounted() {
        window.addEventListener("scroll",this.showbtn,true);
      },
    }
</script>

<style scoped>
  .icon-top {
    background-color: blue;
    border-radius:5px;
    color: white;
    margin-right: 3px;
   }
  .icon-good {
    background-color: red;
    border-radius:5px;
    color: white;
    margin-right: 3px;
  }
  .page-container {
    width:1230px;
    height:500px;
    MARGIN-RIGHT: auto;
    MARGIN-LEFT: auto;
  }
  .main {
    width: 1000px;
    margin: auto;
  }
  span {
    font-size: 12px;
  }
  .ba-img {
    float: left;
  }
  .ba-info {
    width: 450px;
    height: 75px;
  }
  .post-title {
    font-size: 14px;
  }
  .ba-post {
    width: 900px;
    float: left;
  }
  img {
    width: 150px;
    height: 150px;
  }
  .ba-name {
    float: left;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .ba-name > a {
    font-size: 22px;
  }
  .card-info > a, .post-context a {
    font-size: 14px;
    color: #2D64B3;
  }
  .ba-button {
    float: left;
    margin-left: 4px;
  }
  .ba-count {
    float: left;
  }

  .ba-count {
    color: #FF7F3E;
  }
  .ba-slogan {
    width: 300px;
    height: 40px;
    float: left;
    text-align: left;
  }
  p {
    word-break: break-all;
    margin: 3px;
  }
  .post-num {
    float: left;
  }
  .post-context {
    float: left;
    text-align: left;
  }
  .post-user {
    float: right;
    text-align: left;
  }
  .user-name {
    margin-left: 3px;
  }
  .post-info {
    border: 1px dotted black;
    height: 50px;
  }
  .page-button {
    float:right;
    bottom:0px;
    margin-right: 250px;
  }
</style>
