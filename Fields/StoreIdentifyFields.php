<?php
namespace Modules\NsQuickConfig\Fields;

use App\Classes\Form;
use App\Classes\FormInput;
use App\Services\FieldsService;

class StoreIdentifyFields extends FieldsService
{
    /**
     * The unique identifier of the form
     **/
    const IDENTIFIER = 'qc.store-identity';

    /**
     * Will ensure the fields are automatically loaded
     **/
    const AUTOLOAD = true;

    public function get()
    {
        return Form::fields(
            FormInput::text(
                label: __m( 'Store Name', 'NsQuickConfig' ),
                name: 'ns_store_name',
                description: __m( 'The name of your store.', 'NsQuickConfig' ),
                validation: 'required',
                value: ns()->option->get( 'ns_store_name', '' ),
            ),
            FormInput::text(
                label: __m( 'Store Email', 'NsQuickConfig' ),
                name: 'ns_store_email',
                description: __m( 'The contact email of your store.', 'NsQuickConfig' ),
                validation: 'required|email',
                value: ns()->option->get( 'ns_store_email', '' ),
            ),
            FormInput::media(
                label: __m( 'Store Logo', 'NsQuickConfig' ),
                name: 'ns_store_square_logo',
                description: __m( 'Upload your store logo (recommended: square format)', 'NsQuickConfig' ),
                value: ns()->option->get( 'ns_store_square_logo', '' ),
            ),
            FormInput::text(
                label: __m( 'Currency Symbol', 'NsQuickConfig' ),
                name: 'ns_currency_symbol',
                description: __m( 'The symbol of the currency you will be using in your store (e.g $, £, ₹, etc).', 'NsQuickConfig' ),
                validation: 'required',
                value: ns()->option->get( 'ns_currency_symbol', '' ),
            ),
            FormInput::select(
                name: 'ns_currency_precision',
                value: ns()->option->get( 'ns_currency_precision', '0' ),
                options: collect( [0, 1, 2, 3, 4, 5] )->map( function ( $index ) {
                    return [
                        'label' => sprintf( __( '%s numbers after the decimal' ), $index ),
                        'value' => $index,
                    ];
                } )->toArray(),
                label: __( 'Currency Precision' ),
                description: __( 'Define where the currency should be located.' ),
            ),
        );
    }
}