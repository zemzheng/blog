function getDom(npmName, githubName) {
    var el = document.createElement('div');
    el.setAttribute('class', 'third-links');
    el.innerHTML = [
        '<a href="https://github.com/scrumpy/' + githubName + '" target="_blank" rel="noopener">',
        '<img src="https://img.shields.io/github/stars/' + githubName + '.svg?style=plastic" alt="GitHub stars">',
        '</a>',
        '<a href="https://www.npmjs.com/package/' + npmName + '" target="_blank" rel="noopener">',
        '<img src="https://img.shields.io/npm/v/' + npmName + '.svg?label=version" alt="' + npmName + '">',
        '</a>',
        '<a href="https://www.npmjs.com/package/' + npmName + '" target="_blank" rel="noopener">',
        '<img src="https://img.shields.io/npm/l/' + npmName + '.svg" alt="' + npmName + '">',
        '</a>'
    ].join('');
    return el;
}
document.addEventListener('DOMContentLoaded', (event) => {
    $('article ul ul li a').each((index, dom) => {
        const npmName = dom.innerHTML;
        const githubName = dom.href.replace('https://github.com/', '');
        const links = getDom(npmName, githubName);
        $(links).appendTo(dom.parentNode);
    });
});
