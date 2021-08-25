
$('#addReview').submit(function (e){
   $('.alert.alert-info').hide();
   if(!$('input#name').val() || !$('select#name').val() || !$('textarea#review').val()){
       if($('.alert.alert-info').length){
           $('.alert.alert-info').show();
       }
       else{
           $(this).prepend('<div role="alert" class="alert alert-info"> All required fields,'
           + 'please try again Bounce</div>');
       }
return false;
   }
});