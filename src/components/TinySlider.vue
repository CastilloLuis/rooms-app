<template>
    <div class="slider-wrapper">
        <slot></slot>
    </div>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider"
import 'tiny-slider/dist/tiny-slider.css';


export default {
    name: 'TinySlider',

    data() {
        return {
            $slider: null, // no reactivity = no observable
        }
    },

    methods: {
        init() {
            const settings = {
                container: this.$el, // accesing to the parent elemnt of the component
                mode: 'gallery'
            };
            this.$slider = tns(settings);
        }
    },

    mounted() {
        this.init();
    },

    beforeDestroy() {
        this.$slider ? this.$slider.destroy() : null; // free memory, dom, less code rendering with .destroy()
    }
}
</script>

