<template>
    <div v-if="showModal" class="modal-wrapper">
        <div class="modal">
            <div class="modal-head text-right pb-2">
                <a href="#" @click="this.onClose">
                    <i class="material-icons modal-close-icon">close</i>
                </a>
            </div>
            <div class="modal-content">
                <slot name="modal-content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    
    props: {
        showModal: {type: Boolean, default: false},
    },
    
    data() {
        return {
        }
    },

    methods: {
        
        onClose() {
            this.$emit('dispatchCloseModal');
        }

    }

}
</script>

<style>
.modal {
    min-width: 350px;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    @apply absolute bg-white p-4 shadow-lg rounded;
}

.modal > .modal-head {
    @apply relative;
}

.modal-wrapper::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(37, 37, 37, 0.8);
}
</style>
