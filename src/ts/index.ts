import { ajax } from 'rxjs/ajax';
import { InputAutoComplete } from '@songhay/input-autocomplete';

import { LunrIndexEntry } from './lunr-index-entry';

const uri = 'https://songhaystorage.blob.core.windows.net/day-path-blog/index.c.json';

function display(data: LunrIndexEntry[]): void {

    const node = document.querySelector('rx-input-autocomplete');
    const customElement = node as InputAutoComplete;

    console.log({data, node, customElement});
}

window.addEventListener('DOMContentLoaded', () => {
    const data$ = ajax.getJSON<LunrIndexEntry[]>(uri);

    data$.subscribe(
        appData => display(appData),
        err => console.error(err)
    );
});
