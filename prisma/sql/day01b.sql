
WItH tmp AS (
  SELECT 
  left,
  (SELECT count(*) FROM day01 WHERE right = a.left) AS left_occurance_in_right
  FROM day01 a
)
SELECT 
SUM(left * left_occurance_in_right) AS answer
FROM tmp
;
