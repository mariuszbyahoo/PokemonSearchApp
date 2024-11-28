using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Models
{
    public record PokemonDetails(string Name, string BaseImageUrl, string SpriteImageUrl);
}
