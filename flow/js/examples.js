// examples.js — bundled example workflows for the playground.
// Each example is a pair of canon files: a DOT graph and a timeline script.

export const EXAMPLES = [
  {
    id: 'hello-shapes',
    label: 'Hello, shapes (DSL tour)',
    dot: `digraph hello {
  rankdir=LR

  // Nodes with no icon attribute get one automatically:
  // keyword match on the label first, then a stable shape.
  a [label="Idea"        icon=star]
  b [label="Draft"       icon=triangle]
  c [label="Review"      icon=hexagon]
  d [label="Approved"    icon=check]
  e [label="Archive"     icon=square]

  a -> b [label="write"]
  b -> c [label="submit"]
  c -> b [label="feedback"]
  c -> d [label="approve"]
  d -> e
}`,
    timeline: `timeline "Anatomy of a review loop"

show a                : Every workflow starts somewhere — an idea.
a ->> b               : Turn it into a draft.
b ->> c               : Submit the draft for review.
highlight c           : Review is where quality happens.  @2s
c ->> b               : Feedback loops the draft back for edits…
b ->> c               : …and an improved draft comes back.
unhighlight c
c ->> d               : Approval!
show d -> e, dim a, dim b : Approved work gets archived; the journey fades.
show all              : The full picture — a loop, not a line.  @2.5s`,
  },

  {
    id: 'github-pr',
    label: 'GitHub: pull request flow',
    dot: `digraph pull_request {
  rankdir=LR

  origin   [label="GitHub\\norigin"      icon=cloud]
  local    [label="Your clone"           icon=laptop]
  feature  [label="feature branch"       icon=branch]
  pr       [label="Pull request"         icon=doc]
  ci       [label="CI checks"            icon=gear]
  reviewer [label="Reviewer"             icon=person]
  main     [label="main"                 icon=check]

  origin   -> local    [label="git clone"]
  local    -> feature  [label="git switch -c"]
  feature  -> pr       [label="git push + open PR"]
  pr       -> ci       [label="triggers"]
  pr       -> reviewer [label="requests review"]
  ci       -> main     [label="checks pass"]
  reviewer -> main     [label="approve"]
}`,
    timeline: `timeline "How a pull request works"

show origin             : The shared repository lives on GitHub — the origin.
origin ->> local        : git clone copies the whole history to your machine.  @2s
local ->> feature       : You branch off — a safe copy to work on.
highlight feature       : Commit, commit, commit. main is untouched.  @2.2s
unhighlight feature
feature ->> pr          : Push the branch and open a pull request.  @2s
highlight pr            : The PR is the conversation — diff, comments, history.  @2s
pr ->> ci, pr ->> reviewer : It summons the robots and the humans at once.  @2s
highlight ci            : CI builds and tests every commit automatically.
unhighlight ci, unhighlight pr
highlight reviewer      : A colleague reads the diff and leaves comments.  @2.2s
unhighlight reviewer
ci ->> main, reviewer ->> main : Green checks + an approval — merge!  @2.2s
highlight main          : main moves forward. The branch's job is done.  @2s
dim local, dim feature, unhighlight main
show all                : Every change takes this same auditable path.  @2.5s`,
  },

  {
    id: 'azure-deploy',
    label: 'Cloud: deploy pipeline',
    dot: `digraph deploy {
  rankdir=LR

  repo     [label="Repository"        icon=doc]
  action   [label="GitHub Action"     icon=gear]
  tests    [label="Tests"             icon=check]
  image    [label="Container image"   icon=box]
  registry [label="Registry"          icon=database]
  app      [label="App Service"       icon=globe]
  users    [label="Users"             icon=person]

  repo     -> action   [label="push to main"]
  action   -> tests    [label="run"]
  tests    -> image    [label="build"]
  image    -> registry [label="publish"]
  registry -> app      [label="deploy"]
  app      -> users    [label="serve"]
}`,
    timeline: `timeline "From push to production"

show repo               : It starts with a commit landing on main.
repo ->> action         : The push triggers a workflow.
highlight action        : The runner checks out the code.
unhighlight action
action ->> tests        : First gate — the test suite.
highlight tests         : Nothing ships unless this is green.  @2s
unhighlight tests
tests ->> image         : A container image is built from the tested commit.
image ->> registry      : The image is pushed to the registry, tagged and immutable.  @2s
registry ->> app        : The app service pulls the new image and swaps it in.  @2.2s
highlight app           : Zero-downtime: the old version drains, the new one serves.  @2s
app ->> users           : And users get the new build without noticing a thing.
unhighlight app
show all                : One push, one auditable path to production.  @2.5s`,
  },
];
