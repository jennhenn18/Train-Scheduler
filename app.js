  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBPuPWjMa6yEJnFt6hvlmb82vfpTmY3ahI",
    authDomain: "train-scheduler-3ade6.firebaseapp.com",
    databaseURL: "https://train-scheduler-3ade6.firebaseio.com",
    projectId: "train-scheduler-3ade6",
    storageBucket: "",
    messagingSenderId: "811935117326",
    appId: "1:811935117326:web:239406a0399973b6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //create variable for access Firebase
  var database = firebase.database();

// create an onclick function to adding a new train input

$('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    // store user input into variables
    var trainName = $('#train-name-input').val().trim();
    var trainDestination = $('#destination-input').val().trim();
    var firstTrainTime = $('#first-train-input').val();
    var trainFrequency = $('#frequency-input').val();

    // create local "temporary" object for holding the train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency
    };

    //store information in Firebase
    database.ref().push(newTrain);

    // clear the form
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#first-train-input').val('');
    $('#frequency-input').val('');

});


    // create a Firebase event that listens and stores and displays information as a child
    database.ref().on('child_added', function(childSnapshot) {
        
        //store child information in a variable
        var newTrain1 = childSnapshot.val().name;
        var trainDestination1 = childSnapshot.val().destination;
        var firstTrainTime1 = childSnapshot.val().firstTrain;
        var trainFrequency1 = childSnapshot.val().frequency;

        

        // calculate the first time
        var firstTrainConverted = moment(firstTrainTime1, 'hh:mm').subtract(1, 'years');

        //store difference between first train time and current time
        var diffTime = moment().diff(moment(firstTrainConverted), 'minutes');

        // find the time apart using remainder
        var tRemainder = diffTime % trainFrequency1

        //find minutes till next train
        var trainMinAway = trainFrequency1 - tRemainder;

        //find next arrival time
        var nextTrainArrival = moment().add(trainMinAway, 'minutes').format('hh:mm A');

    
        // create new row for train data
        var newRow = $('<tr>').append(
            $('<td>').text(newTrain1),
            $('<td>').text(trainDestination1),
            $('<td>').text(trainFrequency1),
            $('<td>').text(nextTrainArrival),
            $('<td>').text(trainMinAway + ' mins'),
        );

        // append the new row to the table
        $('#train-table > tbody').append(newRow);
});
