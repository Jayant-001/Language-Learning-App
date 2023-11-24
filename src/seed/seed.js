import prisma from "../../prisma/index.js";

const topics = [
    {
        name: "grammar-english",
        slug: "grammar-english",
        languageSlug: "english",
    },
    {
        name: "Vocabulary",
        slug: "vocabulary-english",
        languageSlug: "english",
    },
    {
        name: "Conjugation",
        slug: "conjugation-english",
        languageSlug: "english",
    },
    {
        name: "Literature",
        slug: "literature-english",
        languageSlug: "english",
    },
    {
        name: "Idioms",
        slug: "idioms-english",
        languageSlug: "english",
    },
    {
        name: "Gramática",
        slug: "gramatica-spanish",
        languageSlug: "spanish",
    },
    {
        name: "Vocabulario",
        slug: "vocabulario-spanish",
        languageSlug: "spanish",
    },
    {
        name: "Conjugación",
        slug: "conjugacion-spanish",
        languageSlug: "spanish",
    },
    {
        name: "Literatura",
        slug: "literatura-spanish",
        languageSlug: "spanish",
    },
    {
        name: "Expresiones",
        slug: "expresiones-spanish",
        languageSlug: "spanish",
    },
    {
        name: "Grammaire",
        slug: "grammaire-french",
        languageSlug: "french",
    },
    {
        name: "Vocabulaire",
        slug: "vocabulaire-french",
        languageSlug: "french",
    },
    {
        name: "Conjugaison",
        slug: "conjugaison-french",
        languageSlug: "french",
    },
    {
        name: "Littérature",
        slug: "litterature-french",
        languageSlug: "french",
    },
    {
        name: "Expressions",
        slug: "expressions-french",
        languageSlug: "french",
    },
    {
        name: "Grammatik",
        slug: "grammatik-german",
        languageSlug: "german",
    },
    {
        name: "Vokabular",
        slug: "vokabular-german",
        languageSlug: "german",
    },
    {
        name: "Konjugation",
        slug: "konjugation-german",
        languageSlug: "german",
    },
    {
        name: "Literatur",
        slug: "literatur-german",
        languageSlug: "german",
    },
    {
        name: "Redewendungen",
        slug: "redewendungen-german",
        languageSlug: "german",
    },
    {
        name: "Grammatica",
        slug: "grammatica-italian",
        languageSlug: "italian",
    },
    {
        name: "Vocabolario",
        slug: "vocabolario-italian",
        languageSlug: "italian",
    },
    {
        name: "Coniugazione",
        slug: "coniugazione-italian",
        languageSlug: "italian",
    },
    {
        name: "Letteratura",
        slug: "letteratura-italian",
        languageSlug: "italian",
    },
    {
        name: "Espressioni",
        slug: "espressioni-italian",
        languageSlug: "italian",
    },
];



const seed = async () => {
    try {
        await prisma.question.createMany({
            data: questions,
        });

        console.log("data inserted");
    } catch (error) {
        console.log(error);
    }
};

seed();
