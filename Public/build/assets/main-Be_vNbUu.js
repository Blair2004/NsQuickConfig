/**
* @vue/shared v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const q=Object.prototype.hasOwnProperty,u=(e,t)=>q.call(e,t),m=e=>typeof e=="symbol",f=(e,t,s,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:s})};/**
* @vue/reactivity v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(m));function p(e){return!u(e,"__v_skip")&&Object.isExtensible(e)&&f(e,"__v_skip",!0),e}const h="/modules/nsquickconfig/build/assets/character-1-BNPYwpbW.png",i=defineComponent({props:["steps","progressWidth","currentStep"],template:`
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
    `}),c=defineComponent({name:"WelcomeStep",data(){return{img:h,components:p({})}},props:["steps","progressWidth","currentStep"],components:{Progress:i},mounted(){console.log(this)},methods:{__},template:`
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
    `}),g="/modules/nsquickconfig/build/assets/character-3-BLsX_AL8.png",o=defineComponent({template:`
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
    `,components:{Progress:i},name:"StoreIdentityStep",props:["steps","progressWidth","currentStep"],data(){return{loading:!1,img:g,formData:{ns_store_name:"",ns_store_email:"",ns_store_square_logo:"",ns_currency_symbol:"$",ns_currency_position:"before",ns_currency_precision:2},fields:[],errors:{},saving:!1,validation:new FormValidation}},mounted(){this.loadFields()},methods:{__,handleBack(){this.$emit("previous")},validateForm(){},loadFields(){nsHttpClient.get("/api/fields/qc.store-identity").subscribe({next:e=>{const t=new FormValidation;this.fields=t.createFields(e)},error:e=>{nsSnackBar.error(e.message||__("Failed to load fields"))}})},saveAndContinue(){if(!this.validation.validateFields(this.fields))return nsSnackBar.error(__("Please correct the errors in the form before continuing."));nsHttpClient.post("/api/ns-quick-config/save-store-identity",this.validation.extractFields(this.fields)).subscribe({next:e=>{nsSnackBar.success(e.message),this.$emit("next"),this.saving=!1},error:e=>{nsSnackBar.error(e.message||__("Failed to save store identity")),this.saving=!1}})}}}),v="/modules/nsquickconfig/build/assets/character-2-kr5_X1Kq.png",l=defineComponent({template:`
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
                                @click="selectedPrinter = printer.name"
                                class="qc:cursor-pointer qc:rounded-lg qc:p-4 qc:border-2 border-secondary"
                                :class="selectedPrinter === printer.name ? 'qc:shadow qc:bg-teal-200' : ''">
                                <div class="qc:flex qc:items-start qc:justify-between">
                                    <div class="qc:flex-1 qc:overflow-y-auto">
                                        <div class="qc:flex qc:md:flex-col qc:justify-between qc:gap-2 qc:mb-2">
                                            <div class="qc:flex qc:gap-2 qc:justify-start">
                                                <label :for="printer.name" class="qc:font-semibold text-fontcolor qc:cursor-pointer">
                                                    {{ printer.displayName || printer.name }}
                                                </label>
                                                <span v-if="printer.isDefault" 
                                                    class="qc:px-2 qc:py-0.5 qc:bg-green-100 qc:text-green-600 qc:text-xs qc:rounded">
                                                    {{ __('System Default') }}
                                                </span>
                                            </div>                                        
                                            <div class="qc:text-sm qc:text-fontcolor">
                                                <p v-if="printer.description">{{ printer.description }}</p>
                                                <p v-if="printer.options && printer.options['printer-make-and-model']">
                                                    {{ __('Model:') }} {{ printer.options['printer-make-and-model'] }}
                                                </p>
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
    `,name:"PrintServerStep",components:{Progress:i},props:["apiUrl","data","steps","progressWidth","currentStep"],data(){return{img:v,printers:[],serverAddress:"",fields:[],validation:new FormValidation,selectedPrinter:null,defaultPrinterSet:!1,printersLoaded:!1,loadingPrinters:!1,testingPrint:!1,settingDefault:!1}},computed:{components(){return nsComponents}},watch:{fields:{deep:!0,handler:function(e){const t=e.find(s=>s.name==="serverAddress");t&&(this.serverAddress=t.value)}},serverAddress(e){e&&e.length>0&&this.isValidUrlOrDomain(e)&&this.loadPrinters()}},mounted(){this.fields=this.validation.createFields([{name:"serverAddress",validation:"required|url",value:this.data.printAddress,label:__("Print Server Address"),description:__("Enter the address where your Nexo Print Server is running. Example: http://localhost:3000","NsQuickConfig")}]),console.log(this.data)},methods:{__,isValidUrlOrDomain(e){const t=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return!!e&&t.test(e)},resetPrinters(){this.printers=[],this.selectedPrinter=null,this.defaultPrinterSet=!1,this.printersLoaded=!1},async loadPrinters(){if(!this.serverAddress){nsSnackBar.error(__("Please enter a print server address"));return}this.loadingPrinters=!0;try{const e=await nsHttpClient.get(`${this.serverAddress}/api/printers`).toPromise();if(this.printers=e||[],this.printersLoaded=!0,console.log(this.printers),this.printers.length>0){nsSnackBar.success(__("Printers loaded successfully"));const t=this.printers.find(s=>s.isDefault);t&&(this.selectedPrinter=t.name)}}catch{this.printersLoaded=!0,this.printers=[]}finally{this.loadingPrinters=!1}},async testPrint(e){this.testingPrint=!0;const t=`
            <?xml version="1.0" encoding="UTF-8"?>
                <configuration>
                    <characterset>${e.characterset||"PC850"}</characterset>
                    <interface>Printer:${e.name}</interface>
                    <type>${e.type||"undefined-type"}</type>
                    <line-character>${e.line_character||"-"}</line-character>
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
            `;try{const s=await nsHttpClient.post(`${this.serverAddress}/api/print`,{printer:e.name,content:t}).toPromise();nsSnackBar.success(__m("The print job was submitted. Please check if anything was printed.","NsQuickConfig"))}catch(s){Popup.show(nsAlertPopup,{title:__("Test Print Failed"),message:__("Failed to send test print. Please check if the printer is turned on and connected to the computer.")+(s.message||"")})}finally{this.testingPrint=!1}},async setAsDefault(e){if(!this.serverAddress){nsSnackBar.error(__("Please set a print server address first"));return}this.settingDefault=!0;try{const t=await nsHttpClient.post("/api/ns-quick-config/set-default-printer",{server_address:this.serverAddress,printers:this.printers,default_printer:e.name}).toPromise();this.defaultPrinterSet=!0,nsSnackBar.success(t.message)}catch(t){nsSnackBar.error(t.message||__("Failed to set default printer"))}finally{this.settingDefault=!1}},skipPrintSetup(){Popup.show(nsConfirmPopup,{title:__("Skip Print Setup"),message:__("Are you sure you want to skip the print setup? You can configure it later in the settings."),onAction:e=>{e&&this.$emit("next","app-suggestion")}})},handleBack(){this.$emit("previous")},handleContinue(){if(!this.defaultPrinterSet){nsSnackBar.error(__("Please set a default printer before continuing"));return}this.$emit("next","app-suggestion")}}}),a=defineComponent({components:{Progress:i},props:["steps","progressWidth","currentStep","apiUrl"],template:`
    <div class="qc:flex qc:flex-col qc:h-full qc:w-full">
        <Progress class="qc:mt-8" :steps="steps" :progressWidth="progressWidth" :currentStep="currentStep"/>
        <div class="qc:h-[10em] qc:flex-col qc:flex qc:items-center qc:justify-center">
            <h3 class="qc:text-3xl font-semibold mb-2">{{ __('Recommended Applications') }}</h3>
            <p class="text-fontcolor">{{ __('Enhance your NexoPOS experience with these powerful applications and extensions.') }}</p>
        </div>

        <div class="qc:flex-auto qc:flex qc:flex-row qc:p-4">
            <div class="qc:max-w-full qc:flex qc:flex-col">

                <div class="qc:flex-auto qc:grid qc:grid-cols-1 qc:md:grid-cols-3 qc:lg:grid-cols-4 qc:gap-6 qc:mb-8">
                    <!-- Gastro Extension -->
                    <div class="qc:border qc:border-gray-200 ns-box qc:rounded-lg qc:p-6 hover:qc:shadow-lg qc:transition-shadow qc:flex qc:flex-col">
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
                    <div class="qc:border ns-box qc:border-gray-200 qc:rounded-lg qc:p-6 hover:qc:shadow-lg qc:transition-shadow qc:flex qc:flex-col">
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
    `,name:"AppSuggestionStep",inject:["nsComponents"],methods:{__,handleBack(){this.$emit("previous")},handleFinish(){this.$emit("complete")}}}),x=()=>{const e={};return typeof nsComponents<"u"&&nsComponents&&Object.keys(nsComponents).forEach(t=>{const s=defineAsyncComponent({loader:()=>Promise.resolve(nsComponents[t]),delay:0,timeout:3e3}),r=t.replace(/([A-Z])/g,"-$1").toLowerCase().replace(/^-/,"");e[r]=s,e[t]=s}),e},d=defineComponent({template:`
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
    `,name:"WizardPopup",components:{WelcomeStep:c,StoreIdentityStep:o,PrinterConfigStep:l,AppSuggestionStep:a,...x()},props:["popup","data","stored-step","redirection"],data(){return{currentStep:void 0,steps:[{component:markRaw(c),title:__("Welcome to NexoPOS")},{component:markRaw(o),title:__("Store Identity")},{component:markRaw(l),title:__("Printer Configuration")},{component:markRaw(a),title:__("Recommended Apps")}]}},computed:{currentStepComponent(){return this.currentStep!==void 0?this.steps[this.currentStep].component:!1},currentStepTitle(){return this.currentStep!==void 0?this.steps[this.currentStep].title:""},progressWidth(){if(this.currentStep!==void 0){const e=this.steps.length-1;return`${this.currentStep/e*100}%`}return"0%"}},mounted(){this.currentStep=this.storedStep},methods:{__,nextStep(e){this.currentStep<this.steps.length-1&&this.currentStep++,this.saveStep()},previousStep(){this.currentStep>0&&this.currentStep--},saveStep(){nsHttpClient.post("/api/ns-quick-config/save-step",{step:this.currentStep}).subscribe({next:e=>{},error:e=>{console.error("Failed to save step:",e)}})},skipWizard(){confirm(__("Are you sure you want to skip the setup wizard? You can always configure these settings later."))&&this.completeWizard()},completeWizard(){nsHttpClient.post("/api/ns-quick-config/complete-wizard").subscribe({next:e=>{nsSnackBar.success(e.message||__("Setup wizard completed!")),this.closeWizard()},error:e=>{nsSnackBar.error(e.message||__("Failed to complete wizard"))}})},closeWizard(){document.location=this.redirection}}}),n=createApp({components:{WizardMain:d},mounted(){},data(){return{mainComponent:p(d)}},methods:{close(){}}});document.addEventListener("DOMContentLoaded",()=>{n.component("ns-button",nsComponents.nsButton),n.component("ns-field",nsComponents.nsField),n.component("ns-input",nsComponents.nsInput),n.component("ns-media-input",nsComponents.nsMediaInput),n.component("ns-media",nsComponents.nsMedia),n.component("ns-select",nsComponents.nsSelect),n.component("ns-close-button",nsComponents.nsCloseButton),n.component("ns-field-description",nsComponents.nsFieldDescription);const e=document.querySelector("body > div"),t=document.getElementById("ns-quick-config-wrapper");e&&t&&e.appendChild(t),n.mount("#ns-quick-config-wrapper")});
