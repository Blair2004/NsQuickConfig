import img from '@img/character-3.png';
import Progress from '../Progress';

declare const defineComponent: any, __: any, nsHttpClient: any, nsSnackBar: any, nsComponents: any, FormValidation: any;

export default defineComponent({
    template: `
    <div class="qc:flex qc:flex-col qc:h-full qc:w-full">
        <Progress class="qc:mt-8" :steps="steps" :progressWidth="progressWidth" :currentStep="currentStep"/>
        <div class="qc:h-[8em] qc:flex-col qc:flex qc:items-center qc:justify-center">
            <h3 class="qc:text-3xl font-semibold mb-2">{{ __('Configure Your Store Identity') }}</h3>
            <p class="text-fontcolor qc:text-center">{{ __("Let's set up the basic information about your store. This will appear on receipts and reports.") }}</p>
        </div>
        <div class="qc:flex-auto qc:flex qc:justify-center qc:items-center qc:flex-row">
            <div class="qc:w-full qc:flex qc:justify-center qc:items-center">
                <div class="">
                    <div class="qc:grid qc:grid-cols-1 qc:md:grid-cols-2 qc:gap-4">
                        <ns-field :field="field" v-for="field of fields"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="qc:mt-8 qc:flex qc:justify-between qc:p-4">
            <ns-button @click="handleBack" type="error">
                {{ __('Back') }}
            </ns-button>
            <div class="qc:flex qc:gap-3">
                <ns-button @click="$emit('skip')" type="default">
                    {{ __('Skip') }}
                </ns-button>
                <ns-button @click="saveAndContinue" type="info" :disabled="saving">
                    <span v-if="!saving">{{ __('Continue') }}</span>
                    <span v-else>{{ __('Saving...') }}</span>
                </ns-button>
            </div>
        </div>
    </div>
    `,
    components: {
        Progress,
    },
    name: 'StoreIdentityStep',
    props: [ 'steps', 'progressWidth', 'currentStep' ],
    data() {
        return {
            loading: false,
            img,
            formData: {
                ns_store_name: '',
                ns_store_email: '',
                ns_store_square_logo: '',
                ns_currency_symbol: '$',
                ns_currency_position: 'before',
                ns_currency_precision: 2
            },
            fields: [],
            errors: {} as Record<string, string>,
            saving: false,
            validation: new FormValidation,
        };
    },
    mounted() {
        this.loadFields();
    },
    methods: {
        __,
        handleBack() {
            this.$emit('previous');
        },
        validateForm() {
            
        },
        loadFields() {
            nsHttpClient.get( '/api/fields/qc.store-identity' )
                .subscribe({
                    next: ( fields: any ) => {
                        const validation = new FormValidation;
                        this.fields = validation.createFields( fields );
                    },
                    error: (error) => {
                        nsSnackBar.error(error.message || __('Failed to load fields'));
                    }
                });
        },
        saveAndContinue() {
            if ( ! this.validation.validateFields( this.fields ) ) {
                return nsSnackBar.error( __('Please correct the errors in the form before continuing.') );
            }

            nsHttpClient.post('/api/ns-quick-config/save-store-identity', this.validation.extractFields( this.fields ) )
                .subscribe({
                    next: (response) => {
                        nsSnackBar.success(response.message);
                        this.$emit('next');
                        this.saving = false;
                    },
                    error: (error) => {
                        nsSnackBar.error(error.message || __('Failed to save store identity'));
                        this.saving = false;
                    }
                });
        }
    }
})
