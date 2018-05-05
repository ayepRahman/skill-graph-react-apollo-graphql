export const scorePassword = password => {
  // console.log("Is password", password);
  let score = 0;
  if (!password) return score;

  // award every unique letter until 5 repetitions
  let letters = {};
  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  let variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password)
  };

  let variationCount = 0;
  for (let check in variations) {
    variationCount += variations[check] === true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  let parseScore = parseInt(score);

  return parseScore;
};

export const checkPasswordStrength = password => {
  var score = scorePassword(password);
  if (score > 80) {
    return {
      score,
      strength: "very strong"
    };
  }
  if (score > 50) {
    return {
      score,
      strength: "strong"
    };
  }
  if (score > 30) {
    return {
      score,
      strength: "good"
    };
  }
  if (score >= 1) {
    return {
      score,
      strength: "weak"
    };
  }

  return "";
};
