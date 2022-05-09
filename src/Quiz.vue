<script setup lang="ts">
let foo = 'far';
</script>

<template>
	<div>
		<h1 class="text-center text-6xl">What is 5<sub>8</sub> in base 2?</h1>
		<input type="text" class="input input-bordered input-lg w-full mt-12 mb-8" />
		<button type="button" class="btn btn-accent w-full">Submit</button>
	</div>
</template>

<style scoped>
    h1 {
        font-family: 'Source Code Pro', ui-sans-serif;
    }
</style>