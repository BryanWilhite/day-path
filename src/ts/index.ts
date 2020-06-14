import { ajax } from 'rxjs/ajax';
import { AutoCompleteSuggestion, InputAutoComplete } from '@songhay/input-autocomplete';

import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-liquid';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';

import { LunrIndexEntry } from './models/lunr-index-entry';

import { DomUtility } from './services/dom-utility';
import { LunrSearch } from './services/lunr-search';

const prismShouldUseWebWorkers = false;
const uri = 'https://songhaystorage.blob.core.windows.net/day-path-blog/index.c.json';

Prism.highlightAll(prismShouldUseWebWorkers);

function display(data: LunrIndexEntry[]): void {

    const node = document.querySelector(InputAutoComplete.customElementName);
    const customElement = node as InputAutoComplete;
    const service = new LunrSearch(data);

    customElement.suggestionGenerator = (text: string) => Promise.resolve(service.search(text));

    customElement.addEventListener('selected', (e) => {
        const event = e as CustomEvent;
        if (!event) {
            console.error('The expected event is not here.');
            return;
        }

        const suggestion = event.detail as AutoCompleteSuggestion;
        if (!suggestion) {
            console.error('The expected `AutoCompleteSuggestion` is not here.');
            return;
        }

        window.location.href = `${DomUtility.getBaseUri()}/entry/${suggestion.value}`;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const data$ = ajax.getJSON<LunrIndexEntry[]>(uri);

    data$.subscribe(
        appData => display(appData),
        err => console.error(err)
    );
});
