const db = require('../models');
const _ = require('lodash');
const Appointment = db.appointment;
const Room = db.room;
const Admin = db.adminUser;


async function saveSubscriptionScheduleCall(lead, subscription, userIdIn) {
	let schedule;
	const userId = userIdIn;
	const admins = await Admin.findAll({order: [['createdAt', 'DESC']]});
	const adminId = _.get(admins, [0], null);
	if (subscription.durationType === 'Monthly') {
		if (subscription.numberOfMeeting === 1) {
			const appointmentDate = new Date();
			const startsAt = new Date(new Date().setDate(new Date().getDate() + 2));
			schedule = [{
				queryId: lead.id,
				lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
				customerId: userId,
				adminId: adminId,
				date: new Date(),
				shift: 'morning',
				time: startsAt,
				orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
				endTime: new Date(startsAt.setHours(new Date().getHours() + 23)),
				scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 2)),
			}];
		} else if (subscription.numberOfMeeting === 2) {
			const appointmentDate = new Date();
			const startsAt = new Date(new Date().setDate(new Date().getDate() + 2));
			const startsAtNineDays = new Date(new Date().setDate(new Date().getDate() + 7));
			schedule = [{
				queryId: lead.id,
				lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
				customerId: userId,
				adminId: adminId,
				date: new Date(),
				shift: 'morning',
				time: startsAt,
				orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
				endTime: new Date(startsAt.setHours(new Date(startsAt).getHours() + 23, 59, 59)),
				scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 2)),
			}, {
				queryId: lead.id,
				lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
				customerId: userId,
				adminId: adminId,
				date: new Date(),
				shift: 'morning',
				time: startsAtNineDays,
				orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
				endTime: new Date(startsAtNineDays.setHours(new Date(startsAtNineDays).getHours() + 23, 59, 59)),
				scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 7)),
			}];
		} else if (subscription.numberOfMeeting === 3) {
			const appointmentDate = new Date();
			const startsAt = new Date(new Date().setDate(new Date().getDate() + 2));
			const startsAtNineDays = new Date(new Date().setDate(new Date().getDate() + 9));
			const startsAtTenDays = new Date(new Date().setDate(new Date().getDate() + 20));
			schedule = [{
				queryId: lead.id,
				lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
				customerId: userId,
				adminId: adminId,
				date: new Date(),
				shift: 'morning',
				time: startsAt,
				orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
				endTime: new Date(startsAt.setHours(new Date(startsAt).getHours() + 23, 59, 59)),
				scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 2)),
			}, {
				queryId: lead.id,
				lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
				customerId: userId,
				adminId: adminId,
				date: new Date(),
				shift: 'morning',
				time: startsAtNineDays,
				orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
				endTime: new Date(startsAtNineDays.setHours(new Date(startsAtNineDays).getHours() + 23, 59, 59)),
				scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 5)),
			}, {
				queryId: lead.id,
				lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
				customerId: userId,
				adminId: adminId,
				date: new Date(),
				shift: 'morning',
				time: startsAtTenDays,
				orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
				endTime: new Date(startsAtTenDays.setHours(new Date(startsAtTenDays).getHours() + 23, 59, 59)),
				scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 9)),
			},
			];
		}
		await Appointment.bulkCreate(schedule)
			.then(async (scheduleCall) => {
				scheduleCall.map(async (schedule) => {
					await Room.create({
						appointmentId: schedule.id,
						roomName: schedule.id,
						adminId: schedule.adminId,
						customerId: schedule.customerId,
						queryId: schedule.queryId,
					});
				});
			});
	} else {
		for (let i = 0; i < 13; i++) {
			if (subscription.numberOfMeeting === 1) {
				const appointmentDate = new Date();
				const month = new Date(new Date().setMonth(new Date().getMonth() + i));
				const startsAt = new Date(month.setDate(month.getDate() + 2));
				schedule = [{
					queryId: lead.id,
					lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
					customerId: userId,
					adminId: adminId,
					date: new Date(),
					shift: 'morning',
					time: startsAt,
					orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
					endTime: new Date(startsAt.setHours(new Date().getHours() + 23)),
					scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 2)),
				}];
			} else if (subscription.numberOfMeeting === 2) {
				const appointmentDate = new Date();
				const month = new Date(new Date().setMonth(new Date().getMonth() + i));
				const startsAt = new Date(month.setDate(month.getDate() + 2));
				const startsAtNineDays = new Date(month.setDate(month.getDate() + 5));
				schedule = [{
					queryId: lead.id,
					lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
					customerId: userId,
					adminId: adminId,
					date: new Date(),
					shift: 'morning',
					time: startsAt,
					orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
					endTime: new Date(startsAt.setHours(new Date(startsAt).getHours() + 23, 59, 59)),
					scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 2)),
				}, {
					queryId: lead.id,
					lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
					customerId: userId,
					adminId: adminId,
					date: new Date(),
					shift: 'morning',
					time: startsAtNineDays,
					orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
					endTime: new Date(startsAtNineDays.setHours(new Date(startsAtNineDays).getHours() + 23, 59, 59)),
					scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 7)),
				}];
			} else if (subscription.numberOfMeeting === 3) {
				const appointmentDate = new Date();
				const month = new Date(new Date().setMonth(new Date().getMonth() + i));
				const startsAt = new Date(month.setDate(month.getDate() + 2));
				const startsAtNineDays = new Date(month.setDate(month.getDate() + 5));
				const startsAtTenDays = new Date(month.setDate(month.getDate() + 13));
				schedule = [{
					queryId: lead.id,
					lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
					customerId: userId,
					adminId: adminId,
					date: new Date(),
					shift: 'morning',
					time: startsAt,
					orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
					endTime: new Date(startsAt.setHours(new Date(startsAt).getHours() + 23, 59, 59)),
					scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 2)),
				}, {
					queryId: lead.id,
					lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
					customerId: userId,
					adminId: adminId,
					date: new Date(),
					shift: 'morning',
					time: startsAtNineDays,
					orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
					endTime: new Date(startsAtNineDays.setHours(new Date(startsAtNineDays).getHours() + 23, 59, 59)),
					scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 5)),
				}, {
					queryId: lead.id,
					lawFirmId: '19aac51e-8e09-4ca8-81bb-253149c76ee4',
					customerId: userId,
					adminId: adminId,
					date: new Date(),
					shift: 'morning',
					time: startsAtTenDays,
					orderId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
					endTime: new Date(startsAtTenDays.setHours(new Date(startsAtTenDays).getHours() + 23, 59, 59)),
					scheduleAt: new Date(appointmentDate.setDate(appointmentDate.getDate() + 7)),
				},
				];
			}
			await Appointment.bulkCreate(schedule)
				.then(async (scheduleCall) => {
					scheduleCall.map(async (schedule) => {
						await Room.create({
							appointmentId: schedule.id,
							roomName: schedule.id,
							adminId: schedule.adminId,
							customerId: schedule.customerId,
							queryId: schedule.queryId,
						});
					});
				});
		}
	}
}

module.exports = saveSubscriptionScheduleCall;
