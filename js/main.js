// Listen ENTER key then simulate a click.
$(document).keypress(function(e) {
  if(e.which == 13) {
    $("#botao_busca").click()

    // When modal display is on, simulate the click only on it.
    if($(".modal").css("display") == ("block")) {
      $("#botao_modal").click()
    }
  }
});

// Close the modal setting the display css attribute.
function fecharModal() {
  $(".modal").css("display", "none")
}


function consultaCep() {

  // When a search is made progress-bar is showed, the zip code is taken and inserted into API's URL.
  $("#barra_progresso").show();
  var cep = document.getElementById("cep").value;
  var url = "https://viacep.com.br/ws/" + cep + "/json/";

  // If zip code is incomplete, the alert modal is displayed.
  if(cep.length < 9) {
    $("#barra_progresso").hide();
    $(".modal").css("display", "block")
  }

  // If zip code has the correct length, AJAX request is made.
  if(cep.length == 9) { 
    $.ajax({
      url: url,
      type: "GET",  
      success: function(response) {
        // If returns an response, data are showed.
        $("#logradouro").html(response.logradouro);
        $("#bairro").html(response.bairro);
        $("#localidade").html(response.localidade);
        $("#uf").html(response.uf);
        $("#titulo_cep").html(`CEP ${response.cep}`);
        $("#cep_info").show();
        $("#cep_partials").show();
        $("#barra_progresso").hide()

        // If response returns an error because of an incorrect zip code, a message is displayed informing it.
        if(response.erro) {
          $("#titulo_cep").html(`O CEP ${cep} é inválido`);
          $("#cep_partials").hide()
        }
      },
      error: function() {
        alert("Ocorreu um erro interno")
      }
    })
  }        
};

// Hide zip code infos and the progress bar
$(function() {
  $("#cep_info").hide();
  $("#barra_progresso").hide();
})

$("#cep").mask('00000-000');
  