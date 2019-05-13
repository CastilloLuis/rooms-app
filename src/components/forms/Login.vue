<template>
    <div>
        <h2 class="text-grey-darkest font-semibold text-center mb-6">
            Welcome to FindYouRoom!
        </h2>
        <form>
            <div class="mb-4">
                <label class="input__label">E-mail</label>
                <div class="form__field relative">
                    <input type="text" v-model="formLogin.email" class="input__field" placeholder="example@example.com"/>
                </div>
            </div>
            <div class="mb-4">
                <label class="input__label">Password</label>
                <div class="form__field relative">
                    <input type="password" v-model="formLogin.password" class="input__field" placeholder="**********"/>
                </div>
            </div>     
            <div class="mb-4">
                <button @click.prevent="dispatchLoginData" class="btn btn-primary mr-3 w-full">Login</button>
            </div>           
            <div class="mb-4">
                <ToggleInput v-model="formLogin.rememberMe"/>
                <span>Remember Me</span>
            </div>                         
        </form>
    </div>
</template>

<script>
import ToggleInput from '@/components/ToggleInput.vue'
export default {
    components: {
        ToggleInput
    },
    data() {
        return {
            formLogin: {
                email: '',
                password: '',
                rememberMe: false
            }
        }
    },

    methods: {
        dispatchLoginData() {
            this.$emit('dispatchLoginData', this.formLogin)
        }
    }
}
</script>

