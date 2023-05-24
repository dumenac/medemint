<template>
    <div class="m-auto">
        <Chat v-if="!submitted"/>
    </div>
</template>

<script setup>

const submitted = ref(false)

</script>