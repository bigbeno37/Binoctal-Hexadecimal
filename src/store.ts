import {InjectionKey} from "vue";
import {createStore, Store} from "vuex";
import {getSupportedBases} from "./NumberWithBase";
import {generateIntegerUpTo} from "./RNGUtils";

export interface State {
    numberInBase10: number,
    originalBase: number,
    convertToBase: number,
    score: number
}

export const key: InjectionKey<Store<State>> = Symbol();

const generateQuestion = () => {
    const numberInBase10 = generateIntegerUpTo(100);
    const bases = getSupportedBases();

    const [originalBase] = bases.splice(generateIntegerUpTo(bases.length - 1), 1);
    const [convertToBase] = bases.splice(generateIntegerUpTo(bases.length - 1), 1);

    return {
        numberInBase10,
        originalBase,
        convertToBase
    }
}

const {numberInBase10, originalBase, convertToBase} = generateQuestion();

export const store = createStore<State>({
    state: {
        numberInBase10,
        originalBase,
        convertToBase,
        score: 0
    },
    mutations: {
        incrementScore(state) {
            state.score++;
        },
        newQuestion(state) {
            const question = generateQuestion();
            state.numberInBase10 = question.numberInBase10;
            state.originalBase = question.originalBase;
            state.convertToBase = question.convertToBase;
        }
    }
});