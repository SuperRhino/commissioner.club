$(function(){

	// Filter the results down
    $("input[name='filter-keepers']").keyup( filterKeepers );

    // Reset the Filter:
    $("#clear-filter").click(function(){
  	  $("input[name='filter-keepers']").val('').keyup().blur();
    });

    // Toggle examples:
    $("#show-examples").click(function(e){
    	e.preventDefault();
    	$(".examples").slideToggle();
    });

});


// *********************************
// FILTER REPS
// *********************************
function filterKeepers(){
    var needle = $("input[name='filter-keepers']").val().toLowerCase(),
      $searchContainers = $(".searchable"),
      $haystack = $searchContainers;

    // Show All
    $('.list').children('h4,.subtext').show();
    $searchContainers.show();
    $('#not-found').hide();

    // Filter by needle
    if( needle!=='' ){
        $haystack.filter(function(index){

          //Custom filter by name (case insensitive)
          return ( $(this).text().toLowerCase().indexOf( needle ) === -1 );

        })
        //.parentsUntil( $searchContainers )
        .hide(); //Hide Unselected

        if ($(".searchable:visible").length === 0) {
            $('.list').children('h4,.subtext').hide();
            $('#not-found').show();
        } else {

            $('#not-found').hide();
            hideEmptySections();
        }
    }

}

function hideEmptySections() {
    $('.list').children('h4:visible').each(function(){
        var $me = $(this);
        if ($me.nextUntil('h4').filter('.searchable:visible').length === 0) {
            $me.hide();
            if ($me.next().is('.subtext')){ $me.next().hide(); }
        }
    });
}
