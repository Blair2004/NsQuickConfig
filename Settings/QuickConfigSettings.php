<?php

namespace Modules\NsQuickConfig\Settings;

use App\Classes\FormInput;
use App\Classes\SettingForm;
use App\Services\SettingsPage;

class QuickConfigSettings extends SettingsPage
{
    const IDENTIFIER = 'ns_quick_config';

    const AUTOLOAD = true;

    public function __construct()
    {
        $this->form = SettingForm::form(
            title: __m('Quick Configuration Settings', 'NsQuickConfig'),
            description: __m('Manage the Quick Configuration wizard settings.', 'NsQuickConfig'),
            tabs: SettingForm::tabs(
                $this->getWizardSettings(),
            )
        );
    }

    public function getWizardSettings()
    {
        $wizardCompleted = ns()->option->get('ns_quick_config_wizard_completed', false);
        $currentStep = ns()->option->get('ns_quick_config_current_step', 0);

        return SettingForm::tab(
            identifier: 'wizard',
            label: __m('Wizard Configuration', 'NsQuickConfig'),
            fields: SettingForm::fields(
                FormInput::switch(
                    name: 'ns_quick_config_wizard_completed',
                    value: $wizardCompleted,
                    label: __m('Wizard Status', 'NsQuickConfig'),
                    description: __m('Enable or disable the setup wizard. When disabled, the wizard will appear on next dashboard login.', 'NsQuickConfig'),
                    options: [
                        [
                            'label' => __m('Completed', 'NsQuickConfig'),
                            'value' => true,
                        ],
                        [
                            'label' => __m('Not Completed', 'NsQuickConfig'),
                            'value' => false,
                        ],
                    ],
                ),
                FormInput::select(
                    name: 'ns_quick_config_current_step',
                    value: $currentStep,
                    label: __m('Current Wizard Step', 'NsQuickConfig'),
                    description: __m('Select which step the wizard should start from when reopened.', 'NsQuickConfig'),
                    options: [
                        [
                            'label' => __m('Welcome', 'NsQuickConfig'),
                            'value' => 0,
                        ],
                        [
                            'label' => __m('Store Identity', 'NsQuickConfig'),
                            'value' => 1,
                        ],
                        [
                            'label' => __m('Print Server', 'NsQuickConfig'),
                            'value' => 2,
                        ],
                        [
                            'label' => __m('App Suggestions', 'NsQuickConfig'),
                            'value' => 3,
                        ],
                    ],
                ),
            ),
            notices: [
                [
                    'type' => 'info',
                    'description' => __m('To reset and show the wizard again, set the Wizard Status to "Not Completed" and save. The wizard will appear on the next dashboard refresh.', 'NsQuickConfig'),
                ],
                [
                    'type' => 'warning',
                    'description' => __m('Resetting the wizard will not delete any previously saved settings (store name, email, currency, etc.). It will only trigger the wizard to appear again.', 'NsQuickConfig'),
                ],
            ]
        );
    }
}
