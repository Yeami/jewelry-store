<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.0);
  }

  *::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 3px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
  }

  .card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
