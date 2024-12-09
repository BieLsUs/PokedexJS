// Aba de Detalhes pokemons
const pokemonDatails = document.getElementById('tabActive');
const bttDatailsMore = document.getElementById('bttMoreDatails');

const loadDatailsmaxPage = 151;
const limit = 10;
let offset = 0;

function convertPokemonTabDiv(pokemonCard) {
    return `
    <div class="tabGlobal">
            <div class="tab__represent">
                <div class="represent__denomination">
                    <h3>${pokemonCard.name}</h3>
                    <span class="order">#${pokemonCard.number}</span>
                </div>

                <div class="represent__status">
                    <ul>
                    ${pokemonCard.types.map((type) => `<li class="tabType ${type}">${type}</li>`).join('')}
                    </ul>
                </div>

                <div class="represent__img">
                    <img src="${pokemonCard.photo}" alt="Imagem do Bulbasaur">
                </div>
            </div>

            <div class="tab-info">
                <h4 class="info__text active">About</h4>

                <ul id="infoCard">
                    <li class="about">Espécie: ${pokemonCard.specie}</li>
                    <li class="about">Altura: ${pokemonCard.altura}</li>
                    <li class="about">Peso: ${pokemonCard.peso}</li>
                    <li class="about">Abilidades: ${pokemonCard.abilities.map((ability) => ` ${ability}`).join(', ')}</li>
                </ul>
            </div>
        </div>
`
}

function morePage(offset, limit) {
    pokemonApi.getpokemons(offset, limit).then((pokemonTab = []) => {
        pokemonDatails.innerHTML += pokemonTab.map(convertPokemonTabDiv).join('')
    })
}

morePage(offset, limit);

bttDatailsMore.addEventListener('click', () => {
    offset += limit;

    const loadPage = offset + limit;

    if (loadPage >= loadDatailsmaxPage) {
        const maxPokemon = loadDatailsmaxPage - offset;
        morePage(offset, maxPokemon);

        bttDatailsMore.parentElement.removeChild(bttDatailsMore);

        return
    } else {
        morePage(offset, limit);
    }
})
