<template>
  <div class="page-container">
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

<script src="../../javascript/forumClass.js">

</script>

<style scoped>
  @import "../../style/forumClass.css";
</style>
