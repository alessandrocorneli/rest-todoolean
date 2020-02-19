$(document).ready(function() {
  printAllList();

  $('#send_btn').click(function(){
    var inputVal = $('#input_add').val();
    if (inputVal == '') {
      alert('Inserire una task.');
    } else {
      resetAll();
      console.log(inputVal);
      addElement(inputVal);
    }
  });

  $('#input_add').keypress(function(event) {
    if (event.which == 13) {
      var inputVal = $('#input_add').val();
      if (inputVal == '') {
        alert('Inserire una task.');
      } else {
        resetAll();
        console.log(inputVal);
        addElement(inputVal);
      }
    }
  });

  $(document).on('click', 'span.delete_btn', function() {
    var thisElement = $(this).parent().attr('data-id');
    deleteElement(thisElement);
    resetAll();
  });

  $(document).on('click', '#update_button', function() {
    var attr = $(this).parent('.list_item').children('#update_input').val();
    var id = $(this).parent('.list_item').attr('data-id');
    updateElement(id, attr);
  });

});

// Stampa della lista
function printAllList() {
  $.ajax({
    url: 'http://157.230.17.132:3009/todos',
    method: 'GET',
    success: function(data) {
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < data.length; i++) {
        var singleElement = data[i].text;
        var singleId = data[i].id;
        var context = {
          text: singleElement,
          id: singleId
        };
        var html = template(context);
        $('.todo_list').append(html);
      }
    },
    error: function (request, state, errors) {
      alert('Errore' + ' ' + error);
    }
  });
}

// Aggiunta dell'elemento della lista
function addElement(value) {
  $.ajax({
    url: 'http://157.230.17.132:3009/todos',
    method: 'POST',
    data: {
      text: value
    },
    success: function(data) {
      console.log(data);
      printAllList();
    },
    error: function (request, state, errors) {
      alert('Errore' + ' ' + error);
    }
  });
}

function deleteElement(id) {
  $.ajax({
    url: 'http://157.230.17.132:3009/todos/' + id,
    method: 'DELETE',
    success: function(data) {
      printAllList();
    },
    error: function (request, state, errors) {
      alert('Errore' + ' ' + error);
    }
  });
}
// Modifica degli elementi
function updateElement(id, value) {
  $.ajax({
    url: 'http://157.230.17.132:3009/todos/' + id,
    method: 'PATCH',
    data: {
      text: value
    },
    success: function(data) {
      resetAll();
      printAllList();
    },
    error: function (request, state, errors) {
      alert('Errore' + ' ' + error);
    }
  });
}
// Reset
function resetAll() {
  $('ul.todo_list').html('');
  $('#input_add').val('');
}
