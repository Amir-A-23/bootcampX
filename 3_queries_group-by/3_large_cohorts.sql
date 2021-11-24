SELECT cohorts.name as cohort_name, count(students.id) as student_count
FROM cohorts 
JOIN students ON cohorts.id = cohort_id
GROUP BY cohorts.name
HAVING count(students.id) >= 18
ORDER BY student_count;