import img from '@img/character-2.png';
import Progress from '../Progress';

declare const defineComponent: any;
declare const FormValidation: any, nsComponents: any, nsHttpClient: any, nsSnackBar: any, Popup: any, nsAlertPopup: any, nsConfirmPopup: any;

export default defineComponent({
    template: `
    <div class="qc:flex qc:flex-col qc:h-full qc:w-full">
        <Progress class="qc:mt-8" :steps="steps" :progressWidth="progressWidth" :currentStep="currentStep"/>
        <div class="qc:h-[10em] qc:flex-col qc:flex qc:items-center qc:justify-center">
            <h3 class="qc:text-3xl font-semibold mb-2">{{ __('Configure Print Server') }}</h3>
            <p class="text-fontcolor">{{ __('Set up your Nexo Print Server to enable receipt printing for your store.') }}</p>
        </div>
        <div class="qc:flex-auto qc:flex qc:flex-row qc:px-8 qc:overflow-y-hidden">
            <div class="qc:w-full qc:flex qc:justify-center qc:items-start qc:pr-8">
                <div class="qc:max-w-full qc:h-full qc:flex qc:flex-auto qc:flex-col qc:md:max-w-[30vw] qc:overflow-hidden">
                    <div class="qc:flex qc:gap-2">
                        <ns-field v-for="field of fields" :field="field"></ns-field>
                    </div>

                    <h3 class="qc:font-semibold qc:text-fontcolor qc:mb-4">{{ __('Available Printers') }}</h3>
                    
                    <div v-if="printers.length > 0" class="qc:border-2 border-secondary qc:rounded-lg qc:p-4 qc:flex-auto qc:overflow-y-auto">   
                        <div class="qc:space-y-3">
                            <div v-for="printer in printers" 
                                :key="printer.name"
                                class="qc:rounded-lg qc:p-4 qc:border-2 border-secondary"
                                :class="selectedPrinter === printer.name ? 'qc:shadow bg-secondary' : ''">
                                <div class="qc:flex qc:items-start qc:justify-between">
                                    <div class="qc:flex-1 qc:overflow-y-auto">
                                        <div class="qc:flex qc:items-center qc:justify-between qc:gap-2 qc:mb-2">
                                            <div class="qc:flex qc:gap-2 qc:justify-center">
                                                <input 
                                                    type="radio"
                                                    :id="printer.name"
                                                    :value="printer.name"
                                                    v-model="selectedPrinter"
                                                    class="qc:w-4 qc:h-4 qc:text-blue-600"
                                                />
                                                <label :for="printer.name" class="qc:font-semibold text-white qc:cursor-pointer">
                                                    {{ printer.displayName || printer.name }}
                                                </label>
                                                <span v-if="printer.isDefault" 
                                                    class="qc:px-2 qc:py-0.5 qc:bg-green-100 qc:text-green-600 qc:text-xs qc:rounded">
                                                    {{ __('System Default') }}
                                                </span>
                                            </div>
                                            <div v-if="selectedPrinter === printer.name" class="qc:flex qc:gap-2 qc:items-center qc:text-sm">
                                                <ns-button :label="__m( 'Test Print', 'NsQuickConfig' )" @click="testPrint(printer)" size="sm" :disabled="testingPrint">
                                                    <i class="las la-print qc:mr-2"></i> {{ __m( 'Test', 'NsQuickConfig' ) }} 
                                                </ns-button>
                                                <ns-button @click="setAsDefault(printer)" type="success" size="sm" :disabled="settingDefault" class="qc:text-sm">
                                                    <span v-if="settingDefault"><i class="las la-spinner"></i></span>
                                                    <span v-else><i class="las la-check qc:mr-2"></i> {{ __m( 'Select', 'NsQuickConfig' ) }} </span>
                                                </ns-button>
                                            </div>
                                        </div>
                                        
                                        <div class="qc:text-sm qc:text-fontcolor qc:ml-6">
                                            <p v-if="printer.description">{{ printer.description }}</p>
                                            <p v-if="printer.options && printer.options['printer-make-and-model']">
                                                {{ __('Model:') }} {{ printer.options['printer-make-and-model'] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <!-- No Printers Found -->
                    <div v-else-if="printersLoaded && printers.length === 0" 
                        class="qc:border qc:border-yellow-200 qc:bg-yellow-50 qc:rounded-lg qc:p-4 qc:text-center">
                        <p class="qc:text-yellow-800">
                            {{ __('No printers found. Please make sure:') }}
                        </p>
                        <ul class="qc:text-sm qc:text-yellow-700 qc:mt-2 qc:text-left qc:list-disc qc:list-inside">
                            <li>{{ __('The Nexo Print Server is running') }}</li>
                            <li>{{ __('Your printer is connected and turned on') }}</li>
                            <li>{{ __('The server address is correct') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="qc:mt-8 qc:flex qc:justify-between qc:p-4">
            <ns-button @click="handleBack" class="qc:mr-4" type="error">
                {{ __('Back') }}
            </ns-button>
            <div class="qc:flex qc:gap-4">
                <ns-button @click="skipPrintSetup" type="warning" size="sm">
                    {{ __('Skip Print Setup') }}
                </ns-button>
                <ns-button @click="handleContinue" type="info" :disabled="saving">
                    <span v-if="!saving">{{ __('Continue') }}</span>
                    <span v-else>{{ __('Saving...') }}</span>
                </ns-button>
            </div>
        </div>
    </div>
    `,
    name: 'PrintServerStep',
    components: {
        Progress,
    },
    props: [ 'apiUrl','data', 'steps', 'progressWidth', 'currentStep' ],
    data() {
        return {
            img,
            printers: [],
            serverAddress: '',
            fields: [],
            validation: new FormValidation,
            selectedPrinter: null,
            defaultPrinterSet: false,
            printersLoaded: false,
            loadingPrinters: false,
            testingPrint: false,
            settingDefault: false
        };
    },

    computed: {
        components() {
            return nsComponents;
        },
    },

    watch: {
        fields: {
            deep: true,
            handler: function( val ) {
                const field = val.find( ( f: any ) => f.name === 'serverAddress' );
                if ( field ) {
                    this.serverAddress = field.value;
                }
            }
        },
        serverAddress( val ) {
            // Validate URL/domain format before loading printers
            if ( val && val.length > 0 && this.isValidUrlOrDomain(val) ) {
                this.loadPrinters();
            }
        }
    },

    mounted() {
        this.fields = this.validation.createFields([
            {
                name: 'serverAddress',
                validation: 'required|url',
                value: this.data.printAddress,
                label: __('Print Server Address'),
                description: __('Enter the address where your Nexo Print Server is running. Example: http://localhost:3000', 'NsQuickConfig' )
            }
        ]);
        console.log( this.data );
    },
    
    methods: {
        __,

        isValidUrlOrDomain(value: string) {
            // Simple regex to validate URL or domain
            const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!value && urlPattern.test(value);
        },
        
        resetPrinters() {
            this.printers = [];
            this.selectedPrinter = null;
            this.defaultPrinterSet = false;
            this.printersLoaded = false;
        },
        
        async loadPrinters() {
            if (!this.serverAddress) {
                nsSnackBar.error(__('Please enter a print server address'));
                return;
            }
            
            this.loadingPrinters = true;
            
            try {
                const printers = await nsHttpClient.get(
                    `${this.serverAddress}/api/printers`,
                ).toPromise();
                
                this.printers = printers || [];
                this.printersLoaded = true;

                console.log( this.printers );
                
                if (this.printers.length > 0) {
                    nsSnackBar.success(__('Printers loaded successfully'));
                    
                    // Auto-select the default printer if available
                    const defaultPrinter = this.printers.find(p => p.isDefault);
                    if (defaultPrinter) {
                        this.selectedPrinter = defaultPrinter.name;
                    }
                }
            } catch (error) {
                this.printersLoaded = true;
                this.printers = [];
            } finally {
                this.loadingPrinters = false;
            }
        },
        
        async testPrint(printer) {
            this.testingPrint = true;

            const content = `
            <${'?xml version="1.0" encoding="UTF-8"?'}>
                <configuration>
                    <characterset>${printer.characterset || 'PC850'}</characterset>
                    <interface>Printer:${printer.name}</interface>
                    <type>${printer.type || 'undefined-type'}</type>
                    <line-character>${printer.line_character || '-' }</line-character>
                </configuration>
                <document>
                    <double-width size="3:3">
                        <align mode="center">
                            <bold>
                                    <text-line>Test Print</text-line>
                            </bold>
                        </align>
                    </double-width>
                    <line-feed/>
                    <align mode="center">
                        <text-line>This test confirm NexoPOS is able to communicate with Nexo Print Server</text-line> 
                    </align>
                    <align mode="center">
                        <text-line>Additionnally this test is made to ensure every options offered by Nexo Print Server are supported by the current printer</text-line>
                    </align>
                    <line-feed/>
                    <invert>
                        <bold>
                            <text-line>Text Alignment</text-line>
                        </bold>
                    </invert>                            
                    <align mode="left">
                        <text-line size="1:2">Aligned Left</text-line>
                    </align>
                    <align mode="right">
                        <text-line size="1:2">Aligned Right</text-line>
                    </align>
                    <align mode="center">
                        <text-line size="1:2">Aligned Center</text-line>
                    </align>
                    <line-feed/>
                    <invert>
                        <bold>
                            <text-line>Text Size & Weight</text-line>
                        </bold>
                    </invert>   
                    <bold>
                        <text-line>Bold Text</text-line>
                    </bold>
                    <quad-size>
                        <text-line>Quart Size</text-line>
                    </quad-size>
                    <double-width>
                        <text-line>Double Width</text-line>
                    </double-width>
                    <double-height>
                        <text-line>Double Height</text-line>
                    </double-height>
                    <invert>
                        <bold>
                            <text-line>Image And Barcode</text-line>
                        </bold>
                    </invert>   
                    <align mode="center">
                        <image>https://user-images.githubusercontent.com/5265663/162700085-40ed00ca-9154-42cb-850a-ccf1c2db2d5d.png</image>
                    </align>
                    <line-separator/>
                    <line-feed></line-feed>
                    <full-cut/>
                </document>
            `
            
            try {
                const response = await nsHttpClient.post(
                    `${this.serverAddress}/api/print`, {
                        printer: printer.name,
                        content
                    }
                ).toPromise();
                
                Popup.show(nsAlertPopup, {
                    title: __('Test Print Sent'),
                    message: __('A test receipt has been sent to the printer. Did you receive the printout?'),
                });
            } catch (error) {
                Popup.show(nsAlertPopup, {
                    title: __('Test Print Failed'),
                    message: __('Failed to send test print. Please check if the printer is turned on and connected to the computer.') + (error.message || ''),
                });
            } finally {
                this.testingPrint = false;
            }
        },
        
        async setAsDefault(printer) {
            if (!this.serverAddress) {
                nsSnackBar.error(__('Please set a print server address first'));
                return;
            }
            
            this.settingDefault = true;
            
            try {
                const response = await nsHttpClient.post(
                    `/api/ns-quick-config/set-default-printer`,
                    {
                        server_address: this.serverAddress,
                        printers: this.printers,
                        default_printer: printer.name
                    }
                ).toPromise();
                
                this.defaultPrinterSet = true;
                nsSnackBar.success(response.message);
            } catch (error) {
                nsSnackBar.error(error.message || __('Failed to set default printer'));
            } finally {
                this.settingDefault = false;
            }
        },
        
        skipPrintSetup() {
            Popup.show( nsConfirmPopup, {
                title: __('Skip Print Setup'),
                message: __('Are you sure you want to skip the print setup? You can configure it later in the settings.'),
                onAction: ( action ) => {
                    if ( action ) {
                        this.$emit('next', 'app-suggestion');
                    }
                }
            });
        },
        
        handleBack() {
            this.$emit('previous');
        },
        
        handleContinue() {
            if (!this.defaultPrinterSet) {
                nsSnackBar.error(__('Please set a default printer before continuing'));
                return;
            }
            
            this.$emit('next', 'app-suggestion');
        }
    }
})