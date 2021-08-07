<template>
  <ValidationObserver ref="observer">
    <b-form slot-scope="{ validate }" @submit.prevent="validate().then(register)">
      <p class="error" v-if="incorrectAuth == true">A user with those details already exists.</p>
      <ValidationProvider rules="required" name="Username">
        <b-form-group slot-scope="{ valid, errors }" label="Username">
            <b-form-input
              type="text"
              v-model="username"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter username">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|email" name="Email">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Email">
            <b-form-input
              type="email"
              v-model="email"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter email">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Password" vid="password">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Password">      
            <b-form-input
              type="password"
              v-model="password"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter password">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|confirmed:password" name="Confirm Password">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Confirm Password">
            <b-form-input
              type="password"
              v-model="confirmation"
              :state="errors[0] ? false : (valid ? true : null)">
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <b-button block type="submit" variant="primary">Submit</b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
      return {
        username: '',
        email: '',
        password: '',
        confirmation: '',
      }
  },
  methods: {
    register () { 
        console.log()
        this.$store.dispatch('userRegister', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
          console.log(err)
          this.incorrectAuth = true
        })
    }
  }
};
</script>

<style>
body { 
  background-color:#f4f4f4;
}
.login{
background-color:#fff;
margin-top:10%;
}
input {
padding: 25px 10px;
}
form {
   max-width: 500px;
   margin: 0 auto; 
   text-align: left;
}
.form-group > label {
    font-weight: 600;
}
.error {
  color: red
}
</style>