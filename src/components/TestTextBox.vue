<template>
  <div class="test-text-box">
    <div ref="backdrop" class="backdrop">
      <div class="matches" v-html="matches"></div>
    </div>
    <textarea ref="testText" v-model="testText" placeholder="Enter text to test the pattern" @scroll="handleScroll"></textarea>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      testText: ''
    };
  },
  computed: mapGetters(['matches']),
  watch: {
    testText(value) {
      this.updateTestText(value);
      this.handleScroll();
    },
    '$store.state.testText': function() {
      this.testText = this.$store.state.testText
    }
  },
  methods: {
    ...mapMutations(['updateTestText']),
    handleScroll() {
      this.$refs.backdrop.scrollTop = this.$refs.testText.scrollTop;
    }
  },
};
</script>
<style>
.test-text-box {
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #011627;
}
.test-text-box * {
  box-sizing: border-box;
}
.backdrop,
textarea {
  position: absolute;
  padding: 1.5rem 25px 8px;
  width: 100%;
  height: 100%;
  font-size: inherit;
  background-color: transparent;
  outline: none;
  border: 0;
  overflow: auto;
  letter-spacing: 1px;
}
.backdrop {
  z-index: 1;
  pointer-events: none;
}
.matches,
textarea {
  font: inherit;
}
textarea {
  display: block;
  position: absolute;
  z-index: 2;
  resize: none;
  color: transparent;
}
textarea::-webkit-scrollbar {
  background: #282a36;
  width: 17px !important;
}
textarea::-webkit-scrollbar-track {
  border-radius: 10px !important;
}
textarea::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
}
.matches {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: white;
}

.matches mark {
  color: white;
  background-color: #9e3cc0;
}
.matches mark:nth-child(even) {
  background-color: #3c7fc2;
}
</style>