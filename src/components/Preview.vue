<template lang="pug">
    .card
        .card-header Preview
        .card-body.text-center.px-5
            .row
                .col.text-dark(:style="{background: '#' + selectedColor}")
                    .h1.py-3 Example
                .col.text-light(:style="{background: '#' + selectedColor}")
                    .h1.py-3 Example
            .row
                .col.bg-dark(:style="{color: '#' + selectedColor}")
                    .h1.py-3 Example
                .col.bg-light(:style="{color: '#' + selectedColor}")
                    .h1.py-3 Example
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    props: {
        selectedColor: {
            type: String,
            required: true
        }
    }
});
</script>
