let uoe = document.getElementById("eou")
let pass = document.getElementById("pass")
let wrng = document.getElementById("wrng")
let wrng2 = document.getElementById("wrng2")
let login = document.getElementById("login")
let main = document.getElementById("main")
let reg = document.querySelector(".reg")

let users
let brojUsera
let tip = new Set()
let animes = []

function ucitaj() {
    let xml = new XMLHttpRequest()

    xml.onload = function () {
        let animeXML = xml.responseXML.getElementsByTagName("anime")
        for (let anime of animeXML) {

            let obj = {}
            for (let podatak of anime.children) {

                if (podatak.nodeName == "type") tip.add(podatak.textContent)
                obj[podatak.nodeName] = podatak.textContent
            }
            animes.push(obj)

        }
        fillTip()
    }
    xml.open("GET", "data/data.xml", true)
    xml.send()
}
ucitaj()

if (JSON.parse(window.localStorage.getItem("brojUsera")) === null) {
    users = []
    brojUsera = 0
}
else {
    brojUsera = JSON.parse(localStorage.getItem("brojUsera"))
    users = JSON.parse(localStorage.getItem("users"))
    brr.textContent = brojUsera
}

let reg1 = /^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/

function check1() {
    let u = false
    for (let user of users) {
        user = JSON.parse(user)
        if (user.username == uoe.value)
            u = true
    }
    if (!reg1.test(uoe.value) && !u) {
        wrng.style.display = "flex";
        return false;
    }
    else {
        wrng.style.display = "none";
        return true;
    }

}

function check2() {
    if (!(pass.value.length >= 5)) {
        wrng2.style.display = "flex";
        return false;
    }
    else {
        wrng2.style.display = "none";
        return true;
    }
}

let ki = document.getElementById("ki")
let wrng3 = document.getElementById("wrng3")
function check3() {
    if (!(ki.value.length >= 5)) {
        wrng3.style.display = "flex";
        return false;
    }
    else {
        wrng3.style.display = "none";
        return true;
    }
}

let pass2 = document.getElementById("pass2")
let wrng4 = document.getElementById("wrng4")
function check4() {
    if (pass2.value != pass.value || pass2.value == "") {
        wrng4.style.display = "flex";
        return false;
    }
    else {
        wrng4.style.display = "none";
        return true;
    }
}

let html1 = `<div id="login">
<img src="images/logo final.png" alt="" id ="slika">
<div class="d1" id = "d11">
    <label for="eou">Email ili Korisnicko ime</label>
    <input type="text"id="eou" onkeyup="check1()">
    <div id="wrng">
        <p id="inc">Izgleda da je email / korisnicko ime pogresno</p>
        <img src="images/wrong3.png" alt="">
    </div>
</div>
<div class="d1">
    <label for="pass">Sifra</label>
    <input type="password"id="pass" onkeyup="check2()">
    <img src="images/eye_0001_Layer-0.png" alt="" class="oko">
    <div id="wrng2">
        <p id="inc">Sifra mora sadrzati minimalno 5 karaktera</p>
        <img src="images/wrong3.png" alt="" >
    </div>
    <p id="noacc" onclick="toReg()">Nemas nalog? Registruj se</p>
</div>

<button id="lgnbtn" onclick="logujSe()">Login</button>
<p id="inc" class="noreg">Neuspesan Login</p>
<p id="wlcm">Dobrodosli na Mugiwara!</p>
</div>`

let html2 = `<div id="login" class="reg">
<img src="images/logo final.png" alt="">
<div class="d1" id = "d11">
    <label for="ime">Ime</label>
    <input type="text"id="ime">
</div>
<div class="d1">
    <label for="prezime">Prezime</label>
    <input type="text"id="prezime">
</div>
<div class="d1">
    <label for="ki">Korisnicko ime</label>
    <input type="text"id="ki" onkeyup="check3()">
    <div id="wrng3">
        <p id="inc">Korisnicko ime mora sadrzati bar 5 karaktera</p>
        <img src="images/wrong3.png" alt="">
    </div>
</div>
<div class="d1">
    <label for="eou">Email</label>
    <input type="text"id="eou" onkeyup="check1()">
    <div id="wrng">
        <p id="inc">Email je neispravno unet</p>
        <img src="images/wrong3.png" alt="">
    </div>
</div>
<div class="d1">
    <label for="pass">Sifra</label>
    <input type="password"id="pass" onkeyup="check2()">
    <div id="wrng2">
        <p id="inc">Sifra mora imati minimalno 5 karaktera</p>
        <img src="images/wrong3.png" alt="" >
    </div>
</div>
<div class="d1">
    <label for="pass2">Ponovi Sifru</label>
    <input type="password"id="pass2" onkeyup="check4()">
    <div id="wrng4">
        <p id="inc">Sifra se ne poklapa</p>
        <img src="images/wrong3.png" alt="" >
    </div>
</div>
<button id="lgnbtn" onclick="register()">Registruj se</button>
<p id="inc" class="noreg">Neuspesna registracija</p>
<p id="nazad" onclick="toLog()"><-Nazad</p>
<p id="wlcm">Dobrodosli na Mugiwara!</p>
</div>`

let noreg = document.querySelector(".noreg")
noreg.style.display = "none"

function ucitajOpet() {
    uoe = document.getElementById("eou")
    pass = document.getElementById("pass")
    wrng = document.getElementById("wrng")
    wrng2 = document.getElementById("wrng2")
    login = document.getElementById("login")
    main = document.getElementById("main")
    reg = document.querySelector(".reg")
    ki = document.getElementById("ki")
    wrng3 = document.getElementById("wrng3")
    pass2 = document.getElementById("pass2")
    wrng4 = document.getElementById("wrng4")
    noreg = document.querySelector(".noreg")

    noreg.style.display = "none"


}
function toReg() {
    main.innerHTML = html2
    ucitajOpet()
}

function toLog() {
    main.innerHTML = html1
    ucitajOpet()
    oko = document.querySelector(".oko")
    oko.addEventListener("mouseover", () => {
        if (k)
            oko.src = "images/eye_0000_Layer-0-copy.png"
        else
            oko.src = "images/eye_0001_Layer-0.png"
    })
    oko.addEventListener("mouseleave", () => {
        if (k)
            oko.src = "images/eye_0001_Layer-0.png"
        else
            oko.src = "images/eye_0000_Layer-0-copy.png"
    })
    oko.addEventListener("click", () => {
        if (k) {
            oko.src = "images/eye_0000_Layer-0-copy.png"
            pass.type = "text"
            k = 0
        }
        else {
            oko.src = "images/eye_0001_Layer-0.png"
            k = 1
            pass.type = "password"
        }
    })
    pass.addEventListener("keyup", function (e) {
        if (e.key == "Enter")
            logujSe()
    })
}

function register() {
    let ime = document.getElementById("ime")
    let prezime = document.getElementById("prezime")

    let duplikat = false

    for (let user of users) {
        user = JSON.parse(user)
        if (user.email == uoe.value || ki.value == user.username) {
            duplikat = true
        }

    }

    let c1 = check1()
    let c2 = check2()
    let c3 = check3()
    let c4 = check4()
    if (c1 && c2 && c3 && c4 && !duplikat) {
        let obj = {
            ime: ime.value,
            prezime: prezime.value,
            username: ki.value,
            email: uoe.value,
            pass: pass.value,
            mal: [],
            slikaLink: "images/profile.png"
        }
        if (brojUsera > 0) {
            brojUsera = JSON.parse(localStorage.getItem("brojUsera"))
            users = JSON.parse(localStorage.getItem("users"))
        }
        brojUsera++;
        let brr = document.getElementById("brr")
        brr.textContent = brojUsera
        localStorage.setItem("brojUsera", JSON.stringify(brojUsera))
        users.push(JSON.stringify(obj));
        localStorage.setItem("users", JSON.stringify(users))
        toLog()
        let uspesno = document.getElementById("uspesno")
        let us = document.getElementById("us")
        us.textContent = "Uspesna registracija"
        uspesno.className = ""
        void uspesno.offsetWidth;
        uspesno.className = "animate"
    }
    else {
        noreg.style.display = "block"
    }
}

function logujSe() {
    let log = false
    let c1 = check1()
    let c2 = check2()
    for (let user of users) {
        user = JSON.parse(user)
        if ((user.username == uoe.value || user.email == uoe.value) && user.pass == pass.value && c1 && c2) {
            log = true
            activeUser = user.username
            ime2.value = user.ime
            prezime2.value = user.prezime
            username2.value = user.username
            email2.value = user.email
            pass21.value = user.pass
            prikazSlike.src = user.slikaLink
            prof.src = user.slikaLink
            break
        }
    }
    if (log) {
        login.style.animationName = "logged"
        main.style.animationName = "getOut"
        sesirce.style.animationName = "ulet"
        let userlog = document.getElementById("userlog")
        userlog.textContent = activeUser
        uoe.value = ""
        pass.value = ""
        let uspesno = document.getElementById("uspesno")
        let us = document.getElementById("us")
        us.textContent = "Uspesan login"
        uspesno.className = ""
        wrng2.style.display = "none"
        void uspesno.offsetWidth;
        uspesno.className = "animate"
        body.style.overflow = "auto"
        let loguser = document.getElementById("loguser")
        loguser.textContent = activeUser
        noreg.style.display = "none"
        ucitajMAL(-1)
        toPocetna()
    }
    else {
        noreg.style.display = "block"
    }
}

function stampaj() {
    for (let user of users) {
        user = JSON.parse(user)
        console.log(user)
    }
}

let activeUser = ""
let slika = document.getElementById("slika")
let us = document.getElementById("us")
let body = document.getElementById("body")
function izlogujSe() {
    activeUser = ""
    main.style.animationName = "getIn"
    login.style.animationName = "loggedout"
    let uspesno = document.getElementById("uspesno")
    let us = document.getElementById("us")
    us.textContent = "Uspesan logout"
    uspesno.className = ""
    void uspesno.offsetWidth;
    uspesno.className = "animate"
    ime2.disabled = true
    prezime2.disabled = true
    username2.disabled = true
    email2.disabled = true
    pass21.disabled = true
    oko2.src = "images/eye_0001_Layer-0.png"
    s = 1
    pass21.type = "password"
    oko.src = "images/eye_0001_Layer-0.png"
    k = 1
    pass.type = "password"
    wrng.style.display = "none";
    wrng2.style.display = "none";
    noreg.style.display = "none"
    op1.style.backgroundColor = "#525252"
    op2.style.backgroundColor = "#222222"
    lista.style.display = "flex"
    pod.style.display = "none"
    saveButton.style.display = "none"
    editButton.style.display = "block"
    sesirce.style.animationName = ""
}

let oko = document.querySelector(".oko")
let k = 1
oko.addEventListener("mouseover", () => {
    if (k)
        oko.src = "images/eye_0000_Layer-0-copy.png"
    else
        oko.src = "images/eye_0001_Layer-0.png"
})
oko.addEventListener("mouseleave", () => {
    if (k)
        oko.src = "images/eye_0001_Layer-0.png"
    else
        oko.src = "images/eye_0000_Layer-0-copy.png"
})
oko.addEventListener("click", () => {
    if (k) {
        oko.src = "images/eye_0000_Layer-0-copy.png"
        pass.type = "text"
        k = 0
    }
    else {
        oko.src = "images/eye_0001_Layer-0.png"
        k = 1
        pass.type = "password"
    }
})

let oko2 = document.getElementById("oko2")
let s = 1
oko2.addEventListener("mouseover", () => {
    if (s)
        oko2.src = "images/eye_0000_Layer-0-copy.png"
    else
        oko2.src = "images/eye_0001_Layer-0.png"
})
oko2.addEventListener("mouseleave", () => {
    if (s)
        oko2.src = "images/eye_0001_Layer-0.png"
    else
        oko2.src = "images/eye_0000_Layer-0-copy.png"
})
oko2.addEventListener("click", () => {
    if (s) {
        oko2.src = "images/eye_0000_Layer-0-copy.png"
        pass21.type = "text"
        s = 0
    }
    else {
        oko2.src = "images/eye_0001_Layer-0.png"
        s = 1
        pass21.type = "password"
    }
})

let pocetna = document.getElementById("pocetna")
let top20 = document.getElementById("top20")
let pretraga = document.getElementById("pretraga")
let profil = document.getElementById("profil")

let m1 = document.getElementById("m1")
let m2 = document.getElementById("m2")
let m3 = document.getElementById("m3")
m1.style.textDecoration = "underline"
let sesirce = document.getElementById("sesirce")

function toPocetna() {

    pocetna.style.display = "flex"
    top20.style.display = "none"
    pretraga.style.display = "none"
    profil.style.display = "none"
    m1.style.textDecoration = "underline"
    m2.style.textDecoration = "none"
    m3.style.textDecoration = "none"
    sesirce.style.marginLeft = "-292px"
    sesirce.style.marginTop = "-16px"
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toTop20() {

    pocetna.style.display = "none"
    top20.style.display = "flex"
    pretraga.style.display = "none"
    profil.style.display = "none"
    m1.style.textDecoration = "none"
    m2.style.textDecoration = "underline"
    m3.style.textDecoration = "none"
    sesirce.style.marginLeft = "-62px"
    sesirce.style.marginTop = "-16px"
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toPretraga() {

    pocetna.style.display = "none"
    top20.style.display = "none"
    pretraga.style.display = "flex"
    profil.style.display = "none"
    m1.style.textDecoration = "none"
    m2.style.textDecoration = "none"
    m3.style.textDecoration = "underline"
    sesirce.style.marginLeft = "112px"
    sesirce.style.marginTop = "-16px"
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toProfil() {
    pocetna.style.display = "none"
    top20.style.display = "none"
    pretraga.style.display = "none"
    profil.style.display = "flex"
    m1.style.textDecoration = "none"
    m2.style.textDecoration = "none"
    m3.style.textDecoration = "none"
    sesirce.style.marginLeft = "1820px"
    sesirce.style.marginTop = "-26px"
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
/*
            <div id="a1" class="animeBox">
                <div id="slika1">
                    <p>1</p>
                    <img src="images/animes/aotf1.jpg" alt="">
                </div>
                <div id="info">
                    <p>Fullmetal Alchemist: Brotherhood</p>
                    <p>TV</p>
                    <p>64 episodes</p>
                    <p>Apr 2009 - Jul 2010</p>
                    <p>3072575 members</p>
                    <p>9.14</p>
                </div>
                <div id="dodaj">
                    <p>+</p>
                </div>
*/
let sviA = document.getElementById("sviA")
let results = document.getElementById("results")
toPocetna()
function addToTop20() {

    sviA.innerHTML = ""
    let brojac = 1
    //update localStorage
    users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.parse(users[i])
    }
    for (let anime of animes) {
        if (brojac == 21) continue
        let div1 = document.createElement("div")
        div1.className = "animeBox"
        div1.id = `a${brojac}`
        brojac++;
        let div2 = document.createElement("div")
        div2.id = "slika1"
        let p1 = document.createElement("p")
        p1.textContent = anime.rank
        let img1 = document.createElement("img")
        img1.src = `${anime.link}`
        div2.appendChild(p1)
        div2.appendChild(img1)
        div1.appendChild(div2)

        let div3 = document.createElement("div")
        div3.id = "info"

        let p2 = document.createElement("p")
        p2.textContent = anime.title
        p2.style.fontSize = "24px"
        let p3 = document.createElement("p")
        p3.textContent = anime.type
        let p4 = document.createElement("p")
        p4.textContent = anime.episodes + " ep"
        let p5 = document.createElement("p")
        p5.textContent = anime.startDate + " - " + anime.endDate
        let p6 = document.createElement("p")
        p6.textContent = "Gledatelja: " + anime.members
        let p7 = document.createElement("p")
        p7.textContent = "Ocena: " + anime.score

        div3.appendChild(p2)
        div3.appendChild(p3)
        div3.appendChild(p4)
        div3.appendChild(p5)
        div3.appendChild(p6)
        div3.appendChild(p7)

        div1.appendChild(div3)

        let div4 = document.createElement("div")
        div4.id = "dodaj"

        let p8 = document.createElement("p")

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == activeUser) {
                if (users[i].mal.indexOf(JSON.stringify(brojac - 2)) != -1) {
                    p8.textContent = "Dodato"
                    div4.style.backgroundColor = "rgb(183, 183, 183)"
                }
                else {
                    p8.textContent = "Dodaj"
                    div4.addEventListener("click", () => {
                        ucitajMAL(realI)
                        p8.textContent = "Dodato"
                        div4.style.backgroundColor = "rgb(183, 183, 183)"
                    })
                }
                break
            }
        }

        let realI = brojac - 2
        div4.appendChild(p8)
        div1.appendChild(div4)
        sviA.appendChild(div1)
    }
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.stringify(users[i])
    }
    localStorage.setItem("users", JSON.stringify(users))
    //update localStorage
}


let najp = document.querySelector(".najp")
let sez = document.querySelector(".sez")
let mf = document.querySelector(".mf")

let pd = document.querySelector(".pd")
let ust = document.querySelector(".ust")
let najg = document.querySelector(".najg")

function popuniPocetnu() {
    let niz2 = [...animes]
    //update localStorage
    users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.parse(users[i])
    }
    for (let i = 0; i < 20; i++) {

        for (let j = i + 1; j < 19; j++) {
            if (Number(niz2[i].members) < Number(niz2[j].members)) {
                let temp = niz2[i]
                niz2[i] = niz2[j]
                niz2[j] = temp
            }
        }
    }
    /* 
        <div id="naj1" class="animePic">
            <p>Attack on Titan: The Final</p>
            <p id="txt1">+</p>
        </div>
    */
    najp.innerHTML = ""
    for (let i = 0; i < 5; i++) {
        let div1 = document.createElement("div")
        div1.id = `naj${i + 1}`
        div1.className = "animePic"
        div1.style.backgroundImage = `url("${niz2[i].link}")`
        let p1 = document.createElement("p")
        p1.textContent = niz2[i].title
        p1.addEventListener("click", () => {
            showInfo(niz2[i].link, niz2[i].title, niz2[i].rank, niz2[i].type,
                niz2[i].episodes, `${niz2[i].startDate} - ${niz2[i].endDate}`, niz2[i].members, niz2[i].score)
        })
        let p2 = document.createElement("p")
        p2.id = "txt1"
        let ind = Number(niz2[i].rank) - 1

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == activeUser) {
                if (users[i].mal.indexOf(JSON.stringify(ind)) != -1) {
                    p2.textContent = "✓"
                    break
                }
                else {
                    p2.textContent = "+"
                    p2.addEventListener("click", () => {
                        ucitajMAL(ind)
                        p2.textContent = "✓"
                    })
                    break
                }
            }
        }




        div1.appendChild(p1)
        div1.appendChild(p2)
        najp.appendChild(div1)
    }
    sez.innerHTML = ""
    for (let i = 20; i < 25; i++) {
        let div1 = document.createElement("div")
        div1.id = `sez${i - 19}`
        div1.className = "animePic"
        div1.style.backgroundImage = `url("${animes[i].link}")`
        let p1 = document.createElement("p")
        p1.textContent = animes[i].title
        p1.addEventListener("click", () => {
            showInfo(animes[i].link, animes[i].title, animes[i].rank, animes[i].type,
                animes[i].episodes, `${animes[i].startDate} - ${animes[i].endDate}`,
                animes[i].members, animes[i].score)
        })
        let p2 = document.createElement("p")
        p2.id = "txt1"
        let ind = Number(niz2[i].rank) - 1

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == activeUser) {
                if (users[i].mal.indexOf(JSON.stringify(ind)) != -1) {
                    p2.textContent = "✓"
                    break
                }
                else {
                    p2.textContent = "+"
                    p2.addEventListener("click", () => {
                        ucitajMAL(ind)
                        p2.textContent = "✓"
                    })
                    break
                }
            }
        }

        div1.appendChild(p1)
        div1.appendChild(p2)
        sez.appendChild(div1)
    }
    mf.innerHTML = ""
    for (let i = 25; i < 30; i++) {
        let div1 = document.createElement("div")
        div1.id = `mf${i - 24}`
        div1.className = "animePic"
        div1.style.backgroundImage = `url("${animes[i].link}")`
        let p1 = document.createElement("p")
        p1.textContent = animes[i].title
        p1.addEventListener("click", () => {
            showInfo(animes[i].link, animes[i].title, animes[i].rank, animes[i].type,
                animes[i].episodes, `${animes[i].startDate} - ${animes[i].endDate}`,
                animes[i].members, animes[i].score)
        })
        let p2 = document.createElement("p")
        p2.id = "txt1"
        let ind = Number(niz2[i].rank) - 1
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == activeUser) {
                if (users[i].mal.indexOf(JSON.stringify(ind)) != -1) {
                    p2.textContent = "✓"
                    break
                }
                else {
                    p2.textContent = "+"
                    p2.addEventListener("click", () => {
                        ucitajMAL(ind)
                        p2.textContent = "✓"
                    })
                    break
                }
            }
        }
        div1.appendChild(p1)
        div1.appendChild(p2)
        mf.appendChild(div1)
    }

    //poslednji dodat
    pd.innerHTML = "<p>Poslednji dodat</p>"
    {
        let div1 = document.createElement("div")
        div1.id = `pd${1}`
        div1.className = "animePic"
        div1.style.backgroundImage = `url("${animes[24].link}")`
        let p1 = document.createElement("p")
        p1.style.backgroundColor = "#8b0327"
        div1.style.borderTop = "2px solid rgb(255, 255, 255)"
        p1.textContent = animes[24].title
        p1.addEventListener("click", () => {
            showInfo(animes[24].link, animes[24].title, animes[24].rank, animes[24].type,
                animes[24].episodes, `${animes[24].startDate} - ${animes[24].endDate}`,
                animes[24].members, animes[24].score)
        })
        div1.appendChild(p1)
        pd.appendChild(div1)
    }
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.stringify(users[i])
    }
    localStorage.setItem("users", JSON.stringify(users))
    //update localStorage
}
//25,26,28
function fillSearch() {
    let brojac = 0;
    results.innerHTML = ""
    //update localStorage
    users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.parse(users[i])
    }
    for (let anime of animes) {
        if (brojac == 25 || brojac == 26 || brojac == 28) {
            brojac++;
            continue
        }
        if (!trazi(anime)) {
            brojac++;
            continue
        }
        let div1 = document.createElement("div")
        div1.className = "animeBox"
        div1.id = `a${brojac + 1}`
        brojac++;
        let div2 = document.createElement("div")
        div2.id = "slika1"
        let img1 = document.createElement("img")
        img1.src = `${anime.link}`
        div2.appendChild(img1)
        div1.appendChild(div2)

        let div3 = document.createElement("div")
        div3.id = "info"

        let p2 = document.createElement("p")
        p2.textContent = anime.title
        p2.style.fontSize = "24px"
        let p3 = document.createElement("p")
        p3.textContent = anime.type
        let p4 = document.createElement("p")
        p4.textContent = anime.episodes + " ep"
        let p5 = document.createElement("p")
        p5.textContent = anime.startDate + " - " + anime.endDate
        let p6 = document.createElement("p")
        p6.textContent = "Gledatelja: " + anime.members
        let p7 = document.createElement("p")
        p7.textContent = "Ocena: " + anime.score

        div3.appendChild(p2)
        div3.appendChild(p3)
        div3.appendChild(p4)
        div3.appendChild(p5)
        div3.appendChild(p6)
        div3.appendChild(p7)

        div1.appendChild(div3)

        let div4 = document.createElement("div")
        div4.id = "dodaj"

        let p8 = document.createElement("p")


        for (let i = 0; i < users.length; i++) {
            if (users[i].username == activeUser) {
                if (users[i].mal.indexOf(JSON.stringify(brojac - 1)) != -1) {
                    p8.textContent = "Dodato"
                    div4.style.backgroundColor = "rgb(183, 183, 183)"
                    break
                }
                else {
                    p8.textContent = "Dodaj"
                    div4.addEventListener("click", () => {
                        ucitajMAL(realI)
                        p8.textContent = "Dodato"
                        div4.style.backgroundColor = "rgb(183, 183, 183)"
                    })
                    break
                }
            }
        }

        let realI = brojac - 1
        div4.appendChild(p8)
        div1.appendChild(div4)
        results.appendChild(div1)
    }
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.stringify(users[i])
    }
    localStorage.setItem("users", JSON.stringify(users))
    //update localStorage
}


let searchbar = document.getElementById("searchbar")
function trazi(anime) {
    if (anime.title.toLowerCase().indexOf(searchbar.value.toLowerCase()) != -1
        && (tipovi.value == "all" || tipovi.value == anime.type))
        return true
    return false
}
let tipovi = document.getElementById("tipovi")
function fillTip() {
    for (let t of tip) {
        tipovi.innerHTML += `
        <option value="${t}">${t}</option>
        `
    }
}

let slikaInput = document.getElementById('fileload');
let prikazSlike = document.getElementById('profslika');
let loguser = document.getElementById("loguser")
let prof = document.getElementById("prof")
slikaInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            prikazSlike.src = e.target.result;
            prof.src = e.target.result;
            //update localStorage
            users = JSON.parse(localStorage.getItem("users"))

            for (let i = 0; i < users.length; i++) {
                users[i] = JSON.parse(users[i])
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].username == activeUser) {
                    users[i].slikaLink = e.target.result;
                    break
                }
            }
            for (let i = 0; i < users.length; i++) {
                users[i] = JSON.stringify(users[i])
            }
            localStorage.setItem("users", JSON.stringify(users))
            //update localStorage
        };
        reader.readAsDataURL(file);
    } else {
        prikazSlike.src = "images/profile.png";
    }
});

let op1 = document.getElementById("op1")
let op2 = document.getElementById("op2")
let lista = document.getElementById("lista")
let pod = document.getElementById("pod")


op1.addEventListener("click", () => {
    op1.style.backgroundColor = "#525252"
    op2.style.backgroundColor = "#222222"
    lista.style.display = "flex"
    pod.style.display = "none"
})

op2.addEventListener("click", () => {
    op1.style.backgroundColor = "#222222"
    op2.style.backgroundColor = "#525252"
    lista.style.display = "none"
    pod.style.display = "flex"
})

let maldiv = document.getElementById("maldiv")

let ime2 = document.getElementById("ime2")
let prezime2 = document.getElementById("prezime2")
let username2 = document.getElementById("username2")
let email2 = document.getElementById("email2")
let pass21 = document.getElementById("pass2")
ime2.disabled = true
prezime2.disabled = true
username2.disabled = true
email2.disabled = true
pass21.disabled = true
let saveButton = document.getElementById("save")
saveButton.style.display = "none"
let editButton = document.getElementById("edit")

let nsp = document.getElementById("nsp")
nsp.style.display = "none"
function saved() {
    users = JSON.parse(localStorage.getItem("users"))
    //username
    let dup1 = false
    for (let user of users) {
        user = JSON.parse(user)
        if (user.username == username2.value && username2.value != activeUser)
            dup1 = true
    }
    let uslov1 = false
    if (username2.value.length >= 5 && !dup1)
        uslov1 = true
    //email
    let activeMail = ""
    for (let user of users) {
        user = JSON.parse(user)
        if (user.username == activeUser)
            activeMail = user.email
    }
    let dup2 = false
    for (let user of users) {
        user = JSON.parse(user)
        if (user.email == email2.value && user.email != activeMail)
            dup2 = true
    }
    let uslov2 = false
    if (reg1.test(email2.value) && !dup2) {
        uslov2 = true
    }
    //password
    let uslov3 = false
    if (pass21.value.length >= 5)
        uslov3 = true
    //
    if (uslov1 && uslov2 && uslov3) {
        ime2.disabled = true
        prezime2.disabled = true
        username2.disabled = true
        email2.disabled = true
        pass21.disabled = true
        saveButton.style.display = "none"
        editButton.style.display = "block"
        let uspesno = document.getElementById("uspesno")
        let us = document.getElementById("us")
        us.textContent = "Uspesno Sacuvane Promene"
        uspesno.className = ""
        void uspesno.offsetWidth;
        uspesno.className = "animate"
        nsp.style.display = "none"
        //update localStorage
        for (let i = 0; i < users.length; i++) {
            users[i] = JSON.parse(users[i])
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == activeMail && users[i].username == activeUser) {
                users[i].email = email2.value
                users[i].username = username2.value
                users[i].ime = ime2.value
                users[i].prezime = prezime2.value
                users[i].pass = pass21.value
                activeMail = users[i].email
                activeUser = users[i].username
                loguser.textContent = activeUser
                let userlog = document.getElementById("userlog")
                userlog.textContent = activeUser
                break
            }
        }
        for (let i = 0; i < users.length; i++) {
            users[i] = JSON.stringify(users[i])
        }
        localStorage.setItem("users", JSON.stringify(users))
        //update localStorage
    }
    else {
        nsp.style.display = "block"
    }

}
function uredi() {
    ime2.disabled = false
    prezime2.disabled = false
    username2.disabled = false
    email2.disabled = false
    pass21.disabled = false
    saveButton.style.display = "block"
    editButton.style.display = "none"

}

function ucitajMAL(index) {
    maldiv.innerHTML = ""

    //update localStorage
    users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.parse(users[i])
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == activeUser) {
            if (index != -1 && users[i].mal.indexOf(JSON.stringify(index)) == -1) {
                users[i].mal.push(JSON.stringify(index))
            }

            for (let j of users[i].mal) {
                j = JSON.parse(j)
                let div1 = document.createElement("div")
                div1.style.borderTop = "2px solid rgb(255, 255, 255)"
                div1.id = `mal${j}`
                div1.className = "animePic"
                div1.style.backgroundImage = `url("${animes[j].link}")`
                let p1 = document.createElement("p")
                p1.textContent = animes[j].title
                p1.addEventListener("click", () => {
                    showInfo(animes[j].link, animes[j].title, animes[j].rank, animes[j].type,
                        animes[j].episodes, `${animes[j].startDate} - ${animes[j].endDate}`,
                        animes[j].members, animes[j].score)
                })

                let p2 = document.createElement("p")
                p2.id = "txt1"
                p2.textContent = "-"
                p2.addEventListener("click", () => {
                    ukloniSaMAL(j)
                })
                div1.appendChild(p1)
                div1.appendChild(p2)
                maldiv.appendChild(div1)
            }
            break
        }
    }
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.stringify(users[i])
    }
    localStorage.setItem("users", JSON.stringify(users))
    //update localStorage
    popuniPocetnu()
    fillSearch()
    addToTop20()

}

function ukloniSaMAL(index) {
    //update localStorage
    users = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.parse(users[i])
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == activeUser) {
            users[i].mal.splice(users[i].mal.indexOf(JSON.stringify(index)), 1)
            let divRem = document.getElementById(`mal${index}`)
            maldiv.removeChild(divRem)
            break
        }
    }
    for (let i = 0; i < users.length; i++) {
        users[i] = JSON.stringify(users[i])
    }
    localStorage.setItem("users", JSON.stringify(users))
    //update localStorage
    fillSearch()
    addToTop20()
    popuniPocetnu()
}

let showinfo = document.getElementById("showinfo")

showinfo.addEventListener("click", function (event) {
    if (event.target === this)
        closePrikaz()
})

function closePrikaz() {
    showinfo.style.display = "none"
}

let prikazSlika = document.getElementById("prikazSlika")
let prikazNaslov = document.getElementById("prikazNaslov")
let prikazRank = document.getElementById("prikazRank")
let prikazType = document.getElementById("prikazType")
let prikazEp = document.getElementById("prikazEp")
let prikazDate = document.getElementById("prikazDate")
let prikazMember = document.getElementById("prikazMember")
let prikazScore = document.getElementById("prikazScore")
function showInfo(link, naslov, rank, type, ep, date, member, score) {
    prikazSlika.src = link
    prikazNaslov.textContent = naslov
    prikazRank.textContent = "Rank: " + rank
    prikazType.textContent = "Tip: " + type
    prikazEp.textContent = "Ep: " + ep
    prikazDate.textContent = date
    prikazMember.textContent = "Gledatelja: " + member
    prikazScore.textContent = "Ocena: " + score
    showinfo.style.display = "flex"
}

pass.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        logujSe()
    }

})

let kss = document.getElementById("kss")

kss.addEventListener("click", () => {
    showInfo(animes[20].link, animes[20].title, animes[20].rank, animes[20].type,
        animes[20].episodes, `${animes[20].startDate} - ${animes[20].endDate}`,
        animes[20].members, animes[20].score)
})