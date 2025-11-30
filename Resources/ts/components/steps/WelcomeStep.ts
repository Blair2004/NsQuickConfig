import { defineAsyncComponent, markRaw } from "vue";

declare const defineComponent: any, __: any, nsComponents: any;

import img from '@img/character-1.png';
import Progress from '../Progress';

export default defineComponent({
    name: 'WelcomeStep',
    data() {
        return {
            img,
            components: markRaw({}),
        };
    },
    props: [ 'steps', 'progressWidth', 'currentStep' ],
    components: {
        Progress,
    },
    mounted() {
        console.log( this );
    },
    methods: {
        __
    },
    template: `
    <div class="qc:text-center">
        <Progress class="qc:mt-8" :steps="steps" :progressWidth="progressWidth" :currentStep="currentStep"/>
        <div class="qc:mb-8">
            <img :src="img" alt="Welcome Illustration" class="qc:mx-auto qc:max-h-[10em]"/>
        </div>
        
        <h2 class="qc:text-3xl qc:font-bold qc:mb-4 qc:text-fontcolor">
            {{ __('Welcome to NexoPOS!') }}
        </h2>
        
        <p class="qc:text-lg qc:text-fontcolor qc:mb-6 qc:max-w-2xl qc:mx-auto">
            {{ __("We're excited to help you get started with NexoPOS! This quick setup wizard will guide you through the essential configuration steps to get your store up and running in no time.") }}
        </p>
        
        <div class="qc:mb-8 qc:bg-info-100 qc:border qc:border-info-300 qc:rounded-lg qc:p-6 qc:max-w-2xl qc:mx-auto">
            <h3 class="qc:font-semibold qc:text-info-800 qc:mb-3">{{ __( "What we'll cover:") }}</h3>
            <ul class="qc:text-left qc:text-info-700 qc:space-y-2">
                <li class="qc:flex qc:items-start">
                    <svg class="qc:w-5 qc:h-5 qc:mr-2 qc:mt-0.5 qc:shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ __('Set up your store identity and branding') }}</span>
                </li>
                <li class="qc:flex qc:items-start">
                    <svg class="qc:w-5 qc:h-5 qc:mr-2 qc:mt-0.5 qc:shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ __('Configure your receipt printer') }}</span>
                </li>
                <li class="qc:flex qc:items-start">
                    <svg class="qc:w-5 qc:h-5 qc:mr-2 qc:mt-0.5 qc:shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ __('Discover recommended apps and extensions') }}</span>
                </li>
            </ul>
        </div>
        
        <p class="qc:text-sm qc:text-gray-500 qc:mb-8">
            {{ __('This will only take a few minutes and you can always change these settings later.') }}
        </p>
        
        <div v-if="components" class="qc:flex qc:justify-center qc:gap-4">
            <ns-button @click="$emit('skip')" type="default">
                {{ __('Skip Setup') }}
            </ns-button>
            <ns-button @click="$emit('next')" type="info">
                {{ __("Let's Get Started!") }}
            </ns-button>
        </div>
    </div>  
    `
});