// CONSTANTS
const VAL = 30;
// VARIABLES
let selectedWords = [];
let htmlList = [];
let container = document.getElementById("container");
let submitBtn = document.getElementById("submit");
let refreshBtn = document.getElementById("refresh");
let evaluation = document.getElementById("voto");

window.addEventListener("load", () => { populateGame(); });

function populateGame() {

    randomlySelection();

    selectedWords.forEach(el => {

        var div = `
            <div class="data">
                <label class="word">${el[2]}</label>
                <input class="traduction" type="text" placeholder="traduzione">
                <label class="soluction">${el[1]}</label>
            </div>
        `;

        htmlList.push(div);
        
    });  // END FOR

    let htmlString = htmlList.join("");    
    container.innerHTML = htmlString;

};

function randomlySelection() {

    shuffle(data);

    selectedWords = data.slice(0, VAL);

};

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

submitBtn.addEventListener("click", function() {

    let labels = document.querySelectorAll('.soluction');
    let answers = document.querySelectorAll('.traduction');
    let counter = 0;

    for(let i=0; i<labels.length; i++) {

        if (answers[i].value.toLowerCase().trim() === labels[i].innerHTML) {

            answers[i].style.background = "var(--clr-one)";
            //labels[i].style.display = "block";
            counter += 1;

        } else {

            answers[i].style.background = "var(--clr-four)";
            //labels[i].style.display = "block";

        };  // END IF

        const parentData = answers[i].closest('.data'); 
        if (parentData) {
            parentData.classList.add('showing-solution');
        };

    };  // END FOR

    evaluation.innerHTML = "Score: " + counter + "/" + VAL;
    if (counter > 18) {
        evaluation.style.color = "var(--clr-five)";
    } else {
        evaluation.style.color = "var(--clr-four)";
    };  // END IF
    
    submitBtn.setAttribute("show", "no");
    refreshBtn.setAttribute("show", "yes");

});

refreshBtn.addEventListener("click", () => {
    window.location.reload();
});
