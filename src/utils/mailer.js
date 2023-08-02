import nodemailer from "nodemailer";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.SENDER_MAILID,
        to: email,
        subject:
          emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/${
          emailType === "VERIFY" ? "verify-email" : "change-password"
        }?token=${hashedToken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }
          or copy and paste the link below in your browser. <br> ${
            process.env.DOMAIN
          }/${
          emailType === "VERIFY" ? "verify-email" : "change-password"
        }?token=${hashedToken}
          </p>`,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
    }
  } catch (error) {
    console.log(error.message);
  }
};
