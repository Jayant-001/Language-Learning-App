import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

const questions = [
    {
      "slug": "question-41",
      "name": "Choose the correct article for the word 'apple'.",
      "options": ["A", "An", "The", "None"],
      "correctOption": 2,
      "difficulty": 2,
      "createdAt": "2023-11-14T02:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The correct article for the word 'apple' is 'An.'"
    },
    {
      "slug": "question-42",
      "name": "What is the indefinite article for the word 'umbrella'?",
      "options": ["A", "An", "The", "None"],
      "correctOption": 1,
      "difficulty": 3,
      "createdAt": "2023-11-14T03:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The indefinite article for the word 'umbrella' is 'A.'"
    },
    {
      "slug": "question-43",
      "name": "Choose the correct article for the word 'honesty'.",
      "options": ["A", "An", "The", "None"],
      "correctOption": 3,
      "difficulty": 4,
      "createdAt": "2023-11-14T04:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The correct article for the word 'honesty' is 'The.'"
    },
    {
      "slug": "question-44",
      "name": "What is the definite article for the word 'elephant'?",
      "options": ["A", "An", "The", "None"],
      "correctOption": 3,
      "difficulty": 3,
      "createdAt": "2023-11-14T05:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The definite article for the word 'elephant' is 'The.'"
    },
    {
      "slug": "question-45",
      "name": "Choose the correct article for the word 'hour'.",
      "options": ["A", "An", "The", "None"],
      "correctOption": 2,
      "difficulty": 2,
      "createdAt": "2023-11-14T06:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The correct article for the word 'hour' is 'An.'"
    },
    {
      "slug": "question-46",
      "name": "What is the indefinite article for the word 'orange'?",
      "options": ["A", "An", "The", "None"],
      "correctOption": 2,
      "difficulty": 3,
      "createdAt": "2023-11-14T07:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The indefinite article for the word 'orange' is 'An.'"
    },
    {
      "slug": "question-47",
      "name": "Choose the correct article for the word 'umbrella'.",
      "options": ["A", "An", "The", "None"],
      "correctOption": 2,
      "difficulty": 4,
      "createdAt": "2023-11-14T08:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The correct article for the word 'umbrella' is 'An.'"
    },
    {
      "slug": "question-48",
      "name": "What is the definite article for the word 'island'?",
      "options": ["A", "An", "The", "None"],
      "correctOption": 3,
      "difficulty": 3,
      "createdAt": "2023-11-14T09:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The definite article for the word 'island' is 'The.'"
    },
    {
      "slug": "question-49",
      "name": "Choose the correct article for the word 'universe'.",
      "options": ["A", "An", "The", "None"],
      "correctOption": 3,
      "difficulty": 2,
      "createdAt": "2023-11-14T10:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The correct article for the word 'universe' is 'The.'"
    },
    {
      "slug": "question-50",
      "name": "What is the indefinite article for the word 'elephant'?",
      "options": ["A", "An", "The", "None"],
      "correctOption": 2,
      "difficulty": 3,
      "createdAt": "2023-11-14T11:00:00.000Z",
      "languageSlug": "english",
      "topicSlug": "articles-english",
      "userEmail": "test2@gmail.com",
      "explanation": "The indefinite article for the word 'elephant' is 'An.'"
    }
 ]
  

export const POST = async (req, res) => {
    try {
        await prisma.question.createMany({
            data: questions,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
