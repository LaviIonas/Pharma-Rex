let patients = [];

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
    return knex('caregivers').insert([
      {
        email: 'ned@email.com',
        password: '12345',
        name: 'Ned Stark',
        phone_number: '+14168890760'
      },
      {
        
        email: 'syrio@email.com',
        password: '12345',
        name: 'Syrio Forel',
        phone_number: '+14168890760'
      },
      {
    
        password: '12345',
        email: 'catelyn@email.com',
        name: 'Carelyn Stark',
        phone_number: '+14168890760'
      },
      {
        password: '12345',
        email: 'tywin@gmail.com',
        name: 'Tywin Lannister',
        phone_number: '+14168890760'
      }])
      .returning('*');
    })
  .then((response) => {
    return knex('patients').insert([
      {
        password: '12345',
        email: 'jon@email.com',
        name: 'Jon Snow',
        doctor_name: 'Dr. Zeyus',
        pharmacy_number: '123456789',
        phone_number: '+16132654021',
        caregiver_id: response[0].id
      },
      {
        
        password: '12345',
        email: 'arya@email.com',
        name: 'Arya Stark',
        doctor_name: 'Dr. Nick',
        pharmacy_number: '123456789',
        phone_number: '+14168890760',
        caregiver_id: response[3].id
      },
      {
        password: '12345',
        email: 'sansa@email.com',
        name: 'Sansa Stark',
        doctor_name: 'Dr. Phil',
        pharmacy_number: '123456789',
        phone_number: '+14168890760',
        caregiver_id: response[2].id
      },
      {
        password: '12345',
        email: 'robb@gmail.com',
        name: 'Robb Stark',
        doctor_name: 'Dr. Zeus',
        pharmacy_number: '123456789',
        phone_number: '+16132654021',
        caregiver_id: response[2].id
      }])
      .returning('*')
    })
    .then((response) => {
      patients.push(response[0].id)
      patients.push(response[1].id)
      patients.push(response[2].id)
      patients.push(response[3].id)
      return knex('medications').insert([
        {
          medication_name: 'Tylenol'
        },
        {
          medication_name: 'Percocet'
        },
        {
          medication_name: 'Vicodin'
        },
        {
          medication_name: 'Xanax'
        }])
        .returning('*')
    })
    .then((response) => {
      return knex('prescriptions').insert([
        {
        patient_id: patients[0],
        medication_id: response[0].id,
        rx_number: '9876-54321',
        dosage: '500 mg',
        total_number_pills: 30,
        number_pills_to_take: 1,
        start_time: 'May 4, 2019 1:53PM',
        interval: 200
        },
        {
          patient_id: patients[1],
          medication_id: response[1].id,
          rx_number: '1876-54329',
          dosage: '2 mg',
          total_number_pills: 90,
          number_pills_to_take: 3,
          start_time: 'May 3, 2019 8:10PM',
          interval: 400
        },
        {
          patient_id: patients[1],
          medication_id: response[3].id,
          rx_number: '2876-54323',
          dosage: '40 mg',
          total_number_pills: 40,
          number_pills_to_take: 3,
          start_time: 'May 3, 2019 8:11PM',
          interval: 300
        },
        {
          patient_id: patients[2],
          medication_id: response[2].id,
          rx_number: '2876-54323',
          dosage: '10 mg',
          total_number_pills: 10,
          number_pills_to_take: 1,
          start_time: 'May 3, 2019 8:11PM',
          interval: 300
        },
        {
          patient_id: patients[3],
          medication_id: response[3].id,
          rx_number: '5876-54328',
          dosage: '40 mg',
          total_number_pills: 70,
          number_pills_to_take: 2,
          start_time: 'May 3, 2019 8:12PM',
          interval: 500
        }])
    })

}


//   })
//   .then(function () {
//     return Promise.all([
//       knex('notifications').insert({
//         id: 1,
//         prescription_id: 1,
//         time_send_notification: '2019-04-27 19:10:25-07'
//       }),
//       knex('notifications').insert({
//         id: 2,
//         prescription_id: 2,
//         time_send_notification: '2019-04-27 13:10:25-07'
//       }),
//       knex('notifications').insert({
//         id: 3,
//         prescription_id: 3,
//         time_send_notification: '2019-04-27 14:10:25-07'
//       }),
//       knex('notifications').insert({
//         id: 4,
//         prescription_id: 4,
//         time_send_notification: '2019-04-27 15:10:25-07'
//       }),
//     ]);
//   })
// }
