const getMethodFetch = async (url) => {
    try 
    {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GET hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } 
    catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
}

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
        }
    }
    catch(error){

        throw new Error("hiba")
    }
}

document.addEventListener("DOMContentLoaded", async()=>{
    let urlkerdes = "/api/kerdes"
    let urlhozza = "/api/hozzaad"
    document.getElementById("gomb").addEventListener("click", async()=>{
        try{
            let getresponse = await getMethodFetch(url)
            let kerdes = document.getElementById("kerdes")
            let valasz1 = document.getElementById("valasz1")
            let valasz2 = document.getElementById("valasz2")
            let jovalasz = document.getElementById("jovalasz")
            let postresponsehozza = await postMethodFetch(urlhozza, {
                kerdes: kerdes,
                valasz1: valasz1,
                valasz2: valasz2,
                jovalasz: jovalasz
            })
            for(let i = 0; i < postresponsehozza.tomb.length; i++){
                console.log(postresponsehozza.tomb[i])
            }
            

        }
        catch(error){
            console.log("Hibauzenet")
        }



    })

})