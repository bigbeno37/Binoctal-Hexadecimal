<template>
	<div class="h-auto pt-4">
		<div class="flex">
			<div class="flex-grow">
				<button>Easy</button>
				<button class="mx-4">Medium</button>
				<button>Hard</button>
			</div>
			<div class="flex-none">
				<p>Score: <span>{{ score }}</span></p>
			</div>
		</div>
		<div class="w-100 relative bottom-8">
			<h1 class="text-center text-4xl">Binoctal Hexadecimal</h1>
		</div>
	</div>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {key} from "../store";
import {computed} from "vue";

export default {
	name: "Navbar",
	setup() {
		const store = useStore(key);

		const score = computed(() => store.state.score);

		return {
			score
		}
	}
}
</script>