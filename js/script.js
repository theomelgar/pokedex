const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonType2 = document.querySelector('.pokemon__type2');
const verficaTipo = 'a';

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 132;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        pokemonType.innerHTML = data['types']['0']['type']['name'];
        if (data.types.length == 2){
            pokemonType2.innerHTML = data['types']['1']['type']['name'];
        } else{
            pokemonType2.innerHTML = ''
        }
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found yet';
        pokemonNumber = '';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', ()=> {
    if (searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', ()=> {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
});

renderPokemon('searchPokemon');