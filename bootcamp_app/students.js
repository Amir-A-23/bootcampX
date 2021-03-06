const { Pool } = require('pg');
const args = process.argv.slice(2);
const pool = new Pool({
	user: 'vagrant',
	password: '123',
	host: 'localhost',
	database: 'bootcampx',
});
pool
	.connect()
	.then(() => {
		console.log('Connected to the Database :>');
	})
	.catch((e) => {
		console.log('>>>>>>>>>Error<<<<<<<');
		console.log(e.message);
	});

pool
	.query(
		`
SELECT students.id as student_id, students.name as student_name, cohorts.name as cohort
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`,
		[`%${args[0]}%`, args[1]]
	)
	.then((res) => {
		res.rows.forEach((user) => {
			console.log(
				`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
			);
		});
	})
	.catch((err) => console.error('query error', err.stack));
