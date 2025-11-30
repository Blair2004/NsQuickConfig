import { Popup } from '~/libraries/popup';
// import { createApp } from 'vue';
import WizardMain from './components/WizardPopup';
import { markRaw } from 'vue';

declare const createApp: any, nsComponents: any;

// Mount Vue app with all nsComponents registered
const app = createApp({
    components: {
        WizardMain,
    },
    mounted() {
        // ...
    },
    data() {
        return {
            mainComponent: markRaw( WizardMain )
        }
    },
    methods: {
        close() {
            // ...
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    app.component( 'ns-button', nsComponents.nsButton );
    app.component( 'ns-field', nsComponents.nsField );
    app.component( 'ns-input', nsComponents.nsInput );
    app.component( 'ns-media-input', nsComponents.nsMediaInput );
    app.component( 'ns-media', nsComponents.nsMedia );
    app.component( 'ns-select', nsComponents.nsSelect );
    app.component( 'ns-close-button', nsComponents.nsCloseButton );
    app.component( 'ns-field-description', nsComponents.nsFieldDescription );
    // Move #ns-quick-config-wrapper to be the last element in body > div
    const targetDiv = document.querySelector('body > div');
    const wrapper = document.getElementById('ns-quick-config-wrapper');
    
    if (targetDiv && wrapper) {
        targetDiv.appendChild(wrapper);
    }
    
    app.mount('#ns-quick-config-wrapper');
});