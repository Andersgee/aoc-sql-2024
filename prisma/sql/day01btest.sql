SELECT SUM(left * left_occurance_in_right) AS answer
FROM (
  SELECT 
  left,
  (SELECT count(*) FROM day01test WHERE right = a.left) AS left_occurance_in_right
  FROM day01test a
)
;