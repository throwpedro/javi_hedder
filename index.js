const fetchData = async () => {
    return window.fetch('https://en.wikipedia.org/api/rest_v1/page/html/List_of_FC_Barcelona_players');
}

const parse = (html) => {
    const midfielders = [];
    const doc = new DOMParser().parseFromString(html, "text/html");
    const table = doc.querySelector('.wikitable.sortable');
    const rows = table.querySelectorAll('tr');
    rows.forEach(r => {
        const cell = r.querySelectorAll('td');
        if (cell?.[2]?.innerText === 'Midfielder') {
            midfielders.push(cell?.[0]?.innerText ?? 'Michael Laudrup');
        }
    });
    return midfielders;
}

try {
    const res = await fetchData();
    const resHtml = await res.text();
    const midfielders = parse(resHtml);
    const nameOfJavi = midfielders[Math.floor(Math.random() * midfielders.length)];
    document.getElementById('name').textContent = nameOfJavi;
} catch(e) {
    const el = document.getElementById('name');
    const style = {
        background: 'white',
        color: 'red',
        border: '3px solid green',
        padding: '0 5px',
    };
    el.textContent = "Failed to get name for Javi, quite possibly wikipedia changed their html"
    Object.entries(style).forEach(([k, v]) => {
        el.style[k] = v;
    });
}
