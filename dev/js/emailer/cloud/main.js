
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.Cloud.define("sendEmail", function(request, response) {
  var sendgrid = require("sendgrid");
  sendgrid.initialize("JayboBaker", "Ygafcigattguooh23");
 
  var name = request.params.fullName;
  var email = request.params.email;
  var tel = request.params.telephone;
  var message = request.params.message;
 
  sendgrid.sendEmail({
   to: "info@jamesbaker.me.uk",
   from: email,
   fromname: name,
   subject: "Email from my website",
   text: "Name: "+name+"\nEmail: "+email+"\Tel: "+tel+"\nMessage:\n\n"+message
   }, {
     success: function(httpResponse) {
       console.log(httpResponse);
       response.success("Email sent!");
    },
     error: function(httpResponse) {
       console.error(httpResponse);
       response.error("Uh oh, something went wrong");
    }
  });
});
