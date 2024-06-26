import os


def delete_files_except(directory, excluded_files):
    for root, dirs, files in os.walk(directory, topdown=False):
        for file in files:
            if file not in excluded_files:
                file_path = os.path.join(root, file)
                os.remove(file_path)
                print(f"Deleted: {file_path}")

        # Check and remove empty directories after file deletion
        for dir in dirs:
            dir_path = os.path.join(root, dir)
            if not os.listdir(dir_path):  # Directory is empty
                os.rmdir(dir_path)
                print(f"Removed empty directory: {dir_path}")


# Usage
directory_to_clean = "experimental_data"  # Replace with the path to your directory
excluded_files = ["results.csv"]  # List of files to keep

delete_files_except(directory_to_clean, excluded_files)
