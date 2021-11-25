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
    SELECT DISTINCT teachers.name as name, cohorts.name as cohort
    FROM teachers
    JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
    JOIN students ON assistance_requests.student_id = students.id
    JOIN cohorts ON students.cohort_id = cohorts.id
    WHERE assistance_requests.teacher_id IS NOT NULL 
    AND cohorts.name = $1
    ORDER BY name;
`,
		[args[0]]
	)
	.then((res) => {
		res.rows.forEach((user) => {
			console.log(`${user.cohort}: ${user.name}`);
		});
	})
	.catch((err) => console.error('query error', err.stack));
