require('../utils/pokemonList')

function checkGradingAgency(input) {
    if (input.toLowerCase().contains("PSA")) {
        return "PSA"
    }
    else if (input.toLowerCase().contains("BGS")) {
        return "BGS"
    }
    else if (input.toLowerCase().contains("CGC")) {
        return "CGC"
    }
    else {
        return null;
    }
}

function checkGemMint(input) {
    if(input.toLowerCase().contains('gm') || input.toLowerCase().contains("gemmint" || input.toLowerCase().contains("gem mint"))) {
        return true;
    }
    else {
        return false;
    }
}

function checkShadowless(input) {
    if(input.toLowerCase().contains('shadowless')) {
        return true;
    }
    else {
        return false;
    }   
}

function checkPokeName(input) {
    for(let i = 0; i < pokeList.length; i++) {
        if (input.toLowerCase().contains(pokeList[i].pokemon)) {
            const pokeObj = { name: pokeList[i].number, number: pokeList[i].number };
            return pokeObj;
        }
        else {
            return null;
        }
    }
}

