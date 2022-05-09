<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ onDifficultyClicked: (difficulty: 'easy' | 'medium' | 'hard') => void }>();
</script>

<template>
	<div class="flex flex-col">
		<h1 class="text-8xl text-center mb-8">Binoctal Hexadecimal</h1>
		<button class="btn btn-primary btn-lg self-center w-60" @click="props.onDifficultyClicked('easy')">Easy</button>
		<button class="btn btn-secondary btn-lg self-center w-60 my-8" @click="props.onDifficultyClicked('medium')">Medium</button>
		<button class="btn btn-accent btn-lg self-center w-60" @click="props.onDifficultyClicked('hard')">Hard</button>
	</div>
</template>