const editor = monaco.editor.create(document.getElementById("editor"), {
    value: "function helloWorld = () => { console.log('hello world!')",
    theme: "vs-dark'",
    language: 'javascript'
});

const remoteCursorManager = new MonacoCollabExt.RemoteCursorManager({
    editor: editor,
    tooltips: true,
    tooltipDuration: 2
});

const cursor = remoteCursorManager.addCursor("jDoe", "blue", "John Doe");

// Set the position of the cursor.
cursor.setOffset(4);

// Hide the cursor
cursor.hide();

// Show the cursor
cursor.show();

// Remove the cursor.
cursor.dispose();