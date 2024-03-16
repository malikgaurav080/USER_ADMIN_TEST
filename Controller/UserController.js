const userModel = require("../models/User");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Validate for Email and Password
    // const { error } = validation({
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    // if (error)
    //   return res
    //     .status(400)
    //     .json({ error: true, message: error.details[0].message });

    //checking if user already existing or not
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Encrypt the password with the help of bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10);
    bcrypt.hash(password, 10, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.status(400).json({ message: "Problem in encryption" });
      }

      const result = await userModel.create({
        email: email,
        password: hash,
        username: username,
      });
    });

    //create a new user in the database users
    // const result = await userModel.create({
    //   email: email,
    //   password: password,
    //   username: username,
    // });

    //Validating keys => all keys should be Unique
    // const err = Keyvalidation([
    //   req.body.key1,
    //   req.body.key2,
    //   req.body.key3,
    //   req.body.key4,
    //   req.body.key5,
    // ]);
    // if (err) {
    //   //if any error in keys validation so it will delete the created user from the database
    //   await userModel.findByIdAndRemove(result.id);
    //   return res.status(400).json({ error: true, message: err });
    // }

    //storing the keys in the seprate database Keys
    // const keys = await userKeys.create({
    //   userId: result.id,
    //   key1: encrypt(key1),
    //   key2: encrypt(key2),
    //   key3: encrypt(key3),
    //   key4: encrypt(key4),
    //   key5: encrypt(key5),
    // });

    //Send the Signup Alert On mail from the bank
    // signupAlert(result.email);
    res
      .status(201)
      .json({ error: false, message: "Account created sucessfully" });
  } catch (error) {
    res.status(500).json({ Error: true, Message: error });
  }
};

module.exports = { signUpUser };
