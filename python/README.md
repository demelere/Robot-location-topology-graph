### To Replicate:
* No external libraries used, so just open the terminal and run `python thread-counter.py`

### Intro:
* This is a program that analyzes thread spawn data of various programs running on a robot's on-board computer

### Notes:
* If the data becomes large with many large CSVs files, it may be more efficient to use a priority queue data structure to more efficiently access and remove threads with certain start or end times.  Another way would be to use multiprocessing to split up tasks.  
* If I were to use a dataframe library (e.g. Pandas) for these large files, I would load a subset of rows or skip unneeded rows, or use the `chunksize` parameter of the `read_csv` method.  I would also look into converting columns to more efficient types, down-casting columns, or converting object types to category types.  
* Another alternative would be to use Polars, which handles large datasets well in-memory.