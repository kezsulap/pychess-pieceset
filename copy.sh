sed "s/<current_commit_hash>/$(git rev-parse HEAD)/" user-script.js | xclip -selection clipboard
