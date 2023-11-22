<template>
  <div>
    <h1>Compose</h1>
    <Compose/>
    <textarea
      v-model="message"
      rows="5"
      cols="80"
    ></textarea>
    <button
      @click="close('cancel')"
    >cancel</button>
    <button
      @click="close('ok')"
    >ok</button>
  </div>
</template>

<script>
import Compose from 'stegman-vue';

export default {
  // eslint-disable-next-line
  name: 'Compose',

  components: {
    Compose,
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
  width: 400px;
  height: 400px;
}
</style>
