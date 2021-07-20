// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName() {
    let userFullName = document.getElementById("userFullName").value;
    let flag = false;
    if (userFullName === "") {
      flag = true;
    }
    if (flag) {
      document.getElementById("userFullNameError").style.display = "block";
    } else {
      document.getElementById("userFullNameError").style.display = "none";
    }
  }
  // xxxxxxxxxx Phone Number Validation xxxxxxxxxx
  function checkUserPhoneNumber() {
    let userPhoneNumber = document.getElementById("userPhoneNumber").value;
    let flag = false;
    if (userPhoneNumber === "") {
      flag = true;
    }
    if (flag) {
      document.getElementById("userPhoneNumberError").style.display = "block";
    } else {
      document.getElementById("userPhoneNumberError").style.display = "none";
    }
  }
  // xxxxxxxxxx Email Validation xxxxxxxxxx
  function checkUserEmail() {
    let userEmail = document.getElementById("userEmail");
    let userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag;
    if (userEmail.value.match(userEmailFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userEmailError").style.display = "block";
    } else {
      document.getElementById("userEmailError").style.display = "none";
    }
  }
  // xxxxxxxxxx Password Validation xxxxxxxxxx
  function checkUserPassword() {
    let userPassword = document.getElementById("userPassword");
    let userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    let flag;
    if (userPassword.value.match(userPasswordFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userPasswordError").style.display = "block";
    } else {
      document.getElementById("userPasswordError").style.display = "none";
    }
  }
  // xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
  function checkUserBio() {
    let userBio = document.getElementById("userBio").value;
    let flag = false;
    if (flag) {
      document.getElementById("userBioError").style.display = "block";
    } else {
      document.getElementById("userBioError").style.display = "none";
    }
  }
  // xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
  function signUp() {
    let userFullName = document.getElementById("userFullName").value;
    let userPhoneNumber = document.getElementById("userPhoneNumber").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    let userFullNameFormate = /^([A-Za-z.\s_-])/;
    let userPhoneNumberFormate = /^([0-9])/;
    let userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
  
    let checkUserFullNameValid = userFullName.match(userFullNameFormate);
    let userPhoneNumberValid = userPhoneNumber.match(userPhoneNumberFormate);
    let checkUserEmailValid = userEmail.match(userEmailFormate);
    let checkUserPasswordValid = userPassword.match(userPasswordFormate);
  
    if (checkUserFullNameValid == null) {
      return checkUserFullName();
    } else if (userPhoneNumberValid === null) {
      return checkUserPhoneNumber();
    } else if (checkUserEmailValid == null) {
      return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
      return checkUserPassword();
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then((success) => {
          let user = firebase.auth().currentUser;
          let uid;
          if (user != null) {
            uid = user.uid;
          }
          let firebaseRef = firebase.database().ref();
          let userData = {
            userFullName: userFullName,
            userPhoneNumber: userPhoneNumber,
            userEmail: userEmail,
            userPassword: userPassword,
          };
          console.log(uid, userData);
          firebaseRef.child(uid).set(userData);
          swal(
            "Account Created",
            "Your account was created successfully, you can log in now."
          ).then((value) => {
            setTimeout(function () {
              window.location.replace("index.html");
            }, 1000);
          });
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          swal({
            type: "error",
            title: "Error",
            text: errorMessage,
          });
        });
    }
  }
  // xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
  // xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
  function checkUserSIEmail() {
    let userSIEmail = document.getElementById("userSIEmail");
    let userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userSIEmailError").style.display = "block";
    } else {
      document.getElementById("userSIEmailError").style.display = "none";
    }
  }
  // xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
  function checkUserSIPassword() {
    let userSIPassword = document.getElementById("userSIPassword");
    let userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    let flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userSIPasswordError").style.display = "block";
    } else {
      document.getElementById("userSIPasswordError").style.display = "none";
    }
  }
  // xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx
  function signIn() {
    let userSIEmail = document.getElementById("userSIEmail").value;
    let userSIPassword = document.getElementById("userSIPassword").value;
    let userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
  
    let checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    let checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);
  
    if (checkUserEmailValid == null) {
      return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
      return checkUserSIPassword();
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(userSIEmail, userSIPassword)
        .then((success) => {
          swal({
            type: "successfull",
            title: "Succesfully signed in",
          }).then((value) => {
            setTimeout(function () {
              window.location.replace("index.html");
            }, 1000);
          });
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          swal({
            type: "error",
            title: "Error",
            text: errorMessage,
          });
        });
    }
  }
  // xxxxxxxxxx Working For Profile Page xxxxxxxxxx
  // xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setTimeout(() => {
        if (
          window.location.pathname === "/sign-in.html" ||
          window.location.pathname === "/sign-up.html"
        ) {
          location.replace("index.html");
        }
      }, 3000);
  
      //   User is signed in.
      let user = firebase.auth().currentUser;
      let uid;
      if (user != null) {
        uid = user.uid;
      }
      let firebaseRefKey = firebase.database().ref().child(uid);
      firebaseRefKey.on("value", (dataSnapShot) => {
        try {
          localStorage.setItem("fullname", dataSnapShot.val().userFullName);
          localStorage.setItem("email", dataSnapShot.val().userEmail);
          localStorage.setItem("phonenumber", dataSnapShot.val().userPhoneNumber);
          // document.getElementById(
          //   "userPfFullName"
          // ).innerHTML = dataSnapShot.val().userFullName;
          // document.getElementById(
          //   "userPfSurname"
          // ).innerHTML = dataSnapShot.val().userPhoneNumber;
          // userEmail = dataSnapShot.val().userEmail;
          // userPassword = dataSnapShot.val().userPassword;
          // document
          //   .getElementById("userPfFb")
          //   .setAttribute("href", dataSnapShot.val().userFb);
          // document
          //   .getElementById("userPfTw")
          //   .setAttribute("href", dataSnapShot.val().userTw);
          // document
          //   .getElementById("userPfGp")
          //   .setAttribute("href", dataSnapShot.val().userGp);
          // document.getElementById(
          //   "userPfBio"
          // ).innerHTML = dataSnapShot.val().userBio;
        } catch (err) {
          console.log("Not Profile page");
        }
      });
    } else {
      //   No user is signed in.
      console.log("No user");
      if (
        window.location.pathname === "/index.html" ||
        window.location.pathname === "/"
      ) {
        location.replace("/sign-up.html");
      }
    }
  });
  // xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
  function showEditProfileForm() {
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("editProfileForm").style.display = "block";
    let userPfFullName = document.getElementById("userPfFullName").innerHTML;
    let userPfSurname = document.getElementById("userPfSurname").innerHTML;
    let userPfFb = document.getElementById("userPfFb").getAttribute("href");
    let userPfTw = document.getElementById("userPfTw").getAttribute("href");
    let userPfGp = document.getElementById("userPfGp").getAttribute("href");
    let userPfBio = document.getElementById("userPfBio").innerHTML;
    document.getElementById("userFullName").value = userPfFullName;
    document.getElementById("userSurname").value = userPfSurname;
    document.getElementById("userFacebook").value = userPfFb;
    document.getElementById("userTwitter").value = userPfTw;
    document.getElementById("userGooglePlus").value = userPfGp;
    document.getElementById("userBio").value = userPfBio;
  }
  // xxxxxxxxxx Hide edit profile form xxxxxxxxxx
  function hideEditProfileForm() {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
  }
  // xxxxxxxxxx Save profile and update database xxxxxxxxxx
  function saveProfile() {
    let userFullName = document.getElementById("userFullName").value;
    let userSurname = document.getElementById("userSurname").value;
    let userFacebook = document.getElementById("userFacebook").value;
    let userTwitter = document.getElementById("userTwitter").value;
    let userGooglePlus = document.getElementById("userGooglePlus").value;
    let userBio = document.getElementById("userBio").value;
    let userFullNameFormate = /^([A-Za-z.\s_-])/;
    let checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if (checkUserFullNameValid == null) {
      return checkUserFullName();
    } else if (userSurname === "") {
      return checkUserSurname();
    } else {
      let user = firebase.auth().currentUser;
      let uid;
      if (user != null) {
        uid = user.uid;
      }
      let firebaseRef = firebase.database().ref();
      let userData = {
        userFullName: userFullName,
        userSurname: userSurname,
        userFb: userFacebook,
        userTw: userTwitter,
        userGp: userGooglePlus,
        userBio: userBio,
      };
      firebaseRef.child(uid).set(userData);
      swal({
        type: "successfull",
        title: "Update successfull",
        text: "Profile updated.",
      }).then((value) => {
        setTimeout(function () {
          document.getElementById("profileSection").style.display = "block";
  
          document.getElementById("editProfileForm").style.display = "none";
        }, 1000);
      });
    }
  }
  // xxxxxxxxxx Working For Sign Out xxxxxxxxxx
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        swal({
          type: "successfull",
          title: "Signed Out",
        }).then((value) => {
          setTimeout(function () {
            window.location.replace("sign-in.html");
          }, 1000);
        });
      })
      .catch(function (error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
          type: "error",
          title: "Error",
          text: "Error",
        });
      });
  }
  function openLink(link) {
    let fam = document.getElementById("family-gathering");
    let spe = document.getElementById("special-events");
    let soc = document.getElementById("social-events");
    switch (link) {
      
      case "SPECIAL EVENTS":
        document.getElementById("dinner-party").src = "images/special-events.jpg";
        document.getElementById("dinner-title").innerHTML = "Special Events";
        document.getElementById("dinner-subtitle").innerHTML =
          "We love catering for special events. So please bring everyone along for a special meal with your loved ones. We'll provide a memorable experience for all.";
        fam.classList.remove("font-weight-bold");
        spe.classList.add("font-weight-bold");
        soc.classList.remove("font-weight-bold");
        break;
      case "SOCIAL EVENTS":
        document.getElementById("dinner-party").src = "images/social-events.jpg";
        document.getElementById("dinner-title").innerHTML = "Social Events";
        document.getElementById("dinner-subtitle").innerHTML =
          "We love catering for social events. So please bring everyone along for a special meal with your loved ones. We'll provide a memorable experience for all.";
        fam.classList.remove("font-weight-bold");
        spe.classList.remove("font-weight-bold");
        soc.classList.add("font-weight-bold");
        break;
  
      default:
        document.getElementById("dinner-party").src = "images/dinner-party.jpg";
        document.getElementById("dinner-title").innerHTML = "Family Gathering";
        document.getElementById("dinner-subtitle").innerHTML =
          "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We'll provide a memorable experience for all.";
        fam.classList.add("font-weight-bold");
        spe.classList.remove("font-weight-bold");
        soc.classList.remove("font-weight-bold");
        break;
    }
  }
  function smoothScroll() {
    document.querySelector(".booktable-section").scrollIntoView({
      behavior: "smooth",
    });
  }
  function bookTable() {
    let phone_number = document.getElementById("phone-number").value;
    if (phone_number.length !== 10) {
      alert("Kindly insert a valid phone number");
    } else {
      initiatePayment(phone_number);
      sendBookingEmail();
    }
  }
  function initiatePayment(phone_number) {
    let amount = 1;
  
    const url = "https://us-central1-mneti-services.cloudfunctions.net/main/lnmo";
    const options = {
      mode: "cors",
      method: "POST",
      body: new URLSearchParams(
        `phone_number=${phone_number}&amount=${amount}&email=''`
      ),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    };
  
    fetch(url, options)
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        $("#bookModal").modal("hide");
        return text;
      })
      .catch((err) => {
        console.log(`Error with message: ${err}`);
        $("#bookModal").modal("hide");
      });
  }
  function sendBookingEmail() {
    let seats = document.getElementById("number_of_seats");
    let num_seats = seats.options[seats.selectedIndex].text;
    let date_time = document.getElementById("selectDateTime").value;
  
    let templateParams = {
      customer_name: localStorage.getItem("fullname"),
      to_email: localStorage.getItem("email"),
      date_time: date_time + ` for a table of ${num_seats}`,
    };
  
    console.log(templateParams);
  
    emailjs.send("service_0asll6m", "template_I0BKQduf", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }
  
  