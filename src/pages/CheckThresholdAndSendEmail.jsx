import sgMail from '@sendgrid/mail';
// Configure the SendGrid API key
sgMail.setApiKey('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');
// Define the threshold and the email recipients
// const threshold = 100;
const recipients = ['vedant-pravin.yerpude@capgemini.com', 'vivek-sunil.pawar@capgemini.com'];

function CheckThresholdAndSendEmail(currentValue, threshold) {
  
  if (currentValue > threshold) {
    // Send the email
    const msg = {
      to: recipients,
      from: 'vedant.yerpude@rediffmail.com',
      subject: 'Threshold exceeded',
      text: `The threshold of ${threshold} has been exceeded. The current value is ${currentValue}.`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default CheckThresholdAndSendEmail();