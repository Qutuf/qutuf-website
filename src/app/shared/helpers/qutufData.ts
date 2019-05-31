export interface Pattern {
    Lemma: string;
    root: string;
    unoweled: string;
    voweled: string;
}

export interface Cliticless {
    arabic_description: string;
    tag: string;
    Pattern: Pattern;
}

export interface Enclitic {
    arabic_description: string;
    tag: string;
}
export interface Proclitc {
    arabic_description: string;
    tag: string;
}

export interface Enclitics {
    Enclitic: Enclitic;
}
export interface Proclitcs {
    Proclitc: Proclitc;
}
export interface SurfaceFormMorpheme {
    certainty: string;
    voweled_form: string;
    Proclitcs: Proclitcs;
    Cliticless: Cliticless;
    Enclitics: Enclitics;
}

export interface Word {
    number_of_possibilities: string;
    original_string: string;
    SurfaceFormMorphemes: SurfaceFormMorpheme[];
}

export interface Sentence {
    original_string: string;
    Word: Word[];
}

export interface Text {
    Sentence: Sentence;
}

export class qutufData {
    Text: Text;
}

