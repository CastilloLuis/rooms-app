<template>
    <PageLayout>
        <section class="py-4 bg-teal-dark">
        <div class="container">
            <form class="form">
                <div class="form__field relative">
                    <i class="input-icon material-icons absolute text-grey-darker">search</i>
                    <input
                    class="input__search"
                    id="where"
                    type="text"
                    placeholder="Mexico City, Mexico">
                </div>
            </form>
        </div>
        </section>
        <section class="section__create py-6">
            <div class="container" style="padding: 0 100px 0 100px">
                <h1 class="text-3xl">Publish a new room :)</h1>
                <form>
                    <div class="mb-4">
                        <label class="input__label">Title</label>
                        <input type="text" v-model="publication.title" class="input__field" placeholder="Room Title">
                    </div>
                    <div class="mb-4">
                        <label class="input__label">Description</label>
                        <textarea type="text" v-model="publication.description" rows="10" class="input__field" placeholder="Room Description"></textarea>
                    </div>      
                    <div class="mb-4">
                        <label class="input__label">Feautured Image</label>
                        <input type="text" v-model="publication.featured_image" class="input__field" placeholder="PASTE URL HERE">
                    </div>
                    <div class="mb-4 text-right">
                        <button @click.prevent="saveRoom" class="w-full bg-yellow-dark text-yellow-darker font-semibold py-3 px-6 rounded">Publish</button>
                    </div>
                    <div class="mb-4">
                        <label class="input__label">Price per night</label>
                        <div style="display: flex">
                            <div>
                                <input type="number" v-model="publication.price" class="input__field" placeholder="Write your price ($)">
                            </div>
                            <div style="padding: 7px 0 7px 4px;">
                                <span class="text-2xl">$</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>        
    </PageLayout>    
</template>

<script>
import PageLayout from '@/layouts/PageLayout.vue';

export default {
    name: 'CreateHousePage',

    components: {
        PageLayout
    },

    data() {
        return {
            publication: {
                title: '',
                description: '',
                featured_image: '',
                price: ''
            }
        }
    },

    methods: {
        async saveRoom() {
            if(!Object.values(this.publication).some(prop => !prop)) {
                const room = {...this.publication, publishedAt: Date.now()};
                await this.$store.dispatch('CREATE_ROOM', room);
                this.$router.push({name: 'SearchPage'})
            } else {
                this.$store.dispatch('TOGGLE_SNACKBAR', { title: 'IMPORTANT!', text: 'You must fill all the fields'.toUpperCase(), });
            }
        }
    }

}
</script>

