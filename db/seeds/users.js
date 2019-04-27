exports.seed = function(knex, Promise) {
 
  return knex('caregivers').del()
  .then(function() { 
    return knex('patients').del()
  })
  .then(function() { 
    return knex('medications').del()
  })
  .then(function() { 
    return knex('prescriptions').del()
  })
  .then(function() { 
    return knex('notifications').del()
  })
  .then(function () {
    return Promise.all([
      knex('caregivers').insert({
        id: 1,
        email: 'ned@email.com',
        password: '12345',
        name: 'Ned Stark',
        phone_number: '987654321'
      }),
      knex('caregivers').insert({
        id: 2,
        email: 'syrio@email.com',
        password: '12345',
        name: 'Syrio Forel',
        phone_number: '987654321'
      }),
      knex('caregivers').insert({
        id: 3,
        password: '12345',
        email: 'catelyn@email.com',
        name: 'Carelyn Stark',
        phone_number: '987654321'
      }),
      knex('caregivers').insert({
        id: 4,
        password: '12345',
        email: 'tywin@gmail.com',
        name: 'Tywin Lannister',
        phone_number: '987654321'
      }),
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('patients').insert({
        id: 1,
        password: '12345',
        email: 'jon@email.com',
        name: 'Jon Snow',
        doctor_name: 'Dr. Zeyus',
        pharmacy_number: '123456789',
        phone_number: '987654321',
        caregiver_id: 1
      }),
      knex('patients').insert({
        id: 2,
        password: '12345',
        email: 'arya@email.com',
        name: 'Arya Stark',
        doctor_name: 'Dr. Nick',
        pharmacy_number: '123456789',
        phone_number: '987654321',
        caregiver_id: 4
      }),
      knex('patients').insert({
        id: 3,
        password: '12345',
        email: 'sansa@email.com',
        name: 'Sansa Stark',
        doctor_name: 'Dr. Phil',
        pharmacy_number: '123456789',
        phone_number: '987654321',
        caregiver_id: 3
      }),
      knex('patients').insert({
        id: 4,
        password: '12345',
        email: 'robb@gmail.com',
        name: 'Robb Stark',
        doctor_name: 'Dr. Zeus',
        pharmacy_number: '123456789',
        phone_number: '987654321',
        caregiver_id: 3
      }),
  
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('medications').insert({
        id: 1,
        medication_name: 'Tylenol'
      }),
      knex('medications').insert({
        id: 2,
        medication_name: 'Percocet'
      }),
      knex('medications').insert({
        id: 3,
        medication_name: 'Vicodin'
      }),
      knex('medications').insert({
        id: 4,
        medication_name: 'Xanax'
      }),
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('prescriptions').insert({
        id: 1,
        patient_id: 2,
        medication_id: 1,
        rx_number: '9876-54321',
        dosage: '500 mg',
        total_number_pills: 30,
        number_pills_to_take: 1,
        start_time: '2019-04-27 19:10:25-07',
        interval: 24
      }),
      knex('prescriptions').insert({
        id: 2,
        patient_id: 2,
        medication_id: 3,
        rx_number: '1876-54329',
        dosage: '2 g',
        total_number_pills: 90,
        number_pills_to_take: 3,
        start_time: '2019-04-27 13:10:25-07',
        interval: 24
      }),
      knex('prescriptions').insert({
        id: 3,
        medication_id: 2,
        patient_id: 3,
        rx_number: '2876-54323',
        dosage: '1000 mg',
        total_number_pills: 10,
        number_pills_to_take: 1,
        start_time: '2019-04-27 14:10:25-07',
        interval: 48
      }),
      knex('prescriptions').insert({
        id: 4,
        medication_id: 1,
        patient_id: 1,
        rx_number: '5876-54328',
        dosage: '800 lbs',
        total_number_pills: 70,
        number_pills_to_take: 2,
        start_time: '2019-04-27 15:10:25-07',
        interval: 72
      }),
    ]);
  })
  .then(function () {
    return Promise.all([
      knex('notifications').insert({
        id: 1,
        prescription_id: 1,
        time_send_notification: '2019-04-27 19:10:25-07'
      }),
      knex('notifications').insert({
        id: 2,
        prescription_id: 2,
        time_send_notification: '2019-04-27 13:10:25-07'
      }),
      knex('notifications').insert({
        id: 3,
        prescription_id: 3,
        time_send_notification: '2019-04-27 14:10:25-07'
      }),
      knex('notifications').insert({
        id: 4,
        prescription_id: 4,
        time_send_notification: '2019-04-27 15:10:25-07'
      }),
    ]);
  })
}


