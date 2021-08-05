<template>
  <div class="postCreate">
  <NavBar></NavBar>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="data.post.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="pattern">Pattern</label>
        <input
          type="text"
          class="form-control"
          id="pattern"
          required
          v-model="data.post.pattern"
          name="pattern"
        />
      </div>
      <div class="form-group">
        <label for="test_text">Example Text</label>
        <input
          type="text"
          class="form-control"
          id="test_text"
          required
          v-model="data.post.test_text"
          name="test_text"
        />
      </div>
      <p>by {{data.post.author}}</p>

      
      <button v-if="userId == data.post.created_by" @click="putPost(data.post.id)" class="btn btn-success">Update</button>
    </div>
  </div>
</div>
</template>

<script>
  import NavBar from '../components/Navbar'
  import { getAPI } from '../axios-api'
  import { mapState } from 'vuex'
  export default {
    name: 'PostDetail',
    components: {
      NavBar
    },
    data() {
      return {
        data: {
          post: {}
        }
      };
    },
    methods: {
    deletePost(id) {
      getAPI.delete('/posts/' + id + '/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }})
        .then(response => {
          console.log(response.data);
          this.$router.go()
        })
        .catch(e => {
          console.log(e);
        });
      },
      putPost(id) {
       getAPI.put('/posts/' + id + '/', this.data.post,  { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }}) 
         .then(response => {
          console.log(response.data);
          this.$router.go()
        })
        .catch(e => {
          console.log(e);
        });
      },
    },
    computed: mapState(['APIData', 'userId']),
    created () {
        let config = { headers: this.$store.state.accessToken ? { Authorization: `Bearer ${this.$store.state.accessToken}` } : {}}
        getAPI.get('/posts/' + this.$route.params.id + '/', config)
          .then(response => {
            this.data.post = response.data
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
</script>

<style>
</style>