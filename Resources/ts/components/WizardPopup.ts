import WelcomeStep from './steps/WelcomeStep';
import StoreIdentityStep from './steps/StoreIdentityStep';
import PrinterConfigStep from './steps/PrinterConfigStep';
import AppSuggestionStep from './steps/AppSuggestionStep';

declare const defineComponent: any, nsComponents: any, nsHttpClient: any, nsSnackBar: any, __: any;

// Function that returns async components from nsComponents
const getAsyncComponents = () => {
    const components: Record<string, any> = {};
    
    if (typeof nsComponents !== 'undefined' && nsComponents) {
        Object.keys(nsComponents).forEach((key) => {
            // Create async component wrapper
            const asyncComponent = defineAsyncComponent({
                loader: () => {
                    return Promise.resolve(nsComponents[key]);
                },
                delay: 0,
                timeout: 3000,
            });
            
            // Register with kebab-case: nsButton -> ns-button
            const kebabName = key
                .replace(/([A-Z])/g, '-$1')
                .toLowerCase()
                .replace(/^-/, '');
            components[kebabName] = asyncComponent;
            
            // Also register with PascalCase
            components[key] = asyncComponent;
        });
    }
    
    return components;
};

export default defineComponent({
    template: `
    <div class="qc:shadow-lg qc:w-screen qc:h-screen bg-surface qc:rounded-none! qc:flex qc:flex-col">
    
        <!-- Step Content with Transition -->
        <div class="qc:flex-auto qc:overflow-y-auto ns-box-body">
            <transition name="slide-fade" mode="out-in">
                <component 
                    :steps="steps"
                    :progressWidth="progressWidth"
                    :currentStep="currentStep"
                    :key="currentStep"
                    :is="currentStepComponent"
                    :data="data"
                    @next="nextStep"
                    @previous="previousStep"
                    @skip="skipWizard"
                    @complete="completeWizard"
                />
            </transition>
        </div>
    </div>
    <style>
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }
    .slide-fade-leave-active {
        transition: all 0.3s ease-in;
    }
    .slide-fade-enter-from {
        transform: translateX(20px);
        opacity: 0;
    }
    .slide-fade-leave-to {
        transform: translateX(-20px);
        opacity: 0;
    }
    </style>
    `,
    name: 'WizardPopup',
    components: {
        WelcomeStep,
        StoreIdentityStep,
        PrinterConfigStep,
        AppSuggestionStep,
        // Test with async nsButton
        ...getAsyncComponents(),
    },
    props: ['popup', 'data', 'stored-step', 'redirection' ],
    data() {
        return {
            currentStep: undefined,
            steps: [
                { 
                    component: markRaw(WelcomeStep), 
                    title: __('Welcome to NexoPOS') 
                },
                { 
                    component: markRaw(StoreIdentityStep), 
                    title: __('Store Identity') 
                },
                { 
                    component: markRaw(PrinterConfigStep), 
                    title: __('Printer Configuration') 
                },
                { 
                    component: markRaw(AppSuggestionStep), 
                    title: __('Recommended Apps') 
                }
            ]
        };
    },
    computed: {
        currentStepComponent() {
            if ( this.currentStep !== undefined ) {
                const value = this.steps[this.currentStep].component;
                return value;
            }
            return false;
        },
        currentStepTitle() {
            if ( this.currentStep !== undefined ) {
                return this.steps[this.currentStep].title;
            }
            return '';
        },
        progressWidth() {
            if ( this.currentStep !== undefined ) {
                // Calculate progress percentage based on current step
                const totalSteps = this.steps.length - 1;
                const progress = (this.currentStep / totalSteps) * 100;
                return `${progress}%`;
            }
            return '0%';
        }
    },
    mounted() {
        // ...
        this.currentStep = this.storedStep;
    },
    methods: {
        __,
        nextStep(data?: any) {       
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
            }
            // Save current step
            this.saveStep();
        },
        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },
        saveStep() {
            nsHttpClient.post('/api/ns-quick-config/save-step', {
                step: this.currentStep
            }).subscribe({
                next: (response) => {
                },
                error: (error) => {
                    console.error('Failed to save step:', error);
                }
            });
        },
        skipWizard() {
            if (confirm(__('Are you sure you want to skip the setup wizard? You can always configure these settings later.'))) {
                this.completeWizard();
            }
        },
        completeWizard() {
            nsHttpClient.post('/api/ns-quick-config/complete-wizard').subscribe({
                next: (response) => {
                    nsSnackBar.success(response.message || __('Setup wizard completed!'));
                    this.closeWizard();
                },
                error: (error) => {
                    nsSnackBar.error(error.message || __('Failed to complete wizard'));
                }
            });
        },
        closeWizard() {
            document.location = this.redirection;
        }
    }
})