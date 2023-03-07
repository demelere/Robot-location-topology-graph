### To Replicate:
* No external libraries used, so just open the terminal and run `python thread-counter.py`

### Notes and to dos:
* I assume that the data can become large, with many large CSVs files.  If this is the case, it may be more efficient to use a priority queue data structure to more efficiently access and remove threads with certain start or end times.  Another way would be to use multiprocessing to split up tasks.  
* Add a check to make sure the first row has a header using a try except block
* If I were to use a dataframe library (e.g. Pandas), I would consider using Polars, which handles large datasets well in-memory.