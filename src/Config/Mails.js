
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'formulawauth@gmail.com', // email ID
		pass: 'formula@1997', // Password
	},
});


module.exports = {
	userRegistration: (email)=>{
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding registration on FORMULAW!', // Subject of the mail.
			html: '<div><span>Dear User,</span><div><p>Thank you for registering with FORMULAW To continue, please verify that you own this email address.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If the above OTP does not work, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' + email + '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with UKM. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' +JSON.stringify(data));
				return true;
			}
		});
	},

	userLeadSubmitted: (email, title)=>{
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding submission your lead', // Subject of the mail.
			html: '<div><span>Dear User,</span><div><p>Thanks for submitting the lead on our plateform, Your lead is regarding <b>'+title+'</b>. We will connect with you soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' + email + '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' +JSON.stringify(data));
				return true;
			}
		});
	},

	adminAppointment: (email)=>{
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding receiving new lead', // Subject of the mail.
			html: '<div><span>Dear Admin,</span><div><p>We have received the lead on our plateform. You should connect with him soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' + email + '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' +JSON.stringify(data));
				return true;
			}
		});
	},

};
