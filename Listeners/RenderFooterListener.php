<?php

namespace Modules\NsQuickConfig\Listeners;

use App\Events\RenderFooterEvent;
use App\Services\Options;

class RenderFooterListener
{
    public function __construct(protected Options $options)
    {
    }

    /**
     * Handle the event.
     */
    public function handle(RenderFooterEvent $event): void
    {
        // Only trigger on dashboard home
        if ($event->routeName === ns()->routeName('ns.dashboard.home')) {
            // Check if wizard has been completed
            $wizardCompleted = $this->options->get('ns_quick_config_wizard_completed', false);

            if (!$wizardCompleted) {
                // Add the wizard view to the footer
                $event->output->addView('NsQuickConfig::wizard', [
                    'data' => [
                        'printAddress' => ns()->option->get( 'ns_pa_server_address' ),
                    ],
                    'step' => ns()->option->get( 'ns_quick_config_current_step' ),
                ]);
            }
        }
    }
}
