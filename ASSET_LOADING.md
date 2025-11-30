# Module Asset Loading Guide

## Using @moduleViteAssets Directive

When including Vite-compiled assets in NexoPOS modules, you must use the `@moduleViteAssets` directive instead of the standard Laravel `@vite` directive.

### Syntax

```blade
@moduleViteAssets('path/to/asset', 'ModuleNamespace')
```

**Parameters:**
1. **Asset Path** (string): Relative path from module root directory
2. **Module Namespace** (string): The module identifier from `config.xml`

### Example from NsQuickConfig

```blade
@push('footer-scripts')
    @moduleViteAssets('Resources/ts/main.ts', 'NsQuickConfig')
    @moduleViteAssets('Resources/css/style.css', 'NsQuickConfig')
    
    <script>
        // Your JavaScript code here
    </script>
@endpush
```

### Complete Example from CloudDeployer Module

```blade
@inject('stripeService', 'Modules\CloudDeployer\Services\StripeService')
<script src="https://js.stripe.com/basil/stripe.js"></script>
<script>
    const stripe = Stripe('{{ $stripeService->getPublicKey() }}');
</script>
@moduleViteAssets('Resources/ts/user-payment-details.ts', 'CloudDeployer')
@moduleViteAssets('Resources/css/style.css', 'CloudDeployer')
```

### Why @moduleViteAssets?

The `@moduleViteAssets` directive:
- Correctly resolves module asset paths
- Handles the module's build manifest
- Ensures proper asset versioning
- Works with hot-reload during development

### Common Mistakes

❌ **Wrong - Using standard @vite:**
```blade
@vite(['modules/NsQuickConfig/Resources/ts/main.ts'])
```

❌ **Wrong - Incorrect path format:**
```blade
@moduleViteAssets('/Resources/ts/main.ts', 'NsQuickConfig')  // Don't include leading slash
```

❌ **Wrong - Using full path:**
```blade
@moduleViteAssets('modules/NsQuickConfig/Resources/ts/main.ts', 'NsQuickConfig')
```

✅ **Correct:**
```blade
@moduleViteAssets('Resources/ts/main.ts', 'NsQuickConfig')
@moduleViteAssets('Resources/css/style.css', 'NsQuickConfig')
```

### Asset Types Supported

You can load any Vite-compiled asset:

**TypeScript/JavaScript:**
```blade
@moduleViteAssets('Resources/ts/main.ts', 'YourModule')
@moduleViteAssets('Resources/js/app.js', 'YourModule')
```

**CSS/SCSS:**
```blade
@moduleViteAssets('Resources/css/style.css', 'YourModule')
@moduleViteAssets('Resources/scss/main.scss', 'YourModule')
```

### Module Vite Configuration

Ensure your `vite.config.js` is properly configured:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vuePlugin from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/',
    plugins: [
        vuePlugin(),
        laravel({
            hotFile: 'Public/hot',
            input: [
                'Resources/css/style.css',
                'Resources/ts/main.ts',
            ],
            refresh: ['Resources/**']
        }),
        tailwindcss(),
    ],
    build: {
        outDir: 'Public/build',
        manifest: true,
        rollupOptions: {
            input: [
                './Resources/css/style.css',
                './Resources/ts/main.ts',
            ],
        }
    }        
});
```

### Build Process

1. **Install dependencies:**
   ```bash
   cd modules/YourModule
   npm install
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Development with hot-reload:**
   ```bash
   npm run dev
   ```

### Output Structure

After building, assets are placed in:
```
modules/YourModule/Public/build/
├── .vite/
│   └── manifest.json
└── assets/
    ├── main-[hash].js
    └── style-[hash].css
```

The `@moduleViteAssets` directive reads the manifest and includes the correct hashed files.

### Troubleshooting

**Assets not loading?**

1. Check build output exists:
   ```bash
   ls -la modules/YourModule/Public/build/
   ```

2. Verify manifest file:
   ```bash
   cat modules/YourModule/Public/build/.vite/manifest.json
   ```

3. Clear caches:
   ```bash
   php artisan cache:clear
   php artisan view:clear
   ```

4. Check browser console for errors

5. Verify module namespace matches `config.xml`:
   ```xml
   <namespace>YourModule</namespace>
   ```

### Best Practices

1. **Always use @push directive** to add assets to footer or header:
   ```blade
   @push('footer-scripts')
       @moduleViteAssets('Resources/ts/main.ts', 'YourModule')
   @endpush
   ```

2. **Load CSS before JS** for proper rendering:
   ```blade
   @moduleViteAssets('Resources/css/style.css', 'YourModule')
   @moduleViteAssets('Resources/ts/main.ts', 'YourModule')
   ```

3. **Keep paths relative** to module root (no leading slash)

4. **Match input in vite.config.js** with loaded assets

5. **Build before deployment** - never rely on source files in production

### Integration with Vue Components

When using Vue components, your main.ts should properly export:

```typescript
import { Popup } from '@/libraries/popup';
import MyComponent from './components/MyComponent.vue';

// Export globally for blade templates
(window as any).myModuleName = {
    showComponent: () => {
        Popup.show(MyComponent);
    }
};

export { MyComponent };
```

Then in your blade file:
```blade
@moduleViteAssets('Resources/ts/main.ts', 'YourModule')

<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof myModuleName !== 'undefined') {
            myModuleName.showComponent();
        }
    });
</script>
```

## Summary

The `@moduleViteAssets` directive is the **standard and correct way** to load Vite-compiled assets in NexoPOS modules. Always use:

```blade
@moduleViteAssets('Resources/path/to/asset', 'ModuleNamespace')
```

This ensures proper asset resolution, versioning, and compatibility with the NexoPOS module system.
