import React, {useState} from "react";

const SearchPokemon = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [shinyMode, setShinyMode] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError("");
        setPokemonData(null);

        if(!pokemonName){
            setError("Please enter a Pokémon name.");
            return;
        }

        try{
            debugger;
            const response = await fetch(`/api/SearchByName?name=${encodeURIComponent(pokemonName)}`);

            if(!response.ok && response.status !== 404){
                throw new Error(`Server responded with status ${response.status}: ${response.statusText}`);
            }

            const data = await response.json(); 

            if (data && data.data) {
                setPokemonData(data.data); 
            } else {
                setError(data.message || "Pokémon not found");
            }
        } catch (err) {
            setError(`An error occured while fetching Pokémon details: ${err}`);
        }
    };

    return (
        <div style={{ padding: "2%", textAlign: "center"}}>
            <h3>Pokemon Search</h3>

            <input type="text" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} placeholder="Enter Pokemon name"
                style={{ padding: "1%", width: "30%", fontSize: "16px"}}
            />

            <button
                onClick={handleSearch}
                style={{padding: "1% 2%", marginLeft: "1%", backgroundColor: "#E31937", color: "white", border: "none", cursor: "pointer", fontSize: "16px"}}
            > Search </button>

            {error && <p style={{ color: "red", marginTop: "2%" }}>{error}</p>}

            {pokemonData && (
                <div style={{marginTop: "2%"}}>
                    <h4>{pokemonData.name}</h4>
                    <div>
                        <img
                            src={shinyMode ? pokemonData.spriteImageUrl : pokemonData.baseImageUrl}
                            alt={`${pokemonData.name} sprite`}
                            style={{ width: "15%", height: "15%"}}
                        />
                        <div>
                            <label>
                                <input type="checkbox" checked={shinyMode} onChange={(e) => setShinyMode(e.target.checked)} />
                                Shiny mode
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPokemon;