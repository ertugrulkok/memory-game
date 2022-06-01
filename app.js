const cardArray = [{
        name: "auebergine",
        img: "images/aubergine.jpg",
    },
    {
        name: "cucember",
        img: "images/cucember.jpg",
    },
    {
        name: "lettuce",
        img: "images/lettuce.jpg",
    },
    {
        name: "potato",
        img: "images/potato.jpg",
    },
    {
        name: "pumpkin",
        img: "images/pumpkin.jpg",
    },
    {
        name: "tomato",
        img: "images/tomato.jpg",
    },
    {
        name: "auebergine",
        img: "images/aubergine.jpg",
    },
    {
        name: "cucember",
        img: "images/cucember.jpg",
    },
    {
        name: "lettuce",
        img: "images/lettuce.jpg",
    },
    {
        name: "potato",
        img: "images/potato.jpg",
    },
    {
        name: "pumpkin",
        img: "images/pumpkin.jpg",
    },
    {
        name: "tomato",
        img: "images/tomato.jpg",
    },
];

cardArray.sort(() => 0.5 - Math.random()); /// sayfa her yenilendiğinde arkaplanda dizi içindeki elemanları yerlerinin değişmesi için

const gridDisplay = document.querySelector("#grid"); /// "javascript te çalışmak için elementi tanımlıyoruz"
const resultDisplay = document.querySelector("#result"); //skoru yazman için alan
let cardsChosen = []; /// tıklanarak seçilen elemanları içine aldığında oluşan yeni dizi
let cardsChosenIds = []; // tıklanarak seçilen elemanların id sini içine aldığında oluşan yeni dizi
let cardsWon = []; // eşleşen kartların skorunu almak için eşleme olduğunda oluşan dizi

function createBoard() {
    /// Dizi içindeki herbir elemanı türetmek için
    for (let i = 0; i < cardArray.length; i++) {
        /// döngüsel olarak arraydaki bütün elemanları alması için
        const card = document.createElement("img"); /// card isminde bir img eleman üretilir
        gridDisplay.appendChild(card); /// ve ebeveyn olan 'grid display' in (div) card ismindeki yeni ürtilen img elemanını evlat olarak kabul etmesini sağlıyoruz
        card.setAttribute("src", "images/blank.jpg"); /// herbir img elementinin kaynak adresini 'blank.jpg' ye eşitliyoruz
        card.setAttribute("data-id", i); /// herbir img elementinin data Id sini 'i' ye eşitliyoruz
        card.addEventListener("click", flipCard); // tıkladığımda açılması için tıkla fonsiyonu tanımlıyoruz ama henüz ()bu şekilde çağırmıyoruz

    }
}
createBoard(); /// yukarıda tanımladığımız bu fonksiyonu çalışması için buradan çağırıyoruz
function flipCard() {
    const cardId = this.getAttribute("data-id"); /// hangi elemenan tıklarsam onun data Id sini CardId olarak tanımlamak istiyoruz bu yüzden this kullanıyorum
    cardsChosen.push(cardArray[cardId].name); // cardArray dizisindeki tıklanan elemanı cardId bilgisine dayanarak ismini alıp bu diziye aktarıyoruz
    cardsChosenIds.push(cardId); /// sadece cardId numarasını bu diziye atıyoruz
    this.setAttribute("src", cardArray[cardId].img); /// tıkladığımızda tıklanan elementin img olarak kendi resminin görünmesi için resmin kendi src sine dön



    if (cardsChosen.length === 2) {
        /// 2. kart tıklandığında hemen reaksiyon vermemesi için
        setTimeout(checkMatch, 500);
    }

}

function checkMatch() {
    // eşleşme fonsiyonu
    const cards = document.querySelectorAll("img"); // bütün resimlerden oluşan bir dizi oluşuyor
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];

    if (optionOneId == optionTwoId) {
        /// eğer aynı resme iki kez tıklanırsa, yani array içerisinde iki aynı id numarası yanyana gelirse
        cards[optionOneId].setAttribute("src", "images/blank.jpg"); //resimlerin tekrar saklanması için
        cards[optionTwoId].setAttribute("src", "images/blank.jpg"); //resimlerin tekrar saklanması için
        alert("You have clicked the same image");

        return checkMatch
    } else if (cardsChosen[0] == cardsChosen[1]) {
        // eğer seçilen elamanları içine koyduğumuz yeni dizimizdeki ilk ve ikinci elemanlar birbirine eşit ise
        alert("You found a match");

        cards[optionOneId].setAttribute("src", "images/white.png"); // eşleşen kartları tekrar görmemek için
        cards[optionTwoId].setAttribute("src", "images/white.png"); // eşleşen kartları tekrar görmemek için
        cards[optionOneId].removeEventListener("click", flipCard); //  eşleşen kartları tekrar tıklayamamak için
        cards[optionTwoId].removeEventListener("click", flipCard); //   eşleşen kartları tekrar tıklayamamak için
        cardsWon.push(cardsChosen); // eşleşen kartları panodan çıkarıp buraya koyuyoruz

    } else {
        cards[optionOneId].setAttribute("src", "images/blank.jpg"); ///eşleşmeme durumunda resimlerin tekrar saklanması için
        cards[optionTwoId].setAttribute("src", "images/blank.jpg"); ///eşleşmeme durumunda resimlerin tekrar saklanması için
        alert("Sorry try again");

    }
    cardsChosen = []; // her zaman ilk 2 elementi kullanacağımız için arrayı boşaltıyoruz
    cardsChosenIds = []; // her zaman ilk 2 elementi kullanacağımız için arrayı boşaltıyoruz

    resultDisplay.textContent = cardsWon.length; //eşleşen kartlartların sayısını göstermek için

    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = "congratulations you found them all";
    }
}