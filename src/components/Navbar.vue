<template>
  <div class="nav-bar">
    <b-navbar toggleable="lg">
      <div class="container mw-0 px-3">

        <b-navbar-brand href="#">Reggit</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav mr-auto">
            <b-nav-item><router-link :to = "{ name:'posts' }" exact>Posts</router-link></b-nav-item>
            <b-nav-item class="nav-item" v-if="accessToken==null"><router-link :to = "{ name:'login' }">Login</router-link></b-nav-item>
            <b-nav-item class="nav-item" v-if="accessToken==null"><router-link :to = "{ name:'register' }">Register</router-link></b-nav-item>
            <b-nav-item class="nav-item" v-if="accessToken!=null"><router-link :to = "{ name:'logout' }">Logout</router-link></b-nav-item>
            <b-nav-item class="nav-item author"><a href="https://github.com/PeterGSWhite">made by Peter White</a></b-nav-item>
          </ul>
        </b-collapse>

      </div>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Navbar',
    computed: mapState(['accessToken'])
  }
</script>

<style scoped>
    a {
      color:#6C756B;
      text-decoration: none;
    }
    b-navbar-brand {
      color:#6C756B;
      text-decoration: none;
    }
    b-nav-item {
      margin-right: 15px;
    }
    .nav-bar {
      background-color: #8BD7D2;
    }
    .author {
      margin-left: 100px;
    }
    b-navbar-toggle {
      color: white
    }
</style>