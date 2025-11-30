

<div id="ns-quick-config-wrapper">
    <div class="qc:w-screen qc:absolute qc:z-[1] qc:top-0 qc:left-0 qc:h-screen qc:flex qc:items-center qc:justify-center">
        <wizard-main redirection="{{ ns()->route( 'ns.dashboard.home' ) }}" :stored-step="{{ $step ?? 0 }}" :data='@json( $data )' :apiUrl="'/api/ns-quick-config'" @close="close">
        </wizard-main>
    </div>
</div>

@moduleViteAssets('Resources/ts/main.ts', 'NsQuickConfig')
@moduleViteAssets('Resources/css/style.css', 'NsQuickConfig')