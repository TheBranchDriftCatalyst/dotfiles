#!/usr/bin/env bash

install_brew() {
	which -s brew
	if [[ $? != 0 ]] ; then
	    # Install Homebrew
	    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	fi
	# brew tap bramstein/webfonttools
	# brew tap homebrew/cask-fonts
	brew tap homebrew/cask-versions
	# Make sure we’re using the latest Homebrew.
	brew update
	brew upgrade
	# Remove outdated versions from the cellar.
	brew cleanup
}


install_zsh() {
	# TODO: check if zsh is installed or not already
	sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"

	if ! fgrep -q '/usr/local/bin/zsh' /etc/shells; then
		echo '/usr/local/bin/zsh' | sudo tee -a /etc/shells;
	fi;
}
