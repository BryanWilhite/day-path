import { ajax } from 'rxjs/ajax';
import { AutoCompleteSuggestion, InputAutoComplete } from '@songhay/input-autocomplete';
import * as lunr from 'lunr';

import { LunrIndexEntry } from './lunr-index-entry';

const uri = 'https://songhaystorage.blob.core.windows.net/day-path-blog/index.c.json';

function display(data: LunrIndexEntry[]): void {

    const node = document.querySelector(InputAutoComplete.customElementName);
    const customElement = node as InputAutoComplete;

    const builder = new lunr.Builder();
    builder.field('extract');
    builder.field('title');
    builder.ref('clientId');
    data.forEach(datum => builder.add(datum));

    const idx = builder.build();

    const search = (text: string) => {
        if (!text) { return []; }

        const refs = idx.search(text);
        const results = data.filter(datum => refs.findIndex(r => r.ref === datum.clientId) !== -1);
        return results.map(result => {
            const suggestion: AutoCompleteSuggestion = {
                value: result.clientId,
                text: result.title
            };
            return suggestion;
        });
    };

    customElement.suggestionGenerator = (text: string) => Promise.resolve(search(text));
}

window.addEventListener('DOMContentLoaded', () => {
    const data$ = ajax.getJSON<LunrIndexEntry[]>(uri);

    data$.subscribe(
        appData => display(appData),
        err => console.error(err)
    );
});
