<template>
  <div class="default-layout">
    <header-partial></header-partial>
    <section class="section__hero py-6 bg-black bg-cover bg-center">
      <div class="container">
        <div class="section__form bg-white p-4 w-1/2 shadow-md">
          <h1 class="mb-2 text-4xl font-light text-grey-darkest">Find homes on Platzi Rooms</h1>
          <h2 class="mb-6 text-base text-grey-dark font-normal">
            Discover entire homes and private rooms perfect for any trip.
          </h2>
          <form class="form__search">
            <div class="mb-4">
              <label class="input__label" for="where">Where</label>
              <div class="form__field relative">
                <i class="input-icon material-icons absolute text-grey-darker">search</i>
                <input
                  class="input__search"
                  id="where"
                  type="text"
                  placeholder="Mexico City, Mexico">
              </div>
            </div>
            <button
              class="px-2 py-4 bg-yellow-dark font-semibold w-full rounded text-yellow-darker">
              Search</button>
          </form>
        </div>
      </div>
    </section>
    <main class="main">
      <slot></slot>
    </main>
    <footer-partial></footer-partial>

    <!-- Modal Login -->
    <Modal :showModal="modals.login" @dispatchCloseModal="closeModal('login')">
      <LoginForm
        slot="modal-content"
        @dispatchLoginData="dispatchLoginData($event)"
      />
    </Modal>

    <!-- Modal Register -->

    <Modal :showModal="modals.register" @dispatchCloseModal="closeModal('register')">
      <RegisterForm
        slot="modal-content"
        @dispatchRegisterData="dispatchRegisterData($event)"
      />
    </Modal>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderPartial from '@/partials/HeaderPartial.vue';
import FooterPartial from '@/partials/FooterPartial.vue';
import Modal from '@/components/Modal.vue';
import LoginForm from '@/components/forms/Login.vue';
import RegisterForm from '@/components/forms/Register.vue';

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters(['modals'])
  },
  components: {
    HeaderPartial,
    FooterPartial,
    Modal,
    LoginForm,
    RegisterForm
  },
  methods: {
    closeModal(type) {
      this.$store.dispatch('TOGGLE_MODAL_STATE', {
        name: type,
        value: false
      })
    },

    async dispatchLoginData({ email, password }) {
      await this.$store.dispatch('SIGN_IN', {email, password})
      this.closeModal('login');
    },

    async dispatchRegisterData(data) {
      console.log('register', data);
      await this.$store.dispatch('REGISTER_USER', data);
      this.closeModal('register');
    }
  }
};
</script>

<style>
  .section__hero {
    min-height: 450px;
    background-image: url("https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80");
  }

  .form__field .input-icon {
    top: 7px;
    left: 9px;
  }

  .form__field > .input__search {
    @apply pl-10;
  }

  @media(max-width: 576px) {
    .section__hero {
      min-height: 250px;
    }

    .section__form {
      @apply w-full;
    }
  }
</style>
