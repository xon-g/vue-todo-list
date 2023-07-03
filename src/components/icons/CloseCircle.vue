<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloseCircle } from '@mdi/js';

export default {
    name: "",
    props: ['color'],
    components: {
    SvgIcon
},
    data() {
    return {
        path: mdiCloseCircle,
    }
}
}
</script>

<script setup>
    const props = defineProps(['color'])
</script>

<template>
<svg-icon type="mdi" :path=path :color=props.color></svg-icon>
</template>