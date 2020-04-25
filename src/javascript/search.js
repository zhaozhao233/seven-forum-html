export default {
  name: 'Search',
  data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null,
      userId: this.$store.state.user.userId,
      userName: this.$store.state.user.username
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
