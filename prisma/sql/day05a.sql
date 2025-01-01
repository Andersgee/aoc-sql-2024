WITH RECURSIVE item (
  depth,
  a_x,
  a_y,
  a_val,
  b_x,
  b_y,
  b_val
) AS (
  -- base case
  -- select some initial rows to add to 'queue'
  SELECT 
  (SELECT 0),
  x,
  y,
  val,
  x,
  y,
  val
  FROM day05element

  UNION ALL

  -- recursive
  -- this will run over and over until there are no more rows left in queue
  -- all rows selected here will be 'pushed' to queue
  -- and those rows will also run this SELECT statement when the 'iterator' arrives at that row

  -- obviously we must take care to make this SELECT return 0 rows at some point to stop pushing rows to queue

  -- note1: the end-result is just all rows that were pushed to queue (including base case) and exactly
  -- in the order they were pushed

  -- note2: item.* here refer to "parent row" (not "previous row")
  -- parent meaning the item that was responsible for pushing this particular row to queue

  SELECT 
  item.depth+1,
  item.a_x,
  item.a_y,
  item.a_val,
  day05element.x,
  day05element.y,
  day05element.val
  FROM item, day05element
  WHERE day05element.x > item.a_x
  AND day05element.y = item.a_y
  AND item.depth = 0 --stop recursion this is not first recursion depth
),
incorrect_combos AS (
  SELECT
  item.a_y as y,
  item.a_x,
  item.a_val,
  item.b_x,
  item.b_val
  FROM item
  INNER JOIN day05rule
  ON (item.a_val = day05rule.b AND item.b_val = day05rule.a)
),
correct_ys AS (
  SELECT DISTINCT y FROM day05element
  WHERE y NOT IN (SELECT y FROM incorrect_combos)
),
middlecoords AS (
  SELECT DISTINCT
  y,
  MAX(x) OVER(PARTITION BY y)/2 AS x
  FROM day05element
),
correct_middlevals AS (
  SELECT
  val
  FROM day05element
  JOIN middlecoords
  ON day05element.x = middlecoords.x 
  AND day05element.y = middlecoords.y
  AND day05element.y IN correct_ys
)

SELECT 
SUM(val) as answer
FROM correct_middlevals
;
