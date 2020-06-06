import { ajax } from 'rxjs/ajax';

import { LunrIndexEntry } from './lunr-index-entry';

const uri = 'https://songhaystorage.blob.core.windows.net/day-path-blog/index.c.json';

function display(data: LunrIndexEntry[]): void {
    console.log({data});
}

window.addEventListener('DOMContentLoaded', () => {
    const data$ = ajax.getJSON<LunrIndexEntry[]>(uri);

    data$.subscribe(
        appData => display(appData),
        err => console.error(err)
    );
});
