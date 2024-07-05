import { useEffect, useRef, useState } from 'react'
import './App.css'
import localExample from './example.json'

function App() {
  const surveys: Record<string, unknown> = {
    survey1: 'https://raw.githubusercontent.com/SurveyCompo/examples/main/examples/inputs/source.json',
    survey2: 'https://raw.githubusercontent.com/SurveyCompo/examples/main/examples/style/source.json',
    local: JSON.stringify(localExample)
  }

  const [sourceName, setSourceName] = useState('survey1');

  const surveySource = surveys[sourceName];
  const surveyElement = useRef<{src: unknown , api: {reset: ()=>void}}>();

  const onSurveyChange = (event: Event) => {
    const customEventDetail = (event as CustomEvent).detail;
    console.log(customEventDetail);
  }

  const resetSurvey = () => {
    surveyElement.current?.api.reset();
  }

  const setDataToInstance = () => {
    if (surveyElement.current) {
      surveyElement.current.src = localExample;
    }
  }

  useEffect(() => {
    window.addEventListener("surveychange", onSurveyChange);
    return () => {
      window.removeEventListener("surveychange", onSurveyChange);
    };
  }, [sourceName, onSurveyChange])

  return (
    <>
      <h1 className='title'>React.js Integration Example</h1>
      <div className='survey-container'>
        <survey-compo
          ref={surveyElement}
          cache="memory"
          src={surveySource} />
      </div>

      <div className='button-group'>
        <button onClick={() => setSourceName('survey1')}>Survey 1</button>
        <button onClick={() => setSourceName('survey2')}>Survey 2</button>
        <button onClick={() => setSourceName('local')}>Local</button>
      </div>

      <div className='button-group'>
        <button onClick={() => resetSurvey()}>Reset</button>
        <button onClick={() => setDataToInstance()}>Set JSON Data</button>
      </div>
    </>
  )
}

export default App
