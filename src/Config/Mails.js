const nodemailer = require('nodemailer');

const moment = require('moment');
const smtpEndpoint = 'email-smtp.eu-west-1.amazonaws.com';
const port = 465;
const senderAddress = `Formulaw <formulawauth@gmail.com>`; //Formulaw <info@formu.law>
const smtpUsername = 'AKIASE3LOW3XFGIXHRV4';
const smtpPassword = 'BALTT+vkKNKXz8rRLXe11v2JhBnhstNjNH/F8WFNTtks';

// const transporter = nodemailer.createTransport({
// 	host: smtpEndpoint,
// 	port: port,
// 	pool: true,
// 	secure: true,
// 	auth: {
// 		user: smtpUsername,
// 		pass: smtpPassword,
// 	},
// });

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
	userRegistration: (email, username) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding registration on FORMULAW!', // Subject of the mail.
			html:
        '<div><span>Hi ' + username +' ,<br/>'+email+'</span><div><p>Welcome to Formulaw. We’re thrilled to see you here!</p><br/><p>On behalf of the whole Formulaw team we would like to welcome you to the family. Here at Formulaw we pride ourselves in being a secure, transparent, and cost-efficient platform, ensuring that your legal problems are solved seamlessly.</p><br/><p>Get to know more about us in our formulaw news article.</p><br/><p>You can also find more of our guides here to learn more about Formulaw</p><br/><p>Thank you.</p><br/></div><div><span>Best Regards</span><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u></div>',


		};

		console.log('details--->', details);
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
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding Password reset on FORMULAW!', // Subject of the mail.
			html:
        `<div><span>Dear User,</span><div><p>Please follow the link below to reset your password.</p><br><p>Click here to reset password <a href='https://formu.law/reset-password/${token}'>link</a></p></p><br><p>Please do not share your password credentials with anyone and keep it stored safely.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br>`, // Sending OTP
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
			from: senderAddress, // sender address same as above
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

	userRegistrationAdminMail: (email, username) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Regarding registration on FORMULAW!', // Subject of the mail.
			html:
        '<p>' + username +' has created an account with Formulaw. Go to the Admin panel to view their profile and approve any pending documents.<p> <br/><p>Thank you.<p><br/><p>Best Regards,<p><br><br><span>FORMULAW Team</span><br><u>https://www.formulaw.com</u>'};

		console.log('admin details--->', details);

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


	// appointment shedule time mail

	adminAppointmentSchedule: (email, username, time, date, name, lead) => {
		console.log('logIn_Mail====>' + email, time, date, username);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Appointment:', // Subject of the mail.
			html:
    '<div><span>Hi '+ username +'</span></div><div><p>'+ name +' has scheduled a meeting regarding '+ lead+' at ' + moment(date).format('DD/MM/YYYY') +' at '+ moment(time).format('HH:mm A') + '. Go to the Admin panel to view their profile and approve the meeting. </p><br/><p>Thank you.</p><br/>Best Regards, <br/><br/>@formulaw team member</div>',
		};
		console.log('admin apointment', details);
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

	userAppointmentSchedule: (email, fullname, time, date, id, username, orderid, lawfirm) => {
		console.log('logIn_Mail==User==>' + email, time, date);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Appointment', // Subject of the mail.
			html:
        '<div><span>Dear '+ fullname +',</span></div><div><p>This is a special reminder to confirm your meeting on '+ ' ' + moment(date).format('DD/MM/YYYY') +' at '+ moment(time).format('HH:mm A') + '.</p><br/><p>Prior to starting with '+lawfirm+', a member of the Formulaw team would like to get to know you and your needs prior to giving you off to our trusted partners. The meeting will be done on our platform either via text or video depending on your preference. Please be logged on the platform 15 minutes prior to the meeting </p><br/><p> Please follow this link to start your consultation.</p><br><u> https://formu.law/user/dashboard/'+ id + '<br><p>Please feel free to contact us if you have any question. I would be ready to give the necessary assistance.<p></br><br><p>Thank you and have a great meeting.</p><br>Best Regards,<br><p>'+ username +'</p><br>@formulaw team member<br></div>',
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


	// remindermail


	userRemindermail: (email, fullname, time, date, id, username, orderid, lawfirm)=> {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Reminder', // Subject of the mail.
			html:
    '<div><span>Dear '+ fullname +',</span></div><div><p>This is a special reminder to confirm your meeting on ' + moment(date).format('DD/MM/YYYY') +' at '+ moment(time).format('HH:mm A') + '.<br/>Please follow this link to start your consultation. <br/><u> https://formu.law/user/dashboard/'+ id +'</u><br/>Please feel free to contact us if you have any question. I would be ready to give the necessary assistance.<br/>Thank you and have a great meeting.<br/></p>Best Regards,<br/>'+username+'<br/>@formulaw team member<br/></div>'};
		console.log('user reminder---->', details);
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


	adminRemindermail: (email, username, time, date, name, lead) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Reminder', // Subject of the mail.
			html:
			'<div><span>Hi '+username+'</span></div><div><span>Reminder <span><p>'+ name +' has scheduled a meeting regarding '+ lead +' at ' + moment(date).format('DD/MM/YYYY') +' at '+ moment(time).format('HH:mm A') + '. Go to the Admin panel to view their profile and approve the meeting. Thank you.</p><br/>Best Regards, <br/>Formula Team<br/>@formulaw team member</div>',
		};
		console.log('admin reminder----->', details);
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


	adminAppointmentApproved: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Approved', // Subject of the mail.
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
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Approved', // Subject of the mail.
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
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Payment:', // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi, Payment is  Done this By  <b> ' +
        name +
        '</b> at <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
       moment(time).format('HH:mm:ss') +
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
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Payment', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your Payment is Done  on  <b> ' +
        moment(date).format('DD/MM/YYYY') +
        ' </b> Time <b> ' +
      moment(time).format('HH:mm:ss') +
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


	// CONSULTATION


	adminAppointmentConsult: (email, time, date, username, name, lawyer, lawfirm) => {
		console.log('logIn_Mail admin====>' + email, time, date, username, name, lawyer, lawfirm);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Consultation:', // Subject of the mail.
			html:
				'<div><span>Hi '+ username +'</span></div>< div ><p>'+ name +' has been handed over to '+ lawyer +' at ' + lawfirm + '</p><br/>Thank you.< br />Best Regards,  < br />@formulaw team member < br /></ > ',
		};
		console.log('admin appointment---->', details );
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

	userAppointmentConsult: (email, fullname, time, date, lawyer, lawfirm, orderid, id) => {
		console.log('logIn_Mail user====>' + email, fullname, time, date, lawyer, lawfirm, orderid, id);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Consultation', // Subject of the mail.
			html:
           '<div><span>Dear '+ fullname +',<span></div><div><p>We would like to confirm you have been assigned to '+ lawyer + ' at ' + lawfirm +'. Thank you for your booking.</p><br/>Order details<br/>'+orderid+'<br/>Please follow this link to be directed to the chat.<br/><u> https://formu.law/user/dashboard/'+ id +'</u><br/>join at ' + moment(date).format('DD/MM/YYYY') +' at '+ moment(time).format('HH:mm:ss') + '<br/>Feel free to contact us if you have any question. I would be ready to give the necessary assistance.<br/>Thank you and have a great meeting.<br/>Best Regards,<br/>FORMULAW Team<br/>@formulaw team member<br/></div>'};
		console.log('admin appointment---->', details );
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


	lawyerAppointmentConsult: (lawyer, email, user, admin) => {
		console.log('logIn_Mail lawyer====>' + lawyer, email, user, admin);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Consultation', // Subject of the mail.
			html:
			'<div><span>Hi '+lawyer+',<span></div><div><p>'+ user +' has connected with you. Go to your portal to view their request to complete their case.<br/></p>Thank you.<br/>Best Regards,<br/>'+admin+'<br/>Formulaw Team <br/></div>',
		};	console.log('admin appointment---->', details );
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


	// completed mail
	adminAppointmentComplete: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
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
			from: senderAddress, // sender address same as above
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

	// canceled mail
	adminAppointmentCanceled: (email, time, date, name) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Lead Canceled', // subject:", // Subject of the mail.
			html:
        '<div><span>Dear Admin,</span><div><p>Hi,This  appointment has been Canceled by user . <b> ' +
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

	userAppointmentCanceled: (email, time, date) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Lead Canceled', // Subject of the mail.
			html:
        '<div><span>Dear User,</span><div><p>Hi, Your appointment has been Canceled  .' +
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

	// subscription mails


	adminSubscriptionmail: (email, fullname, username) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'User Subscription:', // Subject of the mail.
			html:
			'<div><span>Hi '+ fullname +'</span></div><div><p>'+ username + ' has subscribed to formulaw. Go to the Admin panel to view their profile and approve the meeting. <br/>Thank you.<br/>Best Regards,<br/>FORMULAW Team<br/>@formulaw team member</p></div>'}; transporter.sendMail(details, function(error, data) {
			console.log('subscription--->', details);
			if (error) {
				console.log('error=========>>>' + error);
				return true;
			} else {
				console.log('data=========>>>' + JSON.stringify(data));
				return true;
			}
		});
	},

	userSubscriptionmail: (email, fullname, id, orderid) => {
		console.log('subscription====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Subscription', // Subject of the mail.
			html:
        		'<div><span> Dear '+ fullname +',</span></div><div><p>Thank you for booking a package with us. <br/>Prior to starting a member of the Formulaw team would like to get to know you and your needs prior to giving you off to our trusted partners. The meeting will be done on our platform either via text or video depending on your preference. Please be logged on the platform 15 minutes prior to the meeting <br/>Please follow this link to start your consultation. </br><p>https://formu.law/user/dashboard/'+ id +'<br/>Receipt<br/>'+ orderid+'<br/>Please feel free to contact us if you have any question. I would be ready to give the necessary assistance.<br/>Thank you and have a great meeting.<br/>Best Regards,<br/>FORMULAW Team<br/>@formulaw team member</div>',
		};
		console.log('subscription--->', details);
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

	recieverMessageEmail: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Received New Message on FORMULAW!', // Subject of the mail.
			html:
				`<div><span>Dear User,</span><div><p>You have received a new message, Please follow the link below to continue chat.</p><br><p>Click here to join chat <a href='https://formu.law'>link</a></p></p><br><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br>`, // Sending OTP
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


	recieverMessageEmailAdmin: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Received New Message on FORMULAW!', // Subject of the mail.
			html:
				`<div><span>Dear Admin,</span><div><p>You have received a new message, Please follow the link below to continue chat.</p><br><p>Click here to join chat <a href='https://formu.law/admin-panel'>link</a></p></p><br><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br>`, // Sending OTP
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


	recieverJoinRoomEmail: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Please join appointment room FORMULAW!', // Subject of the mail.
			html:
				`<div><span>Dear User,</span><div><p>User have joined consultation room, Please follow the link below to continue call. Ignore, If already join.</p><br><p>Click here to join <a href='https://formu.law'>link</a></p></p><br><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br>`, // Sending OTP
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

	recieverJoinCallEmailAdmin: (email) => {
		console.log('logIn_Mail====>' + email);
		const details = {
			from: senderAddress, // sender address same as above
			to: email, // Receiver's email id
			subject: 'Please join appointment room FORMULAW!', // Subject of the mail.
			html:
				`<div><span>Dear Admin,</span><div><p>User have joined call, Please follow the link below to continue.</p><br><p>Click here to join call <a href='https://formu.law/admin-panel'>link</a></p></p><br><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first. If you have any issue, please forward this email support@formulaw.com</p><br></br>`, // Sending OTP
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


//
// eslint-disable-next-line require-jsdoc
// function mailTest(email, username) {
// 	const smtpEndpoint = 'email-smtp.eu-west-1.amazonaws.com';
// 	const port = 465;
// 	const senderAddress = `Formulaw <info@formu.law>`;
// 	const toAddresses = email;
// 	const smtpUsername = 'AKIASE3LOW3XFGIXHRV4';
// 	const smtpPassword = 'BALTT+vkKNKXz8rRLXe11v2JhBnhstNjNH/F8WFNTtks';
// 	const subject = 'Amazon Pinpoint test (Nodemailer)';
//
// 	// The body of the email for recipients whose email clients support HTML content.
// 	const body_html = `<html>
// <head></head>
// <body>
//   <h1>Amazon Pinpoint Test (Nodemailer)</h1>
//   <p>This email was sent with <a href='https://aws.amazon.com/pinpoint/'>Amazon Pinpoint</a>
//         using <a href='https://nodemailer.com'>Nodemailer</a> for Node.js.</p>
// </body>
// </html>`;
//
// 	async function main() {
// 		// Create the SMTP transport.
// 		const transporter = nodemailer.createTransport({
// 			host: smtpEndpoint,
// 			port: port,
// 			pool: true,
// 			secure: true,
// 			auth: {
// 				user: smtpUsername,
// 				pass: smtpPassword,
// 			},
// 		});
//
// 		// Specify the fields in the email.
// 		const mailOptions = {
// 			from: senderAddress,
// 			to: toAddresses,
// 			subject: 'Amazon Pinpoint test (Nodemailer)',
// 			html: body_html,
// 		};
//
// 		// Send the email.
// 		const info = await transporter.sendMail(mailOptions);
//
// 		console.log('Message sent! Message ID: ', info.messageId);
// 	}
//
// 	main().catch(console.error);
// }
//
// mailTest('js362676@gmail.com', 'Jitendra');
