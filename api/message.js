const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name}`,
            text: message
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending message' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
