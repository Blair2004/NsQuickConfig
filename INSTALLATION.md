# Quick Store Configuration Module - Installation & Setup Guide

## Overview

The NexoPOS Quick Store Configuration module is a comprehensive wizard-based setup system that guides new users through configuring their store with essential settings.

## Installation Steps

### 1. Module Files Created

The following module structure has been created in `/modules/NsQuickConfig/`:

```
NsQuickConfig/
├── config.xml                                    # Module metadata
├── NsQuickConfigModule.php                       # Main module entry point
├── package.json                                  # NPM dependencies
├── vite.config.js                                # Vite build configuration
├── tailwind.config.js                            # Tailwind CSS config
├── tsconfig.json                                 # TypeScript configuration
├── tsconfig.node.json                            # TypeScript node config
├── README.md                                     # Full documentation
├── Http/
│   └── Controllers/
│       └── WizardController.php                  # API endpoints controller
├── Listeners/
│   └── RenderFooterListener.php                  # Event listener for dashboard home
├── Providers/
│   └── NsQuickConfigServiceProvider.php          # Service provider
├── Routes/
│   └── api.php                                   # API route definitions
├── Resources/
│   ├── Views/
│   │   └── wizard.blade.php                      # Blade template
│   └── ts/
│       ├── main.ts                               # TypeScript entry point
│       └── components/
│           ├── wizard-main.vue                   # Main wizard component
│           └── steps/
│               ├── welcome-step.vue              # Step 1: Welcome
│               ├── store-identity-step.vue       # Step 2: Store Identity
│               ├── print-server-step.vue         # Step 3: Print Server
│               └── app-suggestion-step.vue       # Step 4: App Suggestions
├── Lang/
│   └── en.json                                   # English translations
└── Public/
    └── .gitkeep                                  # Build output directory
```

### 2. Install Dependencies

Navigate to the module directory and install NPM dependencies:

```bash
cd /var/www/html/default-v6/modules/NsQuickConfig
npm install
```

### 3. Build Assets

Build the frontend assets using Vite:

```bash
npm run build
```

For development with hot reload:

```bash
npm run dev
```

### 4. Verify Installation

The module will automatically activate when:
1. A user accesses the dashboard home page (`/dashboard`)
2. The wizard hasn't been completed yet

## Features Implemented

### 1. **Event-Based Trigger System**
- Listens to `RenderFooterEvent` on dashboard home
- Checks if wizard has been completed via `ns_quick_config_wizard_completed` option
- Automatically injects wizard view when needed

### 2. **Multi-Step Wizard Interface**
- Progress indicator showing current step
- Visual feedback for completed steps
- Step navigation with back/forward controls
- State persistence across page reloads

### 3. **Step 1: Welcome**
- Enthusiastic welcome message
- Overview of configuration steps
- Continue or skip options
- Skipping marks wizard as completed

### 4. **Step 2: Store Identity**
Configures:
- Store Name (required)
- Store Email (required, validated)
- Store Logo (optional, with media picker integration)
- Currency Symbol (required)
- Currency Position (before/after amount)
- Currency Precision (0-10 decimal places)
- Live preview of currency formatting
- Full form validation
- Async save with error handling

### 5. **Step 3: Print Server Configuration**
Features:
- Print server address input with validation
- "Load Printers" button to fetch available printers
- Displays printer list with details:
  - Printer name and display name
  - Model information
  - Connection status (Ready/Offline)
  - System default indicator
- Radio button selection for choosing printer
- "Test Print" functionality:
  - Sends test receipt to printer
  - Success/failure feedback with alert popup
  - Error guidance for troubleshooting
- "Set as Default" functionality:
  - Saves print server address
  - Creates printer records in database
  - Sets selected printer as default
  - Enables the printer automatically
- Skip option for users without print server
- Full error handling and user guidance

### 6. **Step 4: App Suggestions**
Features two application cards:

**Gastro Extension:**
- Restaurant management features
- Table/floor management
- Kitchen display system
- Order modifications
- Bill splitting
- Direct link to marketplace

**NexoPOS Authorizer:**
- Mobile authorization app
- Remote approval system
- Discount/price change approval
- Void/refund authorization
- Real-time notifications
- Direct link to Google Play Store

Both cards open links in new tabs.

### 7. **API Endpoints**

All endpoints are accessible at `/api/quick-config/`:

- `POST /complete-wizard` - Mark wizard as completed
- `POST /save-step` - Save current step progress
- `GET /get-wizard-state` - Get wizard completion status and current step
- `POST /save-store-identity` - Save store identity settings
- `POST /save-print-server` - Save print server address
- `POST /fetch-printers` - Fetch available printers from server
- `POST /test-printer` - Send test print to verify connection
- `POST /set-default-printer` - Set default printer and create records

### 8. **Database Integration**

Options stored:
- `ns_quick_config_wizard_completed` - Completion status
- `ns_quick_config_current_step` - Current step for resuming
- `ns_store_name` - Store name
- `ns_store_email` - Store email
- `ns_store_square_logo` - Logo URL
- `ns_currency_symbol` - Currency symbol
- `ns_currency_position` - Symbol position
- `ns_currency_precision` - Decimal places
- `ns_currency_prefered` - Set to "symbol"
- `ns_pa_server_address` - Print server address

Printer records created in `nexopos_printers` table with:
- Printer name and identifier
- Interface settings
- Default status
- Enabled/disabled status

## User Flow

1. **First Login/Dashboard Access:**
   - User accesses dashboard home
   - Wizard popup automatically appears

2. **Welcome Screen:**
   - User sees welcoming message
   - Can choose to continue or skip
   - Skipping ends wizard and marks as completed

3. **Store Identity:**
   - User fills in store details
   - Currency settings with live preview
   - Optional logo upload via media picker
   - Validation ensures all required fields are filled
   - Click Continue to save and proceed

4. **Print Server Setup:**
   - User enters print server URL
   - Clicks "Load Printers" to discover printers
   - Reviews available printers with details
   - Can test print to verify connection
   - Sets a printer as default
   - System saves configuration and creates records
   - Can skip if print server not available

5. **App Suggestions:**
   - User reviews recommended apps
   - Can click to learn more (opens in new tab)
   - Clicks "Finish Setup" to complete
   - Wizard marked as completed

6. **Post-Completion:**
   - Wizard won't show again
   - All settings are saved
   - User can manually configure additional settings

## Testing the Module

### 1. Reset Wizard Status

To test the wizard again, reset the completion status:

```php
// In Tinker or a test route
ns()->option->delete('ns_quick_config_wizard_completed');
ns()->option->delete('ns_quick_config_current_step');
```

### 2. Test Print Server

Make sure you have a Nexo Print Server running:
- Default address: `http://localhost:3000`
- Printer API: `http://localhost:3000/api/printers`
- Print API: `http://localhost:3000/api/print`

### 3. Verify API Endpoints

Test each endpoint using Postman or curl:

```bash
# Get wizard state
curl -X GET http://your-domain/api/quick-config/get-wizard-state

# Save store identity
curl -X POST http://your-domain/api/quick-config/save-store-identity \
  -H "Content-Type: application/json" \
  -d '{
    "ns_store_name": "Test Store",
    "ns_store_email": "test@example.com",
    "ns_currency_symbol": "$",
    "ns_currency_position": "before",
    "ns_currency_precision": 2
  }'
```

## Troubleshooting

### Wizard Not Appearing

1. Check if already completed:
   ```php
   ns()->option->get('ns_quick_config_wizard_completed')
   ```

2. Verify event listener is registered:
   - Check service provider is loaded
   - Verify event listener is in the correct namespace

3. Check browser console for JavaScript errors

### Assets Not Loading

1. Ensure assets are built:
   ```bash
   cd modules/NsQuickConfig
   npm run build
   ```

2. Check `Public/build/` directory exists and contains files

3. Verify Vite configuration is correct

### Print Server Connection Issues

1. Verify print server is running
2. Check firewall settings
3. Ensure correct URL format (http:// or https://)
4. Test printer API directly in browser

### Form Validation Errors

- Check error messages in response
- Verify all required fields are filled
- Ensure email format is valid
- Check currency precision is between 0-10

## Configuration Options

### Disable Wizard

To permanently disable the wizard:

```php
ns()->option->set('ns_quick_config_wizard_completed', true);
```

### Change Wizard Trigger

Modify `Listeners/RenderFooterListener.php` to change when wizard appears:

```php
// Current: appears on dashboard home
if ($event->routeName === ns()->routeName('ns.dashboard.home')) {

// Example: appears on any dashboard page
if (str_starts_with($event->routeName, 'ns.dashboard')) {
```

### Customize Steps

Add or remove steps by modifying the `steps` array in `wizard-main.vue`:

```javascript
steps: [
    { id: 'welcome', label: __('Welcome'), component: 'WelcomeStep' },
    { id: 'store-identity', label: __('Store Identity'), component: 'StoreIdentityStep' },
    // Add your custom step here
    { id: 'custom-step', label: __('Custom'), component: 'CustomStep' },
    { id: 'print-server', label: __('Print Server'), component: 'PrintServerStep' },
    { id: 'app-suggestion', label: __('Apps'), component: 'AppSuggestionStep' }
]
```

## Next Steps

1. **Translations**: Add translations for other languages in `Lang/` directory
2. **Custom Styling**: Modify Tailwind classes in components for branding
3. **Additional Steps**: Extend wizard with more configuration steps
4. **Analytics**: Track wizard completion rates and step abandonment
5. **Help System**: Add contextual help tooltips or links

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review API responses for error messages
- Check browser console and Laravel logs
- Verify all dependencies are installed

## Credits

Developed for NexoPOS v6 following the module architecture and best practices.
