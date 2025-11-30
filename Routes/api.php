<?php

use Illuminate\Support\Facades\Route;
use Modules\NsQuickConfig\Http\Controllers\QuickConfigController;

Route::prefix('ns-quick-config')->middleware(['auth:sanctum'])->group(function () {
    Route::post('/save-step', [QuickConfigController::class, 'saveStep']);
    Route::get('/store-identity-fields', [QuickConfigController::class, 'getStoreIdentityFields']);
    Route::post('/complete-wizard', [QuickConfigController::class, 'completeWizard']);
    Route::post('/reset-wizard', [QuickConfigController::class, 'resetWizard']);
    Route::post('/save-store-identity', [QuickConfigController::class, 'saveStoreIdentity']);
    Route::post('/fetch-printers', [QuickConfigController::class, 'fetchPrinters']);
    Route::post('/test-print', [QuickConfigController::class, 'testPrint']);
    Route::post('/set-default-printer', [QuickConfigController::class, 'setupDefaultPrinter']);
});
