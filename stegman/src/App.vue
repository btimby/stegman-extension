<template>
  <div id="app">
    <nav>
      <a href="https://github.com/btimby/stegman-extension/" target="_new">Home</a> |
      <router-link to="/about">About</router-link> |
      <router-link to="/">Cancel</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  width: 400px;
  height: 400px;
}
</style>
