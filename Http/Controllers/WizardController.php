<?php

namespace Modules\NsQuickConfig\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Modules\NsPrintAdapter\Models\Printer;
use Exception;

class WizardController extends Controller
{
    public function __construct(protected Options $options)
    {
    }

    /**
     * Mark the wizard as completed
     */
    public function completeWizard()
    {
        $this->options->set('ns_quick_config_wizard_completed', true);
        $this->options->delete('ns_quick_config_current_step');

        return [
            'status' => 'success',
            'message' => __m('Wizard completed successfully!', 'NsQuickConfig'),
        ];
    }

    /**
     * Save the current wizard step
     */
    public function saveStep(Request $request)
    {
        $step = $request->input('step', 0);
        $this->options->set('ns_quick_config_current_step', $step);

        return [
            'status' => 'success',
            'message' => __m('Step saved successfully.', 'NsQuickConfig'),
        ];
    }

    /**
     * Get current wizard state
     */
    public function getWizardState()
    {
        return [
            'status' => 'success',
            'data' => [
                'completed' => $this->options->get('ns_quick_config_wizard_completed', false),
                'current_step' => $this->options->get('ns_quick_config_current_step', 0),
            ],
        ];
    }

    /**
     * Save store identity settings
     */
    public function saveStoreIdentity(Request $request)
    {
        $request->validate([
            'ns_store_name' => 'required|string|max:255',
            'ns_store_email' => 'required|email',
            'ns_currency_symbol' => 'required|string|max:10',
            'ns_currency_position' => 'required|in:before,after',
            'ns_currency_precision' => 'required|integer|min:0|max:10',
        ]);

        // Save store identity options
        $this->options->set('ns_store_name', $request->input('ns_store_name'));
        $this->options->set('ns_store_email', $request->input('ns_store_email'));
        
        if ($request->has('ns_store_square_logo')) {
            $this->options->set('ns_store_square_logo', $request->input('ns_store_square_logo'));
        }

        // Currency settings
        $this->options->set('ns_currency_symbol', $request->input('ns_currency_symbol'));
        $this->options->set('ns_currency_position', $request->input('ns_currency_position'));
        $this->options->set('ns_currency_precision', $request->input('ns_currency_precision'));
        
        // Set currency preference to symbol
        $this->options->set('ns_currency_prefered', 'symbol');

        // Save current step
        $this->options->set('ns_quick_config_current_step', 1);

        return [
            'status' => 'success',
            'message' => __m('Store identity saved successfully!', 'NsQuickConfig'),
        ];
    }

    /**
     * Save print server address
     */
    public function savePrintServer(Request $request)
    {
        $request->validate([
            'server_address' => 'required|url',
        ]);

        $this->options->set('ns_pa_server_address', $request->input('server_address'));

        return [
            'status' => 'success',
            'message' => __m('Print server address saved successfully!', 'NsQuickConfig'),
        ];
    }

    /**
     * Fetch available printers from the print server
     */
    public function fetchPrinters(Request $request)
    {
        $serverAddress = $request->input('server_address');

        if (empty($serverAddress)) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Please provide a print server address.', 'NsQuickConfig'),
            ], 400);
        }

        try {
            // Ensure URL has proper format
            $serverAddress = rtrim($serverAddress, '/');
            $url = $serverAddress . '/api/printers';

            // Make HTTP request to fetch printers
            $response = Http::timeout(10)->get($url);

            if ($response->successful()) {
                $printers = $response->json();

                return [
                    'status' => 'success',
                    'data' => [
                        'printers' => $printers,
                    ],
                ];
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => __m('Failed to fetch printers. Status code: {code}', 'NsQuickConfig', [
                        'code' => $response->status(),
                    ]),
                ], $response->status());
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Error connecting to print server: {error}', 'NsQuickConfig', [
                    'error' => $e->getMessage(),
                ]),
            ], 500);
        }
    }

    /**
     * Test printer by sending a test print job
     */
    public function testPrinter(Request $request)
    {
        $serverAddress = $request->input('server_address');
        $printerName = $request->input('printer_name');

        if (empty($serverAddress) || empty($printerName)) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Server address and printer name are required.', 'NsQuickConfig'),
            ], 400);
        }

        try {
            $serverAddress = rtrim($serverAddress, '/');
            $url = $serverAddress . '/api/print';

            // Test print content
            $testContent = [
                'printer' => $printerName,
                'content' => "===================================\n" .
                             "        TEST PRINT\n" .
                             "===================================\n" .
                             "NexoPOS Quick Configuration\n" .
                             "Test Print Successful!\n" .
                             "Date: " . date('Y-m-d H:i:s') . "\n" .
                             "===================================\n",
            ];

            $response = Http::timeout(15)->post($url, $testContent);

            if ($response->successful()) {
                return [
                    'status' => 'success',
                    'message' => __m('Test print sent successfully!', 'NsQuickConfig'),
                ];
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => __m('Failed to send test print. Please check if the printer is turned on and connected.', 'NsQuickConfig'),
                ], $response->status());
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Error sending test print: {error}. Please verify the printer is turned on and connected to the computer.', 'NsQuickConfig', [
                    'error' => $e->getMessage(),
                ]),
            ], 500);
        }
    }

    /**
     * Set default printer and create printer records
     */
    public function setDefaultPrinter(Request $request)
    {
        $request->validate([
            'server_address' => 'required|url',
            'printers' => 'required|array',
            'default_printer' => 'required|string',
        ]);

        $serverAddress = $request->input('server_address');
        $printers = $request->input('printers');
        $defaultPrinterName = $request->input('default_printer');

        try {
            // Save server address
            $this->options->set('ns_pa_server_address', $serverAddress);

            // First, unset all existing default printers
            Printer::where('is_default', true)->update(['is_default' => false]);

            // Create/update printer records
            foreach ($printers as $printerData) {
                $isDefault = $printerData['name'] === $defaultPrinterName;

                Printer::updateOrCreate(
                    ['identifier' => $printerData['name']],
                    [
                        'name' => $printerData['displayName'] ?? $printerData['name'],
                        'identifier' => $printerData['name'],
                        'interface' => 'ethernet', // Default interface
                        'characterset' => '',
                        'type' => 'epson',
                        'line_character' => '*',
                        'is_default' => $isDefault,
                        'author' => auth()->id(),
                        'status' => $isDefault ? Printer::ENABLED : Printer::DISABLED,
                    ]
                );
            }

            // Save current step
            $this->options->set('ns_quick_config_current_step', 2);

            return [
                'status' => 'success',
                'message' => __m('Default printer set successfully!', 'NsQuickConfig'),
            ];
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Error setting default printer: {error}', 'NsQuickConfig', [
                    'error' => $e->getMessage(),
                ]),
            ], 500);
        }
    }
}
