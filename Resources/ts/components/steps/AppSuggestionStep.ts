declare const defineComponent: any;

import Progress from '../Progress';

export default defineComponent({
    components: {
        Progress,
    },
    props: ['steps', 'progressWidth', 'currentStep', 'apiUrl' ],
    template: `
    <div class="qc:flex qc:flex-col qc:h-full qc:w-full">
        <Progress class="qc:mt-8" :steps="steps" :progressWidth="progressWidth" :currentStep="currentStep"/>
        <div class="qc:h-[10em] qc:flex-col qc:flex qc:items-center qc:justify-center">
            <h3 class="qc:text-3xl font-semibold mb-2">{{ __('Recommended Applications') }}</h3>
            <p class="text-fontcolor">{{ __('Enhance your NexoPOS experience with these powerful applications and extensions.') }}</p>
        </div>

        <div class="qc:flex-auto qc:flex qc:flex-row qc:p-4">
            <div class="qc:max-w-full qc:flex qc:flex-col">

                <div class="qc:flex-auto qc:grid qc:grid-cols-1 qc:md:grid-cols-3 qc:lg:grid-cols-4 qc:xl:grid-cols-5 qc:gap-6 qc:mb-8">
                    <!-- Gastro Extension -->
                    <div class="qc:border qc:border-gray-200 qc:rounded-lg qc:p-6 hover:qc:shadow-lg qc:transition-shadow qc:flex qc:flex-col">
                        <div class="qc:flex qc:items-start qc:gap-4 qc:mb-4">
                            <div class="qc:w-16 qc:h-16 qc:bg-gradient-to-br qc:from-orange-400 qc:to-red-500 qc:rounded-lg qc:flex qc:items-center qc:justify-center qc:flex-shrink-0">
                                <svg class="qc:w-8 qc:h-8 qc:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <div class="qc:flex-1">
                                <h3 class="qc:text-xl qc:font-bold qc:mb-2">{{ __('Gastro - Restaurant Extension') }}</h3>
                                <span class="qc:inline-block qc:px-2 qc:py-1 qc:bg-blue-100 qc:text-blue-800 qc:text-xs qc:rounded qc:mb-2">
                                    {{ __('Premium Extension') }}
                                </span>
                            </div>
                        </div>
                        
                        <p class="text-fontcolor qc:mb-4">
                            {{ __('Transform NexoPOS into a complete restaurant management system with table management, kitchen display, order modifications, and more.') }}
                        </p>
                        
                        <ul class="qc:space-y-2 qc:mb-6 qc:flex-auto">
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Visual table management and floor planning') }}</span>
                            </li>
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Kitchen display system for order tracking') }}</span>
                            </li>
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Order modifications and special requests') }}</span>
                            </li>
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Split bills and separate payments') }}</span>
                            </li>
                        </ul>
                        
                        <a href="https://my.nexopos.com/en/marketplace/item/gastro-4x-restaurant-extension-for-nexopos-4x" 
                        target="_blank"
                        class="qc:block qc:w-full qc:text-center qc:bg-gradient-to-r qc:from-orange-400 qc:to-red-500 qc:text-white qc:font-semibold qc:py-3 qc:rounded-lg hover:qc:from-orange-500 hover:qc:to-red-600 qc:transition-colors">
                            {{ __('Learn More') }} →
                        </a>
                    </div>
                    
                    <!-- NexoPOS Authorizer -->
                    <div class="qc:border qc:border-gray-200 qc:rounded-lg qc:p-6 hover:qc:shadow-lg qc:transition-shadow qc:flex qc:flex-col">
                        <div class="qc:flex qc:items-start qc:gap-4 qc:mb-4">
                            <div class="qc:w-16 qc:h-16 qc:bg-gradient-to-br qc:from-blue-400 qc:to-indigo-500 qc:rounded-lg qc:flex qc:items-center qc:justify-center qc:flex-shrink-0">
                                <svg class="qc:w-8 qc:h-8 qc:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div class="qc:flex-1">
                                <h3 class="qc:text-xl qc:font-bold qc:mb-2">{{ __('NexoPOS Authorizer') }}</h3>
                                <span class="qc:inline-block qc:px-2 qc:py-1 qc:bg-green-100 qc:text-green-800 qc:text-xs qc:rounded qc:mb-2">
                                    {{ __('Free Mobile App') }}
                                </span>
                            </div>
                        </div>
                        
                        <p class="text-fontcolor qc:mb-4">
                            {{ __('A mobile app that allows managers to approve special actions on the POS remotely, ensuring better control and security.') }}
                        </p>
                        
                        <ul class="qc:space-y-2 qc:mb-6 qc:flex-auto">
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Approve discounts and price changes remotely') }}</span>
                            </li>
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Authorize void orders and refunds') }}</span>
                            </li>
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Real-time notifications for approval requests') }}</span>
                            </li>
                            <li class="qc:flex qc:items-start qc:text-sm">
                                <svg class="qc:w-5 qc:h-5 qc:text-green-500 qc:mr-2 qc:flex-shrink-0 qc:mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ __('Available on Android devices') }}</span>
                            </li>
                        </ul>
                        
                        <a href="https://play.google.com/store/apps/details?id=com.nexopos.permission_access_nexopos" 
                        target="_blank"
                        class="qc:block qc:w-full qc:text-center qc:bg-gradient-to-r qc:from-blue-400 qc:to-indigo-500 qc:text-white qc:font-semibold qc:py-3 qc:rounded-lg hover:qc:from-blue-500 hover:qc:to-indigo-600 qc:transition-colors">
                            {{ __('Download on Google Play') }} →
                        </a>
                    </div>
                </div>

                <!-- Actions -->
                <div class="qc:flex qc:justify-between qc:gap-3 qc:mt-8">
                    <ns-button @click="handleBack" type="error">
                        {{ __('Back') }}
                    </ns-button>
                    <ns-button @click="handleFinish" type="info">
                        {{ __('Finish Setup') }}
                    </ns-button>
                </div>
            </div>
        </div>
    </div>
    `,
    
    name: 'AppSuggestionStep',
    inject: ['nsComponents'],
    
    methods: {
        __,
        
        handleBack() {
            this.$emit('previous');
        },
        
        handleFinish() {
            this.$emit('complete');
        }
    }
})
