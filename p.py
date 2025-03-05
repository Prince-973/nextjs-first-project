import os
import subprocess

def update_readme(file_path, new_content):
    """Update the README file with new content."""
    try:
        with open(file_path, "a") as file:
            file.write(new_content)
        print("README updated successfully.")
    except Exception as e:
        print(f"Error updating README: {e}")

def run_git_commands(repo_path, commit_message, branch_name):
    """Run git commands to add, commit, and push changes."""
    try:
        # Change to the repository directory
        os.chdir(repo_path)

        # Add changes to staging
        subprocess.run(["git", "add", "README.md"], check=True)

        # Commit changes
        subprocess.run(["git", "commit", "-m", commit_message], check=True)

        # Push changes to the specified branch
        subprocess.run(["git", "push", "origin", branch_name], check=True)

        print(f"Changes committed and pushed to branch '{branch_name}' successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Git command failed: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Path to your local repository (replace 'path/to/your/repo' with the actual path to your local Git repository)
    repo_path = "/home/dev/Project-1/Auth_app"

    # Path to the README file
    readme_path = os.path.join(repo_path, "README.md")

    # New content to append to the README
    new_content = "\n## Minor Update\nThis is a minor update to the README file.\n"

    # Commit message
    commit_message = "docs: minor update to README"

    # Branch to push the changes to
    branch_name = "Auth"

    # Update the README file
    update_readme(readme_path, new_content)

    # Run git commands
    run_git_commands(repo_path, commit_message, branch_name)
