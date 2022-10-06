
$(function() {
   //Get 
   $('#get-button').on('click', function() {
    
        //TODO: get all users' IDs & display it
         $.ajax({
          url: '/tweets', 
          contentType: 'application/json',
          success: function(response){

            // store namebody in var tbodyEl
            var tbodyEl = $('#namebody');
            
            // clear tbodyEl
            tbodyEl.html('');
            
            // for each user item in tweetinfo, get id, screen_name and name
            // and put into textboxes appended to tbodyEl
            response.tweets.forEach(function(tweetinfo){
             tbodyEl.append('<tr> <td class="id">' + tweetinfo.user.id + '</td>  <td><input type="text"class="screen_name" value=" ' + tweetinfo.user.screen_name + '"> </td><td><input type="text"class="name" value=" ' + tweetinfo.user.name + '"> </td>   </tr>');
            
            });


          }

         });
         
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it

        $.ajax({
          url: '/tweetinfo', 
          contentType: 'application/json',
          success: function(response){

            // save tweetbody to var tbodyEj
            var tbodyEj = $('#tweetbody');
    
            // clear tbodyEj
            tbodyEj.html('');
             
            // for each item in tweetinfo, get id, text, and created_at
            // and display in text boxes appended to tbodyEj
            response.tweetinfo.forEach(function(tweetinfo){
             tbodyEj.append('<tr> <td class="id">' + tweetinfo.id + '</td>  <td><input type="text"class="screen_name" value=" ' + tweetinfo.text + '"> </td><td><input type="text"class="name" value=" ' + tweetinfo.created_at + '"> </td>   </tr>');
           
            });


          }
         });
       
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it

        $.ajax({
          url: '/searchinfo', 
          contentType: 'application/json',
          success: function(response){

            // store searchbody in var tbodyEl
            var tbodyEl = $('#searchbody');
            
            // clear tbodyEl
            tbodyEl.html('');
            
            // for each item in tweetinfo, iterate through history and check
            // if a user id matches. If match, append id, text, and time
            // to searchbody
            response.searchinfo.forEach(function(tweetinfo){
              
              for(let num = 0; num < history.length; num++){
                var check = history[num];
              if( tweetinfo.id === Number(check)){
                tbodyEl.append('<tr> <td class="id">' + tweetinfo.id + '</td>  <td><input type="text"class="screen_name" value=" ' + tweetinfo.text + '"> </td><td><input type="text"class="name" value=" ' + tweetinfo.created_at + '"> </td>   </tr>');
              }

            }
              
            });
        

          }

         });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        
        //TODO: creat a tweet

        // split createInput between ; and put into array createId
        var createId = createInput.val().split(";");
        
        // get the time and store it in var dateTime
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        
        $.ajax({
          url:'/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data:JSON.stringify({id: createId[0] , text: createId[1], created_at: dateTime}),
          success: function(response){

            // send response and clear text box
            console.log(response);
            createId.val('');
          }


        });

  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
  
    //TODO: search a tweet and display it.
    var useri = userID.val();
    $.ajax({
      url: '/searchinfo', 
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({userId: useri}),
      success: function(response){

        // store searchbody into tbodyE
        var tbodyE = $('#searchbody');
        // clear tbodyE
        tbodyE.html('');
        var found = false;
        // if userID matches an id from tweetinfo
        // append tweet data to searchbody
        response.searchinfo.forEach(function(tweet){
        if(!found && tweet.id === Number(userID.val())){
         // append tbodyE with seached tweet information
         tbodyE.append('<tr> <td class="id">' + tweet.id + '</td>  <td><input type="text"class="screen_name" value=" ' + tweet.text + '"> </td><td><input type="text"class="name" value=" ' + tweet.created_at + '"> </td>   </tr>');

        }
        
        });
        // clear userID text box
        userID.val('');

      }

     });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet

    // put newName into a variable
    var nm = newName;

    $.ajax({
      url: '/tweets/' + nm,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({userName: name}),
      success: function(response){

        // send response and clear input box
        console.log(response);
        updateInput.val('');
      }

    });

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
    // set tweetid to the value of id
     tweetid = id.val();
    $.ajax({
      url:'/tweetinfo/' + tweetid,
      method: 'DELETE',
      contentType: 'application/json',
      
      // send response and clear text box
      success: function(response){
        console.log(response);
        id.val('');
      }


    });


  });


});


                    
   