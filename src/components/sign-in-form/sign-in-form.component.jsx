import React, { useState } from 'react';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.compont';

//-----------EMPTY OBJECT DEFAULT----------------------
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //--------GOOGLE POPUP DATA being created-
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    await createUserDocumentFromAuth(user);
  };

  //-------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorect password');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  //----............-----------Updating the Default data from the DOM
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  //---------DOM----------------------------
  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>

      <form onSubmit={handleSubmit} action=''>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button buttonType='google' type='button' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
