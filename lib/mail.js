import nodemailer from "nodemailer";

const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'pokemon80103@gmail.com',
    pass: 'ujoyfcditxqkcnfv'
  }
});

export default mailTransport;

export const twoFAMessageGen = (otp) => {
  return (
    `Dear User, \n\n` +
    "OTP for change password is : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Paul\n\n"
  );
};

export const orderResultMessageGen = (result) => {
  return (
    `Dear User, \n\n` +
    `Your purchase is ${result}` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Paul\n\n"
  );
};

export async function encode(data) {
  const encrypted = data.toString("base64");
  return encrypted;
}

export async function decode(base64string) {
  let bufferObj = Buffer.from(base64string, "base64");

  // Decoding base64 into String
  let string = bufferObj.toString("utf8");
  return string;
}
