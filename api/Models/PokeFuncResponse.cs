using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace api.Models
{
    public class PokeFuncResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public string? ErrorMessage { get; set; }
        public PokemonDetails? Data { get; set; }

        public PokeFuncResponse(HttpStatusCode statusCode, PokemonDetails? data, string? errorMessage = null)
        {
            StatusCode = statusCode;
            Data = data;
            ErrorMessage = errorMessage;
        }
    }
}
