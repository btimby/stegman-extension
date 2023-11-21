<template>
  <hello-world />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  // eslint-disable-next-line
  name: 'Popup',

  components: { HelloWorld }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
