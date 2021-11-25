SELECT avg (total_duration) as average_total_duration
FROM (
SELECT cohorts.name as name, sum(completed_at - started_at) as total_duration
FROM cohorts
JOIN students ON students.cohort_id = cohorts.id
JOIN assistance_requests ON students.id = assistance_requests.student_id
GROUP BY cohorts.name
) as total_durations;