
WITH 
tmp AS (
  SELECT
  CONCAT(x-1,'-',y-1) AS d1_center,
  CONCAT(x-1,'-',y+1) AS d2_center,
  CONCAT(
    LAG(c,2,'') OVER(PARTITION BY x-y ORDER BY y ASC, x ASC),
    LAG(c,1,'') OVER(PARTITION BY x-y ORDER BY y ASC, x ASC),
    c 
  ) AS diag1_three_chars,
  CONCAT(
    LAG(c,2,'') OVER(PARTITION BY x+y ORDER BY y DESC, x ASC),
    LAG(c,1,'') OVER(PARTITION BY x+y ORDER BY y DESC, x ASC),
    c 
  ) AS diag2_three_chars
  FROM day04cell
  ORDER BY y ASC, x ASC
), 
tmp2 AS (
  SELECT
  a.d1_center AS center,
  a.diag1_three_chars AS a_diag,
  b.diag2_three_chars AS b_diag
  FROM tmp a
  INNER JOIN tmp b
  ON a.d1_center = b.d2_center
),
tmp3 AS (
  SELECT
  center
  FROM tmp2
  WHERE 
  (a_diag = "MAS" OR a_diag = "SAM") AND (b_diag = "MAS" OR b_diag = "SAM")
)
SELECT 
COUNT(*) as answer
FROM tmp3
;
