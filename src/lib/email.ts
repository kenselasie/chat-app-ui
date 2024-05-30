import FormData from "form-data";
import Mailgun from "mailgun.js";

interface IEmailTemplate {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html: string;
}
const mailgun = new Mailgun(FormData);
const mailgunClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
});

export const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
}: IEmailTemplate) => {
  try {
    const message = await mailgunClient.messages.create(
      process.env.MAILGUN_DOMAIN!,
      {
        from,
        to,
        subject,
        text,
        html,
      }
    );
    return message;
  } catch (err) {
    console.log(err);
  }
};
