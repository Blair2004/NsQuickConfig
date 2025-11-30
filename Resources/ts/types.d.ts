declare module '@/libraries/lang' {
    export function __(key: string): string;
    export function __m(key: string, namespace: string): string;
}

declare module '@/bootstrap' {
    export const nsHttpClient: any;
    export const nsSnackBar: any;
}

declare module '@/libraries/popup' {
    export class Popup {
        static show(component: any, params?: any, config?: any): any;
    }
}

declare const nsAlertPopup: any;
declare const nsConfirmPopup: any;
declare const nsPromptPopup: any;
declare const nsComponents: any;
