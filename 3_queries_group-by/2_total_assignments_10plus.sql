SELECT day, count(id)
FROM assignments
GROUP BY day
HAVING count(id) >= 10
ORDER BY day;