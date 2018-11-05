const fuzz = require('fuzzball');
import {normalizeSync} from 'normalize-diacritics';

export const fuzzySort = <A>(extractString: (a: A) => string, searchString: string, arr: Array<A>): Array<A> =>
    fuzz.extract(
        searchString,
        arr,
        {
            scorer: fuzz.ratio,
            processor: extractString,
        },
    ).map(res => res[0]);

export const searchFilter = <A>(extractString: (a: A) => string, searchString: string, arr: Array<A>): Array<A> =>
    arr
        .filter(e =>
                normalizeSync(extractString(e)).toLowerCase()
                    .includes(normalizeSync(searchString).toLowerCase()),
        );
