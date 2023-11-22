<template>
  <div>
    <h1>Compose steganographic message</h1>
    <Write
      width="100%"
      v-model="message"
    />
    <button
      @click="close('cancel')"
    >cancel</button>
    <button
      @click="close('ok')"
    >ok</button>
  </div>
</template>

<script>
import { Write } from 'stegman-vue';
import 'stegman-vue/style.css'

export default {
  // eslint-disable-next-line
  name: 'Compose',

  components: {
    Write,
  },

  data() {
    return {
      message: null,
    };
  },

  mounted() {
    const hash = /#*(.*)/.exec(window.location.hash)[1];
    const query = new URLSearchParams(hash);
    this.message = query.get('message');
  },

  methods: {
    close(status) {
      window.top.postMessage({
        token: 'stegman',
        status,
        message: this.message,
      }, '*');
    },
  }
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
}
</style>
