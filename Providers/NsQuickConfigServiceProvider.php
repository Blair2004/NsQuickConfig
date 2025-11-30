<?php

namespace Modules\NsQuickConfig\Providers;

use App\Classes\AsideMenu;
use App\Classes\Hook;
use App\Events\RenderFooterEvent;
use Illuminate\Support\ServiceProvider;
use Modules\NsQuickConfig\Listeners\RenderFooterListener;

class NsQuickConfigServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Register dashboard menu
        Hook::addFilter('ns-dashboard-menus', function ($menus) {
            // Add Quick Config settings to Settings menu
            if (isset($menus['settings'])) {
                $quickConfigSubmenu = AsideMenu::subMenu(
                    label: __m('Quick Configuration', 'NsQuickConfig'),
                    identifier: 'quick-config-settings',
                    href: ns()->route('ns.dashboard.settings', ['settings' => 'ns_quick_config']),
                    permissions: ['manage.options']
                );

                // Insert after 'general' submenu in settings
                $menus['settings']['childrens'] = array_insert_after(
                    $menus['settings']['childrens'],
                    'general',
                    $quickConfigSubmenu
                );
            }

            return $menus;
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // ...
    }
}
