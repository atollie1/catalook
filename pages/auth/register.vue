<template>
  <p>Register</p>
</template>

<script>
import { redirectIfAuthenticated } from '~/utils/auth'

export default {
  name: 'RegisterPage',
  mounted () {
    redirectIfAuthenticated(this)
  }
}
</script>
