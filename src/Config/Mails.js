const nodemailer = require('nodemailer');
const moment = require('moment');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'formulawauth@gmail.com', // email ID
		pass: 'Formulaw$1997', // Password
	},
});

module.exports = {
	userRegistration: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding registration on FORMULAW!', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Thank you for registering with FORMULAW To continue, please verify that you own this email address.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with UKM. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userPasswordReset: (email, token) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding Password reset on FORMULAW!', // Subject of the mail.
			html:
        `<div><span>Dear User,</span><div><p>this is the Password reset link</p><br><p>Click here to reset password <a href='https://formu.law/#/reset-password/${token}'>link</a></p></p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br>`, // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	lawyerRegistration: (email, password) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding Registration as a Lawyer on FORMULAW!', // Subject of the mail.
			html:
        '<div><span>Dear Lawyer,</span><div><p>Thank you for registering with FORMULAW as a Lawyer, Your username is <b>' +
        email +
        '</b> and password is <b>' +
        password +
        '</b>.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with UKM. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userRegistrationAdminMail: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding registration on FORMULAW!', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>New user has been register with FORMULAW.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with UKM. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userLeadSubmitted: (email, title) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding submission your lead', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Thanks for submitting the lead on our plateform, Your lead is regarding <b>' +
        title +
        '</b>. We will connect with you soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	adminLeadMain: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding receiving new lead', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>We have received the new lead on our plateform. You should connect with him soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userAppointment: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding appointment', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your appointment has been successfully created, At <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	adminAppointment: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding appointment', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi, You have an appointment with someone at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	adminAppointmentSchedule: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Invitation:', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi, You have an appointment call with <b> ' +
        name +
        '</b> at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userAppointmentSchedule: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Invitation', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your appointment call is approved, Please be ready on time at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> we will connect with you soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	// for Approved

	adminAppointmentApproved: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Invitation:', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi, You Approved This appointment with <b> ' +
        name +
        '</b> .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userAppointmentApproved: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Invitation', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your appointment  is approved now For Next Process <b> ' +
        '</b> we will connect with you soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	// for Payment

	adminAppointmentPayment: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Payment:', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi, Payment is  Done this By  <b> ' +
        name +
        '</b> at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userAppointmentPayment: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Payment', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your Payment is Done  on  <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> we will connect with you soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	// for Consultent
	adminAppointmentConsult: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Consultation:', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi, You have an appointment call with <b> ' +
        name +
        '</b> at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b>For Consultation .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userAppointmentConsult: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Consultation', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your appointment call is approved For Consultation , Please be ready on  at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
        time +
        '</b> we will connect with you soon.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	// For Completed
	adminAppointmentComplete: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Lead completed', // subject:", // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi,This  appointment is Completed . <b> ' +
        '</b> .</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userAppointmentComplete: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: 'formulawauth@gmail.com', // sender address same as above
			to: email, // Receiver's email id
			subject: 'Lead Completed', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your appointment Status is Completed Now .' +
        '</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you are recieving froud emails from FORMULAW, please forward this email support@formulaw.com</p><br></br><p>You have been registered with https://www.formulaw.com with Email- ' +
        email +
        '</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/formulaw.in) or follow us on Twitter (@formulaw).</p><br><p>Once again, thank you for signing up with FORMULAW. We look forward to working with you.</p></div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u><div>', // Sending OTP
		};
		transporter.sendMail(details, function(error, data) {
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},
};
