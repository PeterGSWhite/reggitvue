<template>
  <div class="postDetail">
    <NavBar></NavBar>
    <div class="regex-box">
      <div class="main">
        <h1 class="author" style="text-align: center">Author: {{data.post.author}}</h1>
        <p class="error" v-if="data.error == true">All fields must be filled, please try again</p>
        <div class="title-box-wrapper">
          <input v-model="data.post.title" class="title-box" placeholder="Give your pattern a name"/>
        </div>
        <pattern-box />
        <test-text-box />
        <flags/>
        <button @click="putPost(data.post.id)" v-if="userId == data.post.created_by" class="btn btn-success">Update</button>
      </div>
      <aside>
          <side-bar></side-bar>
      </aside>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'
  import testTextBox from '../components/TestTextBox';
  import patternBox from '../components/PatternBox';
  import flags from '../components/Flags';
  import sideBar from '../components/SideBar';
  import { getAPI } from '../axios-api'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex';
  export default {
    name: 'PostDetail',
    components: {
      NavBar,
      testTextBox,
      patternBox,
      flags,
      sideBar
    },
    data() {
      return {
        data: {
          post: {
          },
          error: false,
        }
      };
    },
    methods: {
      ...mapMutations(['updateTestText', 'updatePattern']),
      putPost(id) {
       let putData = {
          ...this.data.post,
          pattern: this.$store.state.pattern,
          test_text: this.$store.state.testText
       }
       getAPI.put('/posts/' + id + '/', putData,  { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }}) 
         .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'posts' })
        })
        .catch(e => {
          this.data.error = true
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
            console.log(response.data)
            this.updateTestText(response.data.test_text)
            this.updatePattern(response.data.pattern)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
</script>
<style scoped>
*,
*::before,
*::after {
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: 14px 'Open Sans', sans-serif;
}
body,
html {
  width: 100%;
  height: 100%;
}
.regex-box {
  background-color: #54DEFD;
  display: flex;
  width: 850px;
  height: 500px;
  margin: 5rem auto;
  position: relative;
  border-radius: 5px;
  transition: all 0.25s linear;
}
.author {
  margin-top: 10px;
  color: #6C756B;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  width: 550px;
}
.title-box {
  width: 100%;
  font: inherit;
  min-height: 46px;
  background: transparent;
  color: #6C756B;
  padding: 2.3rem 25px;
  border: 0;
  outline: none;
}
.title-box-wrapper {
  position: relative;
  border-bottom: 1px solid #f7f7f72d !important;
}
.error {
  color: red;
  padding: 5px;
}
aside {
  width: 300px;
  padding: 1.5rem;
  border-left: 1px solid #ffffff31;
  overflow-y: scroll;
}
aside::-webkit-scrollbar {
  background: #3f4545;
  width: 10px !important;
}
aside::-webkit-scrollbar-track {
  border-radius: 10px !important;
}
aside::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  -webkit-box-shadow: inset 0 0 6px rgba(54, 52, 52, 0.925) !important;
  box-shadow: inset 0 0 6px rgba(54, 52, 52, 0.863) !important;
}
</style>