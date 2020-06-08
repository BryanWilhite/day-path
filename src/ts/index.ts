import { ajax } from 'rxjs/ajax';
import { InputAutoComplete } from '@songhay/input-autocomplete';

import { LunrIndexEntry } from './models/lunr-index-entry';
import { LunrSearch } from './services/lunr-search';

const uri = 'https://songhaystorage.blob.core.windows.net/day-path-blog/index.c.json';

function display(data: LunrIndexEntry[]): void {

    const node = document.querySelector(InputAutoComplete.customElementName);
    const customElement = node as InputAutoComplete;
    const lunr = new LunrSearch(data);

    customElement.suggestionGenerator = (text: string) => Promise.resolve(lunr.search(text));
}

window.addEventListener('DOMContentLoaded', () => {
    const data$ = ajax.getJSON<LunrIndexEntry[]>(uri);

    data$.subscribe(
        appData => display(appData),
        err => console.error(err)
    );
});
