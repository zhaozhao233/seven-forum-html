<template>
  <div class="page-container">
    <!--<div class="header">-->
      <!--<div class="search">-->
        <!--<el-form>-->
          <!--<el-input v-model="input" class="search_input"></el-input>-->
          <!--<el-button type="primary">进入贴吧</el-button>-->
          <!--<el-button plain>搜索帖子</el-button>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</div>-->
    <div class="aside">
      <ul >
        <li>全部贴吧分类</li>
        <li v-for="forum in forumClass">
          <a :href="'/forumpartition?partitionId=' + forum.partitionId">{{forum.partitionName}}</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="partitions" v-for="forum in forumClass">
        <div class="partition">
          <div class="partition_a">
            <a class="partition_href" :href="'/forumpartition?partitionId=' + forum.partitionId">{{forum.partitionName}}</a>
          </div>
          <ul>
            <li v-for="catalogue in forum.partitionCatalogueEntities">
              <a :href="'/forumcatalogue?catalogueId=' + catalogue.catalogueId">{{catalogue.catalogueName}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ForumClass',
    data() {
      return {
        input: '',
        forumClass: []
      };
    },
    created: function () {
      this.$axios.get('/partitions')
        .then(successResponse => {
          this.forumClass = successResponse.data.data
        }).catch(error => {
          console.log(error)
      })
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
  .aside {
    width: 120px;
    float: left;
  }
  .main {
    float: left;
    padding: 20px;
    width: 900px;
  }
  ul {
    list-style: none;
  }
  .aside > ul {
    padding: 0px;
    width: 120px;
    background-color: beige;
    font-size: 20px;
  }
  .aside li:nth-child(1) {
    background-color: #3F95E5;
  }
  .aside li {
    margin-top: 5px;
    border-bottom: 1px dotted #666;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .partition {
    width: 400px;
    float: left;
  }
  .partition li {
    float: left;
    margin-left: 5px;
    border-right: 1px solid red;
    padding-right: 5px;
    font-size: 15px;
  }
  .partition_href {
    color: #9694E5;
  }
  .partition_a {
    margin: 15px auto 0px;
  }
</style>
