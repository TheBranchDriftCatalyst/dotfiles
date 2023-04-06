[ -n "$PS1" ] && source ~/.bash_profile;
source ~/.aliases

[[ -e ~/.umt/umt-profile ]] && source ~/.umt/umt-profile
source "${XDG_CONFIG_HOME:-$HOME/.config}/asdf-direnv/bashrc"
