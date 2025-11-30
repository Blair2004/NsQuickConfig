# NexoPOS Quick Store Configuration Module

A wizard-based quick setup module that helps users configure their NexoPOS store with essential settings in just a few simple steps.

## Features

- **Welcome Step**: Introduces users to the setup wizard with an enthusiastic message
- **Store Identity Configuration**: Set up store name, email, logo, and currency settings
- **Print Server Setup**: Configure Nexo Print Server and default receipt printer
- **App Suggestions**: Discover recommended applications and extensions

## Installation

1. Place the module in the `/modules/NsQuickConfig` directory
2. Install dependencies:
   ```bash
   cd modules/NsQuickConfig
   npm install
   ```
3. Build the frontend assets:
   ```bash
   npm run build
   ```
4. The module will automatically activate when accessing the dashboard home

## How It Works

### Automatic Trigger
The wizard automatically appears when:
- The user accesses the dashboard home page
- The wizard hasn't been completed yet (tracked via `ns_quick_config_wizard_completed` option)

### Wizard Steps

#### 1. Welcome Step
- Welcomes the user with an enthusiastic message
- Explains what will be configured
- Options to continue or skip the wizard
- Skipping marks the wizard as completed

#### 2. Store Identity
Configures essential store information:
- **Store Name** (required)
- **Store Email** (required)
- **Store Logo** (optional) - with media picker
- **Currency Symbol** (required)
- **Currency Position** - before or after amount
- **Currency Precision** - decimal places (0-10)

Settings are saved asynchronously before moving to the next step.

#### 3. Print Server Configuration
Sets up receipt printing:
- **Server Address Input** - URL of the Nexo Print Server
- **Load Printers Button** - Fetches available printers from the server
- **Printer List** - Shows all available printers with details
- **Test Print** - Sends a test receipt to verify printer connection
- **Set as Default** - Marks a printer as the default and saves configuration

Features:
- Validates server connectivity
- Displays printer status (Ready/Offline)
- Shows printer model and details
- Option to skip if print server isn't available yet

#### 4. App Suggestions
Recommends useful applications:

**Gastro Extension**
- Restaurant management features
- Table management
- Kitchen display system
- Order modifications
- Split bills
- Links to marketplace

**NexoPOS Authorizer**
- Mobile app for remote approvals
- Discount authorization
- Order void/refund approval
- Real-time notifications
- Links to Google Play Store

Both cards open in new tabs when clicked.

## API Endpoints

### POST `/api/quick-config/complete-wizard`
Marks the wizard as completed.

### POST `/api/quick-config/save-step`
Saves the current wizard step progress.

**Parameters:**
- `step` - Current step identifier

### GET `/api/quick-config/get-wizard-state`
Retrieves the current wizard state.

**Response:**
```json
{
  "status": "success",
  "data": {
    "completed": false,
    "current_step": "store-identity"
  }
}
```

### POST `/api/quick-config/save-store-identity`
Saves store identity settings.

**Parameters:**
- `ns_store_name` (required)
- `ns_store_email` (required, email)
- `ns_store_square_logo` (optional)
- `ns_currency_symbol` (required)
- `ns_currency_position` (required, before|after)
- `ns_currency_precision` (required, integer 0-10)

### POST `/api/quick-config/fetch-printers`
Fetches available printers from the print server.

**Parameters:**
- `server_address` (required, URL)

**Response:**
```json
{
  "status": "success",
  "data": {
    "printers": [
      {
        "name": "EPSON TM-T20II",
        "displayName": "EPSON TM-T20II Receipt",
        "description": "",
        "status": 0,
        "isDefault": true,
        "options": {
          "printer-location": "",
          "printer-make-and-model": "EPSON TM-T20II Receipt5"
        }
      }
    ]
  }
}
```

### POST `/api/quick-config/test-printer`
Sends a test print to verify printer connection.

**Parameters:**
- `server_address` (required, URL)
- `printer_name` (required, string)

### POST `/api/quick-config/set-default-printer`
Sets a printer as the default and creates printer records.

**Parameters:**
- `server_address` (required, URL)
- `printers` (required, array)
- `default_printer` (required, string)

## Configuration Options

The module uses the following NexoPOS options:

- `ns_quick_config_wizard_completed` - Tracks wizard completion status
- `ns_quick_config_current_step` - Stores the current wizard step
- `ns_store_name` - Store name
- `ns_store_email` - Store email
- `ns_store_square_logo` - Store logo URL
- `ns_currency_symbol` - Currency symbol
- `ns_currency_position` - Currency position (before/after)
- `ns_currency_precision` - Decimal places for currency
- `ns_currency_prefered` - Set to "symbol" when saving
- `ns_pa_server_address` - Print server address

## Development

### Build for Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### File Structure
```
NsQuickConfig/
├── config.xml                           # Module metadata
├── NsQuickConfigModule.php              # Main module class
├── Http/
│   └── Controllers/
│       └── WizardController.php         # API controller
├── Listeners/
│   └── RenderFooterListener.php         # Event listener
├── Providers/
│   └── NsQuickConfigServiceProvider.php # Service provider
├── Routes/
│   └── api.php                          # API routes
├── Resources/
│   ├── Views/
│   │   └── wizard.blade.php             # Blade view
│   └── ts/
│       ├── main.ts                      # Entry point
│       └── components/
│           ├── wizard-main.vue          # Main wizard component
│           └── steps/
│               ├── welcome-step.vue
│               ├── store-identity-step.vue
│               ├── print-server-step.vue
│               └── app-suggestion-step.vue
├── Lang/
│   └── en.json                          # English translations
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Dependencies

- Vue 3.4+
- Vite 5.0+
- Tailwind CSS 4.0+
- NexoPOS Core Components

## License

This module is part of NexoPOS and follows the same license.

## Support

For issues or questions, please contact NexoPOS support.
