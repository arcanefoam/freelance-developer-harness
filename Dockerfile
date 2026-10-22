FROM mcr.microsoft.com/azure-cli:azurelinux3.0

# Install the azure-devops extension during the image build phase
RUN az extension add --name azure-devops