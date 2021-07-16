<template>
	<div class="container flex flex-col h-full mx-auto text-white">
		<navbar/>
		<div class="flex flex-col flex-grow place-content-center">
			<div class="h-48">
				<h1 class="text-center text-6xl">{{ number }}<sub>{{ base }}</sub></h1>
				<p class="text-xl pt-4">What is this in base {{ convertToBase }}?</p>
				<input type="text" class="block h-8 w-full border-2 border-green-500 rounded my-4 text-black py-6 px-2"
				       v-model="guess">
				<button class="py-2 px-3 bg-blue-400 rounded-xl text-white" @click="handleClick">Check</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import {convertFromBase10ToNewBase} from "./NumberWithBase";
import {useStore} from "vuex";
import {key} from "./store";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
	name: 'App',
	components: {Navbar},
	setup() {
		const store = useStore(key);

		const number = computed(() => convertFromBase10ToNewBase(store.state.numberInBase10, store.state.originalBase));
		const base = computed(() => store.state.originalBase);
		const convertToBase = computed(() => store.state.convertToBase);
		const answer = computed(() => convertFromBase10ToNewBase(store.state.numberInBase10, store.state.convertToBase));

		const guess = ref('');

		const handleClick = () => {
			if (guess.value === answer.value) {
				store.commit('incrementScore');
				store.commit('newQuestion');
				guess.value = '';
			} else {
			}
		};

		console.log(answer.value);

		return {
			number,
			base,
			convertToBase,
			handleClick,
			guess
		}
	}
});
</script>
