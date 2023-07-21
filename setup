#!/bin/bash

# Function to display an error message and exit
function display_error {
  echo "Error: $1"
  exit 1
}

# Check if virtualenv is installed
command -v virtualenv > /dev/null || display_error "virtualenv is not installed. Please install it before running this script."

# Define the virtual environment path
venv_path=~/venvs/ai-overlord

# Create a virtual environment
echo "Creating a virtual environment..."
virtualenv -p python3 $venv_path || display_error "Failed to create the virtual environment."

# Activate the virtual environment
echo "Activating the virtual environment..."
source $venv_path/bin/activate || display_error "Failed to activate the virtual environment."

# Install necessary dependencies
echo "Installing necessary dependencies..."
pip install Flask || display_error "Failed to install Flask."
# Add any additional dependencies you may need for your specific web game here.

# Deactivate the virtual environment
echo "Deactivating the virtual environment..."
deactivate
echo "Setup complete!"

# Show command to activate virtual environment
echo "To activate venv, run the following command:"
echo "source ~/venvs/ai-overlord/bin/activate"
