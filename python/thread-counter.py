import os
import csv
data_directory = './data'

# loops through CSVs in the directory and stores in a dictionary using program id as key and a list containing thread, start, end as the value
data = {}
for filename in os.listdir(data_directory):
    if filename.endswith('.csv'):
        with open(os.path.join(data_directory, filename), 'r') as csv_file:
            reader = csv.reader(csv_file)
            next(reader)  # skips the first row assuming it has a header
            for row in reader:
                program_id, thread_id, start_time, end_time = map(int, row)

                if program_id not in data:
                    data[program_id] = []
                data[program_id].append((thread_id, start_time, end_time))

def max_threads_running_all(data):
    max_threads = 0
    for program_id, program_data in data.items(): # iterates over all program ids

        # makes a list of thread events (start and end times)
        thread_events = []         
        for thread_id, start_time, end_time in program_data:
            thread_events.append((start_time, 1)) # a thread started
            thread_events.append((end_time, -1)) # a thread ended
        thread_events.sort()
        
         # updates a running count of threads and update max_threads if necessary
        threads_running = 0
        for event_time, event_type in thread_events:
            threads_running += event_type
            max_threads = max(max_threads, threads_running)

    return max_threads

def max_threads_running_time(data, start_time, end_time):
    max_threads = 0
    for program_id, threads in data.items():
        threads.sort(key=lambda x: x[1])  

        active_threads = []
        for thread in threads:
            thread_id, thread_start, thread_end = thread

            # checks if the thread ends before the start of the given time range, or if the thread starts after the end of the given time range
            if thread_end <= start_time: 
                continue
            if thread_start >= end_time:
                break

            # removes threads that have ended before the start of the current thread
            while active_threads and active_threads[0][2] <= thread_start:
                active_threads.pop(0)

            # adds the current thread to the list of active threads and update max_threads if necessary
            active_threads.append(thread)
            max_threads = max(max_threads, len(active_threads)) 

    return max_threads

def max_threads_running_program(data, program_id):
    max_threads = 0
    if program_id in data: # only considers the thread events for a certain program id and updates threads_running and max_thread for events for that program id
        
        thread_events = [] 
        for thread_id, start_time, end_time in data[program_id]:
            thread_events.append((start_time, 1))
            thread_events.append((end_time, -1))
        thread_events.sort()
        
        threads_running = 0
        for event_time, event_type in thread_events:
            threads_running += event_type
            max_threads = max(max_threads, threads_running)

    return max_threads

print(f'the max number of threads running at any time for all programs is: {max_threads_running_all(data)}') # expected 3
print(f'the max number of threads running for all programs between time 3 and 6 is: {max_threads_running_time(data, 3, 6)}') # expect 4
print(f'the max number of threads running at any time for program 2 is: {max_threads_running_program(data, 2)}') # expected 3