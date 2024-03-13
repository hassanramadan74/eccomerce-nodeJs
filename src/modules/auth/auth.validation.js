import Joi from "joi";

const signupSchemaVal = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  ),
  rePassword: Joi.valid(Joi.ref("password")).required(),
});

const signinSchemaVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  ),
});

const changePasswordVal = Joi.object({

    password: Joi.string().pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
    newPassword: Joi.string().pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
  });

export { signupSchemaVal, signinSchemaVal , changePasswordVal };
