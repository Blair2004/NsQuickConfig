# 🚀 Quick Start Guide - NsQuickConfig Module

## Module Status: ✅ READY TO USE

The **Quick Store Configuration** module has been successfully created and built!

---

## What It Does

This module displays a beautiful multi-step wizard when users first access the NexoPOS dashboard. The wizard guides them through:

1. **Welcome** - Introduction to the setup process
2. **Store Identity** - Configure store name, email, logo, and currency settings
3. **Printer Configuration** - Connect to print server and set up receipt printing
4. **App Suggestions** - Discover useful NexoPOS extensions and mobile apps

---

## Quick Test (3 Steps)

### 1. Access Dashboard
Open your browser and go to:
```
http://your-nexopos-domain/dashboard
```

### 2. Wizard Appears Automatically
If this is the first time (or if wizard isn't marked complete), you'll see a popup with the welcome screen.

### 3. Walk Through the Steps
- Click "Let's Get Started!" on the welcome screen
- Fill in your store details (name, currency, etc.)
- Optionally configure printer or skip
- View app suggestions and click "Finish Setup"

---

## If Wizard Doesn't Appear

The wizard only shows when:
- ✅ You're on the dashboard home page
- ✅ The wizard hasn't been completed yet

To **reset and show the wizard again**:

```bash
php artisan tinker
```

Then run:
```php
$options = app(\App\Services\Options::class);
$options->set('ns_quick_config_wizard_completed', false);
exit
```

Or via SQL:
```sql
DELETE FROM nexopos_options WHERE `key` = 'ns_quick_config_wizard_completed';
```

---

## Module Files Created

```
modules/NsQuickConfig/
├── ✅ config.xml                      (Module metadata)
├── ✅ NsQuickConfigModule.php         (Entry point)
├── ✅ Http/Controllers/               (API endpoints)
├── ✅ Providers/                      (Service provider)
├── ✅ Listeners/                      (Event listener)
├── ✅ Routes/api.php                  (API routes)
├── ✅ Resources/Views/wizard.blade.php (Blade template)
├── ✅ Resources/ts/                   (Vue components)
├── ✅ Resources/css/style.css         (Styles)
├── ✅ Lang/en.json                    (Translations)
├── ✅ Public/build/                   (Compiled assets)
├── ✅ package.json                    (NPM config)
├── ✅ vite.config.js                  (Build config)
└── ✅ Documentation files             (README, etc.)
```

---

## API Endpoints Available

All endpoints are under `/api/ns-quick-config/` and require authentication:

| Endpoint | Purpose |
|----------|---------|
| `POST /save-step` | Save wizard progress |
| `POST /complete-wizard` | Mark wizard as done |
| `POST /save-store-identity` | Save store settings |
| `POST /fetch-printers` | Get printers from server |
| `POST /test-print` | Send test print |
| `POST /setup-default-printer` | Configure printer |

---

## Key Features

✨ **Multi-step wizard** with 4 well-designed steps
✨ **Form validation** with helpful error messages
✨ **Progress tracking** saves each step
✨ **Skip options** for optional configurations
✨ **Responsive design** works on all screen sizes
✨ **NexoPOS integration** uses native components
✨ **Printer testing** validates print server connection
✨ **App suggestions** with external links
✨ **i18n ready** all text is translatable

---

## Development Commands

```bash
# Navigate to module
cd modules/NsQuickConfig

# Install dependencies (already done ✅)
npm install

# Build for production (already done ✅)
npm run build

# Development mode with hot-reload
npm run dev

# Clear Laravel caches (already done ✅)
cd ../.. && php artisan cache:clear
```

---

## Customization

### Add More Steps
1. Create new step component in `Resources/ts/components/steps/`
2. Add to steps array in `WizardPopup.vue`
3. Create corresponding API endpoint if needed

### Change Translations
Edit `Lang/en.json` or create new language files like `Lang/fr.json`

### Modify Styles
Edit `Resources/css/style.css` for custom styling

### Add API Endpoints
1. Add method to `QuickConfigController.php`
2. Register route in `Routes/api.php`

---

## Troubleshooting

### Wizard doesn't show
- Ensure you're logged in
- Check you're on dashboard home (`/dashboard`)
- Verify wizard isn't marked complete
- Clear browser cache (Ctrl+Shift+R)

### Assets not loading
```bash
cd modules/NsQuickConfig
npm run build
```

### Route errors
```bash
cd /var/www/html/default-v6
php artisan route:clear
php artisan cache:clear
```

### TypeScript errors in dev mode
```bash
cd modules/NsQuickConfig
npm install
# Restart your IDE
```

---

## Documentation

📄 **README.md** - Module overview and features
📄 **INSTALLATION.md** - Detailed installation steps
📄 **MODULE_SUMMARY.md** - Complete technical summary

---

## Next Steps

1. **Test the wizard** by accessing the dashboard
2. **Customize content** to match your needs
3. **Add translations** for multiple languages
4. **Extend functionality** with more steps or features
5. **Share feedback** to improve the module

---

## Support

- Check the documentation files in the module directory
- Review the source code (well-commented)
- Refer to NexoPOS documentation
- Check browser console for JavaScript errors

---

**🎉 Congratulations! Your Quick Store Configuration module is ready!**

Users will now have a smooth onboarding experience when they first access their NexoPOS dashboard.
