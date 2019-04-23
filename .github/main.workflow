workflow "New workflow" {
  on = "push"
  resolves = ["Check code style"]
}

action "Check code style" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npx eslint ."
}

workflow "Test" {
  on = "pull_request"
  resolves = ["Setup"]
}

action "Setup" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
}
