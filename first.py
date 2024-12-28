import soccerdata as sd
import pandas as pd
from difflib import get_close_matches

# Initialize FotMob data readers for all relevant seasons
seasons = ['2021/2022']
fotmob_readers = [sd.FotMob(leagues='ENG-Premier League', seasons=season) for season in seasons]

# Initialize an empty DataFrame to store combined data
combined_data = pd.DataFrame()

# Loop through each season and process data
for fotmob in fotmob_readers:
    # Read the schedule to get match dates
    schedule = fotmob.read_schedule()
    schedule['date'] = pd.to_datetime(schedule['date'])

    # Filter matches between January 1, 2021, and December 18, 2024
    filtered_schedule = schedule[(schedule['date'] >= '2021-01-01') & (schedule['date'] <= '2022-12-31')]

    # Retrieve match statistics for the filtered matches
    match_stats = fotmob.read_team_match_stats()

    # Merge match statistics with the filtered schedule
    merged_data = pd.merge(filtered_schedule, match_stats, left_index=True, right_index=True)

    # Append the merged data to the combined DataFrame
    combined_data = pd.concat([combined_data, merged_data], ignore_index=True)

# Select relevant columns dynamically based on availability
print(combined_data)

# Save combined_data to a CSV file
output_file = "fotmob_match_statistics_2021.csv"
combined_data.to_csv(output_file, index=False)

print(f"Data saved to {output_file}")