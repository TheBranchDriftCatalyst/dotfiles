#!/usr/bin/env bash

# Get the installation functions. Things are broken up this way
# in order to allow packages with varying dep requirements accross
# sources to be met.
source ./brew.sh

# About to start doing stuff
# Ask for the administrator password upfront
sudo -v
# Keep-alive: update existing `sudo` time stamp until `.macos` has finished
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# export HOMEBREW_CASK_OPTS="--appdir=/Applications"

while ! [[ "$install_mode" =~ ^(work|personal)$ ]]
do
  echo "What mode do you want to run in? (work|personal):"
  read -r install_mode
done

export BOOTSTRAP_MODE=$install_mode

# install brew if necessary and tap some casks
install_brew
# isntall zsh if needed
install_zsh

########################################
## Install layer 0 terminal utilities ##
########################################
# todo: don’t forget to add `$(brew --prefix coreutils)/libexec/gnubin` to `$PATH`.
brew install coreutils
# Install some other useful utilities like `sponge`.
# Install GNU `find`, `locate`, `updatedb`, and `xargs`, `g`-prefixed.
# Install GNU `sed`, overwriting the built-in `sed`.
brew install moreutils
brew install findutils
brew install grep
brew install gnu-sed --with-default-names
brew install ack
brew install adns
brew install wget --with-iri

# Install Fonts
brew tap homebrew/cask-fonts
brew tap bramstein/webfonttools
brew update
brew install sfnt2woff
brew install sfnt2woff-zopfli
brew install woff2
brew install fontconfig
brew install freetype
brew install --cask font-hack-nerd-font
brew install --cask font-3270-nerd-font

# Install Cloud Connectors
brew install awscli

########################################
## install layer 1 terminal utilities ##
########################################
brew_install_font_stuff
brew install --cask iterm2
brew install exa
brew install neofetch
brew install asdf

########################################
# install databases
########################################
brew install postgresql
brew install sqlite
brew install mysql-client

###################
#### CLI Tools ####
###################

brew install ffmpeg
brew install imagemagick --with-webp
# Metadata anonymization toolkit
brew install mat
brew install opencv
brew install terminal-notifier
brew install libgcrypt
brew install libgpg-error
# Cross-platform application and UI framework
brew install qt
brew install unrar
brew install unzip
brew install x264
brew install xvid
brew install gcc
brew install glib
brew install lynx
brew install p7zip # 7z
brew install pigz  # gz
brew install pv # monitor pipe
brew install rename
brew install tree
brew install vbindiff
brew install ansible
brew install flow

brew install git
brew install git-lfs

#################
##### Apps ######
#################

brew install --cask osxfuse
brew install --cask xquartz
brew install --cask keepingyouawake
brew install --cask adoptopenjdk
brew install --cask dropbox
brew install --cask istat-menus
brew install --cask 1password
brew install --cask daisydisk
brew install --cask alfred
brew install --cask bartender
brew install --cask dash
brew install --cask little-snitch
brew install --cask micro-snitch
brew install --cask ipartition
brew install --cask fantastical
brew install --cask slack
brew install --cask zoom
brew install --cask google-chrome
# brew install --cask google-chrome-canary
brew install --cask firefox
brew install --cask wifi-explorer
brew install --cask hazel
brew install --cask textual
brew install --cask freecad
brew install --cask postman
brew install --cask appcleaner
brew install --cask geektool
brew install --cask atom
brew install --cask jetbrains-toolbox
brew install --cask gitkraken
brew install --cask kdiff3
brew install --cask kindle
brew install --cask spectacle
brew install --cask wireshark-chmodbpf
brew install --cask beamer
brew install --cask libreoffice
brew install --cask spotify
brew install --cask cakebrew
brew install --cask cardhop
brew install --cask grammarly
brew install --cask mactracker
brew install --cask teamviewer
brew install --cask charles
brew install --cask hex-fiend
brew install --cask meld
brew install --cask transmission
brew install --cask timely
brew install --cask gpg-suite
brew install --cask veracrypt
brew install --cask exodus
# brew install --cask wine-stable
brew install --cask battle-net
brew install --cask wineskin-winery
brew install --cask steam
brew install --cask firestormos
brew install --cask epic-games
brew install --cask unity
brew install --cask vlc

# Virtual SubSystem
brew install --cask virtualbox
brew install --cask docker

# Working space right here

brew install gnupg # Install GnuPG to enable PGP-signing commits.
brew install libassuan
brew install openssl
brew install ssh-copy-id
brew install openssh

#  CTF Tools
brew install aircrack-ng
brew install bfg
brew install binutils
brew install binwalk
brew install cifer
brew install dex2jar
brew install dns2tcp
brew install fcrackzip
brew install foremost
brew install hashpump
brew install hydra
brew install john
brew install knock
brew install netpbm
brew install nmap
brew install pngcheck
brew install socat
brew install sqlmap
brew install tcpflow
brew install tcpreplay
brew install tcptrace
brew install ucspi-tcp # `tcpserver` etc.
brew install xpdf
brew install xz
brew install shellcheck
brew install spim
brew install wget
brew install go
brew install ant
brew install eigen

# Finally do the MACOS defaults setup
source ./macos
