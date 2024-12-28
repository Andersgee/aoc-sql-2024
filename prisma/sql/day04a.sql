--SELECT
--* 
--FROM day04cell
--ORDER BY y ASC, x ASC
--;


WITH tmp AS (
  SELECT 
  --c
  CONCAT(LAG(c,1,c) OVER(PARTITION BY y ORDER BY x ASC), c ) AS hmm
  --c - LAG("value", 1, NULL) OVER (PARTITION BY day02Id ORDER BY "index" ASC) AS delta,
  FROM day04cell
  --ORDER BY y ASC, x ASC
)
SELECT
hmm
FROM tmp
;