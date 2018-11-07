import Decoder, {array} from "jsonous/Decoder";
import {Future, Option, Vector} from "prelude.ts";
import {ok} from 'resulty';

export function httpGetAndDecode<A>(url: string, decoder: Decoder<A>): Future<A> {
    const init: RequestInit = {
        method: 'GET',
    };
    return requestAndDecode(url, init, decoder)
}

export function httpPostAndDecode<A>(url: string, body: any, decoder: Decoder<A>): Future<A> {
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return requestAndDecode(url, init, decoder)
}

export function httpDeleteAndDecode<A>(url: string, body: any, decoder: Decoder<A>): Future<A> {
    const init: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return requestAndDecode(url, init, decoder)
}

export function requestAndDecode<A>(url: string, requestInit: RequestInit, decoder: Decoder<A>): Future<A> {
    return Future.of(fetch(url, requestInit))
        .flatMap(res => Future.of(res.json()))
        .flatMap(json => decoder.decodeJson(JSON.stringify(json))
            .cata({
                Err: decoderError => {
                    console.error("Request decoder error: " + decoderError, json)
                    return Future.failed(decoderError)
                },
                Ok: result => Future.ok(result),
            }))
}

// ---- DECODERS ----
export function map2<A, B, C>(decA: Decoder<A>, decB: Decoder<B>, fn: ((a: A, b: B) => C)): Decoder<C> {
    return new Decoder(value => {
        return decA.decodeAny(value)
            .andThen(a => decB.decodeAny(value)
                .andThen(b => ok(fn(a, b))),
            )
    });
}

export function vector<A>(decoder: Decoder<A>): Decoder<Vector<A>> {
    return array(decoder)
        .map(Vector.ofIterable)
}

export function option<A>(decoder: Decoder<A>): Decoder<Option<A>> {
    return new Decoder(value => {
        return decoder.decodeAny(value).cata({
            Err: e => ok(Option.none()),
            Ok: v => ok(Option.some(v)),
        });
    });
}
