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
