

fetch('https://api.github.com/repos/vinsonf/flappy').then(res => res.json()).then(data => {
    console.log(data);
});