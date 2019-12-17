export default function formValidation(userObj,formType) {
  switch(formType)
  {
      case "Register":
          let registerErr = null;

          //Id validation
          if(userObj.id === userObj.confirm_idNumber)
          {
              if(userObj.id.length === 9)
              {
                  return;
              }
              else{
                  registerErr+="Id number need to be 9 numbers! \n";
              }
          }
          else{
              registerErr+="Id number not match! \n"
          }
          //personalNumber validation
          if(userObj.personalNumber === userObj.confirm_personalNumber)
          {
              if(userObj.personalNumber.length === 7)
              {
                  return;
              }
              else{
                  registerErr+="Personal number need to be 9 numbers! \n";
              }
          }
          else{
              registerErr+="Personal number not match! \n"
          }
          //hogerNumber validation
          if(userObj.hogerNumber === userObj.confirm_hogerNumber)
          {
              if(userObj.hogerNumber.length === 8)
              {
                  return;
              }
              else{
                  registerErr+="Hoger number need to be 9 numbers! \n";
              }
          }
          else{
              registerErr+="Hoger number not match! \n"
          }
          //password validation
          if(userObj.password === userObj.confirm_password)
          {
              if(userObj.password.length > 6)
              {
                  return;
              }
              else{
                  registerErr+="Your password need to be more than 6 character \n";
              }
          }
          else{
              registerErr+="Password not match! \n"
          }
          return registerErr;
    }

}
