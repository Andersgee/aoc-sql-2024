

 WITH tmp AS (
    SELECT
  day02Id,
  "index",
  "value",
  "value" - LAG("value", 1, NULL) OVER (PARTITION BY day02Id ORDER BY "index" ASC) AS delta,
  SIGN("value" - LAG("value", 1, NULL) OVER (PARTITION BY day02Id ORDER BY "index" ASC)) AS deltasign
FROM
day02element
ORDER BY day02Id ASC
),
tmp2 AS (
  SELECT
  *,
  -- this also handles the case where delta is 0 since sign returns 0 then
  deltasign != LAG(deltasign, 1, deltasign) OVER (PARTITION BY day02Id ORDER BY "index" ASC) AS did_change_delta_sign
  FROM tmp
  WHERE delta IS NOT NULL --skip first "diff" which doesnt matter
),
tmp3 AS (
  SELECT
  day02Id,
  delta,
  SUM(did_change_delta_sign) OVER(PARTITION BY day02Id) = 0 AS strictly_monotonic,
  SUM(CASE WHEN delta = 0 THEN 1 ELSE 0 END) OVER(PARTITION BY day02Id) = 0 AS has_no_zero_deltas,
  SUM(CASE WHEN ABS(delta)>3 THEN 1 ELSE 0 END) OVER(PARTITION BY day02Id) = 0 AS has_no_large_deltas
  FROM tmp2
),
tmp4 As (
  SELECT DISTINCT
  day02Id
  FROM tmp3
  WHERE 
  strictly_monotonic = 1 AND
  has_no_zero_deltas = 1 AND
  has_no_large_deltas = 1
)
SELECT 
COUNT(*) AS answer
FROM tmp4
;


