declare const defineComponent: any, nsHttpClient: any, nsSnackBar: any, __: any;

export default defineComponent({
    props: [ 'steps', 'progressWidth', 'currentStep' ],
    template: `
    <div class="bg-primary qc:px-8 qc:py-6">
        <div class="qc:max-w-4xl qc:mx-auto">
            <div class="qc:flex qc:items-center qc:justify-between qc:relative">
                <!-- Progress Line Background -->
                <div class="qc:absolute qc:top-5 qc:left-0 qc:right-0 qc:h-1 qc:bg-gray-600 qc:z-0"></div>
                
                <!-- Progress Line Animated -->
                <div 
                    class="qc:absolute qc:top-5 qc:left-0 qc:h-1 bg-secondary qc:z-0 qc:transition-all qc:duration-500 qc:ease-in-out"
                    :style="{ width: progressWidth }"
                ></div>
                
                <!-- Step Indicators -->
                <div 
                    v-for="(step, index) in steps" 
                    :key="index"
                    class="qc:flex qc:flex-col qc:items-center qc:relative qc:z-10"
                    :style="{ flex: 1 }"
                >
                    <!-- Circle Indicator -->
                    <div 
                        class="qc:w-10 qc:h-10 qc:rounded-full qc:flex qc:items-center qc:justify-center qc:font-semibold qc:transition-all qc:duration-300 qc:border-2"
                        :class="[
                            index < currentStep ? 'passed-step bg-secondary border-secondary' : '',
                            index === currentStep ? 'current-step bg-secondary border-secondary' : '',
                            index > currentStep ? 'upcoming-step' : ''
                        ]"
                    >
                        <!-- Checkmark for completed steps -->
                        <svg v-if="index < currentStep" class="qc:w-5 qc:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        <!-- Step number -->
                        <span v-else>{{ index + 1 }}</span>
                    </div>
                    
                    <!-- Step Title -->
                    <div 
                        class="qc:mt-2 qc:text-xs qc:font-medium qc:text-center qc:transition-all qc:duration-300"
                        :class="[
                            index <= currentStep ? 'passed-step-text' : 'upcoming-step-text'
                        ]"
                    >
                        {{ step.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})