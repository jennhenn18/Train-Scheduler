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

// create an onclick function to adding a new train

$('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    // store user input into variables
    var trainName = $('#train-name-input').val().trim();
    var trainDestination = $('#destination-input').val().trim();
    var firstTrainTime = $('#first-train-input').val().trim();
    var trainFrequency = $('#frequency-input').val().trim();

    // clear the form
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#first-train-input').val('');
    $('#frequency-input').val('');

    // create local "temporary" object for holding the train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency
    };

    //store information in Firebase
    database.ref().push(newTrain);

    //display information using Firebase

    






})



// ================== BACKLOG =============

// add a trash can icon that removes a talbe row and the data stored from Firebase