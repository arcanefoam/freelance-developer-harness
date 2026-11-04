FROM docker.io/sbx/opencode-image:latest

# Switch to root to install system-wide packages
USER root

# Install build dependencies, python3, pip, and the Azure CLI
RUN apt-get update && \
   	curl -fsSL 'https://azurecliprod.blob.core.windows.net/$root/deb_install.sh' | bash

RUN apt-get clean

# Install the azure-devops extension during the image build phase
RUN az extension add --name azure-devops

# Add missing npm folders
RUN mkdir -p /usr/local/share/npm-global/lib && \
    chown -R agent:agent /usr/local/share/npm-global

WORKDIR /workspace

USER agent
