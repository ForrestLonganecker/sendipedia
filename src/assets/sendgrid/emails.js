const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);
module.exports = {
  newUserEmail(newUser) {
    const message = {
      to: newUser.email,
      from: { email: 'sendy@sendipedia.com', name: 'Sendy Senderson'},
      subject: 'Sendipedia email confirmation',
      text: `Hello, ${newUser.name}, we just wanted to confirm that you signed up with us at Sendipedia! If you are not ${newUser.name}, please let us know!`
    }
    sgMail.send(message).then((sent) => {
      // console.log(sent);
    })
  }
}