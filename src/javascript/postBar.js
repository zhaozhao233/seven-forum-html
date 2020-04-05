import E from 'wangeditor';
import Utils from './util'

var OSS = require('ali-oss')

export default {
  name: 'PostBar',
  data() {
    return {
      dataCount: '',
      pageSize: 50,
      postBarId: '',
      postBarInfo: [],
      postInfos: [],
      catalogue: [],
      titleTip: '',
      postTip: '',
      textarea: '',
      tab: '',
      isFollow: 0
    }
  },
  filters: {
    eliminate_tag(value) {
      return value.replace(/<[^>]+>/g, "")
    },
    ellipsis_content(value) {
      let len = value.length;
      if (!value) return ''
      if (value.length > 45) {
        return value.substring(0, 30) + '......' + value.substring(len - 15, len)
      }
      return value
    },
    ellipsis_title(value) {
      let len = value.length;
      if (!value) return ''
      if (value.length > 45) {
        return value.substring(0, 45) + '......'
      }
      return value
    }
  },
  created: function () {
    this.postBarId = this.$route.query.postbarid

    if (this.postBarId > 9223372036854775807 || this.postBarId < 0) {
      this.$router.push('/error')
    }
    this.$axios.get('/is/postBars?postBarId=' + this.postBarId)
      .then(successResponse => {
        if (successResponse.data.message !== '1') {
          this.$router.push('/error')
        }
      }).catch(error => {
      console.log(error)
    })

    this.$axios.get('/postBars/' + this.postBarId)
      .then(successResponse => {
        this.postBarInfo = successResponse.data.data
        this.isFollowPostBar()
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
    // 是否关注贴吧
    isFollowPostBar() {
      this.$axios.get('/postInfos/is/postBars', {
        params: {
          userId: this.$store.state.user.userId,
          postBarId: this.postBarId
        }
      }).then(successResponse => {
        this.isFollow = successResponse.data.message
      }).catch(error => {
        console.log(error)
      })
    },
    // 取消关注贴吧
    cancelFollowPostBar() {
      this.$axios.delete('/postInfos/follows/postBars?userId=' +
        this.$store.state.user.userId +
        '&postBarId=' + this.postBarId)
        .then(successResponse => {
          this.isFollowPostBar()
        }).catch(error => {
        console.log(error)
      })
    },
    // 关注贴吧
    followPostBar() {
      this.$axios.post('/postInfos/postBars?userId=' +
        this.$store.state.user.userId +
        '&postBarId=' + this.postBarId)
        .then(successResponse => {
          this.isFollowPostBar()
        }).catch(error => {
        console.log(error)
      })
    },
    insertPost() {
      if (this.textarea.trim().length === 0) {
        this.titleTip = "标题不能为空"
        return
      }
      if (this.textarea.length > 64) {
        this.titleTip = "标题过长，最多允许64个字符"
        return
      }
      if (this.editorSelf.txt.text().trim().length < 1 && this.editorSelf.txt.html().length < 12) {
        this.postTip = "抱歉，您的帖子低于1字符，请您再输入一点吧"
        return
      }
      if (this.editorSelf.txt.html().length > 5000) {
        this.postTip = "抱歉，您的帖子超过5000字符，建议您精简或分段后再提交"
        return
      }
      var self = this
      this.$axios.post('/postInfos/posts', {
        postBarId: this.postBarId,
        postTitle: this.textarea,
        postContent: this.editorSelf.txt.html(),
        userId: this.$store.state.user.userId
      }).then(successResponse => {
        self.textarea = ''
        self.editorSelf.txt.html('')
        this.$router.push('/postinfo?postid=' + successResponse.data.message)
      })

    },
    fnUploadRequest(option) {
      if (!/image\/\w+/.test(option.file.type)) {
        this.postTip = "上传的不是图片"
        return false;
      }
      //在此限制图片的大小
      var imgSize = option.file.size;
      //在此处我们限制单张图片大小为3M
      if (imgSize > 3 * 1024 * 1024) {
        this.postTip = "上传的图片大小大于3M,请重新选择"
        // $(this).val('')
        return false;
      }
      let imageName = Utils.getImageName(option);
      let self = this
      this.$axios.get('/sts')
        .then(successResponse => {
          const client = new OSS({
            region: 'oss-cn-shanghai',
            accessKeyId: successResponse.data.data.credentials.accessKeyId,
            accessKeySecret: successResponse.data.data.credentials.accessKeySecret,
            bucket: 'sevenforum',
            stsToken: successResponse.data.data.credentials.securityToken
          })
          client.put(imageName, option.file).then(function (success) {
            self.editorSelf.txt.append('<img src="' + success.url + '">')
            self.postTip = "该图片上传成功"
          })
        }).catch(error => {
          console.log(error)
      })
    },
    switch_column(indexPath, index) {
      let tabs = index + '';
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
    backtop() {
      var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 10)
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.showbtn, true);
    var editor = new E('#editorElem');
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    };
    editor.create()
    this.editorSelf = editor
  }
}
