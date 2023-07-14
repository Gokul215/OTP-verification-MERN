import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});
const UserModel=mongoose.model.Users || mongoose.model('user', UserSchema);

    // try {
    //     const documents =  UserModel.find({});
    //     console.log('Fetched data:', documents);
    //   } catch (err) {
    //     console.error('Error:', err);
    //   }
    // const data = {
    //     // Specify the data fields to be inserted
        
    //         "username" : "example123",
    //         "password" : "admin123",
    //         "email": "example@gmail.com",
    //         "firstName" : "bill",
    //         "lastName": "william",
    //         "mobile": 8009860560,
    //         "address" : "Apt. 556, Kulas Light, Gwenborough",
    //         "profile": ""
    //       }
      
  //to insert data using mongoose
    //   UserModel.create(data)
    //     .then((result) => {
    //       console.log('Inserted data:', result);
    //     })
    //     .catch((err) => {
    //       console.error('Error:', err);
    //     })

 
export default UserModel;