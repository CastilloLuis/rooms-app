<template>
    <div>
        <h2 class="text-grey-darkest font-semibold text-center mb-6">
            Register
        </h2>
        <form>
            <div class="mb-4">
                <label class="input__label">E-mail</label>
                <div class="form__field relative">
                    <input type="text" v-model="registerForm.email" class="input__field" placeholder="example@example.com"/>
                </div>
            </div>
            <div class="mb-4">
                <label class="input__label">Name</label>
                <div class="form__field relative">
                    <input type="text" v-model="registerForm.name" class="input__field" placeholder="John Doe"/>
                </div>
            </div>            
            <div class="mb-4">
                <label class="input__label">Password</label>
                <div class="form__field relative">
                    <input type="password" v-model="registerForm.password" class="input__field" placeholder="**********"/>
                </div>
            </div>     
            <div class="mb-4">
                <button @click.prevent="dispatchRegisterData" class="btn btn-primary mr-3 w-full">Registrar</button>
            </div>                   
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                email: '',
                name: '',
                password: '',
            }
        }
    },

    methods: {
        dispatchRegisterData() {
            this.$emit('dispatchRegisterData', this.registerForm)
        }
    }
}
</script>

