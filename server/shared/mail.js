const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const SERVER_URL = process.env.SERVER_URL;

function sendMail(message) {
  return sgMail.send(message)
    .catch(error => {
      console.error(error.toString());
    });
}

function resetPassword(user) {
  const link = `${SERVER_URL}/reset-password?token=${user.token}`;
  const message = `You requested password reset,
    Please click <a href="${link}">link</a> to reset.`;
  return sendMail({
    to: user.email,
    from: EMAIL_ADDRESS,
    subject: 'Password reset',
    html: message
  });
}

module.exports = {
  resetPassword
};
