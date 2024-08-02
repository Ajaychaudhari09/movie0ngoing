document.addEventListener('DOMContentLoaded', function() {
    const htmlEditor = document.getElementById('htmlEditor');
    const cssEditor = document.getElementById('cssEditor');
    const jsEditor = document.getElementById('jsEditor');
    const output = document.getElementById('output');

    function compile() {
        const html = htmlEditor.value;
        const css = '<style>' + cssEditor.value + '</style>';
        const js = '<script>' + jsEditor.value + '<\/script>';
        const srcDoc = html + css + js;
        output.srcdoc = srcDoc;
    }

    htmlEditor.addEventListener('input', compile);
    cssEditor.addEventListener('input', compile);
    jsEditor.addEventListener('input', compile);
});
