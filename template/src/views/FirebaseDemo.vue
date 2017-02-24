<template>
  <div id='firebase-demo'>
    <el-button v-show='isAuthenticated' @click='addTimeStamp()'>Add TimeStamp</el-button>
    <div v-for='stamp in stamps'>
      <h3 v-text='stamp.when' @click='deleteStamp(stamp)'></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'firebase-demo',
  firebase () {
    return {
      stamps: this.$db.ref('stamps')
    }
  },
  methods: {
    addTimeStamp () {
      this.$firebaseRefs.stamps.push({
        when: (new Date()).toString()
      })
    },
    deleteStamp (stamp) {
      if (this.isAuthenticated) {
        this.$firebaseRefs.stamps.child(stamp['.key']).remove()
      }
    }
  }
}
</script>

<style scoped>
h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}
</style>
