<template>
	<div class="container flex flex-col h-full mx-auto text-white">
		<div class="h-24">
			<p>This is the navbar!</p>
		</div>
		<div class="flex flex-col flex-grow place-content-center">
			<div class="h-48">
				<h1 class="text-center text-6xl">{{ number.number }}<sub>{{ number.base }}</sub></h1>
				<p class="text-xl pt-4">What is this in base {{ convertToBase }}?  {{ answer }}</p>
				<input type="text" class="block h-8 w-full border-2 border-green-500 rounded my-4 text-black py-6 px-2"
				       v-model="guess">
				<button class="py-2 px-3 bg-blue-400 rounded-xl text-white" @click="handleClick">Check</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import {convertToBase, NumberWithBase, SupportedBases} from "./NumberWithBase";

export default defineComponent({
	name: 'App',
	setup() {
		const number = ref<NumberWithBase>({ number: 10, base: 2 });
		const base = ref<SupportedBases>(10);
		const guess = ref('');

		const answer = computed(() => convertToBase(number.value.number, base.value));

		const handleClick = () => {
			console.log('guess is', guess);
		};

		return {
			number,
			convertToBase: base,
			guess,
			handleClick,
			answer
		}
	}
});
</script>
