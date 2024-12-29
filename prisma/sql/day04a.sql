
WITH 
tmp AS (
  SELECT
  y,
  x,
  x-y AS d1,
  x+y AS d2,
  CONCAT(
    LAG(c,3,'') OVER(PARTITION BY y ORDER BY x ASC),
    LAG(c,2,'') OVER(PARTITION BY y ORDER BY x ASC),
    LAG(c,1,'') OVER(PARTITION BY y ORDER BY x ASC),
    c 
  ) AS horizontal_four_chars,
  CONCAT(
    LAG(c,3,'') OVER(PARTITION BY x ORDER BY y ASC),
    LAG(c,2,'') OVER(PARTITION BY x ORDER BY y ASC),
    LAG(c,1,'') OVER(PARTITION BY x ORDER BY y ASC),
    c 
  ) AS vertical_four_chars,
  CONCAT(
    LAG(c,3,'') OVER(PARTITION BY x-y ORDER BY y ASC, x ASC),
    LAG(c,2,'') OVER(PARTITION BY x-y ORDER BY y ASC, x ASC),
    LAG(c,1,'') OVER(PARTITION BY x-y ORDER BY y ASC, x ASC),
    c 
  ) AS diag1_four_chars,
  CONCAT(
    LAG(c,3,'') OVER(PARTITION BY x+y ORDER BY y DESC, x ASC),
    LAG(c,2,'') OVER(PARTITION BY x+y ORDER BY y DESC, x ASC),
    LAG(c,1,'') OVER(PARTITION BY x+y ORDER BY y DESC, x ASC),
    c 
  ) AS diag2_four_chars 
  FROM day04cell
  ORDER BY y ASC, x ASC
),
counts AS (
SELECT 
SUM(horizontal_four_chars = "XMAS") AS h,
SUM(horizontal_four_chars = "SAMX") AS hr,

SUM(vertical_four_chars = "XMAS") AS v,
SUM(vertical_four_chars = "SAMX") AS vr,

SUM(diag1_four_chars = "XMAS") AS d1,
SUM(diag1_four_chars = "SAMX") AS d1r,

SUM(diag2_four_chars = "XMAS") AS d2,
SUM(diag2_four_chars = "SAMX") AS d2r
FROM tmp 
)

SELECT
h+hr + v+vr + d1+d1r + d2+d2r AS answer
FROM counts
;

/*
-- this is apparently called recursion, anyway, this is essentially how to "for loop"
iterator AS (
  SELECT 
  0 as i

  UNION ALL

  SELECT
  i+1 -- we have an incrementing index here, yay
  FROM iterator
  WHERE i < 1000

)
*/