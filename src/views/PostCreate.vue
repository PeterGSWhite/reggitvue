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
          v-model="data.title"
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
          v-model="data.pattern"
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
          v-model="data.test_text"
          name="test_text"
        />
      </div>

      
      <button @click="savePost" class="btn btn-success">Submit</button>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from '../components/Navbar'
import { getAPI } from '../axios-api'
export default {
  name: "PostCreate",
  components: {
      NavBar
  },
  data() {
    return {
      data: {
        title: "",
        pattern: "",
        test_text: "",
      }
    };
  },
  methods: {
    savePost() {
      getAPI.post('/posts/', this.data, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }})
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'posts' })
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>