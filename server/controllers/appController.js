import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';



/** middleware for verify user */
// try{
//     UserModel.find().toArray((err, result) => {
//         if (err) return console.error(err);
//         if(result) return console.log(result);
       
//       });
// }catch(error){
//     console.log({ error })
// }

// import express from 'express';
// const app = express();

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// Rest of your code...



export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;
       // console.log(username,"1");
        // check the user existance
        let exist = await UserModel.findOne({ username });
        //console.log(exist);
        if(!exist) return res.status(404).send({ msg : "Can't finds User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req,res){

    try {
        const { username, password, profile, email } = req.body;
        console.log("1");
        const existingUser = await UserModel.findOne({
            $or: [
              { username },
              { email }
            ]
          })
          
          if (existingUser) {
            if (existingUser.username === username) {
                console.log("2");
              // Username already exists
              return res.status(200).json({ error: 'Username already exists' });
            }
            console.log("3");
            // Email already exists
            return res.status(200).json({ error: 'Email already exists' });
          }
          
        // check the existing user
      

    //     UserModel.findOne({ username })
    //     .then(user => {
    //        if (user) {
    //          throw { error: "Please use a unique username" };
    //        //return res.status(409).json({ message: 'User already exists' });
            
    //      }
    // // Continue with your logic here
    //        })
    //      .catch(err => {
    // // Handle the error
    //        console.error(err);
    //       // res.status(500).json({ message: 'Error occurred while checking user existence' });
    //   });


        // check for existing email
     
        // UserModel.findOne({ email })
        //         .then(email => {
        //             if (email) {
        //             throw { error: "Please use a unique email" };
        //             }
        //             // Continue with your logic here
        //         })
        //         .catch(err => {
        //             // Handle the error
        //             console.error(err);
        //         });




        // Promise.all([existUsername, existEmail])
        //     .then(() => {
                if(password){
                   
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            // }).catch(error => {
            //     return res.status(500).send({ error })
            // })


    } catch (error) {
        return res.status(500).send(error);
    }

}
    


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
//64a7c37e3d1d048021ef6d2c
export async function getUser(req,res){
    
    const { username } = req.params;
    //console.log(username,"3");

    try {
        
         // if(!username) return res.status(501).send({ error: "Invalid Username"});

        // UserModel.findOne({ username }, function(err, user){
        //     if(err) return res.status(500).send({ err });
        //     if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            UserModel.findOne({ username })
            .then(user => {

                if(!user) return res.status(501).send({ error : "Couldn't Find the User"});
        // Continue with your logic here
        const { password, ...rest } = Object.assign({}, user.toJSON());
       // console.log(rest);

        return res.status(201).send(rest);
               })
             .catch(err => {
        // Handle the error
              res.status(500).send({ err });
          });
    

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            // const { password, ...rest } = Object.assign({}, user.toJSON());

            // return res.status(201).send(rest);
        }

     catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }
}



/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req,res){
    try {
        
        //const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;
            //console.log(body);

            // update the data
            UserModel.updateOne({ _id : userId }, body) 
            .then(result=>{
                if(result) {

                return res.status(201).send({ msg : "Record Updated...!"});
                }

        
    })  .catch(error => {
        return res.status(401).send({ error : "User Not Found...!"});
      })
    }

    } catch (error) {
        return res.status(401).send({ error });
    }
}


/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword})
                            .then(result=>{
                                
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            }).catch(err=>{
                                       throw new Error(err)
                            })
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}


