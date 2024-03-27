import os


def delete_files_except(directory, excluded_files):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file not in excluded_files:
                file_path = os.path.join(root, file)
                os.remove(file_path)
                print(f"Deleted: {file_path}")


# Usage
directory_to_clean = "experimental_data"  # Replace with the path to your directory
excluded_files = ["results.csv"]  # List of files to keep

delete_files_except(directory_to_clean, excluded_files)
