import { Request, Response } from "express";
import {sendMail} from '../helpers/mailer'

export const sendMailTest = async( req: Request, res: Response) => {
    const { email } = req.body
    try {
        const sendMailTest = await sendMail(
            { 
                to: email,
                subject: "SMTP Mail test",
                content: "Successfully tested SMTP"
            })
        res.status(200).send('Email sent successfully');
      } catch (error) {
        res.status(500).send('Failed to send email');
      }
    


}