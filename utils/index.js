import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config()

export const verifyMail = async (email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD
            }
        })
        let info = await transporter.sendMail({
            from: process.env.GMAIL,
            to: email,
            subject: "Account Verification",
            text: "Welcome",
            html: `
            <div>
            <a href=${link}>Click here to activate your account</a>
            </div>
            `
        })
    } catch (error) {
        console.log(error);
    }
}

export const resetPasswordFromMail = async (email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD
            }
        })
        let info = await transporter.sendMail({
            from: process.env.GMAIL,
            to: email,
            subject: "Account Verification",
            text: "Welcome",
            html: `
            <div>
            <a href=${link}>Click here to reset your password</a>
            </div>
            `
        })
    } catch (error) {
        console.log(error);
    }
}