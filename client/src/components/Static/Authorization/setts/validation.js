export default function validation(obj) {
  const { email, password, confirmPassword } = obj;
  const emailMask = /^[a-zA-Z\d]{1,15}@[a-z]{1,9}\.{1}([a-z]{2,4}){1}$/;
  const passMask = /^[a-zA-Z\d]{6,16}$/;

  const result = {
    email: false,
    pass: false,
    confirmPass: false,
    name: false,
  };

  if (!emailMask.test(email)) {
    result.email = true;
  }
  if (!passMask.test(password)) {
    result.pass = true;
  }
  if (!(password === confirmPassword)) {
    result.confirmPass = true;
  }
  const checker = Object.values(result).some((item) => item === true);

  result.isSpinner = true;

  return { checker, result };
}
