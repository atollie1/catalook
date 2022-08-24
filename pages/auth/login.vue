<template>
  <div class="d-flex justify-content-center align-items-center">
    <form class="card col-sm-3 mt-5" @submit.prevent="login">
      <div class="card-body">
        <h3 class="card-title text-center">
          Login
        </h3>

        <div class="form-group">
          <label class="control-label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Ex: john.snow@mail.com"
            :class="errors.email ? 'is-invalid': ''"
            required
          >

          <div v-if="errors.email" class="invalid-feedback">
            Invalid email
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="Your password"
            :class="errors.password ? 'is-invalid': ''"
            required
          >

          <div v-if="errors.password" class="invalid-feedback">
            Invalid password
          </div>
        </div>

        <div class="form-group">
          <button id="loginButton" class="btn btn-primary btn-block" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { redirectIfAuthenticated, saveAuthToken } from '~/utils/auth'

export default {
  name: 'LoginPage',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    errors: {
      email: null,
      password: null
    }
  }),
  mounted () {
    redirectIfAuthenticated(this)
  },
  methods: {
    login () {
      const data = JSON.stringify(this.form)
      this.$axios.$post('/api/auth/login', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((json) => {
          const token = json.data.token
          saveAuthToken(token)
          this.$router.push('/')
        })
        .catch(({ response }) => {
          console.error(response)
          if (response.status && response.status !== 422) {
            this.$bvToast.toast('Something wrong with the server please try again later', {
              variant: 'danger',
              title: 'Server Error'
            })
            return
          }

          if (response.data.errors.email) {
            this.errors.email = response.data.errors.email
          }

          if (response.data.errors.password) {
            this.errors.password = response.data.errors.password
          }
        })
    },

    clearValidationError () {
      this.errors = {
        email: null,
        password: null
      }
    }
  }
}
</script>
