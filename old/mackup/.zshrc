DEFAULT_USER=$USER

# can change all these custom sources to conditionaly load them through zpromp.
# the goal would be to make it so we can source this file only into server
test -e "${HOME}/.exports" && source ~/.exports
test -e "${HOME}/.aliases" && source ~/.aliases
test -e "${HOME}/.upstart_env" && source ~/.upstart_env

### Added by Zinit's installer
### Check if zinit is installed or install if needed
if [[ ! -f $HOME/.zinit/bin/zinit.zsh ]]; then
    print -P "%F{33}▓▒░ %F{220}Installing %F{33}DHARMA%F{220} Initiative Plugin Manager (%F{33}zdharma/zinit%F{220})…%f"
    command mkdir -p "$HOME/.zinit" && command chmod g-rwX "$HOME/.zinit"
    command git clone https://github.com/zdharma/zinit "$HOME/.zinit/bin" && \
        print -P "%F{33}▓▒░ %F{34}Installation successful.%f%b" || \
        print -P "%F{160}▓▒░ The clone has failed.%f%b"
fi
source "$HOME/.zinit/bin/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi


# Add iterm shell intergrations if present
# TODO: fix this, the iff isn't working right
# if [[$TERM_PROGRAM=="iTerm.app"]]; then
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
# fi

# Load a few important annexes, NO TURBO
# (this is currently required for annexes)
zinit light-mode for \
    zinit-zsh/z-a-patch-dl \
    zinit-zsh/z-a-as-monitor \
    zinit-zsh/z-a-bin-gem-node \
    zinit-zsh/z-a-submods

zinit snippet OMZL::git.zsh
zinit ice atload"unalias grv"
zinit snippet OMZP::git


# Scripts that are built at install (there's single default make target, "install",
# and it constructs scripts by `cat'ing a few files). The make'' ice could also be:
# `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.
zinit ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zinit light tj/git-extras
source /Users/dj.daniels/.zinit/plugins/tj---git-extras/etc/git-extras-completion.zsh

# source $HOME/.zinit/bin/zinit.zsh
# autoload -Uz _zinit
# (( ${+_comps} )) && _comps[zinit]=_zinit

zinit lucid for \
 atinit"ZINIT[COMPINIT_OPTS]=-C; zicompinit; zicdreplay" \
    zdharma/fast-syntax-highlighting \
 blockf \
    zsh-users/zsh-completions \
 atload"!_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions
# must be after the above syntax/suggestion updating
zinit light zdharma/history-search-multi-word

zinit snippet OMZP::colored-man-pages

zinit ice as"completion"
zinit snippet OMZP::docker/_docker

# zinit ice nocompile'!' wait'!0' pick'enhancd.plugin.zsh' atinit"zicompinit; zicdreplay"
zinit ice pick'enhancd.plugin.zsh' atinit"zicompinit; zicdreplay"
zinit light b4b4r07/enhancd

# zinit snippet OMZP::enhancd # or this one? who knows?
zinit ice from"gh-r" as"program"
zinit light junegunn/fzf-bin
export FZF_DEFAULT_OPTS="--ansi --preview-window 'right:40%' --preview 'bat --color=always --style=header,grid --line-range :300 {}'"

# setup LS_COLORS
# https://zdharma.org/zinit/wiki/LS_COLORS-explanation/
# https://github.com/trapd00r/LS_COLORS
zinit ice atclone"dircolors -b LS_COLORS > clrs.zsh" \
    atpull'%atclone' pick"clrs.zsh" nocompile'!' \
    atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zinit light trapd00r/LS_COLORS

zinit ice depth=1
zinit light romkatv/powerlevel10k
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

zinit ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zinit light b4b4r07/httpstat

zinit ice as"command" from"gh-r" mv"fd* -> fd" pick"fd/fd"
zinit light sharkdp/fd

zinit ice as"command" from"gh-r" mv"bat* -> bat" pick"bat/bat"
zinit light sharkdp/bat

# / stopped working and installed via brew install exa
# zinit ice wait"2" lucid from"gh-r" as"program" mv"exa* -> exa" ver"v0.9.0"
# zinit light ogham/exa

source ~/.functions

#  NOTE EVERYTHIGN ABVOE THIS LINE SHOULD BE WORKING
#  WIth an attempt at some sort of ordering- to be finalized
#  when all of these are converted


# colortest

# zinit load HaleTom/89ffe32783f89f403bba96bd7bcd1263

# sharkdp/pastel
# zinit ice as"command" from"gh-r" mv"pastel* -> pastel" pick"pastel/pastel"
# zinit light sharkdp/pastel

# asciinema
# zinit ice as"command" wait lucid \
#     atinit"export PYTHONPATH=$ZPFX/lib/python3.7/site-packages/" \
#     atclone"PYTHONPATH=$ZPFX/lib/python3.7/site-packages/ \
#     python3 setup.py --quiet install --prefix $ZPFX" \
#     atpull'%atclone' test'0' \
#     pick"$ZPFX/bin/asciinema"
# zinit load asciinema/asciinema

zinit light tysonwolker/iterm-tab-colors
zinit light lukechilds/zsh-better-npm-completion
# source <(kubectl completion zsh)

# Terminal GIPHY creator cast terminal
# zinit load asciinema/asciinema.git

#  Virtual Env Related Shit
#  PYENV, RVM, NVM...

# export PYENV_ROOT="$HOME/.pyenv"
# export PATH="$PYENV_ROOT/bin:$PATH"
#
# zinit ice atclone'PYENV_ROOT="$PWD" ./libexec/pyenv init - > zpyenv.zsh' \
#     atinit'export PYENV_ROOT="$PWD"' atpull"%atclone" \
#     as'command' pick'bin/pyenv' src"zpyenv.zsh" nocompile'!'
# zinit light pyenv/pyenv
# i think this is getting added twice to path
# eval "$(pyenv init -)"

# export NVM_AUTO_USE=true
# export NVM_COMPLETION=true
# zinit ice pick"*.plugin.zsh"
# zinit light lukechilds/zsh-nvm

# zinit snippet OMZP::rvm

# zinit creinstall %HOME/my_completions

export PATH="/usr/local/sbin:$PATH"

# export PATH="$HOME/.cargo/bin:$PATH"
# export HOMEBREW_CASK_OPTS="--appdir=/Applications"
export PATH="/usr/local/opt/postgresql@9.6/bin:$PATH"

ulimit -n 21504
ulimit -c 2000
ulimit -s 10000

# trying  to install these unconfirmed
# export PIPENV_VENV_IN_PROJECT=1
zinit snippet OMZP::git
zinit snippet OMZP::brew
# zinit snippet OMZP::docker
zinit snippet OMZP::docker-machine
zinit snippet OMZP::kubectl

# autoload -Uz add-zsh-hook

change-prompt-title() {
  echo -ne "\e]1;${PWD##*/}\a"
}

add-zsh-hook chpwd change-prompt-title

zstyle ':completion:*' menu select=1
# zplug "lib/clipboard", from:oh-my-zsh, if:"[[ $OSTYPE == *darwin* ]]"

# zplug "iam4x/zsh-iterm-touchbar"

# zinit light "kiurchv/asdf.plugin.zsh"
# . /usr/local/opt/asdf/asdf.sh
# . /usr/local/opt/asdf/etc/bash_completion.d/asdf.bash

# if type brew &>/dev/null; then
#   FPATH=$(brew --prefix)/share/zsh/site-functions:$FPATH
# fi

# The following lines were added by compinstall
zstyle :compinstall filename '~/.zshrc'
autoload -Uz compinit
compinit
# # End of lines added by compinstall
# # Lines configured by zsh-newuser-install
# HISTFILE=~/.histfile
# HISTSIZE=5000
# SAVEHIST=5000
setopt appendhistory autocd extendedglob notify
# bindkey -v
# End of lines configured by zsh-newuser-install

setopt promptsubst
# eval "$(direnv hook zsh)"

[[ -e ~/.umt/umt-profile ]] && emulate sh -c 'source $HOME/.umt/umt-profile'
neofetch
