localStorage.clear();

document.getElementById('file-input').addEventListener('change', function() {
    let file = document.getElementById('file-input').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', e => {
        let text = e.target.result;
        let arr = text.split('\n');
        for (let i = 0; i < arr.length; i++) {
            let words = arr[i].split(' - ');
            let q_word = words[1].trim();
            let a_word = words[0].trim();
            const question_obj = {question: q_word, word: a_word};
            const json_str = JSON.stringify(question_obj);
            window.localStorage.setItem(i, json_str);
        }
    });
});