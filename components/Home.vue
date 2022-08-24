<template>
  <div class="container">
    Home
  </div>
</template>

<script>
import { redirectIfUnauthenticated } from '~/utils/auth'

export default {
  name: 'HomeComponent',
  mounted () {
    redirectIfUnauthenticated(this)
  }
}
</script>
