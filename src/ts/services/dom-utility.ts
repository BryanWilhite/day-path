// TODO: move to `songhay-core`
export class DomUtility {
    static getBaseUri(): string {
        const colonWhackWhack = '://';
        const placeholder = '[§]';

        let uri = window.location.href;
        uri = uri.replace(colonWhackWhack, placeholder);
        uri = uri.split('/')[0];
        uri = uri.replace(placeholder, colonWhackWhack);

        return uri;
    }
}
