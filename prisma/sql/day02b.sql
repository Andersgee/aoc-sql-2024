
SELECT COUNT(*) AS answer
FROM (

WITH tmp3 AS (
WITH tmp2 AS (
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
) SELECT
  *,
  -- this also handles the case where delta is 0 since sign returns 0 then
  deltasign != LAG(deltasign, 1, deltasign) OVER (PARTITION BY day02Id ORDER BY "index" ASC) AS did_change_delta_sign
  FROM tmp
  -- WHERE delta IS NOT NULL --skip first "diff" which doesnt matter
) SELECT
day02Id,
"index",
"value",
delta,
did_change_delta_sign,
SUM(did_change_delta_sign) OVER(PARTITION BY day02Id) AS sum_did_change_delta_sign,
SUM(CASE WHEN delta = 0 THEN 1 ELSE 0 END) OVER(PARTITION BY day02Id) AS sum_zero_deltas,
SUM(CASE WHEN ABS(delta)>3 THEN 1 ELSE 0 END) OVER(PARTITION BY day02Id) AS sum_large_deltas
FROM tmp2

)
SELECT DISTINCT
day02Id
FROM tmp3

WHERE 
sum_did_change_delta_sign <= 2 AND sum_zero_deltas + sum_large_deltas <= 0
OR
sum_did_change_delta_sign <= 0 AND sum_zero_deltas + sum_large_deltas <= 1

)
;

