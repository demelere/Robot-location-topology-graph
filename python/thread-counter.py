import os
import csv

class ThreadAnalyzer:
    
    def __init__(self, data_directory='./data'):
        self.data_directory = data_directory
        self.data = {}
        self.read_csv_files()
    
    def read_csv_files(self):
        for filename in os.listdir(self.data_directory):
            if filename.endswith('.csv'):
                with open(os.path.join(self.data_directory, filename), 'r') as csv_file:
                    reader = csv.reader(csv_file)
                    next(reader)  # skips the first row assuming it has a header
                    for row in reader:
                        program_id, thread_id, start_time, end_time = map(int, row)

                        if program_id not in self.data:
                            self.data[program_id] = []
                        self.data[program_id].append((thread_id, start_time, end_time))
    
    def max_threads_running_all(self):
        max_threads = 0
        for program_id, program_data in self.data.items():
            thread_events = []         
            for thread_id, start_time, end_time in program_data:
                thread_events.append((start_time, 1))
                thread_events.append((end_time, -1))
            thread_events.sort()

            threads_running = 0
            for event_time, event_type in thread_events:
                threads_running += event_type
                max_threads = max(max_threads, threads_running)

        return max_threads
    
    def max_threads_running_time(self, start_time, end_time):
        max_threads = 0
        for program_id, threads in self.data.items():
            threads.sort(key=lambda x: x[1])  

            active_threads = []
            for thread in threads:
                thread_id, thread_start, thread_end = thread

                if thread_end <= start_time: 
                    continue
                if thread_start >= end_time:
                    break

                while active_threads and active_threads[0][2] <= thread_start:
                    active_threads.pop(0)

                active_threads.append(thread)
                max_threads = max(max_threads, len(active_threads)) 

        return max_threads
    
    def max_threads_running_program(self, program_id):
        max_threads = 0
        if program_id in self.data:
            thread_events = [] 
            for thread_id, start_time, end_time in self.data[program_id]:
                thread_events.append((start_time, 1))
                thread_events.append((end_time, -1))
            thread_events.sort()

            threads_running = 0
            for event_time, event_type in thread_events:
                threads_running += event_type
                max_threads = max(max_threads, threads_running)

        return max_threads

thread_analyzer = ThreadAnalyzer()
print(f'the max number of threads running at any time for all programs is: {thread_analyzer.max_threads_running_all()}') # expected 3
print(f'the max number of threads running for all programs between time 3 and 6 is: {thread_analyzer.max_threads_running_time(3, 6)}') # expect 4
print(f'the max number of threads running at any time for program 2 is: {thread_analyzer.max_threads_running_program(2)}') # expected 3
