const visual = JSON.parse(visual_json);
const URL_BASE = "https://idm.homedepot.com/assets/image/";
const ANCHOR_URL_BASE = "https://www.homedepot.com/p/";

window.addEventListener('load', main);

function create_anchor(anchor) {
    const img_url = URL_BASE + anchor.img.slice(0, 2) + "/" + anchor.img + ".jpg";
    const anchor_img = document.createElement("img");
    anchor_img.src = img_url;
    anchor_img.alt = anchor.anchor;
    anchor_img.classList.add("anchor_image");

    const anchor_a = document.createElement("a");
    anchor_a.href = ANCHOR_URL_BASE + anchor.anchor;
    anchor_a.appendChild(anchor_img);

    const anchor_div = document.createElement("h2");
    anchor_div.classList.add("anchor_container");
    anchor_div.appendChild(anchor_a);

    return anchor_div;
}

function create_rec_img(rec_elem) {
    const img = document.createElement("img");
    img.alt = rec_elem.omsid;
    img.src = URL_BASE + rec_elem.img.slice(0, 2) + "/" + rec_elem.img + ".jpg";

    return img;
}

function create_rec_img_list(rec) {
    const ul = document.createElement("ul");
    ul.classList.add("rec_images");

    const img_list = rec.map(i => {
        const li = document.createElement("li");
        li.classList.add("rec_images_li");
        li.appendChild(create_rec_img(i));
        ul.appendChild(li);
    });

    return ul;
}

function create_rec_score(score) {
    const ul = document.createElement("ul");
    ul.classList.add("rec_scores");
    const color_li = document.createElement("li");
    color_li.innerHTML = "Color: " + score["color"];
    color_li.classList.add("rec_score", "color");

    const shape_li = document.createElement("li");
    shape_li.innerHTML = "Shape: " + score["shape"];
    shape_li.classList.add("rec_score", "shape");

    const style_li = document.createElement("li");
    style_li.innerHTML = "Style: " + score["style"];
    style_li.classList.add("rec_score", "style");

    ul.appendChild(shape_li);
    ul.appendChild(color_li);
    ul.appendChild(style_li);
    
    return ul;
}

function create_rec_list_item(recs_elem) {
    const div = document.createElement("div");
    const score_ul = create_rec_score(recs_elem.score);
    div.appendChild(score_ul);

    const img_ul = create_rec_img_list(recs_elem.rec);
    div.appendChild(img_ul);

    return div;
}

function create_rec_list(recs) {
    const recs_container = document.createElement("div");
    recs_container.classList.add("recs_container");
    const recs_ul = recs.map(i => {
        const div = create_rec_list_item(i);
        div.classList.add("rec_container");
        recs_container.appendChild(div);
    });

    return recs_container;
}

function create_anchor_section(anchor) {
    const anchor_section = document.createElement("section");
    const anchor_div = create_anchor(anchor.anchor);
    const recs_div = create_rec_list(anchor.recs);

    anchor_section.appendChild(anchor_div);
    anchor_section.appendChild(recs_div);

    return anchor_section;
}

/*
Testing with 1 visual element at the moment. 
Multiple visual elements can be handled by pagination. 
*/
function main() {
    var container = document.querySelector(".container");
    container.appendChild(create_anchor_section(visual[0]));
}

