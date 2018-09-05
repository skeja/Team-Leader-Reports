<template>
  <transition name="slide-fade">
    <div class="warning">
      <slot name="message">
        default message
      </slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.warning {
  position: absolute;
  top: 5%;
  right: 1%;
  cursor: pointer;
  color: rgb(226, 2, 13);
  background-color: rgb(248, 171, 171);
  padding: 10px;
  border-radius: 10px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
