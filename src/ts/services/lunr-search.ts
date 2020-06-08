import * as lunr from 'lunr';

import { AutoCompleteSuggestion } from '@songhay/input-autocomplete';

import { LunrIndexEntry } from '../models/lunr-index-entry';

export class LunrSearch {

    indexEntries: LunrIndexEntry[];

    index: lunr.Index;

    constructor(entries: LunrIndexEntry[]) {
        this.indexEntries = entries;
        this.index = this.getIndex(entries);
    }

    getIndex(indexEntries: LunrIndexEntry[]): lunr.Index {
        const builder = this.getIndexBuilder(indexEntries);
        const idx = builder.build();

        return idx;
    }

    getIndexBuilder(indexEntries: LunrIndexEntry[]): lunr.Builder {
        if (!indexEntries || indexEntries.length === 0) {
            console.error('The expected index entries are not here.');
            return;
        }

        const builder = new lunr.Builder();
        builder.field('extract');
        builder.field('title');
        builder.ref('clientId');

        indexEntries.forEach(datum => builder.add(datum));

        return builder;
    }

    search(text: string): AutoCompleteSuggestion[] {
        if (!text) { return []; }

        const refs = this.index.search(text);
        const results = this.indexEntries.filter(datum => refs.findIndex(r => r.ref === datum.clientId) !== -1);
        return results.map(result => {
            const suggestion: AutoCompleteSuggestion = {
                value: result.clientId,
                text: result.title
            };
            return suggestion;
        });
    }
}
