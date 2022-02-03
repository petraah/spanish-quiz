document.getElementById('file-input').addEventListener('change', function() {
    let file = document.getElementById('file-input').files[0];
    let reader = new FileReader();
    reader.addEventListener('load', e => {
            let text = e.target.result;
            // TODO get words into json file
            alert(text);
    });
    reader.readAsText(file);
});