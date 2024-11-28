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

        try {
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
        <div className="container mt-5">
            <div className="row">
                <div className="col text-center">
                    <h3>Pokémon Search</h3>
                </div>
            </div>

            <div className="row mt-3 justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 d-flex flex-column flex-md-row align-items-center">
                    <input
                        type="text"
                        value={pokemonName}
                        onChange={(e) => setPokemonName(e.target.value)}
                        placeholder="Enter Pokémon name"
                        className="form-control mb-2 mb-md-0 me-md-2"
                        style={{ flex: "1 1 auto", minWidth: "75%" }}
                    />
                    <button
                        onClick={handleSearch}
                        className="btn btn-danger w-100 w-md-auto"
                        style={{ backgroundColor: "#E31937" }}
                    >
                        Search
                    </button>
                </div>
            </div>

            {error && (
                <div className="row mt-3">
                    <div className="col text-center">
                        <p className="text-danger">{error}</p>
                    </div>
                </div>
            )}

            {pokemonData && (
                <div className="row mt-4">
                    <div className="col text-center">
                        <h4>{pokemonData.name}</h4>
                        <img
                            src={shinyMode ? pokemonData.spriteImageUrl : pokemonData.baseImageUrl}
                            alt={`${pokemonData.name} sprite`}
                            style={{ width: "150px", height: "150px" }}
                            className="img-fluid"
                        />
                        <div className="mt-2">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={shinyMode}
                                    onChange={(e) => setShinyMode(e.target.checked)}
                                    className="me-2"
                                />
                                Shiny Mode
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPokemon;