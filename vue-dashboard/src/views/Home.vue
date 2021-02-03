<template>
  <div id="home">
    <GetPosts />

    <GetSinglePostWithComments />
  </div>
</template>

<script>
import GetPosts from './GetPosts'
import GetSinglePostWithComments from './GetSinglePostWithComments'

export default {
  name: 'home',
  components: {
    GetPosts,
    GetSinglePostWithComments
  },
  data: () => {
    return {}
  }
}
</script>

<style>
#home {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #282f36;
  margin-top: 30px;
}
</style>
