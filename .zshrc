DEFAULT_USER=$USER
# can change all these custom sources to conditionaly load them through zpromp.
# the goal would be to make it so we can source this file only into server
test -e "${HOME}/.exports" && source ~/.exports
test -e "${HOME}/.aliases" && source ~/.aliases
test -e "${HOME}/.upstart_env" && source ~/.upstart_env

export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=`which chromium`

### Added by Zinit's installer
### Check if zinit is installed or install if needed
if [[ ! -f $HOME/.local/share/zinit/zinit.git/zinit.zsh ]]; then
    print -P "%F{33} %F{220}Installing %F{33}ZDHARMA-CONTINUUM%F{220} Initiative Plugin Manager (%F{33}zdharma-continuum/zinit%F{220})…%f"
    command mkdir -p "$HOME/.local/share/zinit" && command chmod g-rwX "$HOME/.local/share/zinit"
    command git clone https://github.com/zdharma-continuum/zinit "$HOME/.local/share/zinit/zinit.git" && \
        print -P "%F{33} %F{34}Installation successful.%f%b" || \
        print -P "%F{160} The clone has failed.%f%b"
fi

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

source "$HOME/.local/share/zinit/zinit.git/zinit.zsh"

. /opt/homebrew/opt/asdf/libexec/asdf.sh

autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# Load a few important annexes, without Turbo
# (this is currently required for annexes)
zinit light-mode for \
    zdharma-continuum/zinit-annex-as-monitor \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust

# TODO: Needs Python2
# zinit light tysonwolker/iterm-tab-colors

# Add iterm shell intergrations if present
# TODO: fix this, the iff isn't working right
# if [[$TERM_PROGRAM=="iTerm.app"]]; then
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
# fi

# Load a few important annexes, NO TURBO
# (this is currently required for annexes)
zinit light-mode for \
    zdharma-continuum/z-a-patch-dl \
    zdharma-continuum/z-a-as-monitor \
    zdharma-continuum/z-a-bin-gem-node \
    zdharma-continuum/z-a-submods

zinit snippet OMZL::git.zsh
zinit ice atload"unalias grv"
zinit snippet OMZP::git


# TODO: not working, find correct install for this
# Scripts that are built at install (there's single default make target, "install",
# and it constructs scripts by `cat'ing a few files). The make'' ice could also be:
# `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.
# zinit ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
# zinit light tj/git-extras
# source /Users/djdaniels/.zinit/plugins/tj---git-extras/etc/git-extras-completion.zsh
#
zinit lucid for \
 atinit"ZINIT[COMPINIT_OPTS]=-C; zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
 blockf \
    zsh-users/zsh-completions \
 atload"!_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions

# must be after the above syntax/suggestion updating
zinit light zdharma-continuum/history-search-multi-word

zinit snippet OMZP::colored-man-pages
zinit ice as"completion"
zinit snippet OMZP::docker/_docker

zinit ice nocompile'!' wait'!0' pick'enhancd.plugin.zsh' atinit"zicompinit; zicdreplay"
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

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
zinit light romkatv/powerlevel10k
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

zinit ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zinit light b4b4r07/httpstat
#
zinit ice as"command" from"gh-r" mv"fd* -> fd" pick"fd/fd"
zinit light sharkdp/fd
#
zinit ice as"command" from"gh-r" mv"bat* -> bat" pick"bat/bat"
zinit light sharkdp/bat

# / stopped working and installed via brew install exa
# zinit ice wait"2" lucid from"gh-r" as"program" mv"exa* -> exa" ver"v0.9.0"
# zinit light ogham/exa
#
#
# # colortest
#
# sharkdp/pastel
zinit ice as"command" from"gh-r" mv"pastel* -> pastel" pick"pastel/pastel"
zinit light sharkdp/pastel
#
# # asciinema
# # zinit ice as"command" wait lucid \
# #     atinit"export PYTHONPATH=$ZPFX/lib/python3.7/site-packages/" \
# #     atclone"PYTHONPATH=$ZPFX/lib/python3.7/site-packages/ \
# #     python3 setup.py --quiet install --prefix $ZPFX" \
# #     atpull'%atclone' test'0' \
# #     pick"$ZPFX/bin/asciinema"
# # zinit load asciinema/asciinema
#
zinit light lukechilds/zsh-better-npm-completion
source <(kubectl completion zsh)
#
# # Terminal GIPHY creator cast terminal
# zinit load asciinema/asciinema.git

export PATH="/usr/local/sbin:$PATH"
#
ulimit -n 21504
ulimit -c 2000
ulimit -s 10000
# trying  to install these unconfirmed
zinit snippet OMZP::git
zinit snippet OMZP::brew
zinit snippet OMZP::docker
zinit snippet OMZP::docker-machine
# zinit snippet OMZP::kubectl
change-prompt-title() {
  echo -ne "\e]1;${PWD##*/}\a"
}
add-zsh-hook chpwd change-prompt-title
zstyle ':completion:*' menu select=1
# The following lines were added by compinstall
zstyle :compinstall filename '~/.zshrc'

autoload -Uz compinit
compinit
setopt appendhistory autocd extendedglob notify
setopt promptsubst

neofetch
eval "$(direnv hook zsh)"