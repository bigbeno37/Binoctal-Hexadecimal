<script setup lang="ts">
import {ref} from 'vue';
import Quiz from './Quiz.vue';

const difficulty = ref<'easy' | 'medium' | 'hard' | null>(null);
</script>

<template>

	<div class="w-full h-full flex flex-row justify-center">
		<div class="w-[900px] self-center">
			<Quiz v-if="difficulty !== null" />
			<div v-else class="flex flex-col">
				<h1 class="text-8xl text-center mb-8">Binoctal Hexadecimal</h1>
				<button class="btn btn-primary btn-lg self-center w-60" @click="difficulty = 'easy'">Easy</button>
				<button class="btn btn-secondary btn-lg self-center w-60 my-8" @click="difficulty = 'medium'">Medium</button>
				<button class="btn btn-accent btn-lg self-center w-60" @click="difficulty = 'hard'">Hard</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	h1 {
		font-family: 'Source Code Pro', ui-sans-serif;
	}
</style>