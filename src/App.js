import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select'
import Editor from "@monaco-editor/react";

import firebaseConfig from './firebaseConfig';

import firebase from "firebase";
import { fromMonaco } from '@hackerrank/firepad';


function App() {
  const files = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "/* Javascript Editor */",
      label: "Javascript"
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: "Css editor",
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<!-- Html editor -->",
    },
    "class.java": {
      name: "class.java",
      language: "java",
      value: "/* Java Editor */",
      label: "Java"
    },
    "script.py": {
      name: "script.py",
      language: "python",
      value: "# Python Editor",
      label: "Python"
    }
  }

  const options = [
    { value: 'class.java', label: 'Java' },
    { value: 'script.js', label: 'Javascript' },
    { value: 'script.py', label: 'Python' },
  ];

  const [fileName, setFileName] = useState("script.js");

  const [selectOption, setSelectOption] = useState(null);
  const file = files[fileName];

  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setEditorLoaded(true);
  }

  const handleChange = (selectedOption) => {

    setSelectOption(selectedOption);
    setFileName(selectedOption.value);
    console.log(selectOption);
    //setFileName(selectOption);
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      // Make sure initialization happens only once
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app();
    }
  }, []);

  useEffect(() => {
    if (!editorLoaded) {
      // If editor is not loaded return
      return;
    }

    //randomize param
    const dbRef = firebase.database().ref().child(`pair001`); // Can be anything in param, use unique string for unique code session

    const firepad = fromMonaco(dbRef, editorRef.current);

    const name = prompt("Enter your Name :"); // Name to highlight who is editing where in the code
    if (name) {
      firepad.setUserName(name);
    }

  }, [editorLoaded]);

  return (
    <>
      <Select
        defaultValue={selectOption}
        value={selectOption}
        onChange={handleChange}
        options={options}
      />
      <Editor
        height="80vh"
        theme="vs-dark"
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={handleEditorDidMount}
      />
    </>
  );
}

export default App;
