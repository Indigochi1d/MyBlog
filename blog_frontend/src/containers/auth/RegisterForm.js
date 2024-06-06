import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if(typeof username === 'string'){
      console.log("string");
    }
    if ([username, password, passwordConfirm].includes('')) {
      setErrorMessage('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 맞지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if(authError.response.status === 409){
        setErrorMessage("이미 존재하는 계정명입니다.");
        return;
      }
      setErrorMessage("회원가입 실패!");
      return ;
    }
    if (auth) {
      console.log('회원가입 성공!');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      console.log('check API 성공 :', user);
      navigate('/');
      try {
        localStorage.setItem('user',JSON.stringify(user));
      } catch (error) {
        console.error(error);
      }
    }
  }, [navigate, user]);
  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={errorMessage}
    />
  );
};

export default RegisterForm;
