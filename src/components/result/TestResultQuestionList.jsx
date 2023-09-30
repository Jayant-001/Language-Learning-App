import React from 'react'
import ResultQuestionItem from './ResultQuestionItem'

const TestResultQuestionList = ({questions}) => {
  return (
    <div className="w-full md:w-[70%] lg:w-[60%] mx-auto flex flex-col gap-5">
            {questions?.map((question, id) => (
                <ResultQuestionItem
                    key={question.id}
                    question={question}
                    index={id}
                />
            ))}
        </div>
  )
}

export default TestResultQuestionList