<template>
  <div class="toast" :class="{'show': show, 'error': isError}">
    {{ message }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      isError: false,
      message: ''
    }
  },
  methods: {
    showToast (message, isError = false) {
      this.message = message
      this.isError = isError
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 10000)
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  margin: 0;
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  transform: translateX(100%);
  transition: all 0.5s ease;
}

.toast.show {
  transform: translateX(0);
}

.toast.error {
  background-color: #ff3b30;
  color: #fff;
}

/* Bỏ button */
.toast button {
  display: none;
}
</style>
