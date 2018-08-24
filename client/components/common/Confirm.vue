<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <!-- default body -->
            </slot>
          </div>
          <div class="modal-buttons">
            <button @click="$emit('close')">
              Cancel
            </button>
            <button @click="$emit('confirm')">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
