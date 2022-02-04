import * as yup from 'yup';

export const UserSchema = yup.object().shape({
    email: yup.string().email().required("Missing Email"),
    name: yup.string().required("Missing Name"),
    password: yup.string().min(6).required("Missing Password"),
    isAdm: yup.boolean().required("Missing idAdm")
});
