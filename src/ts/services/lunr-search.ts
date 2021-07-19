import * as lunr from 'lunr';

import { AutoCompleteSuggestion } from '@songhay/input-autocomplete';

import { SearchIndexEntry } from 'songhay/core/models/search-index-entry';

export class LunrSearch {

    indexEntries: SearchIndexEntry[];

    index: lunr.Index;

    constructor(entries: SearchIndexEntry[]) {
        this.indexEntries = entries;
        this.index = this.getIndex(entries);
    }

    getIndex(indexEntries: SearchIndexEntry[]): lunr.Index {
        const builder = this.getIndexBuilder(indexEntries);
        const idx = builder.build();

        return idx;
    }

    getIndexBuilder(indexEntries: SearchIndexEntry[]): lunr.Builder {
        if (!indexEntries || indexEntries.length === 0) {
            throw new Error('The expected index entries are not here.');
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
                value: result.clientId ?? '[not found]',
                text: result.title ?? '[not found]'
            };
            return suggestion;
        });
    }
}
