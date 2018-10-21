const fuzz = require('fuzzball');

export const fuzzySort = <A>(extractString: (a: A) => string, searchString: string, arr: Array<A>): Array<A> =>
    fuzz.extract(
        searchString,
        arr,
        {
            scorer: fuzz.ratio,
            processor: extractString,
        },
    ).map(res => res[0]);