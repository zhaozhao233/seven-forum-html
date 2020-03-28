<template>
  <div class="search">
    <el-form>
      <el-autocomplete
        popper-class="my-autocomplete"
        @keydown.native.enter=""
        value-key="postBarName"
        :trigger-on-focus="false"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        clearable
        @select="handleSelect"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.postBarName }}</div>
          <span class="addr">{{ item.postBarExplain }}</span>
        </template>
      </el-autocomplete>
      <!--<el-button type="primary">进入贴吧</el-button>-->
      <!--<el-button plain>搜索帖子</el-button>-->
    </el-form>
  </div>
</template>

<script>
    export default {
      name: 'Search',
      data() {
        return {
          restaurants: [],
          state: '',
          timeout:  null
        };
      },
      methods: {
        querySearchAsync(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.$axios.get('/searchs/postBars', {
              params: {
                postBarNameKey: queryString
              }
            }).then(successResponse => {
              cb(successResponse.data.data);
            }).catch(error => {
              console.log(error)
            })
          }, 1 * Math.random());
        },
        createStateFilter(queryString) {
          return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
          };
        },
        handleSelect(item) {
          this.$router.push('/postbar?postbarid=' + item.postBarId)
        },
      },
    }
</script>

<style scoped>
  .search_input {
    width: 430px;
  }
</style>
