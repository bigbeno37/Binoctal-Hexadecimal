<script setup lang="ts">
import {ref} from 'vue';
import Quiz from './Quiz.vue';
import MainMenu from './MainMenu.vue';

const difficulty = ref<'easy' | 'medium' | 'hard' | null>(null);

const onDifficultyClicked = (newDifficulty: 'easy' | 'medium' | 'hard') => {
	difficulty.value = newDifficulty;
};
</script>

<template>

	<div class="w-full h-full flex flex-row justify-center">
		<div class="w-[900px] self-center">
			<Quiz v-if="difficulty !== null" />
			<MainMenu v-else :on-difficulty-clicked="onDifficultyClicked"/>
		</div>
	</div>
</template>

<style scoped>
	h1 {
		font-family: 'Source Code Pro', ui-sans-serif;
	}
</style>