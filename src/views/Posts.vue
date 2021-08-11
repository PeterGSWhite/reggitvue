<template>
  <div class="posts">
    <NavBar></NavBar>
      <div class="album py-5">
          <div class="container">
            <b-container style="margin-bottom: 10px">
            <b-row align-h="center" align-v="center">
              <b-col><a href="/posts/create/" class="btn btn-sm btn-outline-primary" role="button" aria-pressed="true">New Regex</a></b-col>
            </b-row>
            </b-container>
            <b-row>
              <b-col cols="4" v-for="post in APIData" :key="post.id">
                <div class="card mb-4 box-shadow">
                  
                  <div class="card-body">
                    <b-row align-h="between">
                      <b-col>
                        <h4 class="">Score: {{post.upvotes - post.downvotes + (tempVotes()[post.id]|0)}} </h4>
                      </b-col>
                      <b-col cols="1">
                        <b-row class="mb-2">
                         <a class="vote" @click="vote(post.id, 1)" type="button"><b-icon scale="2" :icon="tempVotes()[post.id] && tempVotes()[post.id] == 1 ? 'arrow-up-circle-fill' : 'arrow-up-circle'"></b-icon></a>
                        </b-row>
                        <b-row class="mb-2">
                          <a class="vote" @click="vote(post.id, -1)" type="button"><b-icon scale="2" :icon="tempVotes()[post.id] && tempVotes()[post.id] == -1 ? 'arrow-down-circle-fill' : 'arrow-down-circle'"></b-icon></a>
                        </b-row>
                      </b-col>
                    </b-row>
                    <h4 class=""><a :href="'/posts/' + post.id +'/'">{{post.title}}</a></h4>
                    <p>by {{post.author}}</p>
                    <!-- <p class="card-text">{{post.pattern}}</p> -->
                    <!-- <p class="card-text">{{post.test_text}}</p> -->
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a :href="'/posts/' + post.id +'/'" class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true">{{userId == post.created_by ? 'Edit' : 'View'}}</a>
                        <a @click="deletePost(post.id)" v-if="userId == post.created_by" class="btn btn-sm btn-outline-danger" role="button" aria-pressed="true">Delete</a>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
      </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'
  import { getAPI } from '../axios-api'
  import { mapState } from 'vuex'
  export default {
    name: 'Posts',
    data() {
      return {
        voteStash: {},
      }
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
    getPosts() {
      let config = { headers: this.$store.state.accessToken ? { Authorization: `Bearer ${this.$store.state.accessToken}` } : {}}
      getAPI.get('/posts/', config)
        .then(response => {
          this.$store.state.APIData = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getVotes() {
      if(this.$store.state.accessToken) {
        let config = { headers: this.$store.state.accessToken ? { Authorization: `Bearer ${this.$store.state.accessToken}` } : {}}
        getAPI.get('/votes/', config)
          .then(response => {
            this.$store.state.voteData = response.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    vote(id, value) {
      getAPI.post('/posts/' + id + '/vote/', {'value': value},{ headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }})
        .then(response => {
          console.log(response.data);
          this.voteStash[response.data.post] = response.data.value
          console.log('stash', this.voteStash, this.tempVotes())
          this.$forceUpdate();
        })
        .catch(e => {
          console.log(e);
        });
      },
      tempVotes() {
        let map = {}
        map = {...this.votes, ...this.voteStash}
        return map
      }
    },
    components: {
      NavBar
    },
    computed: {
      ...mapState(['APIData', 'voteData','userId']),
      votes() {
        let map = {}
        if(this.$store.state.voteData) {
          this.$store.state.voteData.forEach(vote => {
            map[vote.post] = vote.value
          });
        }
        return map
      }
    },
    created () {
        this.getPosts()
        this.getVotes()
    }
  }
</script>

<style>
.card {
  background-color: #54DEFD;
}
a {
  color: #6C756B
}
.vote {
  color: #6C756B
}
</style>