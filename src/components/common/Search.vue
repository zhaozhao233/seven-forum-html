<template>
  <div id="zhu">
    <div class="top_header_right" style="margin-left: 300px;">
      <div class="search" style="float: left">
        <el-form>
          <el-autocomplete
            popper-class="my-autocomplete"
            @keydown.native.enter=""
            value-key="postBarName"
            :trigger-on-focus="false"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索贴吧"
            clearable
            @select="handleSelect"
            style="width: 500px;margin-top: 5px;"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.postBarName }}</div>
              <span class="addr">{{ item.postBarExplain }}</span>
            </template>
          </el-autocomplete>
        </el-form>
      </div>

      <ul class="dao_ul" style="float: left">
        <li><a href="/forumclass">贴吧首页</a></li>
        <!--记得改，登录界面的路由-->
        <li v-if="userId === 0 || userId === null"><a href="">登录</a></li>
        <!--记得改，用户信息路由-->
        <li v-if="userId !== 0 && userId !== null"><a href="">{{userName}}</a></li>
        <!--记得改-->
        <li><a href="">消息</a></li>
        <!--记得改-->
        <li><a href="">会员</a></li>
        <!--记得改-->
        <li><a href="">动态</a></li>
      </ul>

    </div>
  </div>

</template>

<script src="../../javascript/search.js">

</script>

<style scoped>
  @import "../../style/search.css";
</style>
