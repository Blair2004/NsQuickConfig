<?php

namespace Modules\NsQuickConfig\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\Options;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Modules\NsPrintAdapter\Models\Printer;

class QuickConfigController extends Controller
{
    public function __construct(
        protected Options $options
    ) {
    }

    /**
     * Save the wizard step
     */
    public function saveStep(Request $request)
    {
        try {
            $step = $request->input('step');
            
            $this->options->set('ns_quick_config_current_step', $step);
            
            return response()->json([
                'status' => 'success',
                'message' => __m('Step saved successfully.', 'NsQuickConfig')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark wizard as completed
     */
    public function completeWizard(Request $request)
    {
        try {
            $this->options->set('ns_quick_config_wizard_completed', true);
            $this->options->set('ns_quick_config_completed_at', now());
            
            return response()->json([
                'status' => 'success',
                'message' => __m('Wizard completed successfully!', 'NsQuickConfig')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reset the wizard to show it again
     */
    public function resetWizard(Request $request)
    {
        try {
            $this->options->set('ns_quick_config_wizard_completed', false);
            $this->options->set('ns_quick_config_current_step', 'welcome');
            
            return response()->json([
                'status' => 'success',
                'message' => __m('Wizard has been reset. Refresh the page to see the wizard again.', 'NsQuickConfig')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save store identity settings
     */
    public function saveStoreIdentity(Request $request)
    {
        try {
            $request->validate([
                'ns_store_name' => 'required|string|max:255',
                'ns_store_email' => 'nullable|email',
                'ns_currency_symbol' => 'required|string',
                'ns_currency_precision' => 'required|integer|min:0|max:4',
            ]);

            $settings = [
                'ns_store_name' => $request->input('ns_store_name'),
                'ns_store_email' => $request->input('ns_store_email'),
                'ns_store_square_logo' => $request->input('ns_store_square_logo'),
                'ns_currency_symbol' => $request->input('ns_currency_symbol'),
                'ns_currency_position' => $request->input('ns_currency_position', 'before'),
                'ns_currency_prefered' => 'symbol', // Set to symbol as specified
                'ns_currency_precision' => $request->input('ns_currency_precision'),
            ];

            foreach ($settings as $key => $value) {
                $this->options->set($key, $value);
            }

            return response()->json([
                'status' => 'success',
                'message' => __m('Store identity saved successfully!', 'NsQuickConfig')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Fetch available printers from print server
     */
    public function fetchPrinters(Request $request)
    {
        try {
            $serverAddress = $request->input('server_address');
            
            if (empty($serverAddress)) {
                return response()->json([
                    'status' => 'error',
                    'message' => __m('Server address is required.', 'NsQuickConfig')
                ], 422);
            }

            // Ensure the URL has the proper format
            $url = rtrim($serverAddress, '/') . '/api/printers';

            $response = Http::timeout(10)->get($url);

            if ($response->successful()) {
                return response()->json([
                    'status' => 'success',
                    'data' => $response->json()
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => __m('Failed to fetch printers from server.', 'NsQuickConfig')
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Could not connect to print server. Please check the address and try again.', 'NsQuickConfig')
            ], 500);
        }
    }

    /**
     * Test print functionality
     */
    public function testPrint(Request $request)
    {
        try {
            $serverAddress = $request->input('server_address');
            $printerName = $request->input('printer_name');

            if (empty($serverAddress) || empty($printerName)) {
                return response()->json([
                    'status' => 'error',
                    'message' => __m('Server address and printer name are required.', 'NsQuickConfig')
                ], 422);
            }

            $url = rtrim($serverAddress, '/') . '/api/print';

            $testContent = "NexoPOS Quick Config Test Print\n";
            $testContent .= "================================\n";
            $testContent .= "Time: " . now()->format('Y-m-d H:i:s') . "\n";
            $testContent .= "Printer: " . $printerName . "\n";
            $testContent .= "================================\n";
            $testContent .= "Test completed successfully!\n";

            $response = Http::timeout(10)->post($url, [
                'printer' => $printerName,
                'content' => $testContent,
            ]);

            if ($response->successful()) {
                return response()->json([
                    'status' => 'success',
                    'message' => __m('Test print sent successfully!', 'NsQuickConfig')
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => __m('Failed to send test print. Please check if the printer is turned on and connected.', 'NsQuickConfig')
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => __m('Could not connect to print server. Please ensure the printer is turned on and connected.', 'NsQuickConfig')
            ], 500);
        }
    }

    /**
     * Setup default printer
     */
    public function setupDefaultPrinter(Request $request)
    {
        try {
            $serverAddress = $request->input('server_address');
            $defaultPrinter = $request->input('default_printer');

            if (empty($serverAddress)) {
                return response()->json([
                    'status' => 'error',
                    'message' => __m('Server address is required.', 'NsQuickConfig')
                ], 422);
            }

            // Save server address
            $this->options->set('ns_pa_server_address', $serverAddress);
            

            // Clear existing default printers
            Printer::where('is_default', true)->update(['is_default' => false]);

            // Create or update printers
            foreach ($request->input( 'printers' ) as $printerInfo) {
                $printer = Printer::where( 'identifier', $printerInfo['name'] )->first();

                if ( ! $printer instanceof Printer ) {
                    $printer = new Printer;
                    $printer->name = $printerInfo['displayName'] ?? $printerInfo['name'];
                    $printer->identifier = $printerInfo['name'];
                    $printer->interface = 'network';
                    $printer->type = $printerInfo['type'] ?? 'epson';
                    $printer->status = Printer::ENABLED;
                    $printer->is_default = false;
                    $printer->author = auth()->id();
                    $printer->save();
                }

                // Set the selected printer as default
                if ($defaultPrinter && $printer->identifier === $defaultPrinter) {
                    $printer->is_default = true;
                    $printer->save();
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => __m('Default printer configured successfully!', 'NsQuickConfig')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
