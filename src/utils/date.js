const calculateAge = (userDate) => {
  const birthDate = new Date(userDate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (isBeforeBirthday) {
    age--;
  }

  return age;
};

module.exports = {
  calculateAge,
};
