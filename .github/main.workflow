workflow "Shallow check" {
  on = "push"
  resolves = ["Check code style"]
}

action "Check code style" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npx"
  args = "eslint . "
}

workflow "Test" {
  on = "pull_request"
  resolves = ["Test with coverage"]
}

action "Setup" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Test with coverage" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Setup"]
  args = "run coverage"
}
