SELECT SUM(ABS(left-right)) AS answer
FROM (
  WITH tmp AS (
    SELECT 
    left,
    right,
    ROW_NUMBER() OVER(ORDER BY left ASC) AS left_index,
    ROW_NUMBER() OVER(ORDER BY right ASC) AS right_index
    FROM day01
  ) SELECT 
  a.left,
  b.right
  FROM tmp a
  INNER JOIN tmp b
  ON a.left_index = b.right_index
)
;
