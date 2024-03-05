import click
import re
from os import scandir
import numpy as np

# Parses the output.log file and returns an array of parsed percentages
def parse_output_log(file):
    #find all lines ending with | Coverage: X%
    regex = r"Coverage: (?P<percent>\d+(?:\.\d+)?)%$"
    with open(file, "r") as file:
        lines = file.readlines()
        percentages = []
        for line in lines:
            match = re.search(regex, line)
            if match:
                percentages.append(float(match.group("percent")))
        return percentages

@click.command()
@click.argument(
    "folder"
)
def main(folder):
    # get all subfolders
    subfolders = [f.path for f in scandir(folder) if f.is_dir()]
    experiments = []
    # from each subfolder, parse output.log file
    for subfolder in subfolders:
        print(f"Parsing {subfolder}")
        with open(f"{subfolder}/output.log", "r") as file:
            lines = file.readlines()
            # parse the file
            # write the parsed data to a csv file
            percentages = parse_output_log(f"{subfolder}/output.log")
            experiments.append(percentages)

    print(f"Calculating statistics for {len(experiments)} experiments")
    # Calculate the average and standard deviations of the percentages
    experiments = np.array(experiments)
    averages = np.mean(experiments, axis=0)
    std_devs = np.std(experiments, axis=0)
    # create "above" and "below" arrays
    above = averages + std_devs
    below = averages - std_devs
    # min and max values
    min_values = np.min(experiments, axis=0)
    max_values = np.max(experiments, axis=0)
    # create x-axis array (0, 1, 2, 3, 4, 5, ...)
    x_axis = np.arange(len(averages))

    # write the data to a csv file
    outfile = f"{folder}/results.csv"
    with open(outfile, "w") as file:
        file.write("x,average,above,below,min,max\n")
        for i in range(len(averages)):
            file.write(f"{x_axis[i]},{averages[i]},{above[i]},{below[i]},{min_values[i]},{max_values[i]}\n")
    print(f"Results written to {outfile}")

if __name__ == "__main__":
    main()
