(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# Bubbles

<p>
  <img src="https://stuff.charm.sh/bubbles/bubbles-github.png" width="233" alt="The Bubbles Logo">
</p>

[![Latest Release](https://img.shields.io/github/release/charmbracelet/bubbles.svg)](https://github.com/charmbracelet/bubbles/releases)
[![GoDoc](https://godoc.org/github.com/golang/gddo?status.svg)](https://pkg.go.dev/github.com/charmbracelet/bubbles)
[![Build Status](https://github.com/charmbracelet/bubbles/workflows/build/badge.svg)](https://github.com/charmbracelet/bubbles/actions)
[![Go ReportCard](https://goreportcard.com/badge/charmbracelet/bubbles)](https://goreportcard.com/report/charmbracelet/bubbles)

Some components for [Bubble Tea](https://github.com/charmbracelet/bubbletea)
applications. These components are used in production in [Glow][glow], and [many other applications][otherstuff].

[glow]: https://github.com/charmbracelet/glow
[otherstuff]: https://github.com/charmbracelet/bubbletea/#bubble-tea-in-the-wild

## Spinner

<img src="https://stuff.charm.sh/bubbles-examples/spinner.gif" width="400" alt="Spinner Example">

A spinner, useful for indicating that some kind an operation is happening.
There are a couple default ones, but you can also pass your own ”frames.”

- [Example code, basic spinner](https://github.com/charmbracelet/bubbletea/blob/main/examples/spinner/main.go)
- [Example code, various spinners](https://github.com/charmbracelet/bubbletea/blob/main/examples/spinners/main.go)

## Text Input

<img src="https://stuff.charm.sh/bubbles-examples/textinput.gif" width="400" alt="Text Input Example">

A text input field, akin to an `<input type="text">` in HTML. Supports unicode,
pasting, in-place scrolling when the value exceeds the width of the element and
the common, and many customization options.

- [Example code, one field](https://github.com/charmbracelet/bubbletea/blob/main/examples/textinput/main.go)
- [Example code, many fields](https://github.com/charmbracelet/bubbletea/blob/main/examples/textinputs/main.go)

## Text Area

<img src="https://stuff.charm.sh/bubbles-examples/textarea.gif" width="400" alt="Text Area Example">

A text area field, akin to an `<textarea />` in HTML. Allows for input that
spans multiple lines. Supports unicode, pasting, vertical scrolling when the
value exceeds the width and height of the element, and many customization
options.

- [Example code, chat input](https://github.com/charmbracelet/bubbletea/blob/main/examples/chat/main.go)
- [Example code, story time input](https://github.com/charmbracelet/bubbletea/blob/main/examples/textarea/main.go)

## Table

<img src="https://stuff.charm.sh/bubbles-examples/table.gif" width="400" alt="Table Example">

A component for displaying and navigating tabular data (columns and rows).
Supports vertical scrolling and many customization options.

- [Example code, countries and populations](https://github.com/charmbracelet/bubbletea/blob/main/examples/table/main.go)

## Progress

<img src="https://stuff.charm.sh/bubbles-examples/progress.gif" width="800" alt="Progressbar Example">

A simple, customizable progress meter, with optional animation via
[Harmonica][harmonica]. Supports solid and gradient fills. The empty and filled
runes can be set to whatever you'd like. The percentage readout is customizable
and can also be omitted entirely.

- [Animated example](https://github.com/charmbracelet/bubbletea/blob/main/examples/progress-animated/main.go)
- [Static example](https://github.com/charmbracelet/bubbletea/blob/main/examples/progress-static/main.go)

[harmonica]: https://github.com/charmbracelet/harmonica

## Paginator

<img src="https://stuff.charm.sh/bubbles-examples/pagination.gif" width="200" alt="Paginator Example">

A component for handling pagination logic and optionally drawing pagination UI.
Supports "dot-style" pagination (similar to what you might see on iOS) and
numeric page numbering, but you could also just use this component for the
logic and visualize pagination however you like.

- [Example code](https://github.com/charmbracelet/bubbletea/blob/main/examples/paginator/main.go)

## Viewport

<img src="https://stuff.charm.sh/bubbles-examples/viewport.gif" width="600" alt="Viewport Example">

A viewport for vertically scrolling content. Optionally includes standard
pager keybindings and mouse wheel support. A high performance mode is available
for applications which make use of the alternate screen buffer.

- [Example code](https://github.com/charmbracelet/bubbletea/blob/main/examples/pager/main.go)

This component is well complemented with [Reflow][reflow] for ANSI-aware
indenting and text wrapping.

[reflow]: https://github.com/muesli/reflow

## List

<img src="https://stuff.charm.sh/bubbles-examples/list.gif" width="600" alt="List Example">

A customizable, batteries-included component for browsing a set of items.
Features pagination, fuzzy filtering, auto-generated help, an activity spinner,
and status messages, all of which can be enabled and disabled as needed.
Extrapolated from [Glow][glow].

- [Example code, default list](https://github.com/charmbracelet/bubbletea/blob/main/examples/list-default/main.go)
- [Example code, simple list](https://github.com/charmbracelet/bubbletea/blob/main/examples/list-simple/main.go)
- [Example code, all features](https://github.com/charmbracelet/bubbletea/blob/main/examples/list-fancy/main.go)

## File Picker

<img src="https://vhs.charm.sh/vhs-yET2HNiJNEbyqaVfYuLnY.gif" width="600" alt="File picker example">

A customizable component for picking a file from the file system. Navigate
through directories and select files, optionally limit to certain file
extensions.

- [Example code](https://github.com/charmbracelet/bubbletea/blob/main/examples/file-picker/main.go)

## Timer

A simple, flexible component for counting down. The update frequency and output
can be customized as you like.

<img src="https://stuff.charm.sh/bubbles-examples/timer.gif" width="400" alt="Timer example">

- [Example code](https://github.com/charmbracelet/bubbletea/blob/main/examples/timer/main.go)

## Stopwatch

<img src="https://stuff.charm.sh/bubbles-examples/stopwatch.gif" width="400" alt="Stopwatch example">

A simple, flexible component for counting up. The update frequency and output
can be customized as you see fit.

- [Example code](https://github.com/charmbracelet/bubbletea/blob/main/examples/stopwatch/main.go)

## Help

<img src="https://stuff.charm.sh/bubbles-examples/help.gif" width="500" alt="Help Example">

A customizable horizontal mini help view that automatically generates itself
from your keybindings. It features single and multi-line modes, which the user
can optionally toggle between. It will truncate gracefully if the terminal is
too wide for the content.

- [Example code](https://github.com/charmbracelet/bubbletea/blob/main/examples/help/main.go)

## Key

A non-visual component for managing keybindings. It’s useful for allowing users
to remap keybindings as well as generating help views corresponding to your
keybindings.

```go
type KeyMap struct {
    Up key.Binding
    Down key.Binding
}

var DefaultKeyMap = KeyMap{
    Up: key.NewBinding(
        key.WithKeys("k", "up"),        // actual keybindings
        key.WithHelp("↑/k", "move up"), // corresponding help text
    ),
    Down: key.NewBinding(
        key.WithKeys("j", "down"),
        key.WithHelp("↓/j", "move down"),
    ),
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.KeyMsg:
        switch {
        case key.Matches(msg, DefaultKeyMap.Up):
            // The user pressed up
        case key.Matches(msg, DefaultKeyMap.Down):
            // The user pressed down
        }
    }
    return m, nil
}
```

## There’s more where that came from

To check out community-maintained Bubbles see [Charm &
Friends](https://github.com/charm-and-friends/additional-bubbles). Made a cool Bubble
that you want to share?
[PRs](https://github.com/charm-and-friends/additional-bubbles?tab=readme-ov-file#what-is-a-complete-project)
are welcome!

## Contributing

See [contributing][contribute].

[contribute]: https://github.com/charmbracelet/bubbles/contribute

## Feedback

We’d love to hear your thoughts on this project. Feel free to drop us a note!

- [Twitter](https://twitter.com/charmcli)
- [The Fediverse](https://mastodon.social/@charmcli)
- [Discord](https://charm.sh/chat)

## License

[MIT](https://github.com/charmbracelet/bubbletea/raw/main/LICENSE)

---

Part of [Charm](https://charm.sh).

<a href="https://charm.sh/"><img alt="The Charm logo" src="https://stuff.charm.sh/charm-badge.jpg" width="400"></a>

Charm热爱开源 • Charm loves open source



================================================
FILE: bubbles.go
================================================
// Package bubbles provides some components for Bubble Tea applications. These
// components are used in production in Glow, Charm and many other
// applications.
package bubbles



================================================
FILE: go.mod
================================================
module github.com/charmbracelet/bubbles

go 1.23.0

toolchain go1.23.7

require (
	github.com/MakeNowJust/heredoc v1.0.0
	github.com/atotto/clipboard v0.1.4
	github.com/aymanbagabas/go-udiff v0.3.1
	github.com/charmbracelet/bubbletea v1.3.6
	github.com/charmbracelet/harmonica v0.2.0
	github.com/charmbracelet/lipgloss v1.1.0
	github.com/charmbracelet/x/ansi v0.9.3
	github.com/charmbracelet/x/exp/golden v0.0.0-20241011142426-46044092ad91
	github.com/dustin/go-humanize v1.0.1
	github.com/lucasb-eyer/go-colorful v1.2.0
	github.com/mattn/go-runewidth v0.0.16
	github.com/muesli/termenv v0.16.0
	github.com/rivo/uniseg v0.4.7
	github.com/sahilm/fuzzy v0.1.1
)

require (
	github.com/aymanbagabas/go-osc52/v2 v2.0.1 // indirect
	github.com/charmbracelet/colorprofile v0.2.3-0.20250311203215-f60798e515dc // indirect
	github.com/charmbracelet/x/cellbuf v0.0.13-0.20250311204145-2c3ea96c31dd // indirect
	github.com/charmbracelet/x/term v0.2.1 // indirect
	github.com/erikgeiser/coninput v0.0.0-20211004153227-1c3628e74d0f // indirect
	github.com/kylelemons/godebug v1.1.0 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/mattn/go-localereader v0.0.1 // indirect
	github.com/muesli/ansi v0.0.0-20230316100256-276c6243b2f6 // indirect
	github.com/muesli/cancelreader v0.2.2 // indirect
	github.com/xo/terminfo v0.0.0-20220910002029-abceb7e1c41e // indirect
	golang.org/x/sync v0.15.0 // indirect
	golang.org/x/sys v0.33.0 // indirect
	golang.org/x/text v0.3.8 // indirect
)



================================================
FILE: go.sum
================================================
github.com/MakeNowJust/heredoc v1.0.0 h1:cXCdzVdstXyiTqTvfqk9SDHpKNjxuom+DOlyEeQ4pzQ=
github.com/MakeNowJust/heredoc v1.0.0/go.mod h1:mG5amYoWBHf8vpLOuehzbGGw0EHxpZZ6lCpQ4fNJ8LE=
github.com/atotto/clipboard v0.1.4 h1:EH0zSVneZPSuFR11BlR9YppQTVDbh5+16AmcJi4g1z4=
github.com/atotto/clipboard v0.1.4/go.mod h1:ZY9tmq7sm5xIbd9bOK4onWV4S6X0u6GY7Vn0Yu86PYI=
github.com/aymanbagabas/go-osc52/v2 v2.0.1 h1:HwpRHbFMcZLEVr42D4p7XBqjyuxQH5SMiErDT4WkJ2k=
github.com/aymanbagabas/go-osc52/v2 v2.0.1/go.mod h1:uYgXzlJ7ZpABp8OJ+exZzJJhRNQ2ASbcXHWsFqH8hp8=
github.com/aymanbagabas/go-udiff v0.3.1 h1:LV+qyBQ2pqe0u42ZsUEtPiCaUoqgA9gYRDs3vj1nolY=
github.com/aymanbagabas/go-udiff v0.3.1/go.mod h1:G0fsKmG+P6ylD0r6N/KgQD/nWzgfnl8ZBcNLgcbrw8E=
github.com/charmbracelet/bubbletea v1.3.6 h1:VkHIxPJQeDt0aFJIsVxw8BQdh/F/L2KKZGsK6et5taU=
github.com/charmbracelet/bubbletea v1.3.6/go.mod h1:oQD9VCRQFF8KplacJLo28/jofOI2ToOfGYeFgBBxHOc=
github.com/charmbracelet/colorprofile v0.2.3-0.20250311203215-f60798e515dc h1:4pZI35227imm7yK2bGPcfpFEmuY1gc2YSTShr4iJBfs=
github.com/charmbracelet/colorprofile v0.2.3-0.20250311203215-f60798e515dc/go.mod h1:X4/0JoqgTIPSFcRA/P6INZzIuyqdFY5rm8tb41s9okk=
github.com/charmbracelet/harmonica v0.2.0 h1:8NxJWRWg/bzKqqEaaeFNipOu77YR5t8aSwG4pgaUBiQ=
github.com/charmbracelet/harmonica v0.2.0/go.mod h1:KSri/1RMQOZLbw7AHqgcBycp8pgJnQMYYT8QZRqZ1Ao=
github.com/charmbracelet/lipgloss v1.1.0 h1:vYXsiLHVkK7fp74RkV7b2kq9+zDLoEU4MZoFqR/noCY=
github.com/charmbracelet/lipgloss v1.1.0/go.mod h1:/6Q8FR2o+kj8rz4Dq0zQc3vYf7X+B0binUUBwA0aL30=
github.com/charmbracelet/x/ansi v0.9.3 h1:BXt5DHS/MKF+LjuK4huWrC6NCvHtexww7dMayh6GXd0=
github.com/charmbracelet/x/ansi v0.9.3/go.mod h1:3RQDQ6lDnROptfpWuUVIUG64bD2g2BgntdxH0Ya5TeE=
github.com/charmbracelet/x/cellbuf v0.0.13-0.20250311204145-2c3ea96c31dd h1:vy0GVL4jeHEwG5YOXDmi86oYw2yuYUGqz6a8sLwg0X8=
github.com/charmbracelet/x/cellbuf v0.0.13-0.20250311204145-2c3ea96c31dd/go.mod h1:xe0nKWGd3eJgtqZRaN9RjMtK7xUYchjzPr7q6kcvCCs=
github.com/charmbracelet/x/exp/golden v0.0.0-20241011142426-46044092ad91 h1:payRxjMjKgx2PaCWLZ4p3ro9y97+TVLZNaRZgJwSVDQ=
github.com/charmbracelet/x/exp/golden v0.0.0-20241011142426-46044092ad91/go.mod h1:wDlXFlCrmJ8J+swcL/MnGUuYnqgQdW9rhSD61oNMb6U=
github.com/charmbracelet/x/term v0.2.1 h1:AQeHeLZ1OqSXhrAWpYUtZyX1T3zVxfpZuEQMIQaGIAQ=
github.com/charmbracelet/x/term v0.2.1/go.mod h1:oQ4enTYFV7QN4m0i9mzHrViD7TQKvNEEkHUMCmsxdUg=
github.com/dustin/go-humanize v1.0.1 h1:GzkhY7T5VNhEkwH0PVJgjz+fX1rhBrR7pRT3mDkpeCY=
github.com/dustin/go-humanize v1.0.1/go.mod h1:Mu1zIs6XwVuF/gI1OepvI0qD18qycQx+mFykh5fBlto=
github.com/erikgeiser/coninput v0.0.0-20211004153227-1c3628e74d0f h1:Y/CXytFA4m6baUTXGLOoWe4PQhGxaX0KpnayAqC48p4=
github.com/erikgeiser/coninput v0.0.0-20211004153227-1c3628e74d0f/go.mod h1:vw97MGsxSvLiUE2X8qFplwetxpGLQrlU1Q9AUEIzCaM=
github.com/kylelemons/godebug v1.1.0 h1:RPNrshWIDI6G2gRW9EHilWtl7Z6Sb1BR0xunSBf0SNc=
github.com/kylelemons/godebug v1.1.0/go.mod h1:9/0rRGxNHcop5bhtWyNeEfOS8JIWk580+fNqagV/RAw=
github.com/lucasb-eyer/go-colorful v1.2.0 h1:1nnpGOrhyZZuNyfu1QjKiUICQ74+3FNCN69Aj6K7nkY=
github.com/lucasb-eyer/go-colorful v1.2.0/go.mod h1:R4dSotOR9KMtayYi1e77YzuveK+i7ruzyGqttikkLy0=
github.com/mattn/go-isatty v0.0.20 h1:xfD0iDuEKnDkl03q4limB+vH+GxLEtL/jb4xVJSWWEY=
github.com/mattn/go-isatty v0.0.20/go.mod h1:W+V8PltTTMOvKvAeJH7IuucS94S2C6jfK/D7dTCTo3Y=
github.com/mattn/go-localereader v0.0.1 h1:ygSAOl7ZXTx4RdPYinUpg6W99U8jWvWi9Ye2JC/oIi4=
github.com/mattn/go-localereader v0.0.1/go.mod h1:8fBrzywKY7BI3czFoHkuzRoWE9C+EiG4R1k4Cjx5p88=
github.com/mattn/go-runewidth v0.0.16 h1:E5ScNMtiwvlvB5paMFdw9p4kSQzbXFikJ5SQO6TULQc=
github.com/mattn/go-runewidth v0.0.16/go.mod h1:Jdepj2loyihRzMpdS35Xk/zdY8IAYHsh153qUoGf23w=
github.com/muesli/ansi v0.0.0-20230316100256-276c6243b2f6 h1:ZK8zHtRHOkbHy6Mmr5D264iyp3TiX5OmNcI5cIARiQI=
github.com/muesli/ansi v0.0.0-20230316100256-276c6243b2f6/go.mod h1:CJlz5H+gyd6CUWT45Oy4q24RdLyn7Md9Vj2/ldJBSIo=
github.com/muesli/cancelreader v0.2.2 h1:3I4Kt4BQjOR54NavqnDogx/MIoWBFa0StPA8ELUXHmA=
github.com/muesli/cancelreader v0.2.2/go.mod h1:3XuTXfFS2VjM+HTLZY9Ak0l6eUKfijIfMUZ4EgX0QYo=
github.com/muesli/termenv v0.16.0 h1:S5AlUN9dENB57rsbnkPyfdGuWIlkmzJjbFf0Tf5FWUc=
github.com/muesli/termenv v0.16.0/go.mod h1:ZRfOIKPFDYQoDFF4Olj7/QJbW60Ol/kL1pU3VfY/Cnk=
github.com/rivo/uniseg v0.2.0/go.mod h1:J6wj4VEh+S6ZtnVlnTBMWIodfgj8LQOQFoIToxlJtxc=
github.com/rivo/uniseg v0.4.7 h1:WUdvkW8uEhrYfLC4ZzdpI2ztxP1I582+49Oc5Mq64VQ=
github.com/rivo/uniseg v0.4.7/go.mod h1:FN3SvrM+Zdj16jyLfmOkMNblXMcoc8DfTHruCPUcx88=
github.com/sahilm/fuzzy v0.1.1 h1:ceu5RHF8DGgoi+/dR5PsECjCDH1BE3Fnmpo7aVXOdRA=
github.com/sahilm/fuzzy v0.1.1/go.mod h1:VFvziUEIMCrT6A6tw2RFIXPXXmzXbOsSHF0DOI8ZK9Y=
github.com/xo/terminfo v0.0.0-20220910002029-abceb7e1c41e h1:JVG44RsyaB9T2KIHavMF/ppJZNG9ZpyihvCd0w101no=
github.com/xo/terminfo v0.0.0-20220910002029-abceb7e1c41e/go.mod h1:RbqR21r5mrJuqunuUZ/Dhy/avygyECGrLceyNeo4LiM=
golang.org/x/exp v0.0.0-20220909182711-5c715a9e8561 h1:MDc5xs78ZrZr3HMQugiXOAkSZtfTpbJLDr/lwfgO53E=
golang.org/x/exp v0.0.0-20220909182711-5c715a9e8561/go.mod h1:cyybsKvd6eL0RnXn6p/Grxp8F5bW7iYuBgsNCOHpMYE=
golang.org/x/sync v0.15.0 h1:KWH3jNZsfyT6xfAfKiz6MRNmd46ByHDYaZ7KSkCtdW8=
golang.org/x/sync v0.15.0/go.mod h1:1dzgHSNfp02xaA81J2MS99Qcpr2w7fw1gpm99rleRqA=
golang.org/x/sys v0.0.0-20210809222454-d867a43fc93e/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.6.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.33.0 h1:q3i8TbbEz+JRD9ywIRlyRAQbM0qF7hu24q3teo2hbuw=
golang.org/x/sys v0.33.0/go.mod h1:BJP2sWEmIv4KK5OTEluFJCKSidICx8ciO85XgH3Ak8k=
golang.org/x/text v0.3.8 h1:nAL+RVCQ9uMn3vJZbV+MRnydTJFPf8qqY42YiA6MrqY=
golang.org/x/text v0.3.8/go.mod h1:E6s5w1FMmriuDzIBO73fBruAKo1PCIq6d2Q6DHfQ8WQ=



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2020-2023 Charmbracelet, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: Taskfile.yaml
================================================
# https://taskfile.dev

version: '3'

tasks:
  lint:
    desc: Run lint
    cmds:
      - golangci-lint run

  test:
    desc: Run tests
    cmds:
      - go test ./... {{.CLI_ARGS}}



================================================
FILE: .golangci.yml
================================================
version: "2"
run:
  tests: false
linters:
  enable:
    - bodyclose
    - exhaustive
    - goconst
    - godot
    - godox
    - gomoddirectives
    - goprintffuncname
    - gosec
    - misspell
    - nakedret
    - nestif
    - nilerr
    - noctx
    - nolintlint
    - prealloc
    - revive
    - rowserrcheck
    - sqlclosecheck
    - tparallel
    - unconvert
    - unparam
    - whitespace
    - wrapcheck
  exclusions:
    generated: lax
    presets:
      - common-false-positives
issues:
  max-issues-per-linter: 0
  max-same-issues: 0
formatters:
  enable:
    - gofumpt
    - goimports
  exclusions:
    generated: lax



================================================
FILE: .goreleaser.yml
================================================
# yaml-language-server: $schema=https://goreleaser.com/static/schema-pro.json
version: 2
includes:
  - from_url:
      url: charmbracelet/meta/main/goreleaser-lib.yaml



================================================
FILE: cursor/cursor.go
================================================
// Package cursor provides cursor functionality for Bubble Tea applications.
package cursor

import (
	"context"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

const defaultBlinkSpeed = time.Millisecond * 530

// initialBlinkMsg initializes cursor blinking.
type initialBlinkMsg struct{}

// BlinkMsg signals that the cursor should blink. It contains metadata that
// allows us to tell if the blink message is the one we're expecting.
type BlinkMsg struct {
	id  int
	tag int
}

// blinkCanceled is sent when a blink operation is canceled.
type blinkCanceled struct{}

// blinkCtx manages cursor blinking.
type blinkCtx struct {
	ctx    context.Context
	cancel context.CancelFunc
}

// Mode describes the behavior of the cursor.
type Mode int

// Available cursor modes.
const (
	CursorBlink Mode = iota
	CursorStatic
	CursorHide
)

// String returns the cursor mode in a human-readable format. This method is
// provisional and for informational purposes only.
func (c Mode) String() string {
	return [...]string{
		"blink",
		"static",
		"hidden",
	}[c]
}

// Model is the Bubble Tea model for this cursor element.
type Model struct {
	BlinkSpeed time.Duration
	// Style for styling the cursor block.
	Style lipgloss.Style
	// TextStyle is the style used for the cursor when it is hidden (when blinking).
	// I.e. displaying normal text.
	TextStyle lipgloss.Style

	// char is the character under the cursor
	char string
	// The ID of this Model as it relates to other cursors
	id int
	// focus indicates whether the containing input is focused
	focus bool
	// Cursor Blink state.
	Blink bool
	// Used to manage cursor blink
	blinkCtx *blinkCtx
	// The ID of the blink message we're expecting to receive.
	blinkTag int
	// mode determines the behavior of the cursor
	mode Mode
}

// New creates a new model with default settings.
func New() Model {
	return Model{
		BlinkSpeed: defaultBlinkSpeed,

		Blink: true,
		mode:  CursorBlink,

		blinkCtx: &blinkCtx{
			ctx: context.Background(),
		},
	}
}

// Update updates the cursor.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	switch msg := msg.(type) {
	case initialBlinkMsg:
		// We accept all initialBlinkMsgs generated by the Blink command.

		if m.mode != CursorBlink || !m.focus {
			return m, nil
		}

		cmd := m.BlinkCmd()
		return m, cmd

	case tea.FocusMsg:
		return m, m.Focus()

	case tea.BlurMsg:
		m.Blur()
		return m, nil

	case BlinkMsg:
		// We're choosy about whether to accept blinkMsgs so that our cursor
		// only exactly when it should.

		// Is this model blink-able?
		if m.mode != CursorBlink || !m.focus {
			return m, nil
		}

		// Were we expecting this blink message?
		if msg.id != m.id || msg.tag != m.blinkTag {
			return m, nil
		}

		var cmd tea.Cmd
		if m.mode == CursorBlink {
			m.Blink = !m.Blink
			cmd = m.BlinkCmd()
		}
		return m, cmd

	case blinkCanceled: // no-op
		return m, nil
	}
	return m, nil
}

// Mode returns the model's cursor mode. For available cursor modes, see
// type Mode.
func (m Model) Mode() Mode {
	return m.mode
}

// SetMode sets the model's cursor mode. This method returns a command.
//
// For available cursor modes, see type CursorMode.
func (m *Model) SetMode(mode Mode) tea.Cmd {
	// Adjust the mode value if it's value is out of range
	if mode < CursorBlink || mode > CursorHide {
		return nil
	}
	m.mode = mode
	m.Blink = m.mode == CursorHide || !m.focus
	if mode == CursorBlink {
		return Blink
	}
	return nil
}

// BlinkCmd is a command used to manage cursor blinking.
func (m *Model) BlinkCmd() tea.Cmd {
	if m.mode != CursorBlink {
		return nil
	}

	if m.blinkCtx != nil && m.blinkCtx.cancel != nil {
		m.blinkCtx.cancel()
	}

	ctx, cancel := context.WithTimeout(m.blinkCtx.ctx, m.BlinkSpeed)
	m.blinkCtx.cancel = cancel

	m.blinkTag++

	blinkMsg := BlinkMsg{id: m.id, tag: m.blinkTag}

	return func() tea.Msg {
		defer cancel()
		<-ctx.Done()
		if ctx.Err() == context.DeadlineExceeded {
			return blinkMsg
		}
		return blinkCanceled{}
	}
}

// Blink is a command used to initialize cursor blinking.
func Blink() tea.Msg {
	return initialBlinkMsg{}
}

// Focus focuses the cursor to allow it to blink if desired.
func (m *Model) Focus() tea.Cmd {
	m.focus = true
	m.Blink = m.mode == CursorHide // show the cursor unless we've explicitly hidden it

	if m.mode == CursorBlink && m.focus {
		return m.BlinkCmd()
	}
	return nil
}

// Blur blurs the cursor.
func (m *Model) Blur() {
	m.focus = false
	m.Blink = true
}

// SetChar sets the character under the cursor.
func (m *Model) SetChar(char string) {
	m.char = char
}

// View displays the cursor.
func (m Model) View() string {
	if m.Blink {
		return m.TextStyle.Inline(true).Render(m.char)
	}
	return m.Style.Inline(true).Reverse(true).Render(m.char)
}



================================================
FILE: cursor/cursor_test.go
================================================
package cursor

import (
	"sync"
	"testing"
	"time"
)

// TestBlinkCmdDataRace tests for a race on [Cursor.blinkTag].
//
// The original [Model.BlinkCmd] implementation returned a closure over the pointer receiver:
//
//	return func() tea.Msg {
//		defer cancel()
//		<-ctx.Done()
//		if ctx.Err() == context.DeadlineExceeded {
//			return BlinkMsg{id: m.id, tag: m.blinkTag}
//		}
//		return blinkCanceled{}
//	}
//
// A race on “m.blinkTag” will occur if:
//  1. [Model.BlinkCmd] is called e.g. by calling [Model.Focus] from
//     ["github.com/charmbracelet/bubbletea".Model.Update];
//  2. ["github.com/charmbracelet/bubbletea".handleCommands] is kept sufficiently busy that it does not recieve and
//     execute the [Model.BlinkCmd] e.g. by other long running command or commands;
//  3. at least [Mode.BlinkSpeed] time elapses;
//  4. [Model.BlinkCmd] is called again;
//  5. ["github.com/charmbracelet/bubbletea".handleCommands] gets around to receiving and executing the original
//     closure.
//
// Even if this did not formally race, the value of the tag fetched would be semantically incorrect (likely being the
// current value rather than the value at the time the closure was created).
func TestBlinkCmdDataRace(t *testing.T) {
	m := New()
	cmd := m.BlinkCmd()
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		time.Sleep(m.BlinkSpeed * 3)
		cmd()
	}()
	go func() {
		defer wg.Done()
		time.Sleep(m.BlinkSpeed * 2)
		m.BlinkCmd()
	}()
	wg.Wait()
}



================================================
FILE: filepicker/filepicker.go
================================================
// Package filepicker provides a file picker component for Bubble Tea
// applications.
package filepicker

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"sync/atomic"

	"github.com/charmbracelet/bubbles/key"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/dustin/go-humanize"
)

var lastID int64

func nextID() int {
	return int(atomic.AddInt64(&lastID, 1))
}

// New returns a new filepicker model with default styling and key bindings.
func New() Model {
	return Model{
		id:               nextID(),
		CurrentDirectory: ".",
		Cursor:           ">",
		AllowedTypes:     []string{},
		selected:         0,
		ShowPermissions:  true,
		ShowSize:         true,
		ShowHidden:       false,
		DirAllowed:       false,
		FileAllowed:      true,
		AutoHeight:       true,
		Height:           0,
		max:              0,
		min:              0,
		selectedStack:    newStack(),
		minStack:         newStack(),
		maxStack:         newStack(),
		KeyMap:           DefaultKeyMap(),
		Styles:           DefaultStyles(),
	}
}

type errorMsg struct {
	err error
}

type readDirMsg struct {
	id      int
	entries []os.DirEntry
}

const (
	marginBottom  = 5
	fileSizeWidth = 7
	paddingLeft   = 2
)

// KeyMap defines key bindings for each user action.
type KeyMap struct {
	GoToTop  key.Binding
	GoToLast key.Binding
	Down     key.Binding
	Up       key.Binding
	PageUp   key.Binding
	PageDown key.Binding
	Back     key.Binding
	Open     key.Binding
	Select   key.Binding
}

// DefaultKeyMap defines the default keybindings.
func DefaultKeyMap() KeyMap {
	return KeyMap{
		GoToTop:  key.NewBinding(key.WithKeys("g"), key.WithHelp("g", "first")),
		GoToLast: key.NewBinding(key.WithKeys("G"), key.WithHelp("G", "last")),
		Down:     key.NewBinding(key.WithKeys("j", "down", "ctrl+n"), key.WithHelp("j", "down")),
		Up:       key.NewBinding(key.WithKeys("k", "up", "ctrl+p"), key.WithHelp("k", "up")),
		PageUp:   key.NewBinding(key.WithKeys("K", "pgup"), key.WithHelp("pgup", "page up")),
		PageDown: key.NewBinding(key.WithKeys("J", "pgdown"), key.WithHelp("pgdown", "page down")),
		Back:     key.NewBinding(key.WithKeys("h", "backspace", "left", "esc"), key.WithHelp("h", "back")),
		Open:     key.NewBinding(key.WithKeys("l", "right", "enter"), key.WithHelp("l", "open")),
		Select:   key.NewBinding(key.WithKeys("enter"), key.WithHelp("enter", "select")),
	}
}

// Styles defines the possible customizations for styles in the file picker.
type Styles struct {
	DisabledCursor   lipgloss.Style
	Cursor           lipgloss.Style
	Symlink          lipgloss.Style
	Directory        lipgloss.Style
	File             lipgloss.Style
	DisabledFile     lipgloss.Style
	Permission       lipgloss.Style
	Selected         lipgloss.Style
	DisabledSelected lipgloss.Style
	FileSize         lipgloss.Style
	EmptyDirectory   lipgloss.Style
}

// DefaultStyles defines the default styling for the file picker.
func DefaultStyles() Styles {
	return DefaultStylesWithRenderer(lipgloss.DefaultRenderer())
}

// DefaultStylesWithRenderer defines the default styling for the file picker,
// with a given Lip Gloss renderer.
func DefaultStylesWithRenderer(r *lipgloss.Renderer) Styles {
	return Styles{
		DisabledCursor:   r.NewStyle().Foreground(lipgloss.Color("247")),
		Cursor:           r.NewStyle().Foreground(lipgloss.Color("212")),
		Symlink:          r.NewStyle().Foreground(lipgloss.Color("36")),
		Directory:        r.NewStyle().Foreground(lipgloss.Color("99")),
		File:             r.NewStyle(),
		DisabledFile:     r.NewStyle().Foreground(lipgloss.Color("243")),
		DisabledSelected: r.NewStyle().Foreground(lipgloss.Color("247")),
		Permission:       r.NewStyle().Foreground(lipgloss.Color("244")),
		Selected:         r.NewStyle().Foreground(lipgloss.Color("212")).Bold(true),
		FileSize:         r.NewStyle().Foreground(lipgloss.Color("240")).Width(fileSizeWidth).Align(lipgloss.Right),
		EmptyDirectory:   r.NewStyle().Foreground(lipgloss.Color("240")).PaddingLeft(paddingLeft).SetString("Bummer. No Files Found."),
	}
}

// Model represents a file picker.
type Model struct {
	id int

	// Path is the path which the user has selected with the file picker.
	Path string

	// CurrentDirectory is the directory that the user is currently in.
	CurrentDirectory string

	// AllowedTypes specifies which file types the user may select.
	// If empty the user may select any file.
	AllowedTypes []string

	KeyMap          KeyMap
	files           []os.DirEntry
	ShowPermissions bool
	ShowSize        bool
	ShowHidden      bool
	DirAllowed      bool
	FileAllowed     bool

	FileSelected  string
	selected      int
	selectedStack stack

	min      int
	max      int
	maxStack stack
	minStack stack

	// Height of the picker.
	//
	// Deprecated: use [Model.SetHeight] instead.
	Height     int
	AutoHeight bool

	Cursor string
	Styles Styles
}

type stack struct {
	Push   func(int)
	Pop    func() int
	Length func() int
}

func newStack() stack {
	slice := make([]int, 0)
	return stack{
		Push: func(i int) {
			slice = append(slice, i)
		},
		Pop: func() int {
			res := slice[len(slice)-1]
			slice = slice[:len(slice)-1]
			return res
		},
		Length: func() int {
			return len(slice)
		},
	}
}

func (m *Model) pushView(selected, minimum, maximum int) {
	m.selectedStack.Push(selected)
	m.minStack.Push(minimum)
	m.maxStack.Push(maximum)
}

func (m *Model) popView() (int, int, int) {
	return m.selectedStack.Pop(), m.minStack.Pop(), m.maxStack.Pop()
}

func (m Model) readDir(path string, showHidden bool) tea.Cmd {
	return func() tea.Msg {
		dirEntries, err := os.ReadDir(path)
		if err != nil {
			return errorMsg{err}
		}

		sort.Slice(dirEntries, func(i, j int) bool {
			if dirEntries[i].IsDir() == dirEntries[j].IsDir() {
				return dirEntries[i].Name() < dirEntries[j].Name()
			}
			return dirEntries[i].IsDir()
		})

		if showHidden {
			return readDirMsg{id: m.id, entries: dirEntries}
		}

		var sanitizedDirEntries []os.DirEntry
		for _, dirEntry := range dirEntries {
			isHidden, _ := IsHidden(dirEntry.Name())
			if isHidden {
				continue
			}
			sanitizedDirEntries = append(sanitizedDirEntries, dirEntry)
		}
		return readDirMsg{id: m.id, entries: sanitizedDirEntries}
	}
}

// Init initializes the file picker model.
func (m Model) Init() tea.Cmd {
	return m.readDir(m.CurrentDirectory, m.ShowHidden)
}

// SetHeight sets the height of the filepicker.
func (m *Model) SetHeight(height int) {
	m.Height = height
	if m.max > m.Height-1 {
		m.max = m.min + m.Height - 1
	}
}

// Update handles user interactions within the file picker model.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	switch msg := msg.(type) {
	case readDirMsg:
		if msg.id != m.id {
			break
		}
		m.files = msg.entries
		m.max = max(m.max, m.Height-1)
	case tea.WindowSizeMsg:
		if m.AutoHeight {
			m.Height = msg.Height - marginBottom
		}
		m.max = m.Height - 1
	case tea.KeyMsg:
		switch {
		case key.Matches(msg, m.KeyMap.GoToTop):
			m.selected = 0
			m.min = 0
			m.max = m.Height - 1
		case key.Matches(msg, m.KeyMap.GoToLast):
			m.selected = len(m.files) - 1
			m.min = len(m.files) - m.Height
			m.max = len(m.files) - 1
		case key.Matches(msg, m.KeyMap.Down):
			m.selected++
			if m.selected >= len(m.files) {
				m.selected = len(m.files) - 1
			}
			if m.selected > m.max {
				m.min++
				m.max++
			}
		case key.Matches(msg, m.KeyMap.Up):
			m.selected--
			if m.selected < 0 {
				m.selected = 0
			}
			if m.selected < m.min {
				m.min--
				m.max--
			}
		case key.Matches(msg, m.KeyMap.PageDown):
			m.selected += m.Height
			if m.selected >= len(m.files) {
				m.selected = len(m.files) - 1
			}
			m.min += m.Height
			m.max += m.Height

			if m.max >= len(m.files) {
				m.max = len(m.files) - 1
				m.min = m.max - m.Height
			}
		case key.Matches(msg, m.KeyMap.PageUp):
			m.selected -= m.Height
			if m.selected < 0 {
				m.selected = 0
			}
			m.min -= m.Height
			m.max -= m.Height

			if m.min < 0 {
				m.min = 0
				m.max = m.min + m.Height
			}
		case key.Matches(msg, m.KeyMap.Back):
			m.CurrentDirectory = filepath.Dir(m.CurrentDirectory)
			if m.selectedStack.Length() > 0 {
				m.selected, m.min, m.max = m.popView()
			} else {
				m.selected = 0
				m.min = 0
				m.max = m.Height - 1
			}
			return m, m.readDir(m.CurrentDirectory, m.ShowHidden)
		case key.Matches(msg, m.KeyMap.Open):
			if len(m.files) == 0 {
				break
			}

			f := m.files[m.selected]
			info, err := f.Info()
			if err != nil {
				break
			}
			isSymlink := info.Mode()&os.ModeSymlink != 0
			isDir := f.IsDir()

			if isSymlink {
				symlinkPath, _ := filepath.EvalSymlinks(filepath.Join(m.CurrentDirectory, f.Name()))
				info, err := os.Stat(symlinkPath)
				if err != nil {
					break
				}
				if info.IsDir() {
					isDir = true
				}
			}

			if (!isDir && m.FileAllowed) || (isDir && m.DirAllowed) {
				if key.Matches(msg, m.KeyMap.Select) {
					// Select the current path as the selection
					m.Path = filepath.Join(m.CurrentDirectory, f.Name())
				}
			}

			if !isDir {
				break
			}

			m.CurrentDirectory = filepath.Join(m.CurrentDirectory, f.Name())
			m.pushView(m.selected, m.min, m.max)
			m.selected = 0
			m.min = 0
			m.max = m.Height - 1
			return m, m.readDir(m.CurrentDirectory, m.ShowHidden)
		}
	}
	return m, nil
}

// View returns the view of the file picker.
func (m Model) View() string {
	if len(m.files) == 0 {
		return m.Styles.EmptyDirectory.Height(m.Height).MaxHeight(m.Height).String()
	}
	var s strings.Builder

	for i, f := range m.files {
		if i < m.min || i > m.max {
			continue
		}

		var symlinkPath string
		info, _ := f.Info()
		isSymlink := info.Mode()&os.ModeSymlink != 0
		size := strings.Replace(humanize.Bytes(uint64(info.Size())), " ", "", 1) //nolint:gosec
		name := f.Name()

		if isSymlink {
			symlinkPath, _ = filepath.EvalSymlinks(filepath.Join(m.CurrentDirectory, name))
		}

		disabled := !m.canSelect(name) && !f.IsDir()

		if m.selected == i { //nolint:nestif
			selected := ""
			if m.ShowPermissions {
				selected += " " + info.Mode().String()
			}
			if m.ShowSize {
				selected += fmt.Sprintf("%"+strconv.Itoa(m.Styles.FileSize.GetWidth())+"s", size)
			}
			selected += " " + name
			if isSymlink {
				selected += " → " + symlinkPath
			}
			if disabled {
				s.WriteString(m.Styles.DisabledSelected.Render(m.Cursor) + m.Styles.DisabledSelected.Render(selected))
			} else {
				s.WriteString(m.Styles.Cursor.Render(m.Cursor) + m.Styles.Selected.Render(selected))
			}
			s.WriteRune('\n')
			continue
		}

		style := m.Styles.File
		if f.IsDir() {
			style = m.Styles.Directory
		} else if isSymlink {
			style = m.Styles.Symlink
		} else if disabled {
			style = m.Styles.DisabledFile
		}

		fileName := style.Render(name)
		s.WriteString(m.Styles.Cursor.Render(" "))
		if isSymlink {
			fileName += " → " + symlinkPath
		}
		if m.ShowPermissions {
			s.WriteString(" " + m.Styles.Permission.Render(info.Mode().String()))
		}
		if m.ShowSize {
			s.WriteString(m.Styles.FileSize.Render(size))
		}
		s.WriteString(" " + fileName)
		s.WriteRune('\n')
	}

	for i := lipgloss.Height(s.String()); i <= m.Height; i++ {
		s.WriteRune('\n')
	}

	return s.String()
}

// DidSelectFile returns whether a user has selected a file (on this msg).
func (m Model) DidSelectFile(msg tea.Msg) (bool, string) {
	didSelect, path := m.didSelectFile(msg)
	if didSelect && m.canSelect(path) {
		return true, path
	}
	return false, ""
}

// DidSelectDisabledFile returns whether a user tried to select a disabled file
// (on this msg). This is necessary only if you would like to warn the user that
// they tried to select a disabled file.
func (m Model) DidSelectDisabledFile(msg tea.Msg) (bool, string) {
	didSelect, path := m.didSelectFile(msg)
	if didSelect && !m.canSelect(path) {
		return true, path
	}
	return false, ""
}

func (m Model) didSelectFile(msg tea.Msg) (bool, string) {
	if len(m.files) == 0 {
		return false, ""
	}
	switch msg := msg.(type) {
	case tea.KeyMsg:
		// If the msg does not match the Select keymap then this could not have been a selection.
		if !key.Matches(msg, m.KeyMap.Select) {
			return false, ""
		}

		// The key press was a selection, let's confirm whether the current file could
		// be selected or used for navigating deeper into the stack.
		f := m.files[m.selected]
		info, err := f.Info()
		if err != nil {
			return false, ""
		}
		isSymlink := info.Mode()&os.ModeSymlink != 0
		isDir := f.IsDir()

		if isSymlink {
			symlinkPath, _ := filepath.EvalSymlinks(filepath.Join(m.CurrentDirectory, f.Name()))
			info, err := os.Stat(symlinkPath)
			if err != nil {
				break
			}
			if info.IsDir() {
				isDir = true
			}
		}

		if (!isDir && m.FileAllowed) || (isDir && m.DirAllowed) && m.Path != "" {
			return true, m.Path
		}

		// If the msg was not a KeyMsg, then the file could not have been selected this iteration.
		// Only a KeyMsg can select a file.
	default:
		return false, ""
	}
	return false, ""
}

func (m Model) canSelect(file string) bool {
	if len(m.AllowedTypes) <= 0 {
		return true
	}

	for _, ext := range m.AllowedTypes {
		if strings.HasSuffix(file, ext) {
			return true
		}
	}
	return false
}



================================================
FILE: filepicker/hidden_unix.go
================================================
//go:build !windows
// +build !windows

package filepicker

import "strings"

// IsHidden reports whether a file is hidden or not.
func IsHidden(file string) (bool, error) {
	return strings.HasPrefix(file, "."), nil
}



================================================
FILE: filepicker/hidden_windows.go
================================================
//go:build windows
// +build windows

package filepicker

import (
	"syscall"
)

// IsHidden reports whether a file is hidden or not.
func IsHidden(file string) (bool, error) {
	pointer, err := syscall.UTF16PtrFromString(file)
	if err != nil {
		return false, err //nolint:wrapcheck
	}
	attributes, err := syscall.GetFileAttributes(pointer)
	if err != nil {
		return false, err //nolint:wrapcheck
	}
	return attributes&syscall.FILE_ATTRIBUTE_HIDDEN != 0, nil
}



================================================
FILE: help/help.go
================================================
// Package help provides a simple help view for Bubble Tea applications.
package help

import (
	"strings"

	"github.com/charmbracelet/bubbles/key"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// KeyMap is a map of keybindings used to generate help. Since it's an
// interface it can be any type, though struct or a map[string][]key.Binding
// are likely candidates.
//
// Note that if a key is disabled (via key.Binding.SetEnabled) it will not be
// rendered in the help view, so in theory generated help should self-manage.
type KeyMap interface {
	// ShortHelp returns a slice of bindings to be displayed in the short
	// version of the help. The help bubble will render help in the order in
	// which the help items are returned here.
	ShortHelp() []key.Binding

	// FullHelp returns an extended group of help items, grouped by columns.
	// The help bubble will render the help in the order in which the help
	// items are returned here.
	FullHelp() [][]key.Binding
}

// Styles is a set of available style definitions for the Help bubble.
type Styles struct {
	Ellipsis lipgloss.Style

	// Styling for the short help
	ShortKey       lipgloss.Style
	ShortDesc      lipgloss.Style
	ShortSeparator lipgloss.Style

	// Styling for the full help
	FullKey       lipgloss.Style
	FullDesc      lipgloss.Style
	FullSeparator lipgloss.Style
}

// Model contains the state of the help view.
type Model struct {
	Width   int
	ShowAll bool // if true, render the "full" help menu

	ShortSeparator string
	FullSeparator  string

	// The symbol we use in the short help when help items have been truncated
	// due to width. Periods of ellipsis by default.
	Ellipsis string

	Styles Styles
}

// New creates a new help view with some useful defaults.
func New() Model {
	keyStyle := lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{
		Light: "#909090",
		Dark:  "#626262",
	})

	descStyle := lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{
		Light: "#B2B2B2",
		Dark:  "#4A4A4A",
	})

	sepStyle := lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{
		Light: "#DDDADA",
		Dark:  "#3C3C3C",
	})

	return Model{
		ShortSeparator: " • ",
		FullSeparator:  "    ",
		Ellipsis:       "…",
		Styles: Styles{
			ShortKey:       keyStyle,
			ShortDesc:      descStyle,
			ShortSeparator: sepStyle,
			Ellipsis:       sepStyle,
			FullKey:        keyStyle,
			FullDesc:       descStyle,
			FullSeparator:  sepStyle,
		},
	}
}

// NewModel creates a new help view with some useful defaults.
//
// Deprecated: use [New] instead.
var NewModel = New

// Update helps satisfy the Bubble Tea Model interface. It's a no-op.
func (m Model) Update(_ tea.Msg) (Model, tea.Cmd) {
	return m, nil
}

// View renders the help view's current state.
func (m Model) View(k KeyMap) string {
	if m.ShowAll {
		return m.FullHelpView(k.FullHelp())
	}
	return m.ShortHelpView(k.ShortHelp())
}

// ShortHelpView renders a single line help view from a slice of keybindings.
// If the line is longer than the maximum width it will be gracefully
// truncated, showing only as many help items as possible.
func (m Model) ShortHelpView(bindings []key.Binding) string {
	if len(bindings) == 0 {
		return ""
	}

	var b strings.Builder
	var totalWidth int
	separator := m.Styles.ShortSeparator.Inline(true).Render(m.ShortSeparator)

	for i, kb := range bindings {
		if !kb.Enabled() {
			continue
		}

		// Sep
		var sep string
		if totalWidth > 0 && i < len(bindings) {
			sep = separator
		}

		// Item
		str := sep +
			m.Styles.ShortKey.Inline(true).Render(kb.Help().Key) + " " +
			m.Styles.ShortDesc.Inline(true).Render(kb.Help().Desc)
		w := lipgloss.Width(str)

		// Tail
		if tail, ok := m.shouldAddItem(totalWidth, w); !ok {
			if tail != "" {
				b.WriteString(tail)
			}
			break
		}

		totalWidth += w
		b.WriteString(str)
	}

	return b.String()
}

// FullHelpView renders help columns from a slice of key binding slices. Each
// top level slice entry renders into a column.
func (m Model) FullHelpView(groups [][]key.Binding) string {
	if len(groups) == 0 {
		return ""
	}

	// Linter note: at this time we don't think it's worth the additional
	// code complexity involved in preallocating this slice.
	//nolint:prealloc
	var (
		out []string

		totalWidth int
		separator  = m.Styles.FullSeparator.Inline(true).Render(m.FullSeparator)
	)

	// Iterate over groups to build columns
	for i, group := range groups {
		if group == nil || !shouldRenderColumn(group) {
			continue
		}
		var (
			sep          string
			keys         []string
			descriptions []string
		)

		// Sep
		if totalWidth > 0 && i < len(groups) {
			sep = separator
		}

		// Separate keys and descriptions into different slices
		for _, kb := range group {
			if !kb.Enabled() {
				continue
			}
			keys = append(keys, kb.Help().Key)
			descriptions = append(descriptions, kb.Help().Desc)
		}

		// Column
		col := lipgloss.JoinHorizontal(lipgloss.Top,
			sep,
			m.Styles.FullKey.Render(strings.Join(keys, "\n")),
			" ",
			m.Styles.FullDesc.Render(strings.Join(descriptions, "\n")),
		)
		w := lipgloss.Width(col)

		// Tail
		if tail, ok := m.shouldAddItem(totalWidth, w); !ok {
			if tail != "" {
				out = append(out, tail)
			}
			break
		}

		totalWidth += w
		out = append(out, col)
	}

	return lipgloss.JoinHorizontal(lipgloss.Top, out...)
}

func (m Model) shouldAddItem(totalWidth, width int) (tail string, ok bool) {
	// If there's room for an ellipsis, print that.
	if m.Width > 0 && totalWidth+width > m.Width {
		tail = " " + m.Styles.Ellipsis.Inline(true).Render(m.Ellipsis)

		if totalWidth+lipgloss.Width(tail) < m.Width {
			return tail, false
		}
	}
	return "", true
}

func shouldRenderColumn(b []key.Binding) (ok bool) {
	for _, v := range b {
		if v.Enabled() {
			return true
		}
	}
	return false
}



================================================
FILE: help/help_test.go
================================================
package help

import (
	"fmt"
	"testing"

	"github.com/charmbracelet/x/exp/golden"

	"github.com/charmbracelet/bubbles/key"
)

func TestFullHelp(t *testing.T) {
	m := New()
	m.FullSeparator = " | "
	k := key.WithKeys("x")
	kb := [][]key.Binding{
		{
			key.NewBinding(k, key.WithHelp("enter", "continue")),
		},
		{
			key.NewBinding(k, key.WithHelp("esc", "back")),
			key.NewBinding(k, key.WithHelp("?", "help")),
		},
		{
			key.NewBinding(k, key.WithHelp("H", "home")),
			key.NewBinding(k, key.WithHelp("ctrl+c", "quit")),
			key.NewBinding(k, key.WithHelp("ctrl+l", "log")),
		},
	}

	for _, w := range []int{20, 30, 40} {
		t.Run(fmt.Sprintf("full help %d width", w), func(t *testing.T) {
			m.Width = w
			s := m.FullHelpView(kb)
			golden.RequireEqual(t, []byte(s))
		})
	}
}



================================================
FILE: help/testdata/TestFullHelp/full_help_20_width.golden
================================================
enter continue …


================================================
FILE: help/testdata/TestFullHelp/full_help_30_width.golden
================================================
enter continue | esc back …
                 ?   help  


================================================
FILE: help/testdata/TestFullHelp/full_help_40_width.golden
================================================
enter continue | esc back | H      home
                 ?   help   ctrl+c quit
                            ctrl+l log 


================================================
FILE: key/key.go
================================================
// Package key provides some types and functions for generating user-definable
// keymappings useful in Bubble Tea components. There are a few different ways
// you can define a keymapping with this package. Here's one example:
//
//	type KeyMap struct {
//	    Up key.Binding
//	    Down key.Binding
//	}
//
//	var DefaultKeyMap = KeyMap{
//	    Up: key.NewBinding(
//	        key.WithKeys("k", "up"),        // actual keybindings
//	        key.WithHelp("↑/k", "move up"), // corresponding help text
//	    ),
//	    Down: key.NewBinding(
//	        key.WithKeys("j", "down"),
//	        key.WithHelp("↓/j", "move down"),
//	    ),
//	}
//
//	func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
//	    switch msg := msg.(type) {
//	    case tea.KeyMsg:
//	        switch {
//	        case key.Matches(msg, DefaultKeyMap.Up):
//	            // The user pressed up
//	        case key.Matches(msg, DefaultKeyMap.Down):
//	            // The user pressed down
//	        }
//	    }
//
//	    // ...
//	}
//
// The help information, which is not used in the example above, can be used
// to render help text for keystrokes in your views.
package key

import "fmt"

// Binding describes a set of keybindings and, optionally, their associated
// help text.
type Binding struct {
	keys     []string
	help     Help
	disabled bool
}

// BindingOpt is an initialization option for a keybinding. It's used as an
// argument to NewBinding.
type BindingOpt func(*Binding)

// NewBinding returns a new keybinding from a set of BindingOpt options.
func NewBinding(opts ...BindingOpt) Binding {
	b := &Binding{}
	for _, opt := range opts {
		opt(b)
	}
	return *b
}

// WithKeys initializes a keybinding with the given keystrokes.
func WithKeys(keys ...string) BindingOpt {
	return func(b *Binding) {
		b.keys = keys
	}
}

// WithHelp initializes a keybinding with the given help text.
func WithHelp(key, desc string) BindingOpt {
	return func(b *Binding) {
		b.help = Help{Key: key, Desc: desc}
	}
}

// WithDisabled initializes a disabled keybinding.
func WithDisabled() BindingOpt {
	return func(b *Binding) {
		b.disabled = true
	}
}

// SetKeys sets the keys for the keybinding.
func (b *Binding) SetKeys(keys ...string) {
	b.keys = keys
}

// Keys returns the keys for the keybinding.
func (b Binding) Keys() []string {
	return b.keys
}

// SetHelp sets the help text for the keybinding.
func (b *Binding) SetHelp(key, desc string) {
	b.help = Help{Key: key, Desc: desc}
}

// Help returns the Help information for the keybinding.
func (b Binding) Help() Help {
	return b.help
}

// Enabled returns whether or not the keybinding is enabled. Disabled
// keybindings won't be activated and won't show up in help. Keybindings are
// enabled by default.
func (b Binding) Enabled() bool {
	return !b.disabled && b.keys != nil
}

// SetEnabled enables or disables the keybinding.
func (b *Binding) SetEnabled(v bool) {
	b.disabled = !v
}

// Unbind removes the keys and help from this binding, effectively nullifying
// it. This is a step beyond disabling it, since applications can enable
// or disable key bindings based on application state.
func (b *Binding) Unbind() {
	b.keys = nil
	b.help = Help{}
}

// Help is help information for a given keybinding.
type Help struct {
	Key  string
	Desc string
}

// Matches checks if the given key matches the given bindings.
func Matches[Key fmt.Stringer](k Key, b ...Binding) bool {
	keys := k.String()
	for _, binding := range b {
		for _, v := range binding.keys {
			if keys == v && binding.Enabled() {
				return true
			}
		}
	}
	return false
}



================================================
FILE: key/key_test.go
================================================
package key

import (
	"testing"
)

func TestBinding_Enabled(t *testing.T) {
	binding := NewBinding(
		WithKeys("k", "up"),
		WithHelp("↑/k", "move up"),
	)
	if !binding.Enabled() {
		t.Errorf("expected key to be Enabled")
	}

	binding.SetEnabled(false)
	if binding.Enabled() {
		t.Errorf("expected key not to be Enabled")
	}

	binding.SetEnabled(true)
	binding.Unbind()
	if binding.Enabled() {
		t.Errorf("expected key not to be Enabled")
	}
}



================================================
FILE: list/README.md
================================================
# Frequently Asked Questions

These are some of the most commonly asked questions regarding the `list` bubble.

## Adding Custom Items

There are a few things you need to do to create custom items. First off, they
need to implement the `list.Item` and `list.DefaultItem` interfaces.

```go
// Item is an item that appears in the list.
type Item interface {
	// FilterValue is the value we use when filtering against this item when
	// we're filtering the list.
	FilterValue() string
}
```

```go
// DefaultItem describes an item designed to work with DefaultDelegate.
type DefaultItem interface {
	Item
	Title() string
	Description() string
}
```

You can see a working example in our [Kancli][kancli] project built
explicitly for a tutorial on lists and composite views in Bubble Tea.

[VIDEO](https://youtu.be/ZA93qgdLUzM)

## Customizing Styles

Rendering (and behavior) for list items is done via the
[`ItemDelegate`][itemDelegate]
interface. It can be a little confusing at first, but it allows the list to be
very flexible and powerful.

If you just want to alter the default style you could do something like:

```go
import "github.com/charmbracelet/bubbles/list"

// Create a new default delegate
d := list.NewDefaultDelegate()

// Change colors
c := lipgloss.Color("#6f03fc")
d.Styles.SelectedTitle = d.Styles.SelectedTitle.Foreground(c).BorderLeftForeground(c)
d.Styles.SelectedDesc = d.Styles.SelectedTitle.Copy() // reuse the title style here

// Initailize the list model with our delegate
width, height := 80, 40
l := list.New(listItems, d, width, height)

// You can also change the delegate on the fly
l.SetDelegate(d)
```

This code would replace [this line][replacedLine] in the [`list-default`
example][listDefault].

For full control over the way list items are rendered you can also define your
own `ItemDelegate` too ([example][customDelegate]).

[kancli]: https://github.com/charmbracelet/kancli/blob/main/main.go#L45
[itemDelegate]: https://pkg.go.dev/github.com/charmbracelet/bubbles/list#ItemDelegate
[replacedLine]: https://github.com/charmbracelet/bubbletea/blob/main/examples/list-default/main.go#L77
[listDefault]: https://github.com/charmbracelet/bubbletea/tree/main/examples/list-default
[customDelegate]: https://github.com/charmbracelet/bubbletea/blob/main/examples/list-simple/main.go#L29-L50



================================================
FILE: list/defaultitem.go
================================================
package list

import (
	"fmt"
	"io"
	"strings"

	"github.com/charmbracelet/bubbles/key"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
)

// DefaultItemStyles defines styling for a default list item.
// See DefaultItemView for when these come into play.
type DefaultItemStyles struct {
	// The Normal state.
	NormalTitle lipgloss.Style
	NormalDesc  lipgloss.Style

	// The selected item state.
	SelectedTitle lipgloss.Style
	SelectedDesc  lipgloss.Style

	// The dimmed state, for when the filter input is initially activated.
	DimmedTitle lipgloss.Style
	DimmedDesc  lipgloss.Style

	// Characters matching the current filter, if any.
	FilterMatch lipgloss.Style
}

// NewDefaultItemStyles returns style definitions for a default item. See
// DefaultItemView for when these come into play.
func NewDefaultItemStyles() (s DefaultItemStyles) {
	s.NormalTitle = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#1a1a1a", Dark: "#dddddd"}).
		Padding(0, 0, 0, 2) //nolint:mnd

	s.NormalDesc = s.NormalTitle.
		Foreground(lipgloss.AdaptiveColor{Light: "#A49FA5", Dark: "#777777"})

	s.SelectedTitle = lipgloss.NewStyle().
		Border(lipgloss.NormalBorder(), false, false, false, true).
		BorderForeground(lipgloss.AdaptiveColor{Light: "#F793FF", Dark: "#AD58B4"}).
		Foreground(lipgloss.AdaptiveColor{Light: "#EE6FF8", Dark: "#EE6FF8"}).
		Padding(0, 0, 0, 1)

	s.SelectedDesc = s.SelectedTitle.
		Foreground(lipgloss.AdaptiveColor{Light: "#F793FF", Dark: "#AD58B4"})

	s.DimmedTitle = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#A49FA5", Dark: "#777777"}).
		Padding(0, 0, 0, 2) //nolint:mnd

	s.DimmedDesc = s.DimmedTitle.
		Foreground(lipgloss.AdaptiveColor{Light: "#C2B8C2", Dark: "#4D4D4D"})

	s.FilterMatch = lipgloss.NewStyle().Underline(true)

	return s
}

// DefaultItem describes an item designed to work with DefaultDelegate.
type DefaultItem interface {
	Item
	Title() string
	Description() string
}

// DefaultDelegate is a standard delegate designed to work in lists. It's
// styled by DefaultItemStyles, which can be customized as you like.
//
// The description line can be hidden by setting Description to false, which
// renders the list as single-line-items. The spacing between items can be set
// with the SetSpacing method.
//
// Setting UpdateFunc is optional. If it's set it will be called when the
// ItemDelegate called, which is called when the list's Update function is
// invoked.
//
// Settings ShortHelpFunc and FullHelpFunc is optional. They can be set to
// include items in the list's default short and full help menus.
type DefaultDelegate struct {
	ShowDescription bool
	Styles          DefaultItemStyles
	UpdateFunc      func(tea.Msg, *Model) tea.Cmd
	ShortHelpFunc   func() []key.Binding
	FullHelpFunc    func() [][]key.Binding
	height          int
	spacing         int
}

// NewDefaultDelegate creates a new delegate with default styles.
func NewDefaultDelegate() DefaultDelegate {
	const defaultHeight = 2
	const defaultSpacing = 1
	return DefaultDelegate{
		ShowDescription: true,
		Styles:          NewDefaultItemStyles(),
		height:          defaultHeight,
		spacing:         defaultSpacing,
	}
}

// SetHeight sets delegate's preferred height.
func (d *DefaultDelegate) SetHeight(i int) {
	d.height = i
}

// Height returns the delegate's preferred height.
// This has effect only if ShowDescription is true,
// otherwise height is always 1.
func (d DefaultDelegate) Height() int {
	if d.ShowDescription {
		return d.height
	}
	return 1
}

// SetSpacing sets the delegate's spacing.
func (d *DefaultDelegate) SetSpacing(i int) {
	d.spacing = i
}

// Spacing returns the delegate's spacing.
func (d DefaultDelegate) Spacing() int {
	return d.spacing
}

// Update checks whether the delegate's UpdateFunc is set and calls it.
func (d DefaultDelegate) Update(msg tea.Msg, m *Model) tea.Cmd {
	if d.UpdateFunc == nil {
		return nil
	}
	return d.UpdateFunc(msg, m)
}

// Render prints an item.
func (d DefaultDelegate) Render(w io.Writer, m Model, index int, item Item) {
	var (
		title, desc  string
		matchedRunes []int
		s            = &d.Styles
	)

	if i, ok := item.(DefaultItem); ok {
		title = i.Title()
		desc = i.Description()
	} else {
		return
	}

	if m.width <= 0 {
		// short-circuit
		return
	}

	// Prevent text from exceeding list width
	textwidth := m.width - s.NormalTitle.GetPaddingLeft() - s.NormalTitle.GetPaddingRight()
	title = ansi.Truncate(title, textwidth, ellipsis)
	if d.ShowDescription {
		var lines []string
		for i, line := range strings.Split(desc, "\n") {
			if i >= d.height-1 {
				break
			}
			lines = append(lines, ansi.Truncate(line, textwidth, ellipsis))
		}
		desc = strings.Join(lines, "\n")
	}

	// Conditions
	var (
		isSelected  = index == m.Index()
		emptyFilter = m.FilterState() == Filtering && m.FilterValue() == ""
		isFiltered  = m.FilterState() == Filtering || m.FilterState() == FilterApplied
	)

	if isFiltered && index < len(m.filteredItems) {
		// Get indices of matched characters
		matchedRunes = m.MatchesForItem(index)
	}

	if emptyFilter {
		title = s.DimmedTitle.Render(title)
		desc = s.DimmedDesc.Render(desc)
	} else if isSelected && m.FilterState() != Filtering {
		if isFiltered {
			// Highlight matches
			unmatched := s.SelectedTitle.Inline(true)
			matched := unmatched.Inherit(s.FilterMatch)
			title = lipgloss.StyleRunes(title, matchedRunes, matched, unmatched)
		}
		title = s.SelectedTitle.Render(title)
		desc = s.SelectedDesc.Render(desc)
	} else {
		if isFiltered {
			// Highlight matches
			unmatched := s.NormalTitle.Inline(true)
			matched := unmatched.Inherit(s.FilterMatch)
			title = lipgloss.StyleRunes(title, matchedRunes, matched, unmatched)
		}
		title = s.NormalTitle.Render(title)
		desc = s.NormalDesc.Render(desc)
	}

	if d.ShowDescription {
		fmt.Fprintf(w, "%s\n%s", title, desc) //nolint: errcheck
		return
	}
	fmt.Fprintf(w, "%s", title) //nolint: errcheck
}

// ShortHelp returns the delegate's short help.
func (d DefaultDelegate) ShortHelp() []key.Binding {
	if d.ShortHelpFunc != nil {
		return d.ShortHelpFunc()
	}
	return nil
}

// FullHelp returns the delegate's full help.
func (d DefaultDelegate) FullHelp() [][]key.Binding {
	if d.FullHelpFunc != nil {
		return d.FullHelpFunc()
	}
	return nil
}



================================================
FILE: list/keys.go
================================================
package list

import "github.com/charmbracelet/bubbles/key"

// KeyMap defines keybindings. It satisfies to the help.KeyMap interface, which
// is used to render the menu.
type KeyMap struct {
	// Keybindings used when browsing the list.
	CursorUp    key.Binding
	CursorDown  key.Binding
	NextPage    key.Binding
	PrevPage    key.Binding
	GoToStart   key.Binding
	GoToEnd     key.Binding
	Filter      key.Binding
	ClearFilter key.Binding

	// Keybindings used when setting a filter.
	CancelWhileFiltering key.Binding
	AcceptWhileFiltering key.Binding

	// Help toggle keybindings.
	ShowFullHelp  key.Binding
	CloseFullHelp key.Binding

	// The quit keybinding. This won't be caught when filtering.
	Quit key.Binding

	// The quit-no-matter-what keybinding. This will be caught when filtering.
	ForceQuit key.Binding
}

// DefaultKeyMap returns a default set of keybindings.
func DefaultKeyMap() KeyMap {
	return KeyMap{
		// Browsing.
		CursorUp: key.NewBinding(
			key.WithKeys("up", "k"),
			key.WithHelp("↑/k", "up"),
		),
		CursorDown: key.NewBinding(
			key.WithKeys("down", "j"),
			key.WithHelp("↓/j", "down"),
		),
		PrevPage: key.NewBinding(
			key.WithKeys("left", "h", "pgup", "b", "u"),
			key.WithHelp("←/h/pgup", "prev page"),
		),
		NextPage: key.NewBinding(
			key.WithKeys("right", "l", "pgdown", "f", "d"),
			key.WithHelp("→/l/pgdn", "next page"),
		),
		GoToStart: key.NewBinding(
			key.WithKeys("home", "g"),
			key.WithHelp("g/home", "go to start"),
		),
		GoToEnd: key.NewBinding(
			key.WithKeys("end", "G"),
			key.WithHelp("G/end", "go to end"),
		),
		Filter: key.NewBinding(
			key.WithKeys("/"),
			key.WithHelp("/", "filter"),
		),
		ClearFilter: key.NewBinding(
			key.WithKeys("esc"),
			key.WithHelp("esc", "clear filter"),
		),

		// Filtering.
		CancelWhileFiltering: key.NewBinding(
			key.WithKeys("esc"),
			key.WithHelp("esc", "cancel"),
		),
		AcceptWhileFiltering: key.NewBinding(
			key.WithKeys("enter", "tab", "shift+tab", "ctrl+k", "up", "ctrl+j", "down"),
			key.WithHelp("enter", "apply filter"),
		),

		// Toggle help.
		ShowFullHelp: key.NewBinding(
			key.WithKeys("?"),
			key.WithHelp("?", "more"),
		),
		CloseFullHelp: key.NewBinding(
			key.WithKeys("?"),
			key.WithHelp("?", "close help"),
		),

		// Quitting.
		Quit: key.NewBinding(
			key.WithKeys("q", "esc"),
			key.WithHelp("q", "quit"),
		),
		ForceQuit: key.NewBinding(key.WithKeys("ctrl+c")),
	}
}



================================================
FILE: list/list.go
================================================
// Package list provides a feature-rich Bubble Tea component for browsing
// a general purpose list of items. It features optional filtering, pagination,
// help, status messages, and a spinner to indicate activity.
package list

import (
	"fmt"
	"io"
	"sort"
	"strings"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
	"github.com/sahilm/fuzzy"

	"github.com/charmbracelet/bubbles/help"
	"github.com/charmbracelet/bubbles/key"
	"github.com/charmbracelet/bubbles/paginator"
	"github.com/charmbracelet/bubbles/spinner"
	"github.com/charmbracelet/bubbles/textinput"
)

// Item is an item that appears in the list.
type Item interface {
	// FilterValue is the value we use when filtering against this item when
	// we're filtering the list.
	FilterValue() string
}

// ItemDelegate encapsulates the general functionality for all list items. The
// benefit to separating this logic from the item itself is that you can change
// the functionality of items without changing the actual items themselves.
//
// Note that if the delegate also implements help.KeyMap delegate-related
// help items will be added to the help view.
type ItemDelegate interface {
	// Render renders the item's view.
	Render(w io.Writer, m Model, index int, item Item)

	// Height is the height of the list item.
	Height() int

	// Spacing is the size of the horizontal gap between list items in cells.
	Spacing() int

	// Update is the update loop for items. All messages in the list's update
	// loop will pass through here except when the user is setting a filter.
	// Use this method to perform item-level updates appropriate to this
	// delegate.
	Update(msg tea.Msg, m *Model) tea.Cmd
}

type filteredItem struct {
	index   int   // index in the unfiltered list
	item    Item  // item matched
	matches []int // rune indices of matched items
}

type filteredItems []filteredItem

func (f filteredItems) items() []Item {
	agg := make([]Item, len(f))
	for i, v := range f {
		agg[i] = v.item
	}
	return agg
}

// FilterMatchesMsg contains data about items matched during filtering. The
// message should be routed to Update for processing.
type FilterMatchesMsg []filteredItem

// FilterFunc takes a term and a list of strings to search through
// (defined by Item#FilterValue).
// It should return a sorted list of ranks.
type FilterFunc func(string, []string) []Rank

// Rank defines a rank for a given item.
type Rank struct {
	// The index of the item in the original input.
	Index int
	// Indices of the actual word that were matched against the filter term.
	MatchedIndexes []int
}

// DefaultFilter uses the sahilm/fuzzy to filter through the list.
// This is set by default.
func DefaultFilter(term string, targets []string) []Rank {
	ranks := fuzzy.Find(term, targets)
	sort.Stable(ranks)
	result := make([]Rank, len(ranks))
	for i, r := range ranks {
		result[i] = Rank{
			Index:          r.Index,
			MatchedIndexes: r.MatchedIndexes,
		}
	}
	return result
}

// UnsortedFilter uses the sahilm/fuzzy to filter through the list. It does not
// sort the results.
func UnsortedFilter(term string, targets []string) []Rank {
	ranks := fuzzy.FindNoSort(term, targets)
	result := make([]Rank, len(ranks))
	for i, r := range ranks {
		result[i] = Rank{
			Index:          r.Index,
			MatchedIndexes: r.MatchedIndexes,
		}
	}
	return result
}

type statusMessageTimeoutMsg struct{}

// FilterState describes the current filtering state on the model.
type FilterState int

// Possible filter states.
const (
	Unfiltered    FilterState = iota // no filter set
	Filtering                        // user is actively setting a filter
	FilterApplied                    // a filter is applied and user is not editing filter
)

// String returns a human-readable string of the current filter state.
func (f FilterState) String() string {
	return [...]string{
		"unfiltered",
		"filtering",
		"filter applied",
	}[f]
}

// Model contains the state of this component.
type Model struct {
	showTitle        bool
	showFilter       bool
	showStatusBar    bool
	showPagination   bool
	showHelp         bool
	filteringEnabled bool

	itemNameSingular string
	itemNamePlural   string

	Title             string
	Styles            Styles
	InfiniteScrolling bool

	// Key mappings for navigating the list.
	KeyMap KeyMap

	// Filter is used to filter the list.
	Filter FilterFunc

	disableQuitKeybindings bool

	// Additional key mappings for the short and full help views. This allows
	// you to add additional key mappings to the help menu without
	// re-implementing the help component. Of course, you can also disable the
	// list's help component and implement a new one if you need more
	// flexibility.
	AdditionalShortHelpKeys func() []key.Binding
	AdditionalFullHelpKeys  func() []key.Binding

	spinner     spinner.Model
	showSpinner bool
	width       int
	height      int
	Paginator   paginator.Model
	cursor      int
	Help        help.Model
	FilterInput textinput.Model
	filterState FilterState

	// How long status messages should stay visible. By default this is
	// 1 second.
	StatusMessageLifetime time.Duration

	statusMessage      string
	statusMessageTimer *time.Timer

	// The master set of items we're working with.
	items []Item

	// Filtered items we're currently displaying. Filtering, toggles and so on
	// will alter this slice so we can show what is relevant. For that reason,
	// this field should be considered ephemeral.
	filteredItems filteredItems

	delegate ItemDelegate
}

// New returns a new model with sensible defaults.
func New(items []Item, delegate ItemDelegate, width, height int) Model {
	styles := DefaultStyles()

	sp := spinner.New()
	sp.Spinner = spinner.Line
	sp.Style = styles.Spinner

	filterInput := textinput.New()
	filterInput.Prompt = "Filter: "
	filterInput.PromptStyle = styles.FilterPrompt
	filterInput.Cursor.Style = styles.FilterCursor
	filterInput.CharLimit = 64
	filterInput.Focus()

	p := paginator.New()
	p.Type = paginator.Dots
	p.ActiveDot = styles.ActivePaginationDot.String()
	p.InactiveDot = styles.InactivePaginationDot.String()

	m := Model{
		showTitle:             true,
		showFilter:            true,
		showStatusBar:         true,
		showPagination:        true,
		showHelp:              true,
		itemNameSingular:      "item",
		itemNamePlural:        "items",
		filteringEnabled:      true,
		KeyMap:                DefaultKeyMap(),
		Filter:                DefaultFilter,
		Styles:                styles,
		Title:                 "List",
		FilterInput:           filterInput,
		StatusMessageLifetime: time.Second,

		width:     width,
		height:    height,
		delegate:  delegate,
		items:     items,
		Paginator: p,
		spinner:   sp,
		Help:      help.New(),
	}

	m.updatePagination()
	m.updateKeybindings()
	return m
}

// NewModel returns a new model with sensible defaults.
//
// Deprecated: use [New] instead.
var NewModel = New

// SetFilteringEnabled enables or disables filtering. Note that this is different
// from ShowFilter, which merely hides or shows the input view.
func (m *Model) SetFilteringEnabled(v bool) {
	m.filteringEnabled = v
	if !v {
		m.resetFiltering()
	}
	m.updateKeybindings()
}

// FilteringEnabled returns whether or not filtering is enabled.
func (m Model) FilteringEnabled() bool {
	return m.filteringEnabled
}

// SetShowTitle shows or hides the title bar.
func (m *Model) SetShowTitle(v bool) {
	m.showTitle = v
	m.updatePagination()
}

// SetFilterText explicitly sets the filter text without relying on user input.
// It also sets the filterState to a sane default of FilterApplied, but this
// can be changed with SetFilterState.
func (m *Model) SetFilterText(filter string) {
	m.filterState = Filtering
	m.FilterInput.SetValue(filter)
	cmd := filterItems(*m)
	msg := cmd()
	fmm, _ := msg.(FilterMatchesMsg)
	m.filteredItems = filteredItems(fmm)
	m.filterState = FilterApplied
	m.Paginator.Page = 0
	m.cursor = 0
	m.FilterInput.CursorEnd()
	m.updatePagination()
	m.updateKeybindings()
}

// SetFilterState allows setting the filtering state manually.
func (m *Model) SetFilterState(state FilterState) {
	m.Paginator.Page = 0
	m.cursor = 0
	m.filterState = state
	m.FilterInput.CursorEnd()
	m.FilterInput.Focus()
	m.updateKeybindings()
}

// ShowTitle returns whether or not the title bar is set to be rendered.
func (m Model) ShowTitle() bool {
	return m.showTitle
}

// SetShowFilter shows or hides the filter bar. Note that this does not disable
// filtering, it simply hides the built-in filter view. This allows you to
// use the FilterInput to render the filtering UI differently without having to
// re-implement filtering from scratch.
//
// To disable filtering entirely use EnableFiltering.
func (m *Model) SetShowFilter(v bool) {
	m.showFilter = v
	m.updatePagination()
}

// ShowFilter returns whether or not the filter is set to be rendered. Note
// that this is separate from FilteringEnabled, so filtering can be hidden yet
// still invoked. This allows you to render filtering differently without
// having to re-implement it from scratch.
func (m Model) ShowFilter() bool {
	return m.showFilter
}

// SetShowStatusBar shows or hides the view that displays metadata about the
// list, such as item counts.
func (m *Model) SetShowStatusBar(v bool) {
	m.showStatusBar = v
	m.updatePagination()
}

// ShowStatusBar returns whether or not the status bar is set to be rendered.
func (m Model) ShowStatusBar() bool {
	return m.showStatusBar
}

// SetStatusBarItemName defines a replacement for the item's identifier.
// Defaults to item/items.
func (m *Model) SetStatusBarItemName(singular, plural string) {
	m.itemNameSingular = singular
	m.itemNamePlural = plural
}

// StatusBarItemName returns singular and plural status bar item names.
func (m Model) StatusBarItemName() (string, string) {
	return m.itemNameSingular, m.itemNamePlural
}

// SetShowPagination hides or shows the paginator. Note that pagination will
// still be active, it simply won't be displayed.
func (m *Model) SetShowPagination(v bool) {
	m.showPagination = v
	m.updatePagination()
}

// ShowPagination returns whether the pagination is visible.
func (m *Model) ShowPagination() bool {
	return m.showPagination
}

// SetShowHelp shows or hides the help view.
func (m *Model) SetShowHelp(v bool) {
	m.showHelp = v
	m.updatePagination()
}

// ShowHelp returns whether or not the help is set to be rendered.
func (m Model) ShowHelp() bool {
	return m.showHelp
}

// Items returns the items in the list.
func (m Model) Items() []Item {
	return m.items
}

// SetItems sets the items available in the list. This returns a command.
func (m *Model) SetItems(i []Item) tea.Cmd {
	var cmd tea.Cmd
	m.items = i

	if m.filterState != Unfiltered {
		m.filteredItems = nil
		cmd = filterItems(*m)
	}

	m.updatePagination()
	m.updateKeybindings()
	return cmd
}

// Select selects the given index of the list and goes to its respective page.
func (m *Model) Select(index int) {
	m.Paginator.Page = index / m.Paginator.PerPage
	m.cursor = index % m.Paginator.PerPage
}

// ResetSelected resets the selected item to the first item in the first page of the list.
func (m *Model) ResetSelected() {
	m.Select(0)
}

// ResetFilter resets the current filtering state.
func (m *Model) ResetFilter() {
	m.resetFiltering()
}

// SetItem replaces an item at the given index. This returns a command.
func (m *Model) SetItem(index int, item Item) tea.Cmd {
	var cmd tea.Cmd
	m.items[index] = item

	if m.filterState != Unfiltered {
		cmd = filterItems(*m)
	}

	m.updatePagination()
	return cmd
}

// InsertItem inserts an item at the given index. If the index is out of the upper bound,
// the item will be appended. This returns a command.
func (m *Model) InsertItem(index int, item Item) tea.Cmd {
	var cmd tea.Cmd
	m.items = insertItemIntoSlice(m.items, item, index)

	if m.filterState != Unfiltered {
		cmd = filterItems(*m)
	}

	m.updatePagination()
	m.updateKeybindings()
	return cmd
}

// RemoveItem removes an item at the given index. If the index is out of bounds
// this will be a no-op. O(n) complexity, which probably won't matter in the
// case of a TUI.
func (m *Model) RemoveItem(index int) {
	m.items = removeItemFromSlice(m.items, index)
	if m.filterState != Unfiltered {
		m.filteredItems = removeFilterMatchFromSlice(m.filteredItems, index)
		if len(m.filteredItems) == 0 {
			m.resetFiltering()
		}
	}
	m.updatePagination()
}

// SetDelegate sets the item delegate.
func (m *Model) SetDelegate(d ItemDelegate) {
	m.delegate = d
	m.updatePagination()
}

// VisibleItems returns the total items available to be shown.
func (m Model) VisibleItems() []Item {
	if m.filterState != Unfiltered {
		return m.filteredItems.items()
	}
	return m.items
}

// SelectedItem returns the current selected item in the list.
func (m Model) SelectedItem() Item {
	i := m.Index()

	items := m.VisibleItems()
	if i < 0 || len(items) == 0 || len(items) <= i {
		return nil
	}

	return items[i]
}

// MatchesForItem returns rune positions matched by the current filter, if any.
// Use this to style runes matched by the active filter.
//
// See DefaultItemView for a usage example.
func (m Model) MatchesForItem(index int) []int {
	if m.filteredItems == nil || index >= len(m.filteredItems) {
		return nil
	}
	return m.filteredItems[index].matches
}

// Index returns the index of the currently selected item as it is stored in the
// filtered list of items.
// Using this value with SetItem() might be incorrect, consider using
// GlobalIndex() instead.
func (m Model) Index() int {
	return m.Paginator.Page*m.Paginator.PerPage + m.cursor
}

// GlobalIndex returns the index of the currently selected item as it is stored
// in the unfiltered list of items. This value can be used with SetItem().
func (m Model) GlobalIndex() int {
	index := m.Index()

	if m.filteredItems == nil || index >= len(m.filteredItems) {
		return index
	}

	return m.filteredItems[index].index
}

// Cursor returns the index of the cursor on the current page.
func (m Model) Cursor() int {
	return m.cursor
}

// CursorUp moves the cursor up. This can also move the state to the previous
// page.
func (m *Model) CursorUp() {
	m.cursor--

	// If we're at the start, stop
	if m.cursor < 0 && m.Paginator.Page == 0 {
		// if infinite scrolling is enabled, go to the last item
		if m.InfiniteScrolling {
			m.Paginator.Page = m.Paginator.TotalPages - 1
			m.cursor = m.Paginator.ItemsOnPage(len(m.VisibleItems())) - 1
			return
		}

		m.cursor = 0
		return
	}

	// Move the cursor as normal
	if m.cursor >= 0 {
		return
	}

	// Go to the previous page
	m.Paginator.PrevPage()
	m.cursor = m.Paginator.ItemsOnPage(len(m.VisibleItems())) - 1
}

// CursorDown moves the cursor down. This can also advance the state to the
// next page.
func (m *Model) CursorDown() {
	itemsOnPage := m.Paginator.ItemsOnPage(len(m.VisibleItems()))

	m.cursor++

	// If we're at the end, stop
	if m.cursor < itemsOnPage {
		return
	}

	// Go to the next page
	if !m.Paginator.OnLastPage() {
		m.Paginator.NextPage()
		m.cursor = 0
		return
	}

	// During filtering the cursor position can exceed the number of
	// itemsOnPage. It's more intuitive to start the cursor at the
	// topmost position when moving it down in this scenario.
	if m.cursor > itemsOnPage {
		m.cursor = 0
		return
	}

	m.cursor = itemsOnPage - 1

	// if infinite scrolling is enabled, go to the first item
	if m.InfiniteScrolling {
		m.Paginator.Page = 0
		m.cursor = 0
	}
}

// PrevPage moves to the previous page, if available.
func (m *Model) PrevPage() {
	m.Paginator.PrevPage()
}

// NextPage moves to the next page, if available.
func (m *Model) NextPage() {
	m.Paginator.NextPage()
}

// FilterState returns the current filter state.
func (m Model) FilterState() FilterState {
	return m.filterState
}

// FilterValue returns the current value of the filter.
func (m Model) FilterValue() string {
	return m.FilterInput.Value()
}

// SettingFilter returns whether or not the user is currently editing the
// filter value. It's purely a convenience method for the following:
//
//	m.FilterState() == Filtering
//
// It's included here because it's a common thing to check for when
// implementing this component.
func (m Model) SettingFilter() bool {
	return m.filterState == Filtering
}

// IsFiltered returns whether or not the list is currently filtered.
// It's purely a convenience method for the following:
//
//	m.FilterState() == FilterApplied
func (m Model) IsFiltered() bool {
	return m.filterState == FilterApplied
}

// Width returns the current width setting.
func (m Model) Width() int {
	return m.width
}

// Height returns the current height setting.
func (m Model) Height() int {
	return m.height
}

// SetSpinner allows to set the spinner style.
func (m *Model) SetSpinner(spinner spinner.Spinner) {
	m.spinner.Spinner = spinner
}

// ToggleSpinner toggles the spinner. Note that this also returns a command.
func (m *Model) ToggleSpinner() tea.Cmd {
	if !m.showSpinner {
		return m.StartSpinner()
	}
	m.StopSpinner()
	return nil
}

// StartSpinner starts the spinner. Note that this returns a command.
func (m *Model) StartSpinner() tea.Cmd {
	m.showSpinner = true
	return m.spinner.Tick
}

// StopSpinner stops the spinner.
func (m *Model) StopSpinner() {
	m.showSpinner = false
}

// DisableQuitKeybindings is a helper for disabling the keybindings used for quitting,
// in case you want to handle this elsewhere in your application.
func (m *Model) DisableQuitKeybindings() {
	m.disableQuitKeybindings = true
	m.KeyMap.Quit.SetEnabled(false)
	m.KeyMap.ForceQuit.SetEnabled(false)
}

// NewStatusMessage sets a new status message, which will show for a limited
// amount of time. Note that this also returns a command.
func (m *Model) NewStatusMessage(s string) tea.Cmd {
	m.statusMessage = s
	if m.statusMessageTimer != nil {
		m.statusMessageTimer.Stop()
	}

	m.statusMessageTimer = time.NewTimer(m.StatusMessageLifetime)

	// Wait for timeout
	return func() tea.Msg {
		<-m.statusMessageTimer.C
		return statusMessageTimeoutMsg{}
	}
}

// SetSize sets the width and height of this component.
func (m *Model) SetSize(width, height int) {
	m.setSize(width, height)
}

// SetWidth sets the width of this component.
func (m *Model) SetWidth(v int) {
	m.setSize(v, m.height)
}

// SetHeight sets the height of this component.
func (m *Model) SetHeight(v int) {
	m.setSize(m.width, v)
}

func (m *Model) setSize(width, height int) {
	promptWidth := lipgloss.Width(m.Styles.Title.Render(m.FilterInput.Prompt))

	m.width = width
	m.height = height
	m.Help.Width = width
	m.FilterInput.Width = width - promptWidth - lipgloss.Width(m.spinnerView())
	m.updatePagination()
	m.updateKeybindings()
}

func (m *Model) resetFiltering() {
	if m.filterState == Unfiltered {
		return
	}

	m.filterState = Unfiltered
	m.FilterInput.Reset()
	m.filteredItems = nil
	m.updatePagination()
	m.updateKeybindings()
}

func (m Model) itemsAsFilterItems() filteredItems {
	fi := make([]filteredItem, len(m.items))
	for i, item := range m.items {
		fi[i] = filteredItem{
			item: item,
		}
	}
	return fi
}

// Set keybindings according to the filter state.
func (m *Model) updateKeybindings() {
	switch m.filterState { //nolint:exhaustive
	case Filtering:
		m.KeyMap.CursorUp.SetEnabled(false)
		m.KeyMap.CursorDown.SetEnabled(false)
		m.KeyMap.NextPage.SetEnabled(false)
		m.KeyMap.PrevPage.SetEnabled(false)
		m.KeyMap.GoToStart.SetEnabled(false)
		m.KeyMap.GoToEnd.SetEnabled(false)
		m.KeyMap.Filter.SetEnabled(false)
		m.KeyMap.ClearFilter.SetEnabled(false)
		m.KeyMap.CancelWhileFiltering.SetEnabled(true)
		m.KeyMap.AcceptWhileFiltering.SetEnabled(m.FilterInput.Value() != "")
		m.KeyMap.Quit.SetEnabled(false)
		m.KeyMap.ShowFullHelp.SetEnabled(false)
		m.KeyMap.CloseFullHelp.SetEnabled(false)

	default:
		hasItems := len(m.items) != 0
		m.KeyMap.CursorUp.SetEnabled(hasItems)
		m.KeyMap.CursorDown.SetEnabled(hasItems)

		hasPages := m.Paginator.TotalPages > 1
		m.KeyMap.NextPage.SetEnabled(hasPages)
		m.KeyMap.PrevPage.SetEnabled(hasPages)

		m.KeyMap.GoToStart.SetEnabled(hasItems)
		m.KeyMap.GoToEnd.SetEnabled(hasItems)

		m.KeyMap.Filter.SetEnabled(m.filteringEnabled && hasItems)
		m.KeyMap.ClearFilter.SetEnabled(m.filterState == FilterApplied)
		m.KeyMap.CancelWhileFiltering.SetEnabled(false)
		m.KeyMap.AcceptWhileFiltering.SetEnabled(false)
		m.KeyMap.Quit.SetEnabled(!m.disableQuitKeybindings)

		if m.Help.ShowAll {
			m.KeyMap.ShowFullHelp.SetEnabled(true)
			m.KeyMap.CloseFullHelp.SetEnabled(true)
		} else {
			minHelp := countEnabledBindings(m.FullHelp()) > 1
			m.KeyMap.ShowFullHelp.SetEnabled(minHelp)
			m.KeyMap.CloseFullHelp.SetEnabled(minHelp)
		}
	}
}

// Update pagination according to the amount of items for the current state.
func (m *Model) updatePagination() {
	index := m.Index()
	availHeight := m.height

	if m.showTitle || (m.showFilter && m.filteringEnabled) {
		availHeight -= lipgloss.Height(m.titleView())
	}
	if m.showStatusBar {
		availHeight -= lipgloss.Height(m.statusView())
	}
	if m.showPagination {
		availHeight -= lipgloss.Height(m.paginationView())
	}
	if m.showHelp {
		availHeight -= lipgloss.Height(m.helpView())
	}

	m.Paginator.PerPage = max(1, availHeight/(m.delegate.Height()+m.delegate.Spacing()))

	if pages := len(m.VisibleItems()); pages < 1 {
		m.Paginator.SetTotalPages(1)
	} else {
		m.Paginator.SetTotalPages(pages)
	}

	// Restore index
	m.Paginator.Page = index / m.Paginator.PerPage
	m.cursor = index % m.Paginator.PerPage

	// Make sure the page stays in bounds
	if m.Paginator.Page >= m.Paginator.TotalPages-1 {
		m.Paginator.Page = max(0, m.Paginator.TotalPages-1)
	}
}

func (m *Model) hideStatusMessage() {
	m.statusMessage = ""
	if m.statusMessageTimer != nil {
		m.statusMessageTimer.Stop()
	}
}

// Update is the Bubble Tea update loop.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	var cmds []tea.Cmd

	switch msg := msg.(type) {
	case tea.KeyMsg:
		if key.Matches(msg, m.KeyMap.ForceQuit) {
			return m, tea.Quit
		}

	case FilterMatchesMsg:
		m.filteredItems = filteredItems(msg)
		return m, nil

	case spinner.TickMsg:
		newSpinnerModel, cmd := m.spinner.Update(msg)
		m.spinner = newSpinnerModel
		if m.showSpinner {
			cmds = append(cmds, cmd)
		}

	case statusMessageTimeoutMsg:
		m.hideStatusMessage()
	}

	if m.filterState == Filtering {
		cmds = append(cmds, m.handleFiltering(msg))
	} else {
		cmds = append(cmds, m.handleBrowsing(msg))
	}

	return m, tea.Batch(cmds...)
}

// Updates for when a user is browsing the list.
func (m *Model) handleBrowsing(msg tea.Msg) tea.Cmd {
	var cmds []tea.Cmd
	numItems := len(m.VisibleItems())

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch {
		// Note: we match clear filter before quit because, by default, they're
		// both mapped to escape.
		case key.Matches(msg, m.KeyMap.ClearFilter):
			m.resetFiltering()

		case key.Matches(msg, m.KeyMap.Quit):
			return tea.Quit

		case key.Matches(msg, m.KeyMap.CursorUp):
			m.CursorUp()

		case key.Matches(msg, m.KeyMap.CursorDown):
			m.CursorDown()

		case key.Matches(msg, m.KeyMap.PrevPage):
			m.Paginator.PrevPage()

		case key.Matches(msg, m.KeyMap.NextPage):
			m.Paginator.NextPage()

		case key.Matches(msg, m.KeyMap.GoToStart):
			m.Paginator.Page = 0
			m.cursor = 0

		case key.Matches(msg, m.KeyMap.GoToEnd):
			m.Paginator.Page = m.Paginator.TotalPages - 1
			m.cursor = m.Paginator.ItemsOnPage(numItems) - 1

		case key.Matches(msg, m.KeyMap.Filter):
			m.hideStatusMessage()
			if m.FilterInput.Value() == "" {
				// Populate filter with all items only if the filter is empty.
				m.filteredItems = m.itemsAsFilterItems()
			}
			m.Paginator.Page = 0
			m.cursor = 0
			m.filterState = Filtering
			m.FilterInput.CursorEnd()
			m.FilterInput.Focus()
			m.updateKeybindings()
			return textinput.Blink

		case key.Matches(msg, m.KeyMap.ShowFullHelp):
			fallthrough
		case key.Matches(msg, m.KeyMap.CloseFullHelp):
			m.Help.ShowAll = !m.Help.ShowAll
			m.updatePagination()
		}
	}

	cmd := m.delegate.Update(msg, m)
	cmds = append(cmds, cmd)

	// Keep the index in bounds when paginating
	itemsOnPage := m.Paginator.ItemsOnPage(len(m.VisibleItems()))
	if m.cursor > itemsOnPage-1 {
		m.cursor = max(0, itemsOnPage-1)
	}

	return tea.Batch(cmds...)
}

// Updates for when a user is in the filter editing interface.
func (m *Model) handleFiltering(msg tea.Msg) tea.Cmd {
	var cmds []tea.Cmd

	// Handle keys
	if msg, ok := msg.(tea.KeyMsg); ok {
		switch {
		case key.Matches(msg, m.KeyMap.CancelWhileFiltering):
			m.resetFiltering()
			m.KeyMap.Filter.SetEnabled(true)
			m.KeyMap.ClearFilter.SetEnabled(false)

		case key.Matches(msg, m.KeyMap.AcceptWhileFiltering):
			m.hideStatusMessage()

			if len(m.items) == 0 {
				break
			}

			h := m.VisibleItems()

			// If we've filtered down to nothing, clear the filter
			if len(h) == 0 {
				m.resetFiltering()
				break
			}

			m.FilterInput.Blur()
			m.filterState = FilterApplied
			m.updateKeybindings()

			if m.FilterInput.Value() == "" {
				m.resetFiltering()
			}
		}
	}

	// Update the filter text input component
	newFilterInputModel, inputCmd := m.FilterInput.Update(msg)
	filterChanged := m.FilterInput.Value() != newFilterInputModel.Value()
	m.FilterInput = newFilterInputModel
	cmds = append(cmds, inputCmd)

	// If the filtering input has changed, request updated filtering
	if filterChanged {
		cmds = append(cmds, filterItems(*m))
		m.KeyMap.AcceptWhileFiltering.SetEnabled(m.FilterInput.Value() != "")
	}

	// Update pagination
	m.updatePagination()

	return tea.Batch(cmds...)
}

// ShortHelp returns bindings to show in the abbreviated help view. It's part
// of the help.KeyMap interface.
func (m Model) ShortHelp() []key.Binding {
	kb := []key.Binding{
		m.KeyMap.CursorUp,
		m.KeyMap.CursorDown,
	}

	filtering := m.filterState == Filtering

	// If the delegate implements the help.KeyMap interface add the short help
	// items to the short help after the cursor movement keys.
	if !filtering {
		if b, ok := m.delegate.(help.KeyMap); ok {
			kb = append(kb, b.ShortHelp()...)
		}
	}

	kb = append(kb,
		m.KeyMap.Filter,
		m.KeyMap.ClearFilter,
		m.KeyMap.AcceptWhileFiltering,
		m.KeyMap.CancelWhileFiltering,
	)

	if !filtering && m.AdditionalShortHelpKeys != nil {
		kb = append(kb, m.AdditionalShortHelpKeys()...)
	}

	return append(kb,
		m.KeyMap.Quit,
		m.KeyMap.ShowFullHelp,
	)
}

// FullHelp returns bindings to show the full help view. It's part of the
// help.KeyMap interface.
func (m Model) FullHelp() [][]key.Binding {
	kb := [][]key.Binding{{
		m.KeyMap.CursorUp,
		m.KeyMap.CursorDown,
		m.KeyMap.NextPage,
		m.KeyMap.PrevPage,
		m.KeyMap.GoToStart,
		m.KeyMap.GoToEnd,
	}}

	filtering := m.filterState == Filtering

	// If the delegate implements the help.KeyMap interface add full help
	// keybindings to a special section of the full help.
	if !filtering {
		if b, ok := m.delegate.(help.KeyMap); ok {
			kb = append(kb, b.FullHelp()...)
		}
	}

	listLevelBindings := []key.Binding{
		m.KeyMap.Filter,
		m.KeyMap.ClearFilter,
		m.KeyMap.AcceptWhileFiltering,
		m.KeyMap.CancelWhileFiltering,
	}

	if !filtering && m.AdditionalFullHelpKeys != nil {
		listLevelBindings = append(listLevelBindings, m.AdditionalFullHelpKeys()...)
	}

	return append(kb,
		listLevelBindings,
		[]key.Binding{
			m.KeyMap.Quit,
			m.KeyMap.CloseFullHelp,
		})
}

// View renders the component.
func (m Model) View() string {
	var (
		sections    []string
		availHeight = m.height
	)

	if m.showTitle || (m.showFilter && m.filteringEnabled) {
		v := m.titleView()
		sections = append(sections, v)
		availHeight -= lipgloss.Height(v)
	}

	if m.showStatusBar {
		v := m.statusView()
		sections = append(sections, v)
		availHeight -= lipgloss.Height(v)
	}

	var pagination string
	if m.showPagination {
		pagination = m.paginationView()
		availHeight -= lipgloss.Height(pagination)
	}

	var help string
	if m.showHelp {
		help = m.helpView()
		availHeight -= lipgloss.Height(help)
	}

	content := lipgloss.NewStyle().Height(availHeight).Render(m.populatedView())
	sections = append(sections, content)

	if m.showPagination {
		sections = append(sections, pagination)
	}

	if m.showHelp {
		sections = append(sections, help)
	}

	return lipgloss.JoinVertical(lipgloss.Left, sections...)
}

func (m Model) titleView() string {
	var (
		view          string
		titleBarStyle = m.Styles.TitleBar

		// We need to account for the size of the spinner, even if we don't
		// render it, to reserve some space for it should we turn it on later.
		spinnerView    = m.spinnerView()
		spinnerWidth   = lipgloss.Width(spinnerView)
		spinnerLeftGap = " "
		spinnerOnLeft  = titleBarStyle.GetPaddingLeft() >= spinnerWidth+lipgloss.Width(spinnerLeftGap) && m.showSpinner
	)

	// If the filter's showing, draw that. Otherwise draw the title.
	if m.showFilter && m.filterState == Filtering {
		view += m.FilterInput.View()
	} else if m.showTitle {
		if m.showSpinner && spinnerOnLeft {
			view += spinnerView + spinnerLeftGap
			titleBarGap := titleBarStyle.GetPaddingLeft()
			titleBarStyle = titleBarStyle.PaddingLeft(titleBarGap - spinnerWidth - lipgloss.Width(spinnerLeftGap))
		}

		view += m.Styles.Title.Render(m.Title)

		// Status message
		if m.filterState != Filtering {
			view += "  " + m.statusMessage
			view = ansi.Truncate(view, m.width-spinnerWidth, ellipsis)
		}
	}

	// Spinner
	if m.showSpinner && !spinnerOnLeft {
		// Place spinner on the right
		availSpace := m.width - lipgloss.Width(m.Styles.TitleBar.Render(view))
		if availSpace > spinnerWidth {
			view += strings.Repeat(" ", availSpace-spinnerWidth)
			view += spinnerView
		}
	}

	if len(view) > 0 {
		return titleBarStyle.Render(view)
	}
	return view
}

func (m Model) statusView() string {
	var status string

	totalItems := len(m.items)
	visibleItems := len(m.VisibleItems())

	var itemName string
	if visibleItems != 1 {
		itemName = m.itemNamePlural
	} else {
		itemName = m.itemNameSingular
	}

	itemsDisplay := fmt.Sprintf("%d %s", visibleItems, itemName)

	if m.filterState == Filtering { //nolint:nestif
		// Filter results
		if visibleItems == 0 {
			status = m.Styles.StatusEmpty.Render("Nothing matched")
		} else {
			status = itemsDisplay
		}
	} else if len(m.items) == 0 {
		// Not filtering: no items.
		status = m.Styles.StatusEmpty.Render("No " + m.itemNamePlural)
	} else {
		// Normal
		filtered := m.FilterState() == FilterApplied

		if filtered {
			f := strings.TrimSpace(m.FilterInput.Value())
			f = ansi.Truncate(f, 10, "…") //nolint:mnd
			status += fmt.Sprintf("“%s” ", f)
		}

		status += itemsDisplay
	}

	numFiltered := totalItems - visibleItems
	if numFiltered > 0 {
		status += m.Styles.DividerDot.String()
		status += m.Styles.StatusBarFilterCount.Render(fmt.Sprintf("%d filtered", numFiltered))
	}

	return m.Styles.StatusBar.Render(status)
}

func (m Model) paginationView() string {
	if m.Paginator.TotalPages < 2 { //nolint:mnd
		return ""
	}

	s := m.Paginator.View()

	// If the dot pagination is wider than the width of the window
	// use the arabic paginator.
	if ansi.StringWidth(s) > m.width {
		m.Paginator.Type = paginator.Arabic
		s = m.Styles.ArabicPagination.Render(m.Paginator.View())
	}

	style := m.Styles.PaginationStyle
	if m.delegate.Spacing() == 0 && style.GetMarginTop() == 0 {
		style = style.MarginTop(1)
	}

	return style.Render(s)
}

func (m Model) populatedView() string {
	items := m.VisibleItems()

	var b strings.Builder

	// Empty states
	if len(items) == 0 {
		if m.filterState == Filtering {
			return ""
		}
		return m.Styles.NoItems.Render("No " + m.itemNamePlural + ".")
	}

	if len(items) > 0 {
		start, end := m.Paginator.GetSliceBounds(len(items))
		docs := items[start:end]

		for i, item := range docs {
			m.delegate.Render(&b, m, i+start, item)
			if i != len(docs)-1 {
				fmt.Fprint(&b, strings.Repeat("\n", m.delegate.Spacing()+1))
			}
		}
	}

	// If there aren't enough items to fill up this page (always the last page)
	// then we need to add some newlines to fill up the space where items would
	// have been.
	itemsOnPage := m.Paginator.ItemsOnPage(len(items))
	if itemsOnPage < m.Paginator.PerPage {
		n := (m.Paginator.PerPage - itemsOnPage) * (m.delegate.Height() + m.delegate.Spacing())
		if len(items) == 0 {
			n -= m.delegate.Height() - 1
		}
		fmt.Fprint(&b, strings.Repeat("\n", n))
	}

	return b.String()
}

func (m Model) helpView() string {
	return m.Styles.HelpStyle.Render(m.Help.View(m))
}

func (m Model) spinnerView() string {
	return m.spinner.View()
}

func filterItems(m Model) tea.Cmd {
	return func() tea.Msg {
		if m.FilterInput.Value() == "" || m.filterState == Unfiltered {
			return FilterMatchesMsg(m.itemsAsFilterItems()) // return nothing
		}

		items := m.items
		targets := make([]string, len(items))

		for i, t := range items {
			targets[i] = t.FilterValue()
		}

		filterMatches := []filteredItem{}
		for _, r := range m.Filter(m.FilterInput.Value(), targets) {
			filterMatches = append(filterMatches, filteredItem{
				index:   r.Index,
				item:    items[r.Index],
				matches: r.MatchedIndexes,
			})
		}

		return FilterMatchesMsg(filterMatches)
	}
}

func insertItemIntoSlice(items []Item, item Item, index int) []Item {
	if items == nil {
		return []Item{item}
	}
	if index >= len(items) {
		return append(items, item)
	}

	index = max(0, index)

	items = append(items, nil)
	copy(items[index+1:], items[index:])
	items[index] = item
	return items
}

// Remove an item from a slice of items at the given index. This runs in O(n).
func removeItemFromSlice(i []Item, index int) []Item {
	if index >= len(i) {
		return i // noop
	}
	copy(i[index:], i[index+1:])
	i[len(i)-1] = nil
	return i[:len(i)-1]
}

func removeFilterMatchFromSlice(i []filteredItem, index int) []filteredItem {
	if index >= len(i) {
		return i // noop
	}
	copy(i[index:], i[index+1:])
	i[len(i)-1] = filteredItem{}
	return i[:len(i)-1]
}

func countEnabledBindings(groups [][]key.Binding) (agg int) {
	for _, group := range groups {
		for _, kb := range group {
			if kb.Enabled() {
				agg++
			}
		}
	}
	return agg
}



================================================
FILE: list/list_test.go
================================================
package list

import (
	"fmt"
	"io"
	"reflect"
	"strings"
	"testing"

	tea "github.com/charmbracelet/bubbletea"
)

type item string

func (i item) FilterValue() string { return string(i) }

type itemDelegate struct{}

func (d itemDelegate) Height() int                          { return 1 }
func (d itemDelegate) Spacing() int                         { return 0 }
func (d itemDelegate) Update(msg tea.Msg, m *Model) tea.Cmd { return nil }
func (d itemDelegate) Render(w io.Writer, m Model, index int, listItem Item) {
	i, ok := listItem.(item)
	if !ok {
		return
	}

	str := fmt.Sprintf("%d. %s", index+1, i)
	fmt.Fprint(w, m.Styles.TitleBar.Render(str))
}

func TestStatusBarItemName(t *testing.T) {
	list := New([]Item{item("foo"), item("bar")}, itemDelegate{}, 10, 10)
	expected := "2 items"
	if !strings.Contains(list.statusView(), expected) {
		t.Fatalf("Error: expected view to contain %s", expected)
	}

	list.SetItems([]Item{item("foo")})
	expected = "1 item"
	if !strings.Contains(list.statusView(), expected) {
		t.Fatalf("Error: expected view to contain %s", expected)
	}
}

func TestStatusBarWithoutItems(t *testing.T) {
	list := New([]Item{}, itemDelegate{}, 10, 10)

	expected := "No items"
	if !strings.Contains(list.statusView(), expected) {
		t.Fatalf("Error: expected view to contain %s", expected)
	}
}

func TestCustomStatusBarItemName(t *testing.T) {
	list := New([]Item{item("foo"), item("bar")}, itemDelegate{}, 10, 10)
	list.SetStatusBarItemName("connection", "connections")

	expected := "2 connections"
	if !strings.Contains(list.statusView(), expected) {
		t.Fatalf("Error: expected view to contain %s", expected)
	}

	list.SetItems([]Item{item("foo")})
	expected = "1 connection"
	if !strings.Contains(list.statusView(), expected) {
		t.Fatalf("Error: expected view to contain %s", expected)
	}

	list.SetItems([]Item{})
	expected = "No connections"
	if !strings.Contains(list.statusView(), expected) {
		t.Fatalf("Error: expected view to contain %s", expected)
	}
}

func TestSetFilterText(t *testing.T) {
	tc := []Item{item("foo"), item("bar"), item("baz")}

	list := New(tc, itemDelegate{}, 10, 10)
	list.SetFilterText("ba")

	list.SetFilterState(Unfiltered)
	expected := tc
	// TODO: replace with slices.Equal() when project move to go1.18 or later
	if !reflect.DeepEqual(list.VisibleItems(), expected) {
		t.Fatalf("Error: expected view to contain only %s", expected)
	}

	list.SetFilterState(Filtering)
	expected = []Item{item("bar"), item("baz")}
	if !reflect.DeepEqual(list.VisibleItems(), expected) {
		t.Fatalf("Error: expected view to contain only %s", expected)
	}

	list.SetFilterState(FilterApplied)
	if !reflect.DeepEqual(list.VisibleItems(), expected) {
		t.Fatalf("Error: expected view to contain only %s", expected)
	}
}

func TestSetFilterState(t *testing.T) {
	tc := []Item{item("foo"), item("bar"), item("baz")}

	list := New(tc, itemDelegate{}, 10, 10)
	list.SetFilterText("ba")

	list.SetFilterState(Unfiltered)
	expected, notExpected := "up", "clear filter"

	lines := strings.Split(list.View(), "\n")
	footer := lines[len(lines)-1]

	if !strings.Contains(footer, expected) || strings.Contains(footer, notExpected) {
		t.Fatalf("Error: expected view to contain '%s' not '%s'", expected, notExpected)
	}

	list.SetFilterState(Filtering)
	expected, notExpected = "filter", "more"

	lines = strings.Split(list.View(), "\n")
	footer = lines[len(lines)-1]

	if !strings.Contains(footer, expected) || strings.Contains(footer, notExpected) {
		t.Fatalf("Error: expected view to contain '%s' not '%s'", expected, notExpected)
	}

	list.SetFilterState(FilterApplied)
	expected = "clear"

	lines = strings.Split(list.View(), "\n")
	footer = lines[len(lines)-1]

	if !strings.Contains(footer, expected) {
		t.Fatalf("Error: expected view to contain '%s'", expected)
	}
}



================================================
FILE: list/style.go
================================================
package list

import (
	"github.com/charmbracelet/lipgloss"
)

const (
	bullet   = "•"
	ellipsis = "…"
)

// Styles contains style definitions for this list component. By default, these
// values are generated by DefaultStyles.
type Styles struct {
	TitleBar     lipgloss.Style
	Title        lipgloss.Style
	Spinner      lipgloss.Style
	FilterPrompt lipgloss.Style
	FilterCursor lipgloss.Style

	// Default styling for matched characters in a filter. This can be
	// overridden by delegates.
	DefaultFilterCharacterMatch lipgloss.Style

	StatusBar             lipgloss.Style
	StatusEmpty           lipgloss.Style
	StatusBarActiveFilter lipgloss.Style
	StatusBarFilterCount  lipgloss.Style

	NoItems lipgloss.Style

	PaginationStyle lipgloss.Style
	HelpStyle       lipgloss.Style

	// Styled characters.
	ActivePaginationDot   lipgloss.Style
	InactivePaginationDot lipgloss.Style
	ArabicPagination      lipgloss.Style
	DividerDot            lipgloss.Style
}

// DefaultStyles returns a set of default style definitions for this list
// component.
func DefaultStyles() (s Styles) {
	verySubduedColor := lipgloss.AdaptiveColor{Light: "#DDDADA", Dark: "#3C3C3C"}
	subduedColor := lipgloss.AdaptiveColor{Light: "#9B9B9B", Dark: "#5C5C5C"}

	s.TitleBar = lipgloss.NewStyle().Padding(0, 0, 1, 2) //nolint:mnd

	s.Title = lipgloss.NewStyle().
		Background(lipgloss.Color("62")).
		Foreground(lipgloss.Color("230")).
		Padding(0, 1)

	s.Spinner = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#8E8E8E", Dark: "#747373"})

	s.FilterPrompt = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#04B575", Dark: "#ECFD65"})

	s.FilterCursor = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#EE6FF8", Dark: "#EE6FF8"})

	s.DefaultFilterCharacterMatch = lipgloss.NewStyle().Underline(true)

	s.StatusBar = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#A49FA5", Dark: "#777777"}).
		Padding(0, 0, 1, 2) //nolint:mnd

	s.StatusEmpty = lipgloss.NewStyle().Foreground(subduedColor)

	s.StatusBarActiveFilter = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#1a1a1a", Dark: "#dddddd"})

	s.StatusBarFilterCount = lipgloss.NewStyle().Foreground(verySubduedColor)

	s.NoItems = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#909090", Dark: "#626262"})

	s.ArabicPagination = lipgloss.NewStyle().Foreground(subduedColor)

	s.PaginationStyle = lipgloss.NewStyle().PaddingLeft(2) //nolint:mnd

	s.HelpStyle = lipgloss.NewStyle().Padding(1, 0, 0, 2) //nolint:mnd

	s.ActivePaginationDot = lipgloss.NewStyle().
		Foreground(lipgloss.AdaptiveColor{Light: "#847A85", Dark: "#979797"}).
		SetString(bullet)

	s.InactivePaginationDot = lipgloss.NewStyle().
		Foreground(verySubduedColor).
		SetString(bullet)

	s.DividerDot = lipgloss.NewStyle().
		Foreground(verySubduedColor).
		SetString(" " + bullet + " ")

	return s
}



================================================
FILE: paginator/paginator.go
================================================
// Package paginator provides a Bubble Tea package for calculating pagination
// and rendering pagination info. Note that this package does not render actual
// pages: it's purely for handling keystrokes related to pagination, and
// rendering pagination status.
package paginator

import (
	"fmt"

	"github.com/charmbracelet/bubbles/key"
	tea "github.com/charmbracelet/bubbletea"
)

// Type specifies the way we render pagination.
type Type int

// Pagination rendering options.
const (
	Arabic Type = iota
	Dots
)

// KeyMap is the key bindings for different actions within the paginator.
type KeyMap struct {
	PrevPage key.Binding
	NextPage key.Binding
}

// DefaultKeyMap is the default set of key bindings for navigating and acting
// upon the paginator.
var DefaultKeyMap = KeyMap{
	PrevPage: key.NewBinding(key.WithKeys("pgup", "left", "h")),
	NextPage: key.NewBinding(key.WithKeys("pgdown", "right", "l")),
}

// Model is the Bubble Tea model for this user interface.
type Model struct {
	// Type configures how the pagination is rendered (Arabic, Dots).
	Type Type
	// Page is the current page number.
	Page int
	// PerPage is the number of items per page.
	PerPage int
	// TotalPages is the total number of pages.
	TotalPages int
	// ActiveDot is used to mark the current page under the Dots display type.
	ActiveDot string
	// InactiveDot is used to mark inactive pages under the Dots display type.
	InactiveDot string
	// ArabicFormat is the printf-style format to use for the Arabic display type.
	ArabicFormat string

	// KeyMap encodes the keybindings recognized by the widget.
	KeyMap KeyMap

	// Deprecated: customize [KeyMap] instead.
	UsePgUpPgDownKeys bool
	// Deprecated: customize [KeyMap] instead.
	UseLeftRightKeys bool
	// Deprecated: customize [KeyMap] instead.
	UseUpDownKeys bool
	// Deprecated: customize [KeyMap] instead.
	UseHLKeys bool
	// Deprecated: customize [KeyMap] instead.
	UseJKKeys bool
}

// SetTotalPages is a helper function for calculating the total number of pages
// from a given number of items. Its use is optional since this pager can be
// used for other things beyond navigating sets. Note that it both returns the
// number of total pages and alters the model.
func (m *Model) SetTotalPages(items int) int {
	if items < 1 {
		return m.TotalPages
	}
	n := items / m.PerPage
	if items%m.PerPage > 0 {
		n++
	}
	m.TotalPages = n
	return n
}

// ItemsOnPage is a helper function for returning the number of items on the
// current page given the total number of items passed as an argument.
func (m Model) ItemsOnPage(totalItems int) int {
	if totalItems < 1 {
		return 0
	}
	start, end := m.GetSliceBounds(totalItems)
	return end - start
}

// GetSliceBounds is a helper function for paginating slices. Pass the length
// of the slice you're rendering and you'll receive the start and end bounds
// corresponding to the pagination. For example:
//
//	bunchOfStuff := []stuff{...}
//	start, end := model.GetSliceBounds(len(bunchOfStuff))
//	sliceToRender := bunchOfStuff[start:end]
func (m *Model) GetSliceBounds(length int) (start int, end int) {
	start = m.Page * m.PerPage
	end = min(m.Page*m.PerPage+m.PerPage, length)
	return start, end
}

// PrevPage is a helper function for navigating one page backward. It will not
// page beyond the first page (i.e. page 0).
func (m *Model) PrevPage() {
	if m.Page > 0 {
		m.Page--
	}
}

// NextPage is a helper function for navigating one page forward. It will not
// page beyond the last page (i.e. totalPages - 1).
func (m *Model) NextPage() {
	if !m.OnLastPage() {
		m.Page++
	}
}

// OnLastPage returns whether or not we're on the last page.
func (m Model) OnLastPage() bool {
	return m.Page == m.TotalPages-1
}

// OnFirstPage returns whether or not we're on the first page.
func (m Model) OnFirstPage() bool {
	return m.Page == 0
}

// Option is used to set options in New.
type Option func(*Model)

// New creates a new model with defaults.
func New(opts ...Option) Model {
	m := Model{
		Type:         Arabic,
		Page:         0,
		PerPage:      1,
		TotalPages:   1,
		KeyMap:       DefaultKeyMap,
		ActiveDot:    "•",
		InactiveDot:  "○",
		ArabicFormat: "%d/%d",
	}

	for _, opt := range opts {
		opt(&m)
	}

	return m
}

// NewModel creates a new model with defaults.
//
// Deprecated: use [New] instead.
var NewModel = New

// WithTotalPages sets the total pages.
func WithTotalPages(totalPages int) Option {
	return func(m *Model) {
		m.TotalPages = totalPages
	}
}

// WithPerPage sets the total pages.
func WithPerPage(perPage int) Option {
	return func(m *Model) {
		m.PerPage = perPage
	}
}

// Update is the Tea update function which binds keystrokes to pagination.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch {
		case key.Matches(msg, m.KeyMap.NextPage):
			m.NextPage()
		case key.Matches(msg, m.KeyMap.PrevPage):
			m.PrevPage()
		}
	}

	return m, nil
}

// View renders the pagination to a string.
func (m Model) View() string {
	switch m.Type { //nolint:exhaustive
	case Dots:
		return m.dotsView()
	default:
		return m.arabicView()
	}
}

func (m Model) dotsView() string {
	var s string
	for i := 0; i < m.TotalPages; i++ {
		if i == m.Page {
			s += m.ActiveDot
			continue
		}
		s += m.InactiveDot
	}
	return s
}

func (m Model) arabicView() string {
	return fmt.Sprintf(m.ArabicFormat, m.Page+1, m.TotalPages)
}



================================================
FILE: paginator/paginator_test.go
================================================
package paginator

import (
	"testing"

	tea "github.com/charmbracelet/bubbletea"
)

func TestNew(t *testing.T) {
	model := New()

	if model.PerPage != 1 {
		t.Errorf("PerPage = %d, expected %d", model.PerPage, 1)
	}
	if model.TotalPages != 1 {
		t.Errorf("TotalPages = %d, expected %d", model.TotalPages, 1)
	}

	perPage := 42
	totalPages := 42

	model = New(
		WithPerPage(perPage),
		WithTotalPages(totalPages),
	)

	if model.PerPage != perPage {
		t.Errorf("PerPage = %d, expected %d", model.PerPage, perPage)
	}
	if model.TotalPages != totalPages {
		t.Errorf("TotalPages = %d, expected %d", model.TotalPages, totalPages)
	}
}

func TestSetTotalPages(t *testing.T) {
	tests := []struct {
		name         string
		items        int // total no of items to be set
		initialTotal int // intital total pages for the testcase
		expected     int // expected value after SetTotalPages function call
	}{
		{"Less than one page", 5, 1, 5},
		{"Exactly one page", 10, 1, 10},
		{"More than one page", 15, 1, 15},
		{"negative value for page", -10, 1, 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			model := New()
			if model.TotalPages != tt.initialTotal {
				model.SetTotalPages(tt.initialTotal)
			}
			model.SetTotalPages(tt.items)
			if model.TotalPages != tt.expected {
				t.Errorf("TotalPages = %d, expected %d", model.TotalPages, tt.expected)
			}
		})
	}
}

func TestPrevPage(t *testing.T) {
	tests := []struct {
		name       string
		totalPages int // Total pages to be set for the testcase
		page       int // intital page for test
		expected   int
	}{
		{"Go to previous page", 10, 1, 0},
		{"Stay on first page", 5, 0, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			model := New()
			model.SetTotalPages(tt.totalPages)
			model.Page = tt.page

			model, _ = model.Update(tea.KeyMsg{Type: tea.KeyLeft, Alt: false, Runes: []rune{}})
			if model.Page != tt.expected {
				t.Errorf("PrevPage() = %d, expected %d", model.Page, tt.expected)
			}
		})
	}
}

func TestNextPage(t *testing.T) {
	tests := []struct {
		name       string
		totalPages int
		page       int
		expected   int
	}{
		{"Go to next page", 2, 0, 1},
		{"Stay on last page", 2, 1, 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			model := New()
			model.SetTotalPages(tt.totalPages)
			model.Page = tt.page

			model, _ = model.Update(tea.KeyMsg{Type: tea.KeyRight, Alt: false, Runes: []rune{}})
			if model.Page != tt.expected {
				t.Errorf("NextPage() = %d, expected %d", model.Page, tt.expected)
			}
		})
	}
}

func TestOnLastPage(t *testing.T) {
	tests := []struct {
		name       string
		page       int
		totalPages int
		expected   bool
	}{
		{"On last page", 1, 2, true},
		{"Not on last page", 0, 2, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			model := New()
			model.SetTotalPages(tt.totalPages)
			model.Page = tt.page

			if result := model.OnLastPage(); result != tt.expected {
				t.Errorf("OnLastPage() = %t, expected %t", result, tt.expected)
			}
		})
	}
}

func TestOnFirstPage(t *testing.T) {
	tests := []struct {
		name       string
		page       int
		totalPages int
		expected   bool
	}{
		{"On first page", 0, 2, true},
		{"Not on first page", 1, 2, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			model := New()
			model.SetTotalPages(tt.totalPages)
			model.Page = tt.page

			if result := model.OnFirstPage(); result != tt.expected {
				t.Errorf("OnFirstPage() = %t, expected %t", result, tt.expected)
			}
		})
	}
}

func TestItemsOnPage(t *testing.T) {
	testCases := []struct {
		currentPage   int // current page to be set for the testcase
		totalPages    int // Total pages to be set for the testcase
		totalItems    int // Total items
		expectedItems int // expected items on current page
	}{
		{1, 10, 10, 1},
		{3, 10, 10, 1},
		{7, 10, 10, 1},
	}

	for _, tc := range testCases {
		model := New()
		model.Page = tc.currentPage
		model.SetTotalPages(tc.totalPages)
		if actualItems := model.ItemsOnPage(tc.totalItems); actualItems != tc.expectedItems {
			t.Errorf("ItemsOnPage() returned %d, expected %d for total items %d", actualItems, tc.expectedItems, tc.totalItems)
		}
	}
}



================================================
FILE: progress/progress.go
================================================
// Package progress provides a simple progress bar for Bubble Tea applications.
package progress

import (
	"fmt"
	"math"
	"strings"
	"sync/atomic"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/harmonica"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
	"github.com/lucasb-eyer/go-colorful"
	"github.com/muesli/termenv"
)

// Internal ID management. Used during animating to assure that frame messages
// can only be received by progress components that sent them.
var lastID int64

func nextID() int {
	return int(atomic.AddInt64(&lastID, 1))
}

const (
	fps              = 60
	defaultWidth     = 40
	defaultFrequency = 18.0
	defaultDamping   = 1.0
)

// Option is used to set options in New. For example:
//
//	    progress := New(
//		       WithRamp("#ff0000", "#0000ff"),
//		       WithoutPercentage(),
//	    )
type Option func(*Model)

// WithDefaultGradient sets a gradient fill with default colors.
func WithDefaultGradient() Option {
	return WithGradient("#5A56E0", "#EE6FF8")
}

// WithGradient sets a gradient fill blending between two colors.
func WithGradient(colorA, colorB string) Option {
	return func(m *Model) {
		m.setRamp(colorA, colorB, false)
	}
}

// WithDefaultScaledGradient sets a gradient with default colors, and scales the
// gradient to fit the filled portion of the ramp.
func WithDefaultScaledGradient() Option {
	return WithScaledGradient("#5A56E0", "#EE6FF8")
}

// WithScaledGradient scales the gradient to fit the width of the filled portion of
// the progress bar.
func WithScaledGradient(colorA, colorB string) Option {
	return func(m *Model) {
		m.setRamp(colorA, colorB, true)
	}
}

// WithSolidFill sets the progress to use a solid fill with the given color.
func WithSolidFill(color string) Option {
	return func(m *Model) {
		m.FullColor = color
		m.useRamp = false
	}
}

// WithFillCharacters sets the characters used to construct the full and empty components of the progress bar.
func WithFillCharacters(full rune, empty rune) Option {
	return func(m *Model) {
		m.Full = full
		m.Empty = empty
	}
}

// WithoutPercentage hides the numeric percentage.
func WithoutPercentage() Option {
	return func(m *Model) {
		m.ShowPercentage = false
	}
}

// WithWidth sets the initial width of the progress bar. Note that you can also
// set the width via the Width property, which can come in handy if you're
// waiting for a tea.WindowSizeMsg.
func WithWidth(w int) Option {
	return func(m *Model) {
		m.Width = w
	}
}

// WithSpringOptions sets the initial frequency and damping options for the
// progress bar's built-in spring-based animation. Frequency corresponds to
// speed, and damping to bounciness. For details see:
//
// https://github.com/charmbracelet/harmonica
func WithSpringOptions(frequency, damping float64) Option {
	return func(m *Model) {
		m.SetSpringOptions(frequency, damping)
		m.springCustomized = true
	}
}

// WithColorProfile sets the color profile to use for the progress bar.
func WithColorProfile(p termenv.Profile) Option {
	return func(m *Model) {
		m.colorProfile = p
	}
}

// FrameMsg indicates that an animation step should occur.
type FrameMsg struct {
	id  int
	tag int
}

// Model stores values we'll use when rendering the progress bar.
type Model struct {
	// An identifier to keep us from receiving messages intended for other
	// progress bars.
	id int

	// An identifier to keep us from receiving frame messages too quickly.
	tag int

	// Total width of the progress bar, including percentage, if set.
	Width int

	// "Filled" sections of the progress bar.
	Full      rune
	FullColor string

	// "Empty" sections of the progress bar.
	Empty      rune
	EmptyColor string

	// Settings for rendering the numeric percentage.
	ShowPercentage  bool
	PercentFormat   string // a fmt string for a float
	PercentageStyle lipgloss.Style

	// Members for animated transitions.
	spring           harmonica.Spring
	springCustomized bool
	percentShown     float64 // percent currently displaying
	targetPercent    float64 // percent to which we're animating
	velocity         float64

	// Gradient settings
	useRamp    bool
	rampColorA colorful.Color
	rampColorB colorful.Color

	// When true, we scale the gradient to fit the width of the filled section
	// of the progress bar. When false, the width of the gradient will be set
	// to the full width of the progress bar.
	scaleRamp bool

	// Color profile for the progress bar.
	colorProfile termenv.Profile
}

// New returns a model with default values.
func New(opts ...Option) Model {
	m := Model{
		id:             nextID(),
		Width:          defaultWidth,
		Full:           '█',
		FullColor:      "#7571F9",
		Empty:          '░',
		EmptyColor:     "#606060",
		ShowPercentage: true,
		PercentFormat:  " %3.0f%%",
		colorProfile:   termenv.ColorProfile(),
	}

	for _, opt := range opts {
		opt(&m)
	}

	if !m.springCustomized {
		m.SetSpringOptions(defaultFrequency, defaultDamping)
	}

	return m
}

// NewModel returns a model with default values.
//
// Deprecated: use [New] instead.
var NewModel = New

// Init exists to satisfy the tea.Model interface.
func (m Model) Init() tea.Cmd {
	return nil
}

// Update is used to animate the progress bar during transitions. Use
// SetPercent to create the command you'll need to trigger the animation.
//
// If you're rendering with ViewAs you won't need this.
func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case FrameMsg:
		if msg.id != m.id || msg.tag != m.tag {
			return m, nil
		}

		// If we've more or less reached equilibrium, stop updating.
		if !m.IsAnimating() {
			return m, nil
		}

		m.percentShown, m.velocity = m.spring.Update(m.percentShown, m.velocity, m.targetPercent)
		return m, m.nextFrame()

	default:
		return m, nil
	}
}

// SetSpringOptions sets the frequency and damping for the current spring.
// Frequency corresponds to speed, and damping to bounciness. For details see:
//
// https://github.com/charmbracelet/harmonica
func (m *Model) SetSpringOptions(frequency, damping float64) {
	m.spring = harmonica.NewSpring(harmonica.FPS(fps), frequency, damping)
}

// Percent returns the current visible percentage on the model. This is only
// relevant when you're animating the progress bar.
//
// If you're rendering with ViewAs you won't need this.
func (m Model) Percent() float64 {
	return m.targetPercent
}

// SetPercent sets the percentage state of the model as well as a command
// necessary for animating the progress bar to this new percentage.
//
// If you're rendering with ViewAs you won't need this.
func (m *Model) SetPercent(p float64) tea.Cmd {
	m.targetPercent = math.Max(0, math.Min(1, p))
	m.tag++
	return m.nextFrame()
}

// IncrPercent increments the percentage by a given amount, returning a command
// necessary to animate the progress bar to the new percentage.
//
// If you're rendering with ViewAs you won't need this.
func (m *Model) IncrPercent(v float64) tea.Cmd {
	return m.SetPercent(m.Percent() + v)
}

// DecrPercent decrements the percentage by a given amount, returning a command
// necessary to animate the progress bar to the new percentage.
//
// If you're rendering with ViewAs you won't need this.
func (m *Model) DecrPercent(v float64) tea.Cmd {
	return m.SetPercent(m.Percent() - v)
}

// View renders an animated progress bar in its current state. To render
// a static progress bar based on your own calculations use ViewAs instead.
func (m Model) View() string {
	return m.ViewAs(m.percentShown)
}

// ViewAs renders the progress bar with a given percentage.
func (m Model) ViewAs(percent float64) string {
	b := strings.Builder{}
	percentView := m.percentageView(percent)
	m.barView(&b, percent, ansi.StringWidth(percentView))
	b.WriteString(percentView)
	return b.String()
}

func (m *Model) nextFrame() tea.Cmd {
	return tea.Tick(time.Second/time.Duration(fps), func(time.Time) tea.Msg {
		return FrameMsg{id: m.id, tag: m.tag}
	})
}

func (m Model) barView(b *strings.Builder, percent float64, textWidth int) {
	var (
		tw = max(0, m.Width-textWidth)                // total width
		fw = int(math.Round((float64(tw) * percent))) // filled width
		p  float64
	)

	fw = max(0, min(tw, fw))

	if m.useRamp {
		// Gradient fill
		for i := 0; i < fw; i++ {
			if fw == 1 {
				// this is up for debate: in a gradient of width=1, should the
				// single character rendered be the first color, the last color
				// or exactly 50% in between? I opted for 50%
				p = 0.5
			} else if m.scaleRamp {
				p = float64(i) / float64(fw-1)
			} else {
				p = float64(i) / float64(tw-1)
			}
			c := m.rampColorA.BlendLuv(m.rampColorB, p).Hex()
			b.WriteString(termenv.
				String(string(m.Full)).
				Foreground(m.color(c)).
				String(),
			)
		}
	} else {
		// Solid fill
		s := termenv.String(string(m.Full)).Foreground(m.color(m.FullColor)).String()
		b.WriteString(strings.Repeat(s, fw))
	}

	// Empty fill
	e := termenv.String(string(m.Empty)).Foreground(m.color(m.EmptyColor)).String()
	n := max(0, tw-fw)
	b.WriteString(strings.Repeat(e, n))
}

func (m Model) percentageView(percent float64) string {
	if !m.ShowPercentage {
		return ""
	}
	percent = math.Max(0, math.Min(1, percent))
	percentage := fmt.Sprintf(m.PercentFormat, percent*100) //nolint:mnd
	percentage = m.PercentageStyle.Inline(true).Render(percentage)
	return percentage
}

func (m *Model) setRamp(colorA, colorB string, scaled bool) {
	// In the event of an error colors here will default to black. For
	// usability's sake, and because such an error is only cosmetic, we're
	// ignoring the error.
	a, _ := colorful.Hex(colorA)
	b, _ := colorful.Hex(colorB)

	m.useRamp = true
	m.scaleRamp = scaled
	m.rampColorA = a
	m.rampColorB = b
}

func (m Model) color(c string) termenv.Color {
	return m.colorProfile.Color(c)
}

// IsAnimating returns false if the progress bar reached equilibrium and is no longer animating.
func (m *Model) IsAnimating() bool {
	dist := math.Abs(m.percentShown - m.targetPercent)
	return !(dist < 0.001 && m.velocity < 0.01)
}



================================================
FILE: progress/progress_test.go
================================================
package progress

import (
	"strings"
	"testing"

	"github.com/muesli/termenv"
)

const (
	AnsiReset = "\x1b[0m"
)

func TestGradient(t *testing.T) {

	colA := "#FF0000"
	colB := "#00FF00"

	var p Model
	var descr string

	for _, scale := range []bool{false, true} {
		opts := []Option{
			WithColorProfile(termenv.TrueColor), WithoutPercentage(),
		}
		if scale {
			descr = "progress bar with scaled gradient"
			opts = append(opts, WithScaledGradient(colA, colB))
		} else {
			descr = "progress bar with gradient"
			opts = append(opts, WithGradient(colA, colB))
		}

		t.Run(descr, func(t *testing.T) {
			p = New(opts...)

			// build the expected colors by colorizing an empty string and then cutting off the following reset sequence
			sb := strings.Builder{}
			sb.WriteString(termenv.String("").Foreground(p.color(colA)).String())
			expFirst := strings.Split(sb.String(), AnsiReset)[0]
			sb.Reset()
			sb.WriteString(termenv.String("").Foreground(p.color(colB)).String())
			expLast := strings.Split(sb.String(), AnsiReset)[0]

			for _, width := range []int{3, 5, 50} {
				p.Width = width
				res := p.ViewAs(1.0)

				// extract colors from the progrss bar by splitting at p.Full+AnsiReset, leaving us with just the color sequences
				colors := strings.Split(res, string(p.Full)+AnsiReset)

				// discard the last color, because it is empty (no new color comes after the last char of the bar)
				colors = colors[0 : len(colors)-1]

				if expFirst != colors[0] {
					t.Errorf("expected first color of bar to be first gradient color %q, instead got %q", expFirst, colors[0])
				}

				if expLast != colors[len(colors)-1] {
					t.Errorf("expected last color of bar to be second gradient color %q, instead got %q", expLast, colors[len(colors)-1])
				}
			}
		})
	}

}



================================================
FILE: runeutil/runeutil.go
================================================
// Package runeutil provides a utility function for use in Bubbles
// that can process Key messages containing runes.
package runeutil

import (
	"unicode"
	"unicode/utf8"
)

// Sanitizer is a helper for bubble widgets that want to process
// Runes from input key messages.
type Sanitizer interface {
	// Sanitize removes control characters from runes in a KeyRunes
	// message, and optionally replaces newline/carriage return/tabs by a
	// specified character.
	//
	// The rune array is modified in-place if possible. In that case, the
	// returned slice is the original slice shortened after the control
	// characters have been removed/translated.
	Sanitize(runes []rune) []rune
}

// NewSanitizer constructs a rune sanitizer.
func NewSanitizer(opts ...Option) Sanitizer {
	s := sanitizer{
		replaceNewLine: []rune("\n"),
		replaceTab:     []rune("    "),
	}
	for _, o := range opts {
		s = o(s)
	}
	return &s
}

// Option is the type of option that can be passed to Sanitize().
type Option func(sanitizer) sanitizer

// ReplaceTabs replaces tabs by the specified string.
func ReplaceTabs(tabRepl string) Option {
	return func(s sanitizer) sanitizer {
		s.replaceTab = []rune(tabRepl)
		return s
	}
}

// ReplaceNewlines replaces newline characters by the specified string.
func ReplaceNewlines(nlRepl string) Option {
	return func(s sanitizer) sanitizer {
		s.replaceNewLine = []rune(nlRepl)
		return s
	}
}

func (s *sanitizer) Sanitize(runes []rune) []rune {
	// dstrunes are where we are storing the result.
	dstrunes := runes[:0:len(runes)]
	// copied indicates whether dstrunes is an alias of runes
	// or a copy. We need a copy when dst moves past src.
	// We use this as an optimization to avoid allocating
	// a new rune slice in the common case where the output
	// is smaller or equal to the input.
	copied := false

	for src := 0; src < len(runes); src++ {
		r := runes[src]
		switch {
		case r == utf8.RuneError:
			// skip

		case r == '\r' || r == '\n':
			if len(dstrunes)+len(s.replaceNewLine) > src && !copied {
				dst := len(dstrunes)
				dstrunes = make([]rune, dst, len(runes)+len(s.replaceNewLine))
				copy(dstrunes, runes[:dst])
				copied = true
			}
			dstrunes = append(dstrunes, s.replaceNewLine...)

		case r == '\t':
			if len(dstrunes)+len(s.replaceTab) > src && !copied {
				dst := len(dstrunes)
				dstrunes = make([]rune, dst, len(runes)+len(s.replaceTab))
				copy(dstrunes, runes[:dst])
				copied = true
			}
			dstrunes = append(dstrunes, s.replaceTab...)

		case unicode.IsControl(r):
			// Other control characters: skip.

		default:
			// Keep the character.
			dstrunes = append(dstrunes, runes[src])
		}
	}
	return dstrunes
}

type sanitizer struct {
	replaceNewLine []rune
	replaceTab     []rune
}



================================================
FILE: runeutil/runeutil_test.go
================================================
package runeutil

import (
	"testing"
	"unicode/utf8"
)

func TestSanitize(t *testing.T) {
	td := []struct {
		input, output string
	}{
		{"", ""},
		{"x", "x"},
		{"\n", "XX"},
		{"\na\n", "XXaXX"},
		{"\n\n", "XXXX"},
		{"\t", ""},
		{"hello", "hello"},
		{"hel\nlo", "helXXlo"},
		{"hel\rlo", "helXXlo"},
		{"hel\tlo", "hello"},
		{"he\n\nl\tlo", "heXXXXllo"},
		{"he\tl\n\nlo", "helXXXXlo"},
		{"hel\x1blo", "hello"},
		{"hello\xc2", "hello"}, // invalid utf8
	}

	for _, tc := range td {
		runes := make([]rune, 0, len(tc.input))
		b := []byte(tc.input)
		for i, w := 0, 0; i < len(b); i += w {
			var r rune
			r, w = utf8.DecodeRune(b[i:])
			runes = append(runes, r)
		}
		t.Logf("input runes: %+v", runes)
		s := NewSanitizer(ReplaceNewlines("XX"), ReplaceTabs(""))
		result := s.Sanitize(runes)
		rs := string(result)
		if tc.output != rs {
			t.Errorf("%q: expected %q, got %q (%+v)", tc.input, tc.output, rs, result)
		}
	}
}



================================================
FILE: spinner/spinner.go
================================================
// Package spinner provides a spinner component for Bubble Tea applications.
package spinner

import (
	"sync/atomic"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// Internal ID management. Used during animating to ensure that frame messages
// are received only by spinner components that sent them.
var lastID int64

func nextID() int {
	return int(atomic.AddInt64(&lastID, 1))
}

// Spinner is a set of frames used in animating the spinner.
type Spinner struct {
	Frames []string
	FPS    time.Duration
}

// Some spinners to choose from. You could also make your own.
var (
	Line = Spinner{
		Frames: []string{"|", "/", "-", "\\"},
		FPS:    time.Second / 10, //nolint:mnd
	}
	Dot = Spinner{
		Frames: []string{"⣾ ", "⣽ ", "⣻ ", "⢿ ", "⡿ ", "⣟ ", "⣯ ", "⣷ "},
		FPS:    time.Second / 10, //nolint:mnd
	}
	MiniDot = Spinner{
		Frames: []string{"⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"},
		FPS:    time.Second / 12, //nolint:mnd
	}
	Jump = Spinner{
		Frames: []string{"⢄", "⢂", "⢁", "⡁", "⡈", "⡐", "⡠"},
		FPS:    time.Second / 10, //nolint:mnd
	}
	Pulse = Spinner{
		Frames: []string{"█", "▓", "▒", "░"},
		FPS:    time.Second / 8, //nolint:mnd
	}
	Points = Spinner{
		Frames: []string{"∙∙∙", "●∙∙", "∙●∙", "∙∙●"},
		FPS:    time.Second / 7, //nolint:mnd
	}
	Globe = Spinner{
		Frames: []string{"🌍", "🌎", "🌏"},
		FPS:    time.Second / 4, //nolint:mnd
	}
	Moon = Spinner{
		Frames: []string{"🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"},
		FPS:    time.Second / 8, //nolint:mnd
	}
	Monkey = Spinner{
		Frames: []string{"🙈", "🙉", "🙊"},
		FPS:    time.Second / 3, //nolint:mnd
	}
	Meter = Spinner{
		Frames: []string{
			"▱▱▱",
			"▰▱▱",
			"▰▰▱",
			"▰▰▰",
			"▰▰▱",
			"▰▱▱",
			"▱▱▱",
		},
		FPS: time.Second / 7, //nolint:mnd
	}
	Hamburger = Spinner{
		Frames: []string{"☱", "☲", "☴", "☲"},
		FPS:    time.Second / 3, //nolint:mnd
	}
	Ellipsis = Spinner{
		Frames: []string{"", ".", "..", "..."},
		FPS:    time.Second / 3, //nolint:mnd
	}
)

// Model contains the state for the spinner. Use New to create new models
// rather than using Model as a struct literal.
type Model struct {
	// Spinner settings to use. See type Spinner.
	Spinner Spinner

	// Style sets the styling for the spinner. Most of the time you'll just
	// want foreground and background coloring, and potentially some padding.
	//
	// For an introduction to styling with Lip Gloss see:
	// https://github.com/charmbracelet/lipgloss
	Style lipgloss.Style

	frame int
	id    int
	tag   int
}

// ID returns the spinner's unique ID.
func (m Model) ID() int {
	return m.id
}

// New returns a model with default values.
func New(opts ...Option) Model {
	m := Model{
		Spinner: Line,
		id:      nextID(),
	}

	for _, opt := range opts {
		opt(&m)
	}

	return m
}

// NewModel returns a model with default values.
//
// Deprecated: use [New] instead.
var NewModel = New

// TickMsg indicates that the timer has ticked and we should render a frame.
type TickMsg struct {
	Time time.Time
	tag  int
	ID   int
}

// Update is the Tea update function.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	switch msg := msg.(type) {
	case TickMsg:
		// If an ID is set, and the ID doesn't belong to this spinner, reject
		// the message.
		if msg.ID > 0 && msg.ID != m.id {
			return m, nil
		}

		// If a tag is set, and it's not the one we expect, reject the message.
		// This prevents the spinner from receiving too many messages and
		// thus spinning too fast.
		if msg.tag > 0 && msg.tag != m.tag {
			return m, nil
		}

		m.frame++
		if m.frame >= len(m.Spinner.Frames) {
			m.frame = 0
		}

		m.tag++
		return m, m.tick(m.id, m.tag)
	default:
		return m, nil
	}
}

// View renders the model's view.
func (m Model) View() string {
	if m.frame >= len(m.Spinner.Frames) {
		return "(error)"
	}

	return m.Style.Render(m.Spinner.Frames[m.frame])
}

// Tick is the command used to advance the spinner one frame. Use this command
// to effectively start the spinner.
func (m Model) Tick() tea.Msg {
	return TickMsg{
		// The time at which the tick occurred.
		Time: time.Now(),

		// The ID of the spinner that this message belongs to. This can be
		// helpful when routing messages, however bear in mind that spinners
		// will ignore messages that don't contain ID by default.
		ID: m.id,

		tag: m.tag,
	}
}

func (m Model) tick(id, tag int) tea.Cmd {
	return tea.Tick(m.Spinner.FPS, func(t time.Time) tea.Msg {
		return TickMsg{
			Time: t,
			ID:   id,
			tag:  tag,
		}
	})
}

// Tick is the command used to advance the spinner one frame. Use this command
// to effectively start the spinner.
//
// Deprecated: Use [Model.Tick] instead.
func Tick() tea.Msg {
	return TickMsg{Time: time.Now()}
}

// Option is used to set options in New. For example:
//
//	spinner := New(WithSpinner(Dot))
type Option func(*Model)

// WithSpinner is an option to set the spinner.
func WithSpinner(spinner Spinner) Option {
	return func(m *Model) {
		m.Spinner = spinner
	}
}

// WithStyle is an option to set the spinner style.
func WithStyle(style lipgloss.Style) Option {
	return func(m *Model) {
		m.Style = style
	}
}



================================================
FILE: spinner/spinner_test.go
================================================
package spinner_test

import (
	"testing"

	"github.com/charmbracelet/bubbles/spinner"
)

func TestSpinnerNew(t *testing.T) {
	assertEqualSpinner := func(t *testing.T, exp, got spinner.Spinner) {
		t.Helper()

		if exp.FPS != got.FPS {
			t.Errorf("expecting %d FPS, got %d", exp.FPS, got.FPS)
		}

		if e, g := len(exp.Frames), len(got.Frames); e != g {
			t.Fatalf("expecting %d frames, got %d", e, g)
		}

		for i, e := range exp.Frames {
			if g := got.Frames[i]; e != g {
				t.Errorf("expecting frame index %d with value %q, got %q", i, e, g)
			}
		}
	}
	t.Run("default", func(t *testing.T) {
		s := spinner.New()

		assertEqualSpinner(t, spinner.Line, s.Spinner)
	})

	t.Run("WithSpinner", func(t *testing.T) {
		customSpinner := spinner.Spinner{
			Frames: []string{"a", "b", "c", "d"},
			FPS:    16,
		}

		s := spinner.New(spinner.WithSpinner(customSpinner))

		assertEqualSpinner(t, customSpinner, s.Spinner)
	})

	tests := map[string]spinner.Spinner{
		"Line":    spinner.Line,
		"Dot":     spinner.Dot,
		"MiniDot": spinner.MiniDot,
		"Jump":    spinner.Jump,
		"Pulse":   spinner.Pulse,
		"Points":  spinner.Points,
		"Globe":   spinner.Globe,
		"Moon":    spinner.Moon,
		"Monkey":  spinner.Monkey,
	}

	for name, s := range tests {
		t.Run(name, func(t *testing.T) {
			assertEqualSpinner(t, spinner.New(spinner.WithSpinner(s)).Spinner, s)
		})
	}
}



================================================
FILE: stopwatch/stopwatch.go
================================================
// Package stopwatch provides a simple stopwatch component.
package stopwatch

import (
	"sync/atomic"
	"time"

	tea "github.com/charmbracelet/bubbletea"
)

var lastID int64

func nextID() int {
	return int(atomic.AddInt64(&lastID, 1))
}

// TickMsg is a message that is sent on every timer tick.
type TickMsg struct {
	// ID is the identifier of the stopwatch that sends the message. This makes
	// it possible to determine which stopwatch a tick belongs to when there
	// are multiple stopwatches running.
	//
	// Note, however, that a stopwatch will reject ticks from other
	// stopwatches, so it's safe to flow all TickMsgs through all stopwatches
	// and have them still behave appropriately.
	ID  int
	tag int
}

// StartStopMsg is sent when the stopwatch should start or stop.
type StartStopMsg struct {
	ID      int
	running bool
}

// ResetMsg is sent when the stopwatch should reset.
type ResetMsg struct {
	ID int
}

// Model for the stopwatch component.
type Model struct {
	d       time.Duration
	id      int
	tag     int
	running bool

	// How long to wait before every tick. Defaults to 1 second.
	Interval time.Duration
}

// NewWithInterval creates a new stopwatch with the given timeout and tick
// interval.
func NewWithInterval(interval time.Duration) Model {
	return Model{
		Interval: interval,
		id:       nextID(),
	}
}

// New creates a new stopwatch with 1s interval.
func New() Model {
	return NewWithInterval(time.Second)
}

// ID returns the unique ID of the model.
func (m Model) ID() int {
	return m.id
}

// Init starts the stopwatch.
func (m Model) Init() tea.Cmd {
	return m.Start()
}

// Start starts the stopwatch.
func (m Model) Start() tea.Cmd {
	return tea.Sequence(func() tea.Msg {
		return StartStopMsg{ID: m.id, running: true}
	}, tick(m.id, m.tag, m.Interval))
}

// Stop stops the stopwatch.
func (m Model) Stop() tea.Cmd {
	return func() tea.Msg {
		return StartStopMsg{ID: m.id, running: false}
	}
}

// Toggle stops the stopwatch if it is running and starts it if it is stopped.
func (m Model) Toggle() tea.Cmd {
	if m.Running() {
		return m.Stop()
	}
	return m.Start()
}

// Reset resets the stopwatch to 0.
func (m Model) Reset() tea.Cmd {
	return func() tea.Msg {
		return ResetMsg{ID: m.id}
	}
}

// Running returns true if the stopwatch is running or false if it is stopped.
func (m Model) Running() bool {
	return m.running
}

// Update handles the timer tick.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	switch msg := msg.(type) {
	case StartStopMsg:
		if msg.ID != m.id {
			return m, nil
		}
		m.running = msg.running
	case ResetMsg:
		if msg.ID != m.id {
			return m, nil
		}
		m.d = 0
	case TickMsg:
		if !m.running || msg.ID != m.id {
			break
		}

		// If a tag is set, and it's not the one we expect, reject the message.
		// This prevents the stopwatch from receiving too many messages and
		// thus ticking too fast.
		if msg.tag > 0 && msg.tag != m.tag {
			return m, nil
		}

		m.d += m.Interval
		m.tag++
		return m, tick(m.id, m.tag, m.Interval)
	}

	return m, nil
}

// Elapsed returns the time elapsed.
func (m Model) Elapsed() time.Duration {
	return m.d
}

// View of the timer component.
func (m Model) View() string {
	return m.d.String()
}

func tick(id int, tag int, d time.Duration) tea.Cmd {
	return tea.Tick(d, func(_ time.Time) tea.Msg {
		return TickMsg{ID: id, tag: tag}
	})
}



================================================
FILE: table/table.go
================================================
// Package table provides a simple table component for Bubble Tea applications.
package table

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/mattn/go-runewidth"

	"github.com/charmbracelet/bubbles/help"
	"github.com/charmbracelet/bubbles/key"
	"github.com/charmbracelet/bubbles/viewport"
)

// Model defines a state for the table widget.
type Model struct {
	KeyMap KeyMap
	Help   help.Model

	cols   []Column
	rows   []Row
	cursor int
	focus  bool
	styles Styles

	viewport viewport.Model
	start    int
	end      int
}

// Row represents one line in the table.
type Row []string

// Column defines the table structure.
type Column struct {
	Title string
	Width int
}

// KeyMap defines keybindings. It satisfies to the help.KeyMap interface, which
// is used to render the help menu.
type KeyMap struct {
	LineUp       key.Binding
	LineDown     key.Binding
	PageUp       key.Binding
	PageDown     key.Binding
	HalfPageUp   key.Binding
	HalfPageDown key.Binding
	GotoTop      key.Binding
	GotoBottom   key.Binding
}

// ShortHelp implements the KeyMap interface.
func (km KeyMap) ShortHelp() []key.Binding {
	return []key.Binding{km.LineUp, km.LineDown}
}

// FullHelp implements the KeyMap interface.
func (km KeyMap) FullHelp() [][]key.Binding {
	return [][]key.Binding{
		{km.LineUp, km.LineDown, km.GotoTop, km.GotoBottom},
		{km.PageUp, km.PageDown, km.HalfPageUp, km.HalfPageDown},
	}
}

// DefaultKeyMap returns a default set of keybindings.
func DefaultKeyMap() KeyMap {
	const spacebar = " "
	return KeyMap{
		LineUp: key.NewBinding(
			key.WithKeys("up", "k"),
			key.WithHelp("↑/k", "up"),
		),
		LineDown: key.NewBinding(
			key.WithKeys("down", "j"),
			key.WithHelp("↓/j", "down"),
		),
		PageUp: key.NewBinding(
			key.WithKeys("b", "pgup"),
			key.WithHelp("b/pgup", "page up"),
		),
		PageDown: key.NewBinding(
			key.WithKeys("f", "pgdown", spacebar),
			key.WithHelp("f/pgdn", "page down"),
		),
		HalfPageUp: key.NewBinding(
			key.WithKeys("u", "ctrl+u"),
			key.WithHelp("u", "½ page up"),
		),
		HalfPageDown: key.NewBinding(
			key.WithKeys("d", "ctrl+d"),
			key.WithHelp("d", "½ page down"),
		),
		GotoTop: key.NewBinding(
			key.WithKeys("home", "g"),
			key.WithHelp("g/home", "go to start"),
		),
		GotoBottom: key.NewBinding(
			key.WithKeys("end", "G"),
			key.WithHelp("G/end", "go to end"),
		),
	}
}

// Styles contains style definitions for this list component. By default, these
// values are generated by DefaultStyles.
type Styles struct {
	Header   lipgloss.Style
	Cell     lipgloss.Style
	Selected lipgloss.Style
}

// DefaultStyles returns a set of default style definitions for this table.
func DefaultStyles() Styles {
	return Styles{
		Selected: lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("212")),
		Header:   lipgloss.NewStyle().Bold(true).Padding(0, 1),
		Cell:     lipgloss.NewStyle().Padding(0, 1),
	}
}

// SetStyles sets the table styles.
func (m *Model) SetStyles(s Styles) {
	m.styles = s
	m.UpdateViewport()
}

// Option is used to set options in New. For example:
//
//	table := New(WithColumns([]Column{{Title: "ID", Width: 10}}))
type Option func(*Model)

// New creates a new model for the table widget.
func New(opts ...Option) Model {
	m := Model{
		cursor:   0,
		viewport: viewport.New(0, 20), //nolint:mnd

		KeyMap: DefaultKeyMap(),
		Help:   help.New(),
		styles: DefaultStyles(),
	}

	for _, opt := range opts {
		opt(&m)
	}

	m.UpdateViewport()

	return m
}

// WithColumns sets the table columns (headers).
func WithColumns(cols []Column) Option {
	return func(m *Model) {
		m.cols = cols
	}
}

// WithRows sets the table rows (data).
func WithRows(rows []Row) Option {
	return func(m *Model) {
		m.rows = rows
	}
}

// WithHeight sets the height of the table.
func WithHeight(h int) Option {
	return func(m *Model) {
		m.viewport.Height = h - lipgloss.Height(m.headersView())
	}
}

// WithWidth sets the width of the table.
func WithWidth(w int) Option {
	return func(m *Model) {
		m.viewport.Width = w
	}
}

// WithFocused sets the focus state of the table.
func WithFocused(f bool) Option {
	return func(m *Model) {
		m.focus = f
	}
}

// WithStyles sets the table styles.
func WithStyles(s Styles) Option {
	return func(m *Model) {
		m.styles = s
	}
}

// WithKeyMap sets the key map.
func WithKeyMap(km KeyMap) Option {
	return func(m *Model) {
		m.KeyMap = km
	}
}

// Update is the Bubble Tea update loop.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	if !m.focus {
		return m, nil
	}

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch {
		case key.Matches(msg, m.KeyMap.LineUp):
			m.MoveUp(1)
		case key.Matches(msg, m.KeyMap.LineDown):
			m.MoveDown(1)
		case key.Matches(msg, m.KeyMap.PageUp):
			m.MoveUp(m.viewport.Height)
		case key.Matches(msg, m.KeyMap.PageDown):
			m.MoveDown(m.viewport.Height)
		case key.Matches(msg, m.KeyMap.HalfPageUp):
			m.MoveUp(m.viewport.Height / 2) //nolint:mnd
		case key.Matches(msg, m.KeyMap.HalfPageDown):
			m.MoveDown(m.viewport.Height / 2) //nolint:mnd
		case key.Matches(msg, m.KeyMap.GotoTop):
			m.GotoTop()
		case key.Matches(msg, m.KeyMap.GotoBottom):
			m.GotoBottom()
		}
	}

	return m, nil
}

// Focused returns the focus state of the table.
func (m Model) Focused() bool {
	return m.focus
}

// Focus focuses the table, allowing the user to move around the rows and
// interact.
func (m *Model) Focus() {
	m.focus = true
	m.UpdateViewport()
}

// Blur blurs the table, preventing selection or movement.
func (m *Model) Blur() {
	m.focus = false
	m.UpdateViewport()
}

// View renders the component.
func (m Model) View() string {
	return m.headersView() + "\n" + m.viewport.View()
}

// HelpView is a helper method for rendering the help menu from the keymap.
// Note that this view is not rendered by default and you must call it
// manually in your application, where applicable.
func (m Model) HelpView() string {
	return m.Help.View(m.KeyMap)
}

// UpdateViewport updates the list content based on the previously defined
// columns and rows.
func (m *Model) UpdateViewport() {
	renderedRows := make([]string, 0, len(m.rows))

	// Render only rows from: m.cursor-m.viewport.Height to: m.cursor+m.viewport.Height
	// Constant runtime, independent of number of rows in a table.
	// Limits the number of renderedRows to a maximum of 2*m.viewport.Height
	if m.cursor >= 0 {
		m.start = clamp(m.cursor-m.viewport.Height, 0, m.cursor)
	} else {
		m.start = 0
	}
	m.end = clamp(m.cursor+m.viewport.Height, m.cursor, len(m.rows))
	for i := m.start; i < m.end; i++ {
		renderedRows = append(renderedRows, m.renderRow(i))
	}

	m.viewport.SetContent(
		lipgloss.JoinVertical(lipgloss.Left, renderedRows...),
	)
}

// SelectedRow returns the selected row.
// You can cast it to your own implementation.
func (m Model) SelectedRow() Row {
	if m.cursor < 0 || m.cursor >= len(m.rows) {
		return nil
	}

	return m.rows[m.cursor]
}

// Rows returns the current rows.
func (m Model) Rows() []Row {
	return m.rows
}

// Columns returns the current columns.
func (m Model) Columns() []Column {
	return m.cols
}

// SetRows sets a new rows state.
func (m *Model) SetRows(r []Row) {
	m.rows = r

	if m.cursor > len(m.rows)-1 {
		m.cursor = len(m.rows) - 1
	}

	m.UpdateViewport()
}

// SetColumns sets a new columns state.
func (m *Model) SetColumns(c []Column) {
	m.cols = c
	m.UpdateViewport()
}

// SetWidth sets the width of the viewport of the table.
func (m *Model) SetWidth(w int) {
	m.viewport.Width = w
	m.UpdateViewport()
}

// SetHeight sets the height of the viewport of the table.
func (m *Model) SetHeight(h int) {
	m.viewport.Height = h - lipgloss.Height(m.headersView())
	m.UpdateViewport()
}

// Height returns the viewport height of the table.
func (m Model) Height() int {
	return m.viewport.Height
}

// Width returns the viewport width of the table.
func (m Model) Width() int {
	return m.viewport.Width
}

// Cursor returns the index of the selected row.
func (m Model) Cursor() int {
	return m.cursor
}

// SetCursor sets the cursor position in the table.
func (m *Model) SetCursor(n int) {
	m.cursor = clamp(n, 0, len(m.rows)-1)
	m.UpdateViewport()
}

// MoveUp moves the selection up by any number of rows.
// It can not go above the first row.
func (m *Model) MoveUp(n int) {
	m.cursor = clamp(m.cursor-n, 0, len(m.rows)-1)
	switch {
	case m.start == 0:
		m.viewport.SetYOffset(clamp(m.viewport.YOffset, 0, m.cursor))
	case m.start < m.viewport.Height:
		m.viewport.YOffset = (clamp(clamp(m.viewport.YOffset+n, 0, m.cursor), 0, m.viewport.Height))
	case m.viewport.YOffset >= 1:
		m.viewport.YOffset = clamp(m.viewport.YOffset+n, 1, m.viewport.Height)
	}
	m.UpdateViewport()
}

// MoveDown moves the selection down by any number of rows.
// It can not go below the last row.
func (m *Model) MoveDown(n int) {
	m.cursor = clamp(m.cursor+n, 0, len(m.rows)-1)
	m.UpdateViewport()

	switch {
	case m.end == len(m.rows) && m.viewport.YOffset > 0:
		m.viewport.SetYOffset(clamp(m.viewport.YOffset-n, 1, m.viewport.Height))
	case m.cursor > (m.end-m.start)/2 && m.viewport.YOffset > 0:
		m.viewport.SetYOffset(clamp(m.viewport.YOffset-n, 1, m.cursor))
	case m.viewport.YOffset > 1:
	case m.cursor > m.viewport.YOffset+m.viewport.Height-1:
		m.viewport.SetYOffset(clamp(m.viewport.YOffset+1, 0, 1))
	}
}

// GotoTop moves the selection to the first row.
func (m *Model) GotoTop() {
	m.MoveUp(m.cursor)
}

// GotoBottom moves the selection to the last row.
func (m *Model) GotoBottom() {
	m.MoveDown(len(m.rows))
}

// FromValues create the table rows from a simple string. It uses `\n` by
// default for getting all the rows and the given separator for the fields on
// each row.
func (m *Model) FromValues(value, separator string) {
	rows := []Row{}
	for _, line := range strings.Split(value, "\n") {
		r := Row{}
		for _, field := range strings.Split(line, separator) {
			r = append(r, field)
		}
		rows = append(rows, r)
	}

	m.SetRows(rows)
}

func (m Model) headersView() string {
	s := make([]string, 0, len(m.cols))
	for _, col := range m.cols {
		if col.Width <= 0 {
			continue
		}
		style := lipgloss.NewStyle().Width(col.Width).MaxWidth(col.Width).Inline(true)
		renderedCell := style.Render(runewidth.Truncate(col.Title, col.Width, "…"))
		s = append(s, m.styles.Header.Render(renderedCell))
	}
	return lipgloss.JoinHorizontal(lipgloss.Top, s...)
}

func (m *Model) renderRow(r int) string {
	s := make([]string, 0, len(m.cols))
	for i, value := range m.rows[r] {
		if m.cols[i].Width <= 0 {
			continue
		}
		style := lipgloss.NewStyle().Width(m.cols[i].Width).MaxWidth(m.cols[i].Width).Inline(true)
		renderedCell := m.styles.Cell.Render(style.Render(runewidth.Truncate(value, m.cols[i].Width, "…")))
		s = append(s, renderedCell)
	}

	row := lipgloss.JoinHorizontal(lipgloss.Top, s...)

	if r == m.cursor {
		return m.styles.Selected.Render(row)
	}

	return row
}

func clamp(v, low, high int) int {
	return min(max(v, low), high)
}



================================================
FILE: table/table_test.go
================================================
package table

import (
	"reflect"
	"testing"

	"github.com/charmbracelet/bubbles/help"
	"github.com/charmbracelet/bubbles/viewport"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
	"github.com/charmbracelet/x/exp/golden"
)

var testCols = []Column{
	{Title: "col1", Width: 10},
	{Title: "col2", Width: 10},
	{Title: "col3", Width: 10},
}

func TestNew(t *testing.T) {
	tests := map[string]struct {
		opts []Option
		want Model
	}{
		"Default": {
			want: Model{
				// Default fields
				cursor:   0,
				viewport: viewport.New(0, 20),
				KeyMap:   DefaultKeyMap(),
				Help:     help.New(),
				styles:   DefaultStyles(),
			},
		},
		"WithColumns": {
			opts: []Option{
				WithColumns([]Column{
					{Title: "Foo", Width: 1},
					{Title: "Bar", Width: 2},
				}),
			},
			want: Model{
				// Default fields
				cursor:   0,
				viewport: viewport.New(0, 20),
				KeyMap:   DefaultKeyMap(),
				Help:     help.New(),
				styles:   DefaultStyles(),

				// Modified fields
				cols: []Column{
					{Title: "Foo", Width: 1},
					{Title: "Bar", Width: 2},
				},
			},
		},
		"WithColumns; WithRows": {
			opts: []Option{
				WithColumns([]Column{
					{Title: "Foo", Width: 1},
					{Title: "Bar", Width: 2},
				}),
				WithRows([]Row{
					{"1", "Foo"},
					{"2", "Bar"},
				}),
			},
			want: Model{
				// Default fields
				cursor:   0,
				viewport: viewport.New(0, 20),
				KeyMap:   DefaultKeyMap(),
				Help:     help.New(),
				styles:   DefaultStyles(),

				// Modified fields
				cols: []Column{
					{Title: "Foo", Width: 1},
					{Title: "Bar", Width: 2},
				},
				rows: []Row{
					{"1", "Foo"},
					{"2", "Bar"},
				},
			},
		},
		"WithHeight": {
			opts: []Option{
				WithHeight(10),
			},
			want: Model{
				// Default fields
				cursor: 0,
				KeyMap: DefaultKeyMap(),
				Help:   help.New(),
				styles: DefaultStyles(),

				// Modified fields
				// Viewport height is 1 less than the provided height when no header is present since lipgloss.Height adds 1
				viewport: viewport.New(0, 9),
			},
		},
		"WithWidth": {
			opts: []Option{
				WithWidth(10),
			},
			want: Model{
				// Default fields
				cursor: 0,
				KeyMap: DefaultKeyMap(),
				Help:   help.New(),
				styles: DefaultStyles(),

				// Modified fields
				// Viewport height is 1 less than the provided height when no header is present since lipgloss.Height adds 1
				viewport: viewport.New(10, 20),
			},
		},
		"WithFocused": {
			opts: []Option{
				WithFocused(true),
			},
			want: Model{
				// Default fields
				cursor:   0,
				viewport: viewport.New(0, 20),
				KeyMap:   DefaultKeyMap(),
				Help:     help.New(),
				styles:   DefaultStyles(),

				// Modified fields
				focus: true,
			},
		},
		"WithStyles": {
			opts: []Option{
				WithStyles(Styles{}),
			},
			want: Model{
				// Default fields
				cursor:   0,
				viewport: viewport.New(0, 20),
				KeyMap:   DefaultKeyMap(),
				Help:     help.New(),

				// Modified fields
				styles: Styles{},
			},
		},
		"WithKeyMap": {
			opts: []Option{
				WithKeyMap(KeyMap{}),
			},
			want: Model{
				// Default fields
				cursor:   0,
				viewport: viewport.New(0, 20),
				Help:     help.New(),
				styles:   DefaultStyles(),

				// Modified fields
				KeyMap: KeyMap{},
			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			tc.want.UpdateViewport()

			got := New(tc.opts...)

			if !reflect.DeepEqual(tc.want, got) {
				t.Errorf("\n\nwant %v\n\ngot %v", tc.want, got)
			}
		})
	}
}

func TestModel_FromValues(t *testing.T) {
	input := "foo1,bar1\nfoo2,bar2\nfoo3,bar3"
	table := New(WithColumns([]Column{{Title: "Foo"}, {Title: "Bar"}}))
	table.FromValues(input, ",")

	if len(table.rows) != 3 {
		t.Fatalf("expect table to have 3 rows but it has %d", len(table.rows))
	}

	expect := []Row{
		{"foo1", "bar1"},
		{"foo2", "bar2"},
		{"foo3", "bar3"},
	}
	if !reflect.DeepEqual(table.rows, expect) {
		t.Fatalf("\n\nwant %v\n\ngot %v", expect, table.rows)
	}
}

func TestModel_FromValues_WithTabSeparator(t *testing.T) {
	input := "foo1.\tbar1\nfoo,bar,baz\tbar,2"
	table := New(WithColumns([]Column{{Title: "Foo"}, {Title: "Bar"}}))
	table.FromValues(input, "\t")

	if len(table.rows) != 2 {
		t.Fatalf("expect table to have 2 rows but it has %d", len(table.rows))
	}

	expect := []Row{
		{"foo1.", "bar1"},
		{"foo,bar,baz", "bar,2"},
	}
	if !reflect.DeepEqual(table.rows, expect) {
		t.Fatalf("\n\nwant %v\n\ngot %v", expect, table.rows)
	}
}

func TestModel_RenderRow(t *testing.T) {
	tests := []struct {
		name     string
		table    *Model
		expected string
	}{
		{
			name: "simple row",
			table: &Model{
				rows:   []Row{{"Foooooo", "Baaaaar", "Baaaaaz"}},
				cols:   testCols,
				styles: Styles{Cell: lipgloss.NewStyle()},
			},
			expected: "Foooooo   Baaaaar   Baaaaaz   ",
		},
		{
			name: "simple row with truncations",
			table: &Model{
				rows:   []Row{{"Foooooooooo", "Baaaaaaaaar", "Quuuuuuuuux"}},
				cols:   testCols,
				styles: Styles{Cell: lipgloss.NewStyle()},
			},
			expected: "Foooooooo…Baaaaaaaa…Quuuuuuuu…",
		},
		{
			name: "simple row avoiding truncations",
			table: &Model{
				rows:   []Row{{"Fooooooooo", "Baaaaaaaar", "Quuuuuuuux"}},
				cols:   testCols,
				styles: Styles{Cell: lipgloss.NewStyle()},
			},
			expected: "FoooooooooBaaaaaaaarQuuuuuuuux",
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			row := tc.table.renderRow(0)
			if row != tc.expected {
				t.Fatalf("\n\nWant: \n%s\n\nGot:  \n%s\n", tc.expected, row)
			}
		})
	}
}

func TestTableAlignment(t *testing.T) {
	t.Run("No border", func(t *testing.T) {
		biscuits := New(
			WithHeight(5),
			WithColumns([]Column{
				{Title: "Name", Width: 25},
				{Title: "Country of Origin", Width: 16},
				{Title: "Dunk-able", Width: 12},
			}),
			WithRows([]Row{
				{"Chocolate Digestives", "UK", "Yes"},
				{"Tim Tams", "Australia", "No"},
				{"Hobnobs", "UK", "Yes"},
			}),
		)
		got := ansi.Strip(biscuits.View())
		golden.RequireEqual(t, []byte(got))
	})
	t.Run("With border", func(t *testing.T) {
		baseStyle := lipgloss.NewStyle().
			BorderStyle(lipgloss.NormalBorder()).
			BorderForeground(lipgloss.Color("240"))

		s := DefaultStyles()
		s.Header = s.Header.
			BorderStyle(lipgloss.NormalBorder()).
			BorderForeground(lipgloss.Color("240")).
			BorderBottom(true).
			Bold(false)

		biscuits := New(
			WithHeight(5),
			WithColumns([]Column{
				{Title: "Name", Width: 25},
				{Title: "Country of Origin", Width: 16},
				{Title: "Dunk-able", Width: 12},
			}),
			WithRows([]Row{
				{"Chocolate Digestives", "UK", "Yes"},
				{"Tim Tams", "Australia", "No"},
				{"Hobnobs", "UK", "Yes"},
			}),
			WithStyles(s),
		)
		got := ansi.Strip(baseStyle.Render(biscuits.View()))
		golden.RequireEqual(t, []byte(got))
	})
}

func TestCursorNavigation(t *testing.T) {
	tests := map[string]struct {
		rows   []Row
		action func(*Model)
		want   int
	}{
		"New": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
			},
			action: func(_ *Model) {},
			want:   0,
		},
		"MoveDown": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.MoveDown(2)
			},
			want: 2,
		},
		"MoveUp": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.cursor = 3
				t.MoveUp(2)
			},
			want: 1,
		},
		"GotoBottom": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.GotoBottom()
			},
			want: 3,
		},
		"GotoTop": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.cursor = 3
				t.GotoTop()
			},
			want: 0,
		},
		"SetCursor": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.SetCursor(2)
			},
			want: 2,
		},
		"MoveDown with overflow": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.MoveDown(5)
			},
			want: 3,
		},
		"MoveUp with overflow": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.cursor = 3
				t.MoveUp(5)
			},
			want: 0,
		},
		"Blur does not stop movement": {
			rows: []Row{
				{"r1"},
				{"r2"},
				{"r3"},
				{"r4"},
			},
			action: func(t *Model) {
				t.Blur()
				t.MoveDown(2)
			},
			want: 2,
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			table := New(WithColumns(testCols), WithRows(tc.rows))
			tc.action(&table)

			if table.Cursor() != tc.want {
				t.Errorf("want %d, got %d", tc.want, table.Cursor())
			}
		})
	}
}

func TestModel_SetRows(t *testing.T) {
	table := New(WithColumns(testCols))

	if len(table.rows) != 0 {
		t.Fatalf("want 0, got %d", len(table.rows))
	}

	table.SetRows([]Row{{"r1"}, {"r2"}})

	if len(table.rows) != 2 {
		t.Fatalf("want 2, got %d", len(table.rows))
	}

	want := []Row{{"r1"}, {"r2"}}
	if !reflect.DeepEqual(table.rows, want) {
		t.Fatalf("\n\nwant %v\n\ngot %v", want, table.rows)
	}
}

func TestModel_SetColumns(t *testing.T) {
	table := New()

	if len(table.cols) != 0 {
		t.Fatalf("want 0, got %d", len(table.cols))
	}

	table.SetColumns([]Column{{Title: "Foo"}, {Title: "Bar"}})

	if len(table.cols) != 2 {
		t.Fatalf("want 2, got %d", len(table.cols))
	}

	want := []Column{{Title: "Foo"}, {Title: "Bar"}}
	if !reflect.DeepEqual(table.cols, want) {
		t.Fatalf("\n\nwant %v\n\ngot %v", want, table.cols)
	}
}

func TestModel_View(t *testing.T) {
	tests := map[string]struct {
		modelFunc func() Model
		skip      bool
	}{
		// TODO(?): should the view/output of empty tables use the same default height? (this has height 21)
		"Empty": {
			modelFunc: func() Model {
				return New()
			},
		},
		"Single row and column": {
			modelFunc: func() Model {
				return New(
					WithColumns([]Column{
						{Title: "Name", Width: 25},
					}),
					WithRows([]Row{
						{"Chocolate Digestives"},
					}),
				)
			},
		},
		"Multiple rows and columns": {
			modelFunc: func() Model {
				return New(
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
				)
			},
		},
		// TODO(fix): since the table height is tied to the viewport height, adding vertical padding to the headers' height directly increases the table height.
		"Extra padding": {
			modelFunc: func() Model {
				s := DefaultStyles()
				s.Header = lipgloss.NewStyle().Padding(2, 2)
				s.Cell = lipgloss.NewStyle().Padding(2, 2)

				return New(
					WithHeight(10),
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
					WithStyles(s),
				)
			},
		},
		"No padding": {
			modelFunc: func() Model {
				s := DefaultStyles()
				s.Header = lipgloss.NewStyle()
				s.Cell = lipgloss.NewStyle()

				return New(
					WithHeight(10),
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
					WithStyles(s),
				)
			},
		},
		// TODO(?): the total height is modified with borderd headers, however not with bordered cells. Is this expected/desired?
		"Bordered headers": {
			modelFunc: func() Model {
				return New(
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
					WithStyles(Styles{
						Header: lipgloss.NewStyle().BorderStyle(lipgloss.NormalBorder()),
					}),
				)
			},
		},
		// TODO(fix): Headers are not horizontally aligned with cells due to the border adding width to the cells.
		"Bordered cells": {
			modelFunc: func() Model {
				return New(
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
					WithStyles(Styles{
						Cell: lipgloss.NewStyle().BorderStyle(lipgloss.NormalBorder()),
					}),
				)
			},
		},
		"Manual height greater than rows": {
			modelFunc: func() Model {
				return New(
					WithHeight(6),
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
				)
			},
		},
		"Manual height less than rows": {
			modelFunc: func() Model {
				return New(
					WithHeight(2),
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
				)
			},
		},
		// TODO(fix): spaces are added to the right of the viewport to fill the width, but the headers end as though they are not aware of the width.
		"Manual width greater than columns": {
			modelFunc: func() Model {
				return New(
					WithWidth(80),
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
				)
			},
		},
		// TODO(fix): Setting the table width does not affect the total headers' width. Cells are wrapped.
		// 	Headers are not affected. Truncation/resizing should match lipgloss.table functionality.
		"Manual width less than columns": {
			modelFunc: func() Model {
				return New(
					WithWidth(30),
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
				)
			},
			skip: true,
		},
		"Modified viewport height": {
			modelFunc: func() Model {
				m := New(
					WithColumns([]Column{
						{Title: "Name", Width: 25},
						{Title: "Country of Origin", Width: 16},
						{Title: "Dunk-able", Width: 12},
					}),
					WithRows([]Row{
						{"Chocolate Digestives", "UK", "Yes"},
						{"Tim Tams", "Australia", "No"},
						{"Hobnobs", "UK", "Yes"},
					}),
				)

				m.viewport.Height = 2

				return m
			},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			if tc.skip {
				t.Skip()
			}

			table := tc.modelFunc()

			got := ansi.Strip(table.View())

			golden.RequireEqual(t, []byte(got))
		})
	}
}

// TODO: Fix table to make this test will pass.
func TestModel_View_CenteredInABox(t *testing.T) {
	t.Skip()

	boxStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.NormalBorder()).
		Align(lipgloss.Center)

	table := New(
		WithHeight(6),
		WithWidth(80),
		WithColumns([]Column{
			{Title: "Name", Width: 25},
			{Title: "Country of Origin", Width: 16},
			{Title: "Dunk-able", Width: 12},
		}),
		WithRows([]Row{
			{"Chocolate Digestives", "UK", "Yes"},
			{"Tim Tams", "Australia", "No"},
			{"Hobnobs", "UK", "Yes"},
		}),
	)

	tableView := ansi.Strip(table.View())
	got := boxStyle.Render(tableView)

	golden.RequireEqual(t, []byte(got))
}



================================================
FILE: table/testdata/TestModel_View_CenteredInABox.golden
================================================
┌────────────────────────────────────────────────────────────────────────────────┐
│           Name                       Country of Orig…  Dunk-able               │
│           Chocolate Digestives       UK                Yes                     │
│           Tim Tams                   Australia         No                      │
│           Hobnobs                    UK                Yes                     │
│                                                                                │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘


================================================
FILE: table/testdata/TestModel_View/Bordered_cells.golden
================================================
[Binary file]


================================================
FILE: table/testdata/TestModel_View/Bordered_headers.golden
================================================
┌─────────────────────────┐┌────────────────┐┌────────────┐
│Name                     ││Country of Orig…││Dunk-able   │
└─────────────────────────┘└────────────────┘└────────────┘
Chocolate Digestives     UK              Yes         
Tim Tams                 Australia       No          
Hobnobs                  UK              Yes         
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     


================================================
FILE: table/testdata/TestModel_View/Empty.golden
================================================























================================================
FILE: table/testdata/TestModel_View/Extra_padding.golden
================================================
                                                                 
                                                                 
  Name                         Country of Orig…    Dunk-able     
                                                                 
                                                                 
                                                                 
                                                                 
  Chocolate Digestives         UK                  Yes           
                                                                 
                                                                 
                                                                 
                                                                 
  Tim Tams                     Australia           No            
                                                                 


================================================
FILE: table/testdata/TestModel_View/Manual_height_greater_than_rows.golden
================================================
 Name                       Country of Orig…  Dunk-able    
 Chocolate Digestives       UK                Yes          
 Tim Tams                   Australia         No           
 Hobnobs                    UK                Yes          
                                                           
                                                           


================================================
FILE: table/testdata/TestModel_View/Manual_height_less_than_rows.golden
================================================
 Name                       Country of Orig…  Dunk-able    
 Chocolate Digestives       UK                Yes          


================================================
FILE: table/testdata/TestModel_View/Manual_width_greater_than_columns.golden
================================================
 Name                       Country of Orig…  Dunk-able    
 Chocolate Digestives       UK                Yes                               
 Tim Tams                   Australia         No                                
 Hobnobs                    UK                Yes                               
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                


================================================
FILE: table/testdata/TestModel_View/Manual_width_less_than_columns.golden
================================================
 Name                     Country of Origin    Dunk-able
 Chocolate Digestives     UK                   Yes
 Tim Tams                 Australia            No
 Hobnobs                  UK                   Yes
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              



                              
                              
                              
                              


================================================
FILE: table/testdata/TestModel_View/Modified_viewport_height.golden
================================================
 Name                       Country of Orig…  Dunk-able    
 Chocolate Digestives       UK                Yes          
 Tim Tams                   Australia         No           


================================================
FILE: table/testdata/TestModel_View/Multiple_rows_and_columns.golden
================================================
 Name                       Country of Orig…  Dunk-able    
 Chocolate Digestives       UK                Yes          
 Tim Tams                   Australia         No           
 Hobnobs                    UK                Yes          
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           
                                                           


================================================
FILE: table/testdata/TestModel_View/No_padding.golden
================================================
Name                     Country of Orig…Dunk-able   
Chocolate Digestives     UK              Yes         
Tim Tams                 Australia       No          
Hobnobs                  UK              Yes         
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     


================================================
FILE: table/testdata/TestModel_View/Single_row_and_column.golden
================================================
 Name                      
 Chocolate Digestives      
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           


================================================
FILE: table/testdata/TestTableAlignment/No_border.golden
================================================
 Name                       Country of Orig…  Dunk-able    
 Chocolate Digestives       UK                Yes          
 Tim Tams                   Australia         No           
 Hobnobs                    UK                Yes          
                                                           


================================================
FILE: table/testdata/TestTableAlignment/With_border.golden
================================================
┌───────────────────────────────────────────────────────────┐
│ Name                       Country of Orig…  Dunk-able    │
│───────────────────────────────────────────────────────────│
│ Chocolate Digestives       UK                Yes          │
│ Tim Tams                   Australia         No           │
│ Hobnobs                    UK                Yes          │
│                                                           │
└───────────────────────────────────────────────────────────┘


================================================
FILE: textarea/textarea.go
================================================
// Package textarea provides a multi-line text input component for Bubble Tea
// applications.
package textarea

import (
	"crypto/sha256"
	"fmt"
	"strconv"
	"strings"
	"unicode"

	"github.com/atotto/clipboard"
	"github.com/charmbracelet/bubbles/cursor"
	"github.com/charmbracelet/bubbles/key"
	"github.com/charmbracelet/bubbles/runeutil"
	"github.com/charmbracelet/bubbles/textarea/memoization"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
	rw "github.com/mattn/go-runewidth"
	"github.com/rivo/uniseg"
)

const (
	minHeight        = 1
	defaultHeight    = 6
	defaultWidth     = 40
	defaultCharLimit = 0 // no limit
	defaultMaxHeight = 99
	defaultMaxWidth  = 500

	// XXX: in v2, make max lines dynamic and default max lines configurable.
	maxLines = 10000
)

// Internal messages for clipboard operations.
type (
	pasteMsg    string
	pasteErrMsg struct{ error }
)

// KeyMap is the key bindings for different actions within the textarea.
type KeyMap struct {
	CharacterBackward       key.Binding
	CharacterForward        key.Binding
	DeleteAfterCursor       key.Binding
	DeleteBeforeCursor      key.Binding
	DeleteCharacterBackward key.Binding
	DeleteCharacterForward  key.Binding
	DeleteWordBackward      key.Binding
	DeleteWordForward       key.Binding
	InsertNewline           key.Binding
	LineEnd                 key.Binding
	LineNext                key.Binding
	LinePrevious            key.Binding
	LineStart               key.Binding
	Paste                   key.Binding
	WordBackward            key.Binding
	WordForward             key.Binding
	InputBegin              key.Binding
	InputEnd                key.Binding

	UppercaseWordForward  key.Binding
	LowercaseWordForward  key.Binding
	CapitalizeWordForward key.Binding

	TransposeCharacterBackward key.Binding
}

// DefaultKeyMap is the default set of key bindings for navigating and acting
// upon the textarea.
var DefaultKeyMap = KeyMap{
	CharacterForward:        key.NewBinding(key.WithKeys("right", "ctrl+f"), key.WithHelp("right", "character forward")),
	CharacterBackward:       key.NewBinding(key.WithKeys("left", "ctrl+b"), key.WithHelp("left", "character backward")),
	WordForward:             key.NewBinding(key.WithKeys("alt+right", "alt+f"), key.WithHelp("alt+right", "word forward")),
	WordBackward:            key.NewBinding(key.WithKeys("alt+left", "alt+b"), key.WithHelp("alt+left", "word backward")),
	LineNext:                key.NewBinding(key.WithKeys("down", "ctrl+n"), key.WithHelp("down", "next line")),
	LinePrevious:            key.NewBinding(key.WithKeys("up", "ctrl+p"), key.WithHelp("up", "previous line")),
	DeleteWordBackward:      key.NewBinding(key.WithKeys("alt+backspace", "ctrl+w"), key.WithHelp("alt+backspace", "delete word backward")),
	DeleteWordForward:       key.NewBinding(key.WithKeys("alt+delete", "alt+d"), key.WithHelp("alt+delete", "delete word forward")),
	DeleteAfterCursor:       key.NewBinding(key.WithKeys("ctrl+k"), key.WithHelp("ctrl+k", "delete after cursor")),
	DeleteBeforeCursor:      key.NewBinding(key.WithKeys("ctrl+u"), key.WithHelp("ctrl+u", "delete before cursor")),
	InsertNewline:           key.NewBinding(key.WithKeys("enter", "ctrl+m"), key.WithHelp("enter", "insert newline")),
	DeleteCharacterBackward: key.NewBinding(key.WithKeys("backspace", "ctrl+h"), key.WithHelp("backspace", "delete character backward")),
	DeleteCharacterForward:  key.NewBinding(key.WithKeys("delete", "ctrl+d"), key.WithHelp("delete", "delete character forward")),
	LineStart:               key.NewBinding(key.WithKeys("home", "ctrl+a"), key.WithHelp("home", "line start")),
	LineEnd:                 key.NewBinding(key.WithKeys("end", "ctrl+e"), key.WithHelp("end", "line end")),
	Paste:                   key.NewBinding(key.WithKeys("ctrl+v"), key.WithHelp("ctrl+v", "paste")),
	InputBegin:              key.NewBinding(key.WithKeys("alt+<", "ctrl+home"), key.WithHelp("alt+<", "input begin")),
	InputEnd:                key.NewBinding(key.WithKeys("alt+>", "ctrl+end"), key.WithHelp("alt+>", "input end")),

	CapitalizeWordForward: key.NewBinding(key.WithKeys("alt+c"), key.WithHelp("alt+c", "capitalize word forward")),
	LowercaseWordForward:  key.NewBinding(key.WithKeys("alt+l"), key.WithHelp("alt+l", "lowercase word forward")),
	UppercaseWordForward:  key.NewBinding(key.WithKeys("alt+u"), key.WithHelp("alt+u", "uppercase word forward")),

	TransposeCharacterBackward: key.NewBinding(key.WithKeys("ctrl+t"), key.WithHelp("ctrl+t", "transpose character backward")),
}

// LineInfo is a helper for keeping track of line information regarding
// soft-wrapped lines.
type LineInfo struct {
	// Width is the number of columns in the line.
	Width int
	// CharWidth is the number of characters in the line to account for
	// double-width runes.
	CharWidth int
	// Height is the number of rows in the line.
	Height int
	// StartColumn is the index of the first column of the line.
	StartColumn int
	// ColumnOffset is the number of columns that the cursor is offset from the
	// start of the line.
	ColumnOffset int
	// RowOffset is the number of rows that the cursor is offset from the start
	// of the line.
	RowOffset int
	// CharOffset is the number of characters that the cursor is offset
	// from the start of the line. This will generally be equivalent to
	// ColumnOffset, but will be different there are double-width runes before
	// the cursor.
	CharOffset int
}

// Style that will be applied to the text area.
//
// Style can be applied to focused and unfocused states to change the styles
// depending on the focus state.
//
// For an introduction to styling with Lip Gloss see:
// https://github.com/charmbracelet/lipgloss
type Style struct {
	Base             lipgloss.Style
	CursorLine       lipgloss.Style
	CursorLineNumber lipgloss.Style
	EndOfBuffer      lipgloss.Style
	LineNumber       lipgloss.Style
	Placeholder      lipgloss.Style
	Prompt           lipgloss.Style
	Text             lipgloss.Style
}

func (s Style) computedCursorLine() lipgloss.Style {
	return s.CursorLine.Inherit(s.Base).Inline(true)
}

func (s Style) computedCursorLineNumber() lipgloss.Style {
	return s.CursorLineNumber.
		Inherit(s.CursorLine).
		Inherit(s.Base).
		Inline(true)
}

func (s Style) computedEndOfBuffer() lipgloss.Style {
	return s.EndOfBuffer.Inherit(s.Base).Inline(true)
}

func (s Style) computedLineNumber() lipgloss.Style {
	return s.LineNumber.Inherit(s.Base).Inline(true)
}

func (s Style) computedPlaceholder() lipgloss.Style {
	return s.Placeholder.Inherit(s.Base).Inline(true)
}

func (s Style) computedPrompt() lipgloss.Style {
	return s.Prompt.Inherit(s.Base).Inline(true)
}

func (s Style) computedText() lipgloss.Style {
	return s.Text.Inherit(s.Base).Inline(true)
}

// line is the input to the text wrapping function. This is stored in a struct
// so that it can be hashed and memoized.
type line struct {
	runes []rune
	width int
}

// Hash returns a hash of the line.
func (w line) Hash() string {
	v := fmt.Sprintf("%s:%d", string(w.runes), w.width)
	return fmt.Sprintf("%x", sha256.Sum256([]byte(v)))
}

// Model is the Bubble Tea model for this text area element.
type Model struct {
	Err error

	// General settings.
	cache *memoization.MemoCache[line, [][]rune]

	// Prompt is printed at the beginning of each line.
	//
	// When changing the value of Prompt after the model has been
	// initialized, ensure that SetWidth() gets called afterwards.
	//
	// See also SetPromptFunc().
	Prompt string

	// Placeholder is the text displayed when the user
	// hasn't entered anything yet.
	Placeholder string

	// ShowLineNumbers, if enabled, causes line numbers to be printed
	// after the prompt.
	ShowLineNumbers bool

	// EndOfBufferCharacter is displayed at the end of the input.
	EndOfBufferCharacter rune

	// KeyMap encodes the keybindings recognized by the widget.
	KeyMap KeyMap

	// Styling. FocusedStyle and BlurredStyle are used to style the textarea in
	// focused and blurred states.
	FocusedStyle Style
	BlurredStyle Style
	// style is the current styling to use.
	// It is used to abstract the differences in focus state when styling the
	// model, since we can simply assign the set of styles to this variable
	// when switching focus states.
	style *Style

	// Cursor is the text area cursor.
	Cursor cursor.Model

	// CharLimit is the maximum number of characters this input element will
	// accept. If 0 or less, there's no limit.
	CharLimit int

	// MaxHeight is the maximum height of the text area in rows. If 0 or less,
	// there's no limit.
	MaxHeight int

	// MaxWidth is the maximum width of the text area in columns. If 0 or less,
	// there's no limit.
	MaxWidth int

	// If promptFunc is set, it replaces Prompt as a generator for
	// prompt strings at the beginning of each line.
	promptFunc func(line int) string

	// promptWidth is the width of the prompt.
	promptWidth int

	// width is the maximum number of characters that can be displayed at once.
	// If 0 or less this setting is ignored.
	width int

	// height is the maximum number of lines that can be displayed at once. It
	// essentially treats the text field like a vertically scrolling viewport
	// if there are more lines than the permitted height.
	height int

	// Underlying text value.
	value [][]rune

	// focus indicates whether user input focus should be on this input
	// component. When false, ignore keyboard input and hide the cursor.
	focus bool

	// Cursor column.
	col int

	// Cursor row.
	row int

	// Last character offset, used to maintain state when the cursor is moved
	// vertically such that we can maintain the same navigating position.
	lastCharOffset int

	// viewport is the vertically-scrollable viewport of the multi-line text
	// input.
	viewport *viewport.Model

	// rune sanitizer for input.
	rsan runeutil.Sanitizer
}

// New creates a new model with default settings.
func New() Model {
	vp := viewport.New(0, 0)
	vp.KeyMap = viewport.KeyMap{}
	cur := cursor.New()

	focusedStyle, blurredStyle := DefaultStyles()

	m := Model{
		CharLimit:            defaultCharLimit,
		MaxHeight:            defaultMaxHeight,
		MaxWidth:             defaultMaxWidth,
		Prompt:               lipgloss.ThickBorder().Left + " ",
		style:                &blurredStyle,
		FocusedStyle:         focusedStyle,
		BlurredStyle:         blurredStyle,
		cache:                memoization.NewMemoCache[line, [][]rune](maxLines),
		EndOfBufferCharacter: ' ',
		ShowLineNumbers:      true,
		Cursor:               cur,
		KeyMap:               DefaultKeyMap,

		value: make([][]rune, minHeight, maxLines),
		focus: false,
		col:   0,
		row:   0,

		viewport: &vp,
	}

	m.SetHeight(defaultHeight)
	m.SetWidth(defaultWidth)

	return m
}

// DefaultStyles returns the default styles for focused and blurred states for
// the textarea.
func DefaultStyles() (Style, Style) {
	focused := Style{
		Base:             lipgloss.NewStyle(),
		CursorLine:       lipgloss.NewStyle().Background(lipgloss.AdaptiveColor{Light: "255", Dark: "0"}),
		CursorLineNumber: lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "240"}),
		EndOfBuffer:      lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "254", Dark: "0"}),
		LineNumber:       lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "249", Dark: "7"}),
		Placeholder:      lipgloss.NewStyle().Foreground(lipgloss.Color("240")),
		Prompt:           lipgloss.NewStyle().Foreground(lipgloss.Color("7")),
		Text:             lipgloss.NewStyle(),
	}
	blurred := Style{
		Base:             lipgloss.NewStyle(),
		CursorLine:       lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "245", Dark: "7"}),
		CursorLineNumber: lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "249", Dark: "7"}),
		EndOfBuffer:      lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "254", Dark: "0"}),
		LineNumber:       lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "249", Dark: "7"}),
		Placeholder:      lipgloss.NewStyle().Foreground(lipgloss.Color("240")),
		Prompt:           lipgloss.NewStyle().Foreground(lipgloss.Color("7")),
		Text:             lipgloss.NewStyle().Foreground(lipgloss.AdaptiveColor{Light: "245", Dark: "7"}),
	}

	return focused, blurred
}

// SetValue sets the value of the text input.
func (m *Model) SetValue(s string) {
	m.Reset()
	m.InsertString(s)
}

// InsertString inserts a string at the cursor position.
func (m *Model) InsertString(s string) {
	m.insertRunesFromUserInput([]rune(s))
}

// InsertRune inserts a rune at the cursor position.
func (m *Model) InsertRune(r rune) {
	m.insertRunesFromUserInput([]rune{r})
}

// insertRunesFromUserInput inserts runes at the current cursor position.
func (m *Model) insertRunesFromUserInput(runes []rune) {
	// Clean up any special characters in the input provided by the
	// clipboard. This avoids bugs due to e.g. tab characters and
	// whatnot.
	runes = m.san().Sanitize(runes)

	if m.CharLimit > 0 {
		availSpace := m.CharLimit - m.Length()
		// If the char limit's been reached, cancel.
		if availSpace <= 0 {
			return
		}
		// If there's not enough space to paste the whole thing cut the pasted
		// runes down so they'll fit.
		if availSpace < len(runes) {
			runes = runes[:availSpace]
		}
	}

	// Split the input into lines.
	var lines [][]rune
	lstart := 0
	for i := 0; i < len(runes); i++ {
		if runes[i] == '\n' {
			// Queue a line to become a new row in the text area below.
			// Beware to clamp the max capacity of the slice, to ensure no
			// data from different rows get overwritten when later edits
			// will modify this line.
			lines = append(lines, runes[lstart:i:i])
			lstart = i + 1
		}
	}
	if lstart <= len(runes) {
		// The last line did not end with a newline character.
		// Take it now.
		lines = append(lines, runes[lstart:])
	}

	// Obey the maximum line limit.
	if maxLines > 0 && len(m.value)+len(lines)-1 > maxLines {
		allowedHeight := max(0, maxLines-len(m.value)+1)
		lines = lines[:allowedHeight]
	}

	if len(lines) == 0 {
		// Nothing left to insert.
		return
	}

	// Save the remainder of the original line at the current
	// cursor position.
	tail := make([]rune, len(m.value[m.row][m.col:]))
	copy(tail, m.value[m.row][m.col:])

	// Paste the first line at the current cursor position.
	m.value[m.row] = append(m.value[m.row][:m.col], lines[0]...)
	m.col += len(lines[0])

	if numExtraLines := len(lines) - 1; numExtraLines > 0 {
		// Add the new lines.
		// We try to reuse the slice if there's already space.
		var newGrid [][]rune
		if cap(m.value) >= len(m.value)+numExtraLines {
			// Can reuse the extra space.
			newGrid = m.value[:len(m.value)+numExtraLines]
		} else {
			// No space left; need a new slice.
			newGrid = make([][]rune, len(m.value)+numExtraLines)
			copy(newGrid, m.value[:m.row+1])
		}
		// Add all the rows that were after the cursor in the original
		// grid at the end of the new grid.
		copy(newGrid[m.row+1+numExtraLines:], m.value[m.row+1:])
		m.value = newGrid
		// Insert all the new lines in the middle.
		for _, l := range lines[1:] {
			m.row++
			m.value[m.row] = l
			m.col = len(l)
		}
	}

	// Finally add the tail at the end of the last line inserted.
	m.value[m.row] = append(m.value[m.row], tail...)

	m.SetCursor(m.col)
}

// Value returns the value of the text input.
func (m Model) Value() string {
	if m.value == nil {
		return ""
	}

	var v strings.Builder
	for _, l := range m.value {
		v.WriteString(string(l))
		v.WriteByte('\n')
	}

	return strings.TrimSuffix(v.String(), "\n")
}

// Length returns the number of characters currently in the text input.
func (m *Model) Length() int {
	var l int
	for _, row := range m.value {
		l += uniseg.StringWidth(string(row))
	}
	// We add len(m.value) to include the newline characters.
	return l + len(m.value) - 1
}

// LineCount returns the number of lines that are currently in the text input.
func (m *Model) LineCount() int {
	return len(m.value)
}

// Line returns the line position.
func (m Model) Line() int {
	return m.row
}

// CursorDown moves the cursor down by one line.
// Returns whether or not the cursor blink should be reset.
func (m *Model) CursorDown() {
	li := m.LineInfo()
	charOffset := max(m.lastCharOffset, li.CharOffset)
	m.lastCharOffset = charOffset

	if li.RowOffset+1 >= li.Height && m.row < len(m.value)-1 {
		m.row++
		m.col = 0
	} else {
		// Move the cursor to the start of the next line so that we can get
		// the line information. We need to add 2 columns to account for the
		// trailing space wrapping.
		const trailingSpace = 2
		m.col = min(li.StartColumn+li.Width+trailingSpace, len(m.value[m.row])-1)
	}

	nli := m.LineInfo()
	m.col = nli.StartColumn

	if nli.Width <= 0 {
		return
	}

	offset := 0
	for offset < charOffset {
		if m.row >= len(m.value) || m.col >= len(m.value[m.row]) || offset >= nli.CharWidth-1 {
			break
		}
		offset += rw.RuneWidth(m.value[m.row][m.col])
		m.col++
	}
}

// CursorUp moves the cursor up by one line.
func (m *Model) CursorUp() {
	li := m.LineInfo()
	charOffset := max(m.lastCharOffset, li.CharOffset)
	m.lastCharOffset = charOffset

	if li.RowOffset <= 0 && m.row > 0 {
		m.row--
		m.col = len(m.value[m.row])
	} else {
		// Move the cursor to the end of the previous line.
		// This can be done by moving the cursor to the start of the line and
		// then subtracting 2 to account for the trailing space we keep on
		// soft-wrapped lines.
		const trailingSpace = 2
		m.col = li.StartColumn - trailingSpace
	}

	nli := m.LineInfo()
	m.col = nli.StartColumn

	if nli.Width <= 0 {
		return
	}

	offset := 0
	for offset < charOffset {
		if m.col >= len(m.value[m.row]) || offset >= nli.CharWidth-1 {
			break
		}
		offset += rw.RuneWidth(m.value[m.row][m.col])
		m.col++
	}
}

// SetCursor moves the cursor to the given position. If the position is
// out of bounds the cursor will be moved to the start or end accordingly.
func (m *Model) SetCursor(col int) {
	m.col = clamp(col, 0, len(m.value[m.row]))
	// Any time that we move the cursor horizontally we need to reset the last
	// offset so that the horizontal position when navigating is adjusted.
	m.lastCharOffset = 0
}

// CursorStart moves the cursor to the start of the input field.
func (m *Model) CursorStart() {
	m.SetCursor(0)
}

// CursorEnd moves the cursor to the end of the input field.
func (m *Model) CursorEnd() {
	m.SetCursor(len(m.value[m.row]))
}

// Focused returns the focus state on the model.
func (m Model) Focused() bool {
	return m.focus
}

// Focus sets the focus state on the model. When the model is in focus it can
// receive keyboard input and the cursor will be hidden.
func (m *Model) Focus() tea.Cmd {
	m.focus = true
	m.style = &m.FocusedStyle
	return m.Cursor.Focus()
}

// Blur removes the focus state on the model. When the model is blurred it can
// not receive keyboard input and the cursor will be hidden.
func (m *Model) Blur() {
	m.focus = false
	m.style = &m.BlurredStyle
	m.Cursor.Blur()
}

// Reset sets the input to its default state with no input.
func (m *Model) Reset() {
	m.value = make([][]rune, minHeight, maxLines)
	m.col = 0
	m.row = 0
	m.viewport.GotoTop()
	m.SetCursor(0)
}

// san initializes or retrieves the rune sanitizer.
func (m *Model) san() runeutil.Sanitizer {
	if m.rsan == nil {
		// Textinput has all its input on a single line so collapse
		// newlines/tabs to single spaces.
		m.rsan = runeutil.NewSanitizer()
	}
	return m.rsan
}

// deleteBeforeCursor deletes all text before the cursor. Returns whether or
// not the cursor blink should be reset.
func (m *Model) deleteBeforeCursor() {
	m.value[m.row] = m.value[m.row][m.col:]
	m.SetCursor(0)
}

// deleteAfterCursor deletes all text after the cursor. Returns whether or not
// the cursor blink should be reset. If input is masked delete everything after
// the cursor so as not to reveal word breaks in the masked input.
func (m *Model) deleteAfterCursor() {
	m.value[m.row] = m.value[m.row][:m.col]
	m.SetCursor(len(m.value[m.row]))
}

// transposeLeft exchanges the runes at the cursor and immediately
// before. No-op if the cursor is at the beginning of the line.  If
// the cursor is not at the end of the line yet, moves the cursor to
// the right.
func (m *Model) transposeLeft() {
	if m.col == 0 || len(m.value[m.row]) < 2 {
		return
	}
	if m.col >= len(m.value[m.row]) {
		m.SetCursor(m.col - 1)
	}
	m.value[m.row][m.col-1], m.value[m.row][m.col] = m.value[m.row][m.col], m.value[m.row][m.col-1]
	if m.col < len(m.value[m.row]) {
		m.SetCursor(m.col + 1)
	}
}

// deleteWordLeft deletes the word left to the cursor. Returns whether or not
// the cursor blink should be reset.
func (m *Model) deleteWordLeft() {
	if m.col == 0 || len(m.value[m.row]) == 0 {
		return
	}

	// Linter note: it's critical that we acquire the initial cursor position
	// here prior to altering it via SetCursor() below. As such, moving this
	// call into the corresponding if clause does not apply here.
	oldCol := m.col

	m.SetCursor(m.col - 1)
	for unicode.IsSpace(m.value[m.row][m.col]) {
		if m.col <= 0 {
			break
		}
		// ignore series of whitespace before cursor
		m.SetCursor(m.col - 1)
	}

	for m.col > 0 {
		if !unicode.IsSpace(m.value[m.row][m.col]) {
			m.SetCursor(m.col - 1)
		} else {
			if m.col > 0 {
				// keep the previous space
				m.SetCursor(m.col + 1)
			}
			break
		}
	}

	if oldCol > len(m.value[m.row]) {
		m.value[m.row] = m.value[m.row][:m.col]
	} else {
		m.value[m.row] = append(m.value[m.row][:m.col], m.value[m.row][oldCol:]...)
	}
}

// deleteWordRight deletes the word right to the cursor.
func (m *Model) deleteWordRight() {
	if m.col >= len(m.value[m.row]) || len(m.value[m.row]) == 0 {
		return
	}

	oldCol := m.col

	for m.col < len(m.value[m.row]) && unicode.IsSpace(m.value[m.row][m.col]) {
		// ignore series of whitespace after cursor
		m.SetCursor(m.col + 1)
	}

	for m.col < len(m.value[m.row]) {
		if !unicode.IsSpace(m.value[m.row][m.col]) {
			m.SetCursor(m.col + 1)
		} else {
			break
		}
	}

	if m.col > len(m.value[m.row]) {
		m.value[m.row] = m.value[m.row][:oldCol]
	} else {
		m.value[m.row] = append(m.value[m.row][:oldCol], m.value[m.row][m.col:]...)
	}

	m.SetCursor(oldCol)
}

// characterRight moves the cursor one character to the right.
func (m *Model) characterRight() {
	if m.col < len(m.value[m.row]) {
		m.SetCursor(m.col + 1)
	} else {
		if m.row < len(m.value)-1 {
			m.row++
			m.CursorStart()
		}
	}
}

// characterLeft moves the cursor one character to the left.
// If insideLine is set, the cursor is moved to the last
// character in the previous line, instead of one past that.
func (m *Model) characterLeft(insideLine bool) {
	if m.col == 0 && m.row != 0 {
		m.row--
		m.CursorEnd()
		if !insideLine {
			return
		}
	}
	if m.col > 0 {
		m.SetCursor(m.col - 1)
	}
}

// wordLeft moves the cursor one word to the left. Returns whether or not the
// cursor blink should be reset. If input is masked, move input to the start
// so as not to reveal word breaks in the masked input.
func (m *Model) wordLeft() {
	for {
		m.characterLeft(true /* insideLine */)
		if m.col < len(m.value[m.row]) && !unicode.IsSpace(m.value[m.row][m.col]) {
			break
		}
	}

	for m.col > 0 {
		if unicode.IsSpace(m.value[m.row][m.col-1]) {
			break
		}
		m.SetCursor(m.col - 1)
	}
}

// wordRight moves the cursor one word to the right. Returns whether or not the
// cursor blink should be reset. If the input is masked, move input to the end
// so as not to reveal word breaks in the masked input.
func (m *Model) wordRight() {
	m.doWordRight(func(int, int) { /* nothing */ })
}

func (m *Model) doWordRight(fn func(charIdx int, pos int)) {
	// Skip spaces forward.
	for m.col >= len(m.value[m.row]) || unicode.IsSpace(m.value[m.row][m.col]) {
		if m.row == len(m.value)-1 && m.col == len(m.value[m.row]) {
			// End of text.
			break
		}
		m.characterRight()
	}

	charIdx := 0
	for m.col < len(m.value[m.row]) {
		if unicode.IsSpace(m.value[m.row][m.col]) {
			break
		}
		fn(charIdx, m.col)
		m.SetCursor(m.col + 1)
		charIdx++
	}
}

// uppercaseRight changes the word to the right to uppercase.
func (m *Model) uppercaseRight() {
	m.doWordRight(func(_ int, i int) {
		m.value[m.row][i] = unicode.ToUpper(m.value[m.row][i])
	})
}

// lowercaseRight changes the word to the right to lowercase.
func (m *Model) lowercaseRight() {
	m.doWordRight(func(_ int, i int) {
		m.value[m.row][i] = unicode.ToLower(m.value[m.row][i])
	})
}

// capitalizeRight changes the word to the right to title case.
func (m *Model) capitalizeRight() {
	m.doWordRight(func(charIdx int, i int) {
		if charIdx == 0 {
			m.value[m.row][i] = unicode.ToTitle(m.value[m.row][i])
		}
	})
}

// LineInfo returns the number of characters from the start of the
// (soft-wrapped) line and the (soft-wrapped) line width.
func (m Model) LineInfo() LineInfo {
	grid := m.memoizedWrap(m.value[m.row], m.width)

	// Find out which line we are currently on. This can be determined by the
	// m.col and counting the number of runes that we need to skip.
	var counter int
	for i, line := range grid {
		// We've found the line that we are on
		if counter+len(line) == m.col && i+1 < len(grid) {
			// We wrap around to the next line if we are at the end of the
			// previous line so that we can be at the very beginning of the row
			return LineInfo{
				CharOffset:   0,
				ColumnOffset: 0,
				Height:       len(grid),
				RowOffset:    i + 1,
				StartColumn:  m.col,
				Width:        len(grid[i+1]),
				CharWidth:    uniseg.StringWidth(string(line)),
			}
		}

		if counter+len(line) >= m.col {
			return LineInfo{
				CharOffset:   uniseg.StringWidth(string(line[:max(0, m.col-counter)])),
				ColumnOffset: m.col - counter,
				Height:       len(grid),
				RowOffset:    i,
				StartColumn:  counter,
				Width:        len(line),
				CharWidth:    uniseg.StringWidth(string(line)),
			}
		}

		counter += len(line)
	}
	return LineInfo{}
}

// repositionView repositions the view of the viewport based on the defined
// scrolling behavior.
func (m *Model) repositionView() {
	minimum := m.viewport.YOffset
	maximum := minimum + m.viewport.Height - 1

	if row := m.cursorLineNumber(); row < minimum {
		m.viewport.ScrollUp(minimum - row)
	} else if row > maximum {
		m.viewport.ScrollDown(row - maximum)
	}
}

// Width returns the width of the textarea.
func (m Model) Width() int {
	return m.width
}

// moveToBegin moves the cursor to the beginning of the input.
func (m *Model) moveToBegin() {
	m.row = 0
	m.SetCursor(0)
}

// moveToEnd moves the cursor to the end of the input.
func (m *Model) moveToEnd() {
	m.row = len(m.value) - 1
	m.SetCursor(len(m.value[m.row]))
}

// SetWidth sets the width of the textarea to fit exactly within the given width.
// This means that the textarea will account for the width of the prompt and
// whether or not line numbers are being shown.
//
// Ensure that SetWidth is called after setting the Prompt and ShowLineNumbers,
// It is important that the width of the textarea be exactly the given width
// and no more.
func (m *Model) SetWidth(w int) {
	// Update prompt width only if there is no prompt function as SetPromptFunc
	// updates the prompt width when it is called.
	if m.promptFunc == nil {
		m.promptWidth = uniseg.StringWidth(m.Prompt)
	}

	// Add base style borders and padding to reserved outer width.
	reservedOuter := m.style.Base.GetHorizontalFrameSize()

	// Add prompt width to reserved inner width.
	reservedInner := m.promptWidth

	// Add line number width to reserved inner width.
	if m.ShowLineNumbers {
		const lnWidth = 4 // Up to 3 digits for line number plus 1 margin.
		reservedInner += lnWidth
	}

	// Input width must be at least one more than the reserved inner and outer
	// width. This gives us a minimum input width of 1.
	minWidth := reservedInner + reservedOuter + 1
	inputWidth := max(w, minWidth)

	// Input width must be no more than maximum width.
	if m.MaxWidth > 0 {
		inputWidth = min(inputWidth, m.MaxWidth)
	}

	// Since the width of the viewport and input area is dependent on the width of
	// borders, prompt and line numbers, we need to calculate it by subtracting
	// the reserved width from them.

	m.viewport.Width = inputWidth - reservedOuter
	m.width = inputWidth - reservedOuter - reservedInner
}

// SetPromptFunc supersedes the Prompt field and sets a dynamic prompt
// instead.
// If the function returns a prompt that is shorter than the
// specified promptWidth, it will be padded to the left.
// If it returns a prompt that is longer, display artifacts
// may occur; the caller is responsible for computing an adequate
// promptWidth.
func (m *Model) SetPromptFunc(promptWidth int, fn func(lineIdx int) string) {
	m.promptFunc = fn
	m.promptWidth = promptWidth
}

// Height returns the current height of the textarea.
func (m Model) Height() int {
	return m.height
}

// SetHeight sets the height of the textarea.
func (m *Model) SetHeight(h int) {
	if m.MaxHeight > 0 {
		m.height = clamp(h, minHeight, m.MaxHeight)
		m.viewport.Height = clamp(h, minHeight, m.MaxHeight)
	} else {
		m.height = max(h, minHeight)
		m.viewport.Height = max(h, minHeight)
	}
}

// Update is the Bubble Tea update loop.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	if !m.focus {
		m.Cursor.Blur()
		return m, nil
	}

	// Used to determine if the cursor should blink.
	oldRow, oldCol := m.cursorLineNumber(), m.col

	var cmds []tea.Cmd

	if m.value[m.row] == nil {
		m.value[m.row] = make([]rune, 0)
	}

	if m.MaxHeight > 0 && m.MaxHeight != m.cache.Capacity() {
		m.cache = memoization.NewMemoCache[line, [][]rune](m.MaxHeight)
	}

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch {
		case key.Matches(msg, m.KeyMap.DeleteAfterCursor):
			m.col = clamp(m.col, 0, len(m.value[m.row]))
			if m.col >= len(m.value[m.row]) {
				m.mergeLineBelow(m.row)
				break
			}
			m.deleteAfterCursor()
		case key.Matches(msg, m.KeyMap.DeleteBeforeCursor):
			m.col = clamp(m.col, 0, len(m.value[m.row]))
			if m.col <= 0 {
				m.mergeLineAbove(m.row)
				break
			}
			m.deleteBeforeCursor()
		case key.Matches(msg, m.KeyMap.DeleteCharacterBackward):
			m.col = clamp(m.col, 0, len(m.value[m.row]))
			if m.col <= 0 {
				m.mergeLineAbove(m.row)
				break
			}
			if len(m.value[m.row]) > 0 {
				m.value[m.row] = append(m.value[m.row][:max(0, m.col-1)], m.value[m.row][m.col:]...)
				if m.col > 0 {
					m.SetCursor(m.col - 1)
				}
			}
		case key.Matches(msg, m.KeyMap.DeleteCharacterForward):
			if len(m.value[m.row]) > 0 && m.col < len(m.value[m.row]) {
				m.value[m.row] = append(m.value[m.row][:m.col], m.value[m.row][m.col+1:]...)
			}
			if m.col >= len(m.value[m.row]) {
				m.mergeLineBelow(m.row)
				break
			}
		case key.Matches(msg, m.KeyMap.DeleteWordBackward):
			if m.col <= 0 {
				m.mergeLineAbove(m.row)
				break
			}
			m.deleteWordLeft()
		case key.Matches(msg, m.KeyMap.DeleteWordForward):
			m.col = clamp(m.col, 0, len(m.value[m.row]))
			if m.col >= len(m.value[m.row]) {
				m.mergeLineBelow(m.row)
				break
			}
			m.deleteWordRight()
		case key.Matches(msg, m.KeyMap.InsertNewline):
			if m.MaxHeight > 0 && len(m.value) >= m.MaxHeight {
				return m, nil
			}
			m.col = clamp(m.col, 0, len(m.value[m.row]))
			m.splitLine(m.row, m.col)
		case key.Matches(msg, m.KeyMap.LineEnd):
			m.CursorEnd()
		case key.Matches(msg, m.KeyMap.LineStart):
			m.CursorStart()
		case key.Matches(msg, m.KeyMap.CharacterForward):
			m.characterRight()
		case key.Matches(msg, m.KeyMap.LineNext):
			m.CursorDown()
		case key.Matches(msg, m.KeyMap.WordForward):
			m.wordRight()
		case key.Matches(msg, m.KeyMap.Paste):
			return m, Paste
		case key.Matches(msg, m.KeyMap.CharacterBackward):
			m.characterLeft(false /* insideLine */)
		case key.Matches(msg, m.KeyMap.LinePrevious):
			m.CursorUp()
		case key.Matches(msg, m.KeyMap.WordBackward):
			m.wordLeft()
		case key.Matches(msg, m.KeyMap.InputBegin):
			m.moveToBegin()
		case key.Matches(msg, m.KeyMap.InputEnd):
			m.moveToEnd()
		case key.Matches(msg, m.KeyMap.LowercaseWordForward):
			m.lowercaseRight()
		case key.Matches(msg, m.KeyMap.UppercaseWordForward):
			m.uppercaseRight()
		case key.Matches(msg, m.KeyMap.CapitalizeWordForward):
			m.capitalizeRight()
		case key.Matches(msg, m.KeyMap.TransposeCharacterBackward):
			m.transposeLeft()

		default:
			m.insertRunesFromUserInput(msg.Runes)
		}

	case pasteMsg:
		m.insertRunesFromUserInput([]rune(msg))

	case pasteErrMsg:
		m.Err = msg
	}

	vp, cmd := m.viewport.Update(msg)
	m.viewport = &vp
	cmds = append(cmds, cmd)

	newRow, newCol := m.cursorLineNumber(), m.col
	m.Cursor, cmd = m.Cursor.Update(msg)
	if (newRow != oldRow || newCol != oldCol) && m.Cursor.Mode() == cursor.CursorBlink {
		m.Cursor.Blink = false
		cmd = m.Cursor.BlinkCmd()
	}
	cmds = append(cmds, cmd)

	m.repositionView()

	return m, tea.Batch(cmds...)
}

// View renders the text area in its current state.
func (m Model) View() string {
	if m.Value() == "" && m.row == 0 && m.col == 0 && m.Placeholder != "" {
		return m.placeholderView()
	}
	m.Cursor.TextStyle = m.style.computedCursorLine()

	var (
		s                strings.Builder
		style            lipgloss.Style
		newLines         int
		widestLineNumber int
		lineInfo         = m.LineInfo()
	)

	displayLine := 0
	for l, line := range m.value {
		wrappedLines := m.memoizedWrap(line, m.width)

		if m.row == l {
			style = m.style.computedCursorLine()
		} else {
			style = m.style.computedText()
		}

		for wl, wrappedLine := range wrappedLines {
			prompt := m.getPromptString(displayLine)
			prompt = m.style.computedPrompt().Render(prompt)
			s.WriteString(style.Render(prompt))
			displayLine++

			var ln string
			if m.ShowLineNumbers { //nolint:nestif
				if wl == 0 {
					if m.row == l {
						ln = style.Render(m.style.computedCursorLineNumber().Render(m.formatLineNumber(l + 1)))
						s.WriteString(ln)
					} else {
						ln = style.Render(m.style.computedLineNumber().Render(m.formatLineNumber(l + 1)))
						s.WriteString(ln)
					}
				} else {
					if m.row == l {
						ln = style.Render(m.style.computedCursorLineNumber().Render(m.formatLineNumber(" ")))
						s.WriteString(ln)
					} else {
						ln = style.Render(m.style.computedLineNumber().Render(m.formatLineNumber(" ")))
						s.WriteString(ln)
					}
				}
			}

			// Note the widest line number for padding purposes later.
			lnw := lipgloss.Width(ln)
			if lnw > widestLineNumber {
				widestLineNumber = lnw
			}

			strwidth := uniseg.StringWidth(string(wrappedLine))
			padding := m.width - strwidth
			// If the trailing space causes the line to be wider than the
			// width, we should not draw it to the screen since it will result
			// in an extra space at the end of the line which can look off when
			// the cursor line is showing.
			if strwidth > m.width {
				// The character causing the line to be wider than the width is
				// guaranteed to be a space since any other character would
				// have been wrapped.
				wrappedLine = []rune(strings.TrimSuffix(string(wrappedLine), " "))
				padding -= m.width - strwidth
			}
			if m.row == l && lineInfo.RowOffset == wl {
				s.WriteString(style.Render(string(wrappedLine[:lineInfo.ColumnOffset])))
				if m.col >= len(line) && lineInfo.CharOffset >= m.width {
					m.Cursor.SetChar(" ")
					s.WriteString(m.Cursor.View())
				} else {
					m.Cursor.SetChar(string(wrappedLine[lineInfo.ColumnOffset]))
					s.WriteString(style.Render(m.Cursor.View()))
					s.WriteString(style.Render(string(wrappedLine[lineInfo.ColumnOffset+1:])))
				}
			} else {
				s.WriteString(style.Render(string(wrappedLine)))
			}
			s.WriteString(style.Render(strings.Repeat(" ", max(0, padding))))
			s.WriteRune('\n')
			newLines++
		}
	}

	// Always show at least `m.Height` lines at all times.
	// To do this we can simply pad out a few extra new lines in the view.
	for i := 0; i < m.height; i++ {
		prompt := m.getPromptString(displayLine)
		prompt = m.style.computedPrompt().Render(prompt)
		s.WriteString(prompt)
		displayLine++

		// Write end of buffer content
		leftGutter := string(m.EndOfBufferCharacter)
		rightGapWidth := m.Width() - lipgloss.Width(leftGutter) + widestLineNumber
		rightGap := strings.Repeat(" ", max(0, rightGapWidth))
		s.WriteString(m.style.computedEndOfBuffer().Render(leftGutter + rightGap))
		s.WriteRune('\n')
	}

	m.viewport.SetContent(s.String())
	return m.style.Base.Render(m.viewport.View())
}

// formatLineNumber formats the line number for display dynamically based on
// the maximum number of lines.
func (m Model) formatLineNumber(x any) string {
	// XXX: ultimately we should use a max buffer height, which has yet to be
	// implemented.
	digits := len(strconv.Itoa(m.MaxHeight))
	return fmt.Sprintf(" %*v ", digits, x)
}

func (m Model) getPromptString(displayLine int) (prompt string) {
	prompt = m.Prompt
	if m.promptFunc == nil {
		return prompt
	}
	prompt = m.promptFunc(displayLine)
	pl := uniseg.StringWidth(prompt)
	if pl < m.promptWidth {
		prompt = fmt.Sprintf("%*s%s", m.promptWidth-pl, "", prompt)
	}
	return prompt
}

// placeholderView returns the prompt and placeholder view, if any.
func (m Model) placeholderView() string {
	var (
		s     strings.Builder
		p     = m.Placeholder
		style = m.style.computedPlaceholder()
	)

	// word wrap lines
	pwordwrap := ansi.Wordwrap(p, m.width, "")
	// wrap lines (handles lines that could not be word wrapped)
	pwrap := ansi.Hardwrap(pwordwrap, m.width, true)
	// split string by new lines
	plines := strings.Split(strings.TrimSpace(pwrap), "\n")

	for i := 0; i < m.height; i++ {
		lineStyle := m.style.computedPlaceholder()
		lineNumberStyle := m.style.computedLineNumber()
		if len(plines) > i {
			lineStyle = m.style.computedCursorLine()
			lineNumberStyle = m.style.computedCursorLineNumber()
		}

		// render prompt
		prompt := m.getPromptString(i)
		prompt = m.style.computedPrompt().Render(prompt)
		s.WriteString(lineStyle.Render(prompt))

		// when show line numbers enabled:
		// - render line number for only the cursor line
		// - indent other placeholder lines
		// this is consistent with vim with line numbers enabled
		if m.ShowLineNumbers {
			var ln string

			switch {
			case i == 0:
				ln = strconv.Itoa(i + 1)
				fallthrough
			case len(plines) > i:
				s.WriteString(lineStyle.Render(lineNumberStyle.Render(m.formatLineNumber(ln))))
			default:
			}
		}

		switch {
		// first line
		case i == 0:
			// first character of first line as cursor with character
			m.Cursor.TextStyle = m.style.computedPlaceholder()

			ch, rest, _, _ := uniseg.FirstGraphemeClusterInString(plines[0], 0)
			m.Cursor.SetChar(ch)
			s.WriteString(lineStyle.Render(m.Cursor.View()))

			// the rest of the first line
			s.WriteString(lineStyle.Render(style.Render(rest)))
		// remaining lines
		case len(plines) > i:
			// current line placeholder text
			if len(plines) > i {
				s.WriteString(lineStyle.Render(style.Render(plines[i] + strings.Repeat(" ", max(0, m.width-uniseg.StringWidth(plines[i]))))))
			}
		default:
			// end of line buffer character
			eob := m.style.computedEndOfBuffer().Render(string(m.EndOfBufferCharacter))
			s.WriteString(eob)
		}

		// terminate with new line
		s.WriteRune('\n')
	}

	m.viewport.SetContent(s.String())
	return m.style.Base.Render(m.viewport.View())
}

// Blink returns the blink command for the cursor.
func Blink() tea.Msg {
	return cursor.Blink()
}

func (m Model) memoizedWrap(runes []rune, width int) [][]rune {
	input := line{runes: runes, width: width}
	if v, ok := m.cache.Get(input); ok {
		return v
	}
	v := wrap(runes, width)
	m.cache.Set(input, v)
	return v
}

// cursorLineNumber returns the line number that the cursor is on.
// This accounts for soft wrapped lines.
func (m Model) cursorLineNumber() int {
	line := 0
	for i := 0; i < m.row; i++ {
		// Calculate the number of lines that the current line will be split
		// into.
		line += len(m.memoizedWrap(m.value[i], m.width))
	}
	line += m.LineInfo().RowOffset
	return line
}

// mergeLineBelow merges the current line the cursor is on with the line below.
func (m *Model) mergeLineBelow(row int) {
	if row >= len(m.value)-1 {
		return
	}

	// To perform a merge, we will need to combine the two lines and then
	m.value[row] = append(m.value[row], m.value[row+1]...)

	// Shift all lines up by one
	for i := row + 1; i < len(m.value)-1; i++ {
		m.value[i] = m.value[i+1]
	}

	// And, remove the last line
	if len(m.value) > 0 {
		m.value = m.value[:len(m.value)-1]
	}
}

// mergeLineAbove merges the current line the cursor is on with the line above.
func (m *Model) mergeLineAbove(row int) {
	if row <= 0 {
		return
	}

	m.col = len(m.value[row-1])
	m.row = m.row - 1

	// To perform a merge, we will need to combine the two lines and then
	m.value[row-1] = append(m.value[row-1], m.value[row]...)

	// Shift all lines up by one
	for i := row; i < len(m.value)-1; i++ {
		m.value[i] = m.value[i+1]
	}

	// And, remove the last line
	if len(m.value) > 0 {
		m.value = m.value[:len(m.value)-1]
	}
}

func (m *Model) splitLine(row, col int) {
	// To perform a split, take the current line and keep the content before
	// the cursor, take the content after the cursor and make it the content of
	// the line underneath, and shift the remaining lines down by one
	head, tailSrc := m.value[row][:col], m.value[row][col:]
	tail := make([]rune, len(tailSrc))
	copy(tail, tailSrc)

	m.value = append(m.value[:row+1], m.value[row:]...)

	m.value[row] = head
	m.value[row+1] = tail

	m.col = 0
	m.row++
}

// Paste is a command for pasting from the clipboard into the text input.
func Paste() tea.Msg {
	str, err := clipboard.ReadAll()
	if err != nil {
		return pasteErrMsg{err}
	}
	return pasteMsg(str)
}

func wrap(runes []rune, width int) [][]rune {
	var (
		lines  = [][]rune{{}}
		word   = []rune{}
		row    int
		spaces int
	)

	// Word wrap the runes
	for _, r := range runes {
		if unicode.IsSpace(r) {
			spaces++
		} else {
			word = append(word, r)
		}

		if spaces > 0 { //nolint:nestif
			if uniseg.StringWidth(string(lines[row]))+uniseg.StringWidth(string(word))+spaces > width {
				row++
				lines = append(lines, []rune{})
				lines[row] = append(lines[row], word...)
				lines[row] = append(lines[row], repeatSpaces(spaces)...)
				spaces = 0
				word = nil
			} else {
				lines[row] = append(lines[row], word...)
				lines[row] = append(lines[row], repeatSpaces(spaces)...)
				spaces = 0
				word = nil
			}
		} else {
			// If the last character is a double-width rune, then we may not be able to add it to this line
			// as it might cause us to go past the width.
			lastCharLen := rw.RuneWidth(word[len(word)-1])
			if uniseg.StringWidth(string(word))+lastCharLen > width {
				// If the current line has any content, let's move to the next
				// line because the current word fills up the entire line.
				if len(lines[row]) > 0 {
					row++
					lines = append(lines, []rune{})
				}
				lines[row] = append(lines[row], word...)
				word = nil
			}
		}
	}

	if uniseg.StringWidth(string(lines[row]))+uniseg.StringWidth(string(word))+spaces >= width {
		lines = append(lines, []rune{})
		lines[row+1] = append(lines[row+1], word...)
		// We add an extra space at the end of the line to account for the
		// trailing space at the end of the previous soft-wrapped lines so that
		// behaviour when navigating is consistent and so that we don't need to
		// continually add edges to handle the last line of the wrapped input.
		spaces++
		lines[row+1] = append(lines[row+1], repeatSpaces(spaces)...)
	} else {
		lines[row] = append(lines[row], word...)
		spaces++
		lines[row] = append(lines[row], repeatSpaces(spaces)...)
	}

	return lines
}

func repeatSpaces(n int) []rune {
	return []rune(strings.Repeat(string(' '), n))
}

func clamp(v, low, high int) int {
	if high < low {
		low, high = high, low
	}
	return min(high, max(low, v))
}



================================================
FILE: textarea/textarea_test.go
================================================
package textarea

import (
	"strings"
	"testing"
	"unicode"

	"github.com/MakeNowJust/heredoc"
	"github.com/aymanbagabas/go-udiff"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/ansi"
)

func TestVerticalScrolling(t *testing.T) {
	textarea := newTextArea()
	textarea.Prompt = ""
	textarea.ShowLineNumbers = false
	textarea.SetHeight(1)
	textarea.SetWidth(20)
	textarea.CharLimit = 100

	textarea, _ = textarea.Update(nil)

	input := "This is a really long line that should wrap around the text area."

	for _, k := range input {
		textarea, _ = textarea.Update(keyPress(k))
	}

	view := textarea.View()

	// The view should contain the first "line" of the input.
	if !strings.Contains(view, "This is a really") {
		t.Log(view)
		t.Error("Text area did not render the input")
	}

	// But we should be able to scroll to see the next line.
	// Let's scroll down for each line to view the full input.
	lines := []string{
		"long line that",
		"should wrap around",
		"the text area.",
	}
	for _, line := range lines {
		textarea.viewport.ScrollDown(1)
		view = textarea.View()
		if !strings.Contains(view, line) {
			t.Log(view)
			t.Error("Text area did not render the correct scrolled input")
		}
	}
}

func TestWordWrapOverflowing(t *testing.T) {
	// An interesting edge case is when the user enters many words that fill up
	// the text area and then goes back up and inserts a few words which causes
	// a cascading wrap and causes an overflow of the last line.
	//
	// In this case, we should not let the user insert more words if, after the
	// entire wrap is complete, the last line is overflowing.
	textarea := newTextArea()

	textarea.SetHeight(3)
	textarea.SetWidth(20)
	textarea.CharLimit = 500

	textarea, _ = textarea.Update(nil)

	input := "Testing Testing Testing Testing Testing Testing Testing Testing"

	for _, k := range input {
		textarea, _ = textarea.Update(keyPress(k))
		textarea.View()
	}

	// We have essentially filled the text area with input.
	// Let's see if we can cause wrapping to overflow the last line.
	textarea.row = 0
	textarea.col = 0

	input = "Testing"

	for _, k := range input {
		textarea, _ = textarea.Update(keyPress(k))
		textarea.View()
	}

	lastLineWidth := textarea.LineInfo().Width
	if lastLineWidth > 20 {
		t.Log(lastLineWidth)
		t.Log(textarea.View())
		t.Fail()
	}
}

func TestValueSoftWrap(t *testing.T) {
	textarea := newTextArea()
	textarea.SetWidth(16)
	textarea.SetHeight(10)
	textarea.CharLimit = 500

	textarea, _ = textarea.Update(nil)

	input := "Testing Testing Testing Testing Testing Testing Testing Testing"

	for _, k := range []rune(input) {
		textarea, _ = textarea.Update(keyPress(k))
		textarea.View()
	}

	value := textarea.Value()
	if value != input {
		t.Log(value)
		t.Log(input)
		t.Fatal("The text area does not have the correct value")
	}
}

func TestSetValue(t *testing.T) {
	textarea := newTextArea()
	textarea.SetValue(strings.Join([]string{"Foo", "Bar", "Baz"}, "\n"))

	if textarea.row != 2 && textarea.col != 3 {
		t.Log(textarea.row, textarea.col)
		t.Fatal("Cursor Should be on row 2 column 3 after inserting 2 new lines")
	}

	value := textarea.Value()
	if value != "Foo\nBar\nBaz" {
		t.Fatal("Value should be Foo\nBar\nBaz")
	}

	// SetValue should reset text area
	textarea.SetValue("Test")
	value = textarea.Value()
	if value != "Test" {
		t.Log(value)
		t.Fatal("Text area was not reset when SetValue() was called")
	}
}

func TestInsertString(t *testing.T) {
	textarea := newTextArea()

	// Insert some text
	input := "foo baz"

	for _, k := range []rune(input) {
		textarea, _ = textarea.Update(keyPress(k))
	}

	// Put cursor in the middle of the text
	textarea.col = 4

	textarea.InsertString("bar ")

	value := textarea.Value()
	if value != "foo bar baz" {
		t.Log(value)
		t.Fatal("Expected insert string to insert bar between foo and baz")
	}
}

func TestCanHandleEmoji(t *testing.T) {
	textarea := newTextArea()
	input := "🧋"

	for _, k := range []rune(input) {
		textarea, _ = textarea.Update(keyPress(k))
	}

	value := textarea.Value()
	if value != input {
		t.Log(value)
		t.Fatal("Expected emoji to be inserted")
	}

	input = "🧋🧋🧋"

	textarea.SetValue(input)

	value = textarea.Value()
	if value != input {
		t.Log(value)
		t.Fatal("Expected emoji to be inserted")
	}

	if textarea.col != 3 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the third character")
	}

	if charOffset := textarea.LineInfo().CharOffset; charOffset != 6 {
		t.Log(charOffset)
		t.Fatal("Expected cursor to be on the sixth character")
	}
}

func TestVerticalNavigationKeepsCursorHorizontalPosition(t *testing.T) {
	textarea := newTextArea()
	textarea.SetWidth(20)

	textarea.SetValue(strings.Join([]string{"你好你好", "Hello"}, "\n"))

	textarea.row = 0
	textarea.col = 2

	// 你好|你好
	// Hell|o
	// 1234|

	// Let's imagine our cursor is on the first line where the pipe is.
	// We press the down arrow to get to the next line.
	// The issue is that if we keep the cursor on the same column, the cursor will jump to after the `e`.
	//
	// 你好|你好
	// He|llo
	//
	// But this is wrong because visually we were at the 4th character due to
	// the first line containing double-width runes.
	// We want to keep the cursor on the same visual column.
	//
	// 你好|你好
	// Hell|o
	//
	// This test ensures that the cursor is kept on the same visual column by
	// ensuring that the column offset goes from 2 -> 4.

	lineInfo := textarea.LineInfo()
	if lineInfo.CharOffset != 4 || lineInfo.ColumnOffset != 2 {
		t.Log(lineInfo.CharOffset)
		t.Log(lineInfo.ColumnOffset)
		t.Fatal("Expected cursor to be on the fourth character because there are two double width runes on the first line.")
	}

	downMsg := tea.KeyMsg{Type: tea.KeyDown, Alt: false, Runes: []rune{}}
	textarea, _ = textarea.Update(downMsg)

	lineInfo = textarea.LineInfo()
	if lineInfo.CharOffset != 4 || lineInfo.ColumnOffset != 4 {
		t.Log(lineInfo.CharOffset)
		t.Log(lineInfo.ColumnOffset)
		t.Fatal("Expected cursor to be on the fourth character because we came down from the first line.")
	}
}

func TestVerticalNavigationShouldRememberPositionWhileTraversing(t *testing.T) {
	textarea := newTextArea()
	textarea.SetWidth(40)

	// Let's imagine we have a text area with the following content:
	//
	// Hello
	// World
	// This is a long line.
	//
	// If we are at the end of the last line and go up, we should be at the end
	// of the second line.
	// And, if we go up again we should be at the end of the first line.
	// But, if we go back down twice, we should be at the end of the last line
	// again and not the fifth (length of second line) character of the last line.
	//
	// In other words, we should remember the last horizontal position while
	// traversing vertically.

	textarea.SetValue(strings.Join([]string{"Hello", "World", "This is a long line."}, "\n"))

	// We are at the end of the last line.
	if textarea.col != 20 || textarea.row != 2 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the 20th character of the last line")
	}

	// Let's go up.
	upMsg := tea.KeyMsg{Type: tea.KeyUp, Alt: false, Runes: []rune{}}
	textarea, _ = textarea.Update(upMsg)

	// We should be at the end of the second line.
	if textarea.col != 5 || textarea.row != 1 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the 5th character of the second line")
	}

	// And, again.
	textarea, _ = textarea.Update(upMsg)

	// We should be at the end of the first line.
	if textarea.col != 5 || textarea.row != 0 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the 5th character of the first line")
	}

	// Let's go down, twice.
	downMsg := tea.KeyMsg{Type: tea.KeyDown, Alt: false, Runes: []rune{}}
	textarea, _ = textarea.Update(downMsg)
	textarea, _ = textarea.Update(downMsg)

	// We should be at the end of the last line.
	if textarea.col != 20 || textarea.row != 2 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the 20th character of the last line")
	}

	// Now, for correct behavior, if we move right or left, we should forget
	// (reset) the saved horizontal position. Since we assume the user wants to
	// keep the cursor where it is horizontally. This is how most text areas
	// work.

	textarea, _ = textarea.Update(upMsg)
	leftMsg := tea.KeyMsg{Type: tea.KeyLeft, Alt: false, Runes: []rune{}}
	textarea, _ = textarea.Update(leftMsg)

	if textarea.col != 4 || textarea.row != 1 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the 5th character of the second line")
	}

	// Going down now should keep us at the 4th column since we moved left and
	// reset the horizontal position saved state.
	textarea, _ = textarea.Update(downMsg)
	if textarea.col != 4 || textarea.row != 2 {
		t.Log(textarea.col)
		t.Fatal("Expected cursor to be on the 4th character of the last line")
	}
}

func TestView(t *testing.T) {
	t.Parallel()

	type want struct {
		view      string
		cursorRow int
		cursorCol int
	}

	tests := []struct {
		name      string
		modelFunc func(Model) Model
		want      want
	}{
		{
			name: "placeholder",
			want: want{
				view: heredoc.Doc(`
					>   1 Hello, World!
					>
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "single line",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line")

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 the first line
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 14,
			},
		},
		{
			name: "multiple lines",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line\nthe second line\nthe third line")

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 the first line
					>   2 the second line
					>   3 the third line
					>
					>
					>
				`),
				cursorRow: 2,
				cursorCol: 14,
			},
		},
		{
			name: "single line without line numbers",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line")
				m.ShowLineNumbers = false

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> the first line
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 14,
			},
		},
		{
			name: "multipline lines without line numbers",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line\nthe second line\nthe third line")
				m.ShowLineNumbers = false

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> the first line
					> the second line
					> the third line
					>
					>
					>
				`),
				cursorRow: 2,
				cursorCol: 14,
			},
		},
		{
			name: "single line and custom end of buffer character",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line")
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 the first line
					> *
					> *
					> *
					> *
					> *
				`),
				cursorRow: 0,
				cursorCol: 14,
			},
		},
		{
			name: "multiple lines and custom end of buffer character",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line\nthe second line\nthe third line")
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 the first line
					>   2 the second line
					>   3 the third line
					> *
					> *
					> *
				`),
				cursorRow: 2,
				cursorCol: 14,
			},
		},
		{
			name: "single line without line numbers and custom end of buffer character",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line")
				m.ShowLineNumbers = false
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> the first line
					> *
					> *
					> *
					> *
					> *
				`),
				cursorRow: 0,
				cursorCol: 14,
			},
		},
		{
			name: "multiple lines without line numbers and custom end of buffer character",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line\nthe second line\nthe third line")
				m.ShowLineNumbers = false
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> the first line
					> the second line
					> the third line
					> *
					> *
					> *
				`),
				cursorRow: 2,
				cursorCol: 14,
			},
		},
		{
			name: "single line and custom prompt",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line")
				m.Prompt = "* "

				return m
			},
			want: want{
				view: heredoc.Doc(`
					*   1 the first line
					*
					*
					*
					*
					*
				`),
				cursorRow: 0,
				cursorCol: 14,
			},
		},
		{
			name: "multiple lines and custom prompt",
			modelFunc: func(m Model) Model {
				m.SetValue("the first line\nthe second line\nthe third line")
				m.Prompt = "* "

				return m
			},
			want: want{
				view: heredoc.Doc(`
					*   1 the first line
					*   2 the second line
					*   3 the third line
					*
					*
					*
				`),
				cursorRow: 2,
				cursorCol: 14,
			},
		},
		{
			name: "type single line",
			modelFunc: func(m Model) Model {
				input := "foo"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 foo
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 3,
			},
		},
		{
			name: "type multiple lines",
			modelFunc: func(m Model) Model {
				input := "foo\nbar\nbaz"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 foo
					>   2 bar
					>   3 baz
					>
					>
					>
				`),
				cursorRow: 2,
				cursorCol: 3,
			},
		},
		{
			name: "softwrap",
			modelFunc: func(m Model) Model {
				m.ShowLineNumbers = false
				m.Prompt = ""
				m.SetWidth(5)

				input := "foo bar baz"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					foo
					bar
					baz



				`),
				cursorRow: 2,
				cursorCol: 3,
			},
		},
		{
			name: "single line character limit",
			modelFunc: func(m Model) Model {
				m.CharLimit = 7

				input := "foo bar baz"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 foo bar
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 7,
			},
		},
		{
			name: "multiple lines character limit",
			modelFunc: func(m Model) Model {
				m.CharLimit = 19

				input := "foo bar baz\nfoo bar baz"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 foo bar baz
					>   2 foo bar
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 7,
			},
		},
		{
			name: "set width",
			modelFunc: func(m Model) Model {
				m.SetWidth(10)

				input := "12"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 12
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 2,
			},
		},
		{
			name: "set width max length text minus one",
			modelFunc: func(m Model) Model {
				m.SetWidth(10)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 123
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 3,
			},
		},
		{
			name: "set width max length text",
			modelFunc: func(m Model) Model {
				m.SetWidth(10)

				input := "1234"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 1234
					>
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 0,
			},
		},
		{
			name: "set width max length text plus one",
			modelFunc: func(m Model) Model {
				m.SetWidth(10)

				input := "12345"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 1234
					>     5
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 1,
			},
		},
		{
			name: "set width set max width minus one",
			modelFunc: func(m Model) Model {
				m.MaxWidth = 10
				m.SetWidth(11)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 123
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 3,
			},
		},
		{
			name: "set width set max width",
			modelFunc: func(m Model) Model {
				m.MaxWidth = 10
				m.SetWidth(11)

				input := "1234"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 1234
					>
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 0,
			},
		},
		{
			name: "set width set max width plus one",
			modelFunc: func(m Model) Model {
				m.MaxWidth = 10
				m.SetWidth(11)

				input := "12345"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 1234
					>     5
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 1,
			},
		},
		{
			name: "set width min width minus one",
			modelFunc: func(m Model) Model {
				m.SetWidth(6)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 1
					>     2
					>     3
					>
					>
					>
				`),
				cursorRow: 3,
				cursorCol: 0,
			},
		},
		{
			name: "set width min width",
			modelFunc: func(m Model) Model {
				m.SetWidth(7)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 1
					>     2
					>     3
					>
					>
					>
				`),
				cursorRow: 3,
				cursorCol: 0,
			},
		},
		{
			name: "set width min width no line numbers",
			modelFunc: func(m Model) Model {
				m.ShowLineNumbers = false
				m.SetWidth(0)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 1
					> 2
					> 3
					>
					>
					>
				`),
				cursorRow: 3,
				cursorCol: 0,
			},
		},
		{
			name: "set width min width no line numbers no prompt",
			modelFunc: func(m Model) Model {
				m.ShowLineNumbers = false
				m.Prompt = ""
				m.SetWidth(0)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					1
					2
					3



				`),
				cursorRow: 3,
				cursorCol: 0,
			},
		},
		{
			name: "set width min width plus one",
			modelFunc: func(m Model) Model {
				m.SetWidth(8)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 12
					>     3
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 1,
			},
		},
		{
			name: "set width without line numbers max length text minus one",
			modelFunc: func(m Model) Model {
				m.ShowLineNumbers = false
				m.SetWidth(6)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 123
					>
					>
					>
					>
					>
				`),
				cursorRow: 0,
				cursorCol: 3,
			},
		},
		{
			name: "set width without line numbers max length text",
			modelFunc: func(m Model) Model {
				m.ShowLineNumbers = false
				m.SetWidth(6)

				input := "1234"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 1234
					>
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 0,
			},
		},
		{
			name: "set width without line numbers max length text plus one",
			modelFunc: func(m Model) Model {
				m.ShowLineNumbers = false
				m.SetWidth(6)

				input := "12345"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 1234
					> 5
					>
					>
					>
					>
				`),
				cursorRow: 1,
				cursorCol: 1,
			},
		},
		{
			name: "set width with style",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.SetWidth(12)

				input := "1"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│>   1 1   │
					│>         │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 0,
				cursorCol: 1,
			},
		},
		{
			name: "set width with style max width minus one",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.SetWidth(12)

				input := "123"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│>   1 123 │
					│>         │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 0,
				cursorCol: 3,
			},
		},
		{
			name: "set width with style max width",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.SetWidth(12)

				input := "1234"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│>   1 1234│
					│>         │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 1,
				cursorCol: 0,
			},
		},
		{
			name: "set width with style max width plus one",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.SetWidth(12)

				input := "12345"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│>   1 1234│
					│>     5   │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 1,
				cursorCol: 1,
			},
		},
		{
			name: "set width without line numbers with style",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.ShowLineNumbers = false
				m.SetWidth(12)

				input := "123456"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│> 123456  │
					│>         │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 0,
				cursorCol: 6,
			},
		},
		{
			name: "set width without line numbers with style max width minus one",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.ShowLineNumbers = false
				m.SetWidth(12)

				input := "1234567"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│> 1234567 │
					│>         │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 0,
				cursorCol: 7,
			},
		},
		{
			name: "set width without line numbers with style max width",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.ShowLineNumbers = false
				m.SetWidth(12)

				input := "12345678"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│> 12345678│
					│>         │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 1,
				cursorCol: 0,
			},
		},
		{
			name: "set width without line numbers with style max width plus one",
			modelFunc: func(m Model) Model {
				m.FocusedStyle.Base = lipgloss.NewStyle().Border(lipgloss.NormalBorder())
				m.Focus()

				m.ShowLineNumbers = false
				m.SetWidth(12)

				input := "123456789"
				m = sendString(m, input)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					┌──────────┐
					│> 12345678│
					│> 9       │
					│>         │
					│>         │
					│>         │
					│>         │
					└──────────┘
				`),
				cursorRow: 1,
				cursorCol: 1,
			},
		},
		{
			name: "placeholder min width",
			modelFunc: func(m Model) Model {
				m.SetWidth(0)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 H
					>     e
					>     l
					>     l
					>     o
					>     ,
				`),
			},
		},
		{
			name: "placeholder single line",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line"
				m.ShowLineNumbers = false

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> placeholder the first line
					>
					>
					>
					>
					>
					`),
			},
		},
		{
			name: "placeholder multiple lines",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line\nplaceholder the second line\nplaceholder the third line"
				m.ShowLineNumbers = false

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> placeholder the first line
					> placeholder the second line
					> placeholder the third line
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line with line numbers",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line"
				m.ShowLineNumbers = true

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 placeholder the first line
					>
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines with line numbers",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line\nplaceholder the second line\nplaceholder the third line"
				m.ShowLineNumbers = true

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 placeholder the first line
					>     placeholder the second line
					>     placeholder the third line
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line with end of buffer character",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line"
				m.ShowLineNumbers = false
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> placeholder the first line
					> *
					> *
					> *
					> *
					> *
				`),
			},
		},
		{
			name: "placeholder multiple lines with with end of buffer character",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line\nplaceholder the second line\nplaceholder the third line"
				m.ShowLineNumbers = false
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> placeholder the first line
					> placeholder the second line
					> placeholder the third line
					> *
					> *
					> *
				`),
			},
		},
		{
			name: "placeholder single line with line numbers and end of buffer character",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line"
				m.ShowLineNumbers = true
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 placeholder the first line
					> *
					> *
					> *
					> *
					> *
				`),
			},
		},
		{
			name: "placeholder multiple lines with line numbers and end of buffer character",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line\nplaceholder the second line\nplaceholder the third line"
				m.ShowLineNumbers = true
				m.EndOfBufferCharacter = '*'

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 placeholder the first line
					>     placeholder the second line
					>     placeholder the third line
					> *
					> *
					> *
				`),
			},
		},
		{
			name: "placeholder single line that is longer than max width",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line that is longer than the max width"
				m.SetWidth(40)
				m.ShowLineNumbers = false

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> placeholder the first line that is
					> longer than the max width
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines that are longer than max width",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line that is longer than the max width\nplaceholder the second line that is longer than the max width"
				m.ShowLineNumbers = false
				m.SetWidth(40)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> placeholder the first line that is
					> longer than the max width
					> placeholder the second line that is
					> longer than the max width
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line that is longer than max width with line numbers",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line that is longer than the max width"
				m.ShowLineNumbers = true
				m.SetWidth(40)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 placeholder the first line that is
					>     longer than the max width
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines that are longer than max width with line numbers",
			modelFunc: func(m Model) Model {
				m.Placeholder = "placeholder the first line that is longer than the max width\nplaceholder the second line that is longer than the max width"
				m.ShowLineNumbers = true
				m.SetWidth(40)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 placeholder the first line that is
					>     longer than the max width
					>     placeholder the second line that
					>     is longer than the max width
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line that is longer than max width at limit",
			modelFunc: func(m Model) Model {
				m.Placeholder = "123456789012345678"
				m.ShowLineNumbers = false
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 123456789012345678
					>
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line that is longer than max width at limit plus one",
			modelFunc: func(m Model) Model {
				m.Placeholder = "1234567890123456789"
				m.ShowLineNumbers = false
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 123456789012345678
					> 9
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line that is longer than max width with line numbers at limit",
			modelFunc: func(m Model) Model {
				m.Placeholder = "12345678901234"
				m.ShowLineNumbers = true
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 12345678901234
					>
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder single line that is longer than max width with line numbers at limit plus one",
			modelFunc: func(m Model) Model {
				m.Placeholder = "123456789012345"
				m.ShowLineNumbers = true
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 12345678901234
					>     5
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines that are longer than max width at limit",
			modelFunc: func(m Model) Model {
				m.Placeholder = "123456789012345678\n123456789012345678"
				m.ShowLineNumbers = false
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 123456789012345678
					> 123456789012345678
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines that are longer than max width at limit plus one",
			modelFunc: func(m Model) Model {
				m.Placeholder = "1234567890123456789\n1234567890123456789"
				m.ShowLineNumbers = false
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					> 123456789012345678
					> 9
					> 123456789012345678
					> 9
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines that are longer than max width with line numbers at limit",
			modelFunc: func(m Model) Model {
				m.Placeholder = "12345678901234\n12345678901234"
				m.ShowLineNumbers = true
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 12345678901234
					>     12345678901234
					>
					>
					>
					>
				`),
			},
		},
		{
			name: "placeholder multiple lines that are longer than max width with line numbers at limit plus one",
			modelFunc: func(m Model) Model {
				m.Placeholder = "123456789012345\n123456789012345"
				m.ShowLineNumbers = true
				m.SetWidth(20)

				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 12345678901234
					>     5
					>     12345678901234
					>     5
					>
					>
				`),
			},
		},
		{
			name: "placeholder chinese character",
			modelFunc: func(m Model) Model {
				m.Placeholder = "输入消息..."
				m.ShowLineNumbers = true
				m.SetWidth(20)
				return m
			},
			want: want{
				view: heredoc.Doc(`
					>   1 输入消息...
					>
					>
					>
					>
					>

				`),
			},
		},
	}

	for _, tt := range tests {
		tt := tt

		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			textarea := newTextArea()

			if tt.modelFunc != nil {
				textarea = tt.modelFunc(textarea)
			}

			view := stripString(textarea.View())
			wantView := stripString(tt.want.view)

			if view != wantView {
				t.Log(udiff.Unified("expected", "got", wantView, view))
				t.Fatalf("Want:\n%v\nGot:\n%v\n", wantView, view)
			}

			cursorRow := textarea.cursorLineNumber()
			cursorCol := textarea.LineInfo().ColumnOffset
			if tt.want.cursorRow != cursorRow || tt.want.cursorCol != cursorCol {
				format := "Want cursor at row: %v, col: %v Got: row: %v col: %v\n"
				t.Fatalf(format, tt.want.cursorRow, tt.want.cursorCol, cursorRow, cursorCol)
			}
		})
	}
}

func newTextArea() Model {
	textarea := New()

	textarea.Prompt = "> "
	textarea.Placeholder = "Hello, World!"

	textarea.Focus()

	textarea, _ = textarea.Update(nil)

	return textarea
}

func keyPress(key rune) tea.Msg {
	return tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune{key}, Alt: false}
}

func sendString(m Model, str string) Model {
	for _, k := range []rune(str) {
		m, _ = m.Update(keyPress(k))
	}

	return m
}

func stripString(str string) string {
	s := ansi.Strip(str)
	ss := strings.Split(s, "\n")

	var lines []string
	for _, l := range ss {
		trim := strings.TrimRightFunc(l, unicode.IsSpace)
		if trim != "" {
			lines = append(lines, trim)
		}
	}

	return strings.Join(lines, "\n")
}



================================================
FILE: textarea/memoization/memoization.go
================================================
// Package memoization is an internal package that provides a simple memoization
// for text area.
package memoization

import (
	"container/list"
	"crypto/sha256"
	"fmt"
	"sync"
)

// Hasher is an interface that requires a Hash method. The Hash method is
// expected to return a string representation of the hash of the object.
type Hasher interface {
	Hash() string
}

// entry is a struct that holds a key-value pair. It is used as an element
// in the evictionList of the MemoCache.
type entry[T any] struct {
	key   string
	value T
}

// MemoCache is a struct that represents a cache with a set capacity. It
// uses an LRU (Least Recently Used) eviction policy. It is safe for
// concurrent use.
type MemoCache[H Hasher, T any] struct {
	capacity      int
	mutex         sync.Mutex
	cache         map[string]*list.Element // The cache holding the results
	evictionList  *list.List               // A list to keep track of the order for LRU
	hashableItems map[string]T             // This map keeps track of the original hashable items (optional)
}

// NewMemoCache is a function that creates a new MemoCache with a given
// capacity. It returns a pointer to the created MemoCache.
func NewMemoCache[H Hasher, T any](capacity int) *MemoCache[H, T] {
	return &MemoCache[H, T]{
		capacity:      capacity,
		cache:         make(map[string]*list.Element),
		evictionList:  list.New(),
		hashableItems: make(map[string]T),
	}
}

// Capacity is a method that returns the capacity of the MemoCache.
func (m *MemoCache[H, T]) Capacity() int {
	return m.capacity
}

// Size is a method that returns the current size of the MemoCache. It is
// the number of items currently stored in the cache.
func (m *MemoCache[H, T]) Size() int {
	m.mutex.Lock()
	defer m.mutex.Unlock()
	return m.evictionList.Len()
}

// Get is a method that returns the value associated with the given
// hashable item in the MemoCache. If there is no corresponding value, the
// method returns nil.
func (m *MemoCache[H, T]) Get(h H) (T, bool) {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	hashedKey := h.Hash()
	if element, found := m.cache[hashedKey]; found {
		m.evictionList.MoveToFront(element)
		return element.Value.(*entry[T]).value, true
	}
	var result T
	return result, false
}

// Set is a method that sets the value for the given hashable item in the
// MemoCache. If the cache is at capacity, it evicts the least recently
// used item before adding the new item.
func (m *MemoCache[H, T]) Set(h H, value T) {
	m.mutex.Lock()
	defer m.mutex.Unlock()

	hashedKey := h.Hash()
	if element, found := m.cache[hashedKey]; found {
		m.evictionList.MoveToFront(element)
		element.Value.(*entry[T]).value = value
		return
	}

	// Check if the cache is at capacity
	if m.evictionList.Len() >= m.capacity {
		// Evict the least recently used item from the cache
		toEvict := m.evictionList.Back()
		if toEvict != nil {
			evictedEntry := m.evictionList.Remove(toEvict).(*entry[T])
			delete(m.cache, evictedEntry.key)
			delete(m.hashableItems, evictedEntry.key) // if you're keeping track of original items
		}
	}

	// Add the value to the cache and the evictionList
	newEntry := &entry[T]{
		key:   hashedKey,
		value: value,
	}
	element := m.evictionList.PushFront(newEntry)
	m.cache[hashedKey] = element
	m.hashableItems[hashedKey] = value // if you're keeping track of original items
}

// HString is a type that implements the Hasher interface for strings.
type HString string

// Hash is a method that returns the hash of the string.
func (h HString) Hash() string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(h)))
}

// HInt is a type that implements the Hasher interface for integers.
type HInt int

// Hash is a method that returns the hash of the integer.
func (h HInt) Hash() string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(fmt.Sprintf("%d", h))))
}



================================================
FILE: textarea/memoization/memoization_test.go
================================================
package memoization

import (
	"encoding/binary"
	"fmt"
	"os"
	"testing"
)

type actionType int

const (
	set actionType = iota
	get
)

type cacheAction struct {
	actionType    actionType
	key           HString
	value         interface{}
	expectedValue interface{}
}

type testCase struct {
	name     string
	capacity int
	actions  []cacheAction
}

func TestCache(t *testing.T) {
	tests := []testCase{
		{
			name:     "TestNewMemoCache",
			capacity: 5,
			actions: []cacheAction{
				{actionType: get, expectedValue: nil},
			},
		},
		{
			name:     "TestSetAndGet",
			capacity: 10,
			actions: []cacheAction{
				{actionType: set, key: "key1", value: "value1"},
				{actionType: get, key: "key1", expectedValue: "value1"},
				{actionType: set, key: "key1", value: "newValue1"},
				{actionType: get, key: "key1", expectedValue: "newValue1"},
				{actionType: get, key: "nonExistentKey", expectedValue: nil},
				{actionType: set, key: "nilKey", value: ""},
				{actionType: get, key: "nilKey", expectedValue: ""},
				{actionType: set, key: "keyA", value: "valueA"},
				{actionType: set, key: "keyB", value: "valueB"},
				{actionType: get, key: "keyA", expectedValue: "valueA"},
				{actionType: get, key: "keyB", expectedValue: "valueB"},
			},
		},
		{
			name:     "TestSetNilValue",
			capacity: 10,
			actions: []cacheAction{
				{actionType: set, key: HString("nilKey"), value: nil},
				{actionType: get, key: HString("nilKey"), expectedValue: nil},
			},
		},
		{
			name:     "TestGetAfterEviction",
			capacity: 2,
			actions: []cacheAction{
				{actionType: set, key: HString("1"), value: 1},
				{actionType: set, key: HString("2"), value: 2},
				{actionType: set, key: HString("3"), value: 3},
				{actionType: get, key: HString("1"), expectedValue: nil},
				{actionType: get, key: HString("2"), expectedValue: 2},
			},
		},
		{
			name:     "TestGetAfterLRU",
			capacity: 2,
			actions: []cacheAction{
				{actionType: set, key: HString("1"), value: 1},
				{actionType: set, key: HString("2"), value: 2},
				{actionType: get, key: HString("1"), expectedValue: 1},
				{actionType: set, key: HString("3"), value: 3},
				{actionType: get, key: HString("1"), expectedValue: 1},
				{actionType: get, key: HString("3"), expectedValue: 3},
				{actionType: get, key: HString("2"), expectedValue: nil},
			},
		},
		{
			name:     "TestLRU_Capacity3",
			capacity: 3,
			actions: []cacheAction{
				{actionType: set, key: HString("1"), value: 1},
				{actionType: set, key: HString("2"), value: 2},
				{actionType: set, key: HString("3"), value: 3},
				{actionType: get, key: HString("1"), expectedValue: 1}, // Accessing key "1"
				{actionType: set, key: HString("4"), value: 4},         // Should evict key "2" since "1" was recently accessed
				{actionType: get, key: HString("2"), expectedValue: nil},
				{actionType: get, key: HString("1"), expectedValue: 1},
				{actionType: get, key: HString("3"), expectedValue: 3},
				{actionType: get, key: HString("4"), expectedValue: 4},
			},
		},
		// Test LRU behavior with varying accesses
		{
			name:     "TestLRU_VaryingAccesses",
			capacity: 3,
			actions: []cacheAction{
				{actionType: set, key: HString("1"), value: 1},
				{actionType: set, key: HString("2"), value: 2},
				{actionType: set, key: HString("3"), value: 3},
				{actionType: get, key: HString("1"), expectedValue: 1}, // Accessing key "1"
				{actionType: get, key: HString("2"), expectedValue: 2}, // Accessing key "2"
				{actionType: set, key: HString("4"), value: 4},         // Should evict key "3"
				{actionType: get, key: HString("3"), expectedValue: nil},
				{actionType: get, key: HString("1"), expectedValue: 1},
				{actionType: get, key: HString("2"), expectedValue: 2},
				{actionType: get, key: HString("4"), expectedValue: 4},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			cache := NewMemoCache[HString, interface{}](tt.capacity)
			for _, action := range tt.actions {
				switch action.actionType {
				case set:
					cache.Set(action.key, action.value)
				case get:
					if got, _ := cache.Get(action.key); got != action.expectedValue {
						t.Errorf("Get() = %v, want %v", got, action.expectedValue)
					}
				}
			}
		})
	}
}

func FuzzCache(f *testing.F) {
	// Define some seed values for initial scenarios
	for _, seed := range [][]byte{
		[]byte("7\x010\x0000000020"),
		{0, 0, 0, 0}, // Set key 0 to 0
		{1, 0, 0, 1}, // Set key 0 to 1
		{2, 0},       // Get key 0
	} {
		f.Add(seed)
	}

	f.Fuzz(func(t *testing.T, in []byte) {
		if len(in) < 1 {
			t.Skip() // Skip the test if the input is less than 1 byte
		}

		cache := NewMemoCache[HInt, int](10) // Initialize a cache with the initial size

		expectedValues := make(map[HInt]int) // Map to store expected key-value pairs
		accessOrder := make([]HInt, 0)       // Slice to store the order of keys accessed

		for i := 0; i < len(in); {
			opCode := in[i] % 4 // Determine the operation: Set, Get, or Reset (added case for Reset)
			i++

			switch opCode {
			case 0, 1: // Set operation
				if i+3 > len(in) {
					t.Skip() // Not enough input to continue, so skip
				}

				key := HInt(binary.BigEndian.Uint16(in[i : i+2]))
				value := int(in[i+2])
				i += 3

				// If the key is already in accessOrder, we remove it and append it again later
				for index, accessedKey := range accessOrder {
					if accessedKey == key {
						accessOrder = append(accessOrder[:index], accessOrder[index+1:]...)
						break
					}
				}

				cache.Set(key, value) // Set the value in the cache
				expectedValues[key] = value
				accessOrder = append(accessOrder, key) // Add the key to the access order slice

				// If we exceeded the cache size, we need to evict the least recently used item
				if len(accessOrder) > cache.Capacity() {
					evictedKey := accessOrder[0]
					accessOrder = accessOrder[1:]
					delete(expectedValues, evictedKey) // Remove the evicted key from expected values
				}

			case 2: // Get operation
				if i >= len(in) {
					t.Skip() // Not enough input to continue, so skip
				}

				key := HInt(in[i])
				i++

				expectedValue, ok := expectedValues[key]
				if !ok {
					// If the key is not found, it means it was either evicted or never added
					expectedValue = 0 // The zero value, depends on your cache implementation
				} else {
					// If the key was accessed, move it to the end of the accessOrder to represent recent use
					for index, accessedKey := range accessOrder {
						if accessedKey == key {
							accessOrder = append(accessOrder[:index], accessOrder[index+1:]...)
							accessOrder = append(accessOrder, key)
							break
						}
					}
				}

				if got, _ := cache.Get(key); got != expectedValue {
					fmt.Fprintf(os.Stderr, "cache: capacity: %d, hashable: %v, cache: %v\n", cache.capacity, cache.hashableItems, cache.cache)
					t.Fatalf("Get(%v) = %v, want %v", key, got, expectedValue) // The values do not match
				}
			case 3: // Reset operation
				if i >= len(in) {
					t.Skip() // Not enough input to continue, so skip
				}

				newCacheSize := int(in[i]) // Read the new cache size from the input
				i++

				if newCacheSize == 0 {
					t.Skip() // If the size is zero, we skip this test
				}

				// Create a new cache with the specified size
				cache = NewMemoCache[HInt, int](newCacheSize)

				// clear and reinitialize the expected values
				expectedValues = make(map[HInt]int)
				accessOrder = make([]HInt, 0)
			}
		}
	})
}



================================================
FILE: textinput/textinput.go
================================================
// Package textinput provides a text input component for Bubble Tea
// applications.
package textinput

import (
	"reflect"
	"strings"
	"time"
	"unicode"

	"github.com/atotto/clipboard"
	"github.com/charmbracelet/bubbles/cursor"
	"github.com/charmbracelet/bubbles/key"
	"github.com/charmbracelet/bubbles/runeutil"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	rw "github.com/mattn/go-runewidth"
	"github.com/rivo/uniseg"
)

// Internal messages for clipboard operations.
type (
	pasteMsg    string
	pasteErrMsg struct{ error }
)

// EchoMode sets the input behavior of the text input field.
type EchoMode int

const (
	// EchoNormal displays text as is. This is the default behavior.
	EchoNormal EchoMode = iota

	// EchoPassword displays the EchoCharacter mask instead of actual
	// characters. This is commonly used for password fields.
	EchoPassword

	// EchoNone displays nothing as characters are entered. This is commonly
	// seen for password fields on the command line.
	EchoNone
)

// ValidateFunc is a function that returns an error if the input is invalid.
type ValidateFunc func(string) error

// KeyMap is the key bindings for different actions within the textinput.
type KeyMap struct {
	CharacterForward        key.Binding
	CharacterBackward       key.Binding
	WordForward             key.Binding
	WordBackward            key.Binding
	DeleteWordBackward      key.Binding
	DeleteWordForward       key.Binding
	DeleteAfterCursor       key.Binding
	DeleteBeforeCursor      key.Binding
	DeleteCharacterBackward key.Binding
	DeleteCharacterForward  key.Binding
	LineStart               key.Binding
	LineEnd                 key.Binding
	Paste                   key.Binding
	AcceptSuggestion        key.Binding
	NextSuggestion          key.Binding
	PrevSuggestion          key.Binding
}

// DefaultKeyMap is the default set of key bindings for navigating and acting
// upon the textinput.
var DefaultKeyMap = KeyMap{
	CharacterForward:        key.NewBinding(key.WithKeys("right", "ctrl+f")),
	CharacterBackward:       key.NewBinding(key.WithKeys("left", "ctrl+b")),
	WordForward:             key.NewBinding(key.WithKeys("alt+right", "ctrl+right", "alt+f")),
	WordBackward:            key.NewBinding(key.WithKeys("alt+left", "ctrl+left", "alt+b")),
	DeleteWordBackward:      key.NewBinding(key.WithKeys("alt+backspace", "ctrl+w")),
	DeleteWordForward:       key.NewBinding(key.WithKeys("alt+delete", "alt+d")),
	DeleteAfterCursor:       key.NewBinding(key.WithKeys("ctrl+k")),
	DeleteBeforeCursor:      key.NewBinding(key.WithKeys("ctrl+u")),
	DeleteCharacterBackward: key.NewBinding(key.WithKeys("backspace", "ctrl+h")),
	DeleteCharacterForward:  key.NewBinding(key.WithKeys("delete", "ctrl+d")),
	LineStart:               key.NewBinding(key.WithKeys("home", "ctrl+a")),
	LineEnd:                 key.NewBinding(key.WithKeys("end", "ctrl+e")),
	Paste:                   key.NewBinding(key.WithKeys("ctrl+v")),
	AcceptSuggestion:        key.NewBinding(key.WithKeys("tab")),
	NextSuggestion:          key.NewBinding(key.WithKeys("down", "ctrl+n")),
	PrevSuggestion:          key.NewBinding(key.WithKeys("up", "ctrl+p")),
}

// Model is the Bubble Tea model for this text input element.
type Model struct {
	Err error

	// General settings.
	Prompt        string
	Placeholder   string
	EchoMode      EchoMode
	EchoCharacter rune
	Cursor        cursor.Model

	// Deprecated: use [cursor.BlinkSpeed] instead.
	BlinkSpeed time.Duration

	// Styles. These will be applied as inline styles.
	//
	// For an introduction to styling with Lip Gloss see:
	// https://github.com/charmbracelet/lipgloss
	PromptStyle      lipgloss.Style
	TextStyle        lipgloss.Style
	PlaceholderStyle lipgloss.Style
	CompletionStyle  lipgloss.Style

	// Deprecated: use Cursor.Style instead.
	CursorStyle lipgloss.Style

	// CharLimit is the maximum amount of characters this input element will
	// accept. If 0 or less, there's no limit.
	CharLimit int

	// Width is the maximum number of characters that can be displayed at once.
	// It essentially treats the text field like a horizontally scrolling
	// viewport. If 0 or less this setting is ignored.
	Width int

	// KeyMap encodes the keybindings recognized by the widget.
	KeyMap KeyMap

	// Underlying text value.
	value []rune

	// focus indicates whether user input focus should be on this input
	// component. When false, ignore keyboard input and hide the cursor.
	focus bool

	// Cursor position.
	pos int

	// Used to emulate a viewport when width is set and the content is
	// overflowing.
	offset      int
	offsetRight int

	// Validate is a function that checks whether or not the text within the
	// input is valid. If it is not valid, the `Err` field will be set to the
	// error returned by the function. If the function is not defined, all
	// input is considered valid.
	Validate ValidateFunc

	// rune sanitizer for input.
	rsan runeutil.Sanitizer

	// Should the input suggest to complete
	ShowSuggestions bool

	// suggestions is a list of suggestions that may be used to complete the
	// input.
	suggestions            [][]rune
	matchedSuggestions     [][]rune
	currentSuggestionIndex int
}

// New creates a new model with default settings.
func New() Model {
	return Model{
		Prompt:           "> ",
		EchoCharacter:    '*',
		CharLimit:        0,
		PlaceholderStyle: lipgloss.NewStyle().Foreground(lipgloss.Color("240")),
		ShowSuggestions:  false,
		CompletionStyle:  lipgloss.NewStyle().Foreground(lipgloss.Color("240")),
		Cursor:           cursor.New(),
		KeyMap:           DefaultKeyMap,

		suggestions: [][]rune{},
		value:       nil,
		focus:       false,
		pos:         0,
	}
}

// NewModel creates a new model with default settings.
//
// Deprecated: Use [New] instead.
var NewModel = New

// SetValue sets the value of the text input.
func (m *Model) SetValue(s string) {
	// Clean up any special characters in the input provided by the
	// caller. This avoids bugs due to e.g. tab characters and whatnot.
	runes := m.san().Sanitize([]rune(s))
	err := m.validate(runes)
	m.setValueInternal(runes, err)
}

func (m *Model) setValueInternal(runes []rune, err error) {
	m.Err = err

	empty := len(m.value) == 0

	if m.CharLimit > 0 && len(runes) > m.CharLimit {
		m.value = runes[:m.CharLimit]
	} else {
		m.value = runes
	}
	if (m.pos == 0 && empty) || m.pos > len(m.value) {
		m.SetCursor(len(m.value))
	}
	m.handleOverflow()
}

// Value returns the value of the text input.
func (m Model) Value() string {
	return string(m.value)
}

// Position returns the cursor position.
func (m Model) Position() int {
	return m.pos
}

// SetCursor moves the cursor to the given position. If the position is
// out of bounds the cursor will be moved to the start or end accordingly.
func (m *Model) SetCursor(pos int) {
	m.pos = clamp(pos, 0, len(m.value))
	m.handleOverflow()
}

// CursorStart moves the cursor to the start of the input field.
func (m *Model) CursorStart() {
	m.SetCursor(0)
}

// CursorEnd moves the cursor to the end of the input field.
func (m *Model) CursorEnd() {
	m.SetCursor(len(m.value))
}

// Focused returns the focus state on the model.
func (m Model) Focused() bool {
	return m.focus
}

// Focus sets the focus state on the model. When the model is in focus it can
// receive keyboard input and the cursor will be shown.
func (m *Model) Focus() tea.Cmd {
	m.focus = true
	return m.Cursor.Focus()
}

// Blur removes the focus state on the model.  When the model is blurred it can
// not receive keyboard input and the cursor will be hidden.
func (m *Model) Blur() {
	m.focus = false
	m.Cursor.Blur()
}

// Reset sets the input to its default state with no input.
func (m *Model) Reset() {
	m.value = nil
	m.SetCursor(0)
}

// SetSuggestions sets the suggestions for the input.
func (m *Model) SetSuggestions(suggestions []string) {
	m.suggestions = make([][]rune, len(suggestions))
	for i, s := range suggestions {
		m.suggestions[i] = []rune(s)
	}

	m.updateSuggestions()
}

// rsan initializes or retrieves the rune sanitizer.
func (m *Model) san() runeutil.Sanitizer {
	if m.rsan == nil {
		// Textinput has all its input on a single line so collapse
		// newlines/tabs to single spaces.
		m.rsan = runeutil.NewSanitizer(
			runeutil.ReplaceTabs(" "), runeutil.ReplaceNewlines(" "))
	}
	return m.rsan
}

func (m *Model) insertRunesFromUserInput(v []rune) {
	// Clean up any special characters in the input provided by the
	// clipboard. This avoids bugs due to e.g. tab characters and
	// whatnot.
	paste := m.san().Sanitize(v)

	var availSpace int
	if m.CharLimit > 0 {
		availSpace = m.CharLimit - len(m.value)

		// If the char limit's been reached, cancel.
		if availSpace <= 0 {
			return
		}

		// If there's not enough space to paste the whole thing cut the pasted
		// runes down so they'll fit.
		if availSpace < len(paste) {
			paste = paste[:availSpace]
		}
	}

	// Stuff before and after the cursor
	head := m.value[:m.pos]
	tailSrc := m.value[m.pos:]
	tail := make([]rune, len(tailSrc))
	copy(tail, tailSrc)

	// Insert pasted runes
	for _, r := range paste {
		head = append(head, r)
		m.pos++
		if m.CharLimit > 0 {
			availSpace--
			if availSpace <= 0 {
				break
			}
		}
	}

	// Put it all back together
	value := append(head, tail...)
	inputErr := m.validate(value)
	m.setValueInternal(value, inputErr)
}

// If a max width is defined, perform some logic to treat the visible area
// as a horizontally scrolling viewport.
func (m *Model) handleOverflow() {
	if m.Width <= 0 || uniseg.StringWidth(string(m.value)) <= m.Width {
		m.offset = 0
		m.offsetRight = len(m.value)
		return
	}

	// Correct right offset if we've deleted characters
	m.offsetRight = min(m.offsetRight, len(m.value))

	if m.pos < m.offset {
		m.offset = m.pos

		w := 0
		i := 0
		runes := m.value[m.offset:]

		for i < len(runes) && w <= m.Width {
			w += rw.RuneWidth(runes[i])
			if w <= m.Width+1 {
				i++
			}
		}

		m.offsetRight = m.offset + i
	} else if m.pos >= m.offsetRight {
		m.offsetRight = m.pos

		w := 0
		runes := m.value[:m.offsetRight]
		i := len(runes) - 1

		for i > 0 && w < m.Width {
			w += rw.RuneWidth(runes[i])
			if w <= m.Width {
				i--
			}
		}

		m.offset = m.offsetRight - (len(runes) - 1 - i)
	}
}

// deleteBeforeCursor deletes all text before the cursor.
func (m *Model) deleteBeforeCursor() {
	m.value = m.value[m.pos:]
	m.Err = m.validate(m.value)
	m.offset = 0
	m.SetCursor(0)
}

// deleteAfterCursor deletes all text after the cursor. If input is masked
// delete everything after the cursor so as not to reveal word breaks in the
// masked input.
func (m *Model) deleteAfterCursor() {
	m.value = m.value[:m.pos]
	m.Err = m.validate(m.value)
	m.SetCursor(len(m.value))
}

// deleteWordBackward deletes the word left to the cursor.
func (m *Model) deleteWordBackward() {
	if m.pos == 0 || len(m.value) == 0 {
		return
	}

	if m.EchoMode != EchoNormal {
		m.deleteBeforeCursor()
		return
	}

	// Linter note: it's critical that we acquire the initial cursor position
	// here prior to altering it via SetCursor() below. As such, moving this
	// call into the corresponding if clause does not apply here.
	oldPos := m.pos

	m.SetCursor(m.pos - 1)
	for unicode.IsSpace(m.value[m.pos]) {
		if m.pos <= 0 {
			break
		}
		// ignore series of whitespace before cursor
		m.SetCursor(m.pos - 1)
	}

	for m.pos > 0 {
		if !unicode.IsSpace(m.value[m.pos]) {
			m.SetCursor(m.pos - 1)
		} else {
			if m.pos > 0 {
				// keep the previous space
				m.SetCursor(m.pos + 1)
			}
			break
		}
	}

	if oldPos > len(m.value) {
		m.value = m.value[:m.pos]
	} else {
		m.value = append(m.value[:m.pos], m.value[oldPos:]...)
	}
	m.Err = m.validate(m.value)
}

// deleteWordForward deletes the word right to the cursor. If input is masked
// delete everything after the cursor so as not to reveal word breaks in the
// masked input.
func (m *Model) deleteWordForward() {
	if m.pos >= len(m.value) || len(m.value) == 0 {
		return
	}

	if m.EchoMode != EchoNormal {
		m.deleteAfterCursor()
		return
	}

	oldPos := m.pos
	m.SetCursor(m.pos + 1)
	for unicode.IsSpace(m.value[m.pos]) {
		// ignore series of whitespace after cursor
		m.SetCursor(m.pos + 1)

		if m.pos >= len(m.value) {
			break
		}
	}

	for m.pos < len(m.value) {
		if !unicode.IsSpace(m.value[m.pos]) {
			m.SetCursor(m.pos + 1)
		} else {
			break
		}
	}

	if m.pos > len(m.value) {
		m.value = m.value[:oldPos]
	} else {
		m.value = append(m.value[:oldPos], m.value[m.pos:]...)
	}
	m.Err = m.validate(m.value)

	m.SetCursor(oldPos)
}

// wordBackward moves the cursor one word to the left. If input is masked, move
// input to the start so as not to reveal word breaks in the masked input.
func (m *Model) wordBackward() {
	if m.pos == 0 || len(m.value) == 0 {
		return
	}

	if m.EchoMode != EchoNormal {
		m.CursorStart()
		return
	}

	i := m.pos - 1
	for i >= 0 {
		if unicode.IsSpace(m.value[i]) {
			m.SetCursor(m.pos - 1)
			i--
		} else {
			break
		}
	}

	for i >= 0 {
		if !unicode.IsSpace(m.value[i]) {
			m.SetCursor(m.pos - 1)
			i--
		} else {
			break
		}
	}
}

// wordForward moves the cursor one word to the right. If the input is masked,
// move input to the end so as not to reveal word breaks in the masked input.
func (m *Model) wordForward() {
	if m.pos >= len(m.value) || len(m.value) == 0 {
		return
	}

	if m.EchoMode != EchoNormal {
		m.CursorEnd()
		return
	}

	i := m.pos
	for i < len(m.value) {
		if unicode.IsSpace(m.value[i]) {
			m.SetCursor(m.pos + 1)
			i++
		} else {
			break
		}
	}

	for i < len(m.value) {
		if !unicode.IsSpace(m.value[i]) {
			m.SetCursor(m.pos + 1)
			i++
		} else {
			break
		}
	}
}

func (m Model) echoTransform(v string) string {
	switch m.EchoMode {
	case EchoPassword:
		return strings.Repeat(string(m.EchoCharacter), uniseg.StringWidth(v))
	case EchoNone:
		return ""
	case EchoNormal:
		return v
	default:
		return v
	}
}

// Update is the Bubble Tea update loop.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	if !m.focus {
		return m, nil
	}

	// Need to check for completion before, because key is configurable and might be double assigned
	keyMsg, ok := msg.(tea.KeyMsg)
	if ok && key.Matches(keyMsg, m.KeyMap.AcceptSuggestion) {
		if m.canAcceptSuggestion() {
			m.value = append(m.value, m.matchedSuggestions[m.currentSuggestionIndex][len(m.value):]...)
			m.CursorEnd()
		}
	}

	// Let's remember where the position of the cursor currently is so that if
	// the cursor position changes, we can reset the blink.
	oldPos := m.pos

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch {
		case key.Matches(msg, m.KeyMap.DeleteWordBackward):
			m.deleteWordBackward()
		case key.Matches(msg, m.KeyMap.DeleteCharacterBackward):
			m.Err = nil
			if len(m.value) > 0 {
				m.value = append(m.value[:max(0, m.pos-1)], m.value[m.pos:]...)
				m.Err = m.validate(m.value)
				if m.pos > 0 {
					m.SetCursor(m.pos - 1)
				}
			}
		case key.Matches(msg, m.KeyMap.WordBackward):
			m.wordBackward()
		case key.Matches(msg, m.KeyMap.CharacterBackward):
			if m.pos > 0 {
				m.SetCursor(m.pos - 1)
			}
		case key.Matches(msg, m.KeyMap.WordForward):
			m.wordForward()
		case key.Matches(msg, m.KeyMap.CharacterForward):
			if m.pos < len(m.value) {
				m.SetCursor(m.pos + 1)
			}
		case key.Matches(msg, m.KeyMap.LineStart):
			m.CursorStart()
		case key.Matches(msg, m.KeyMap.DeleteCharacterForward):
			if len(m.value) > 0 && m.pos < len(m.value) {
				m.value = append(m.value[:m.pos], m.value[m.pos+1:]...)
				m.Err = m.validate(m.value)
			}
		case key.Matches(msg, m.KeyMap.LineEnd):
			m.CursorEnd()
		case key.Matches(msg, m.KeyMap.DeleteAfterCursor):
			m.deleteAfterCursor()
		case key.Matches(msg, m.KeyMap.DeleteBeforeCursor):
			m.deleteBeforeCursor()
		case key.Matches(msg, m.KeyMap.Paste):
			return m, Paste
		case key.Matches(msg, m.KeyMap.DeleteWordForward):
			m.deleteWordForward()
		case key.Matches(msg, m.KeyMap.NextSuggestion):
			m.nextSuggestion()
		case key.Matches(msg, m.KeyMap.PrevSuggestion):
			m.previousSuggestion()
		default:
			// Input one or more regular characters.
			m.insertRunesFromUserInput(msg.Runes)
		}

		// Check again if can be completed
		// because value might be something that does not match the completion prefix
		m.updateSuggestions()

	case pasteMsg:
		m.insertRunesFromUserInput([]rune(msg))

	case pasteErrMsg:
		m.Err = msg
	}

	var cmds []tea.Cmd
	var cmd tea.Cmd

	m.Cursor, cmd = m.Cursor.Update(msg)
	cmds = append(cmds, cmd)

	if oldPos != m.pos && m.Cursor.Mode() == cursor.CursorBlink {
		m.Cursor.Blink = false
		cmds = append(cmds, m.Cursor.BlinkCmd())
	}

	m.handleOverflow()
	return m, tea.Batch(cmds...)
}

// View renders the textinput in its current state.
func (m Model) View() string {
	// Placeholder text
	if len(m.value) == 0 && m.Placeholder != "" {
		return m.placeholderView()
	}

	styleText := m.TextStyle.Inline(true).Render

	value := m.value[m.offset:m.offsetRight]
	pos := max(0, m.pos-m.offset)
	v := styleText(m.echoTransform(string(value[:pos])))

	if pos < len(value) { //nolint:nestif
		char := m.echoTransform(string(value[pos]))
		m.Cursor.SetChar(char)
		v += m.Cursor.View()                                   // cursor and text under it
		v += styleText(m.echoTransform(string(value[pos+1:]))) // text after cursor
		v += m.completionView(0)                               // suggested completion
	} else {
		if m.focus && m.canAcceptSuggestion() {
			suggestion := m.matchedSuggestions[m.currentSuggestionIndex]
			if len(value) < len(suggestion) {
				m.Cursor.TextStyle = m.CompletionStyle
				m.Cursor.SetChar(m.echoTransform(string(suggestion[pos])))
				v += m.Cursor.View()
				v += m.completionView(1)
			} else {
				m.Cursor.SetChar(" ")
				v += m.Cursor.View()
			}
		} else {
			m.Cursor.SetChar(" ")
			v += m.Cursor.View()
		}
	}

	// If a max width and background color were set fill the empty spaces with
	// the background color.
	valWidth := uniseg.StringWidth(string(value))
	if m.Width > 0 && valWidth <= m.Width {
		padding := max(0, m.Width-valWidth)
		if valWidth+padding <= m.Width && pos < len(value) {
			padding++
		}
		v += styleText(strings.Repeat(" ", padding))
	}

	return m.PromptStyle.Render(m.Prompt) + v
}

// placeholderView returns the prompt and placeholder view, if any.
func (m Model) placeholderView() string {
	var (
		v     string
		style = m.PlaceholderStyle.Inline(true).Render
	)

	p := make([]rune, m.Width+1)
	copy(p, []rune(m.Placeholder))

	m.Cursor.TextStyle = m.PlaceholderStyle
	m.Cursor.SetChar(string(p[:1]))
	v += m.Cursor.View()

	// If the entire placeholder is already set and no padding is needed, finish
	if m.Width < 1 && len(p) <= 1 {
		return m.PromptStyle.Render(m.Prompt) + v
	}

	// If Width is set then size placeholder accordingly
	if m.Width > 0 {
		// available width is width - len + cursor offset of 1
		minWidth := lipgloss.Width(m.Placeholder)
		availWidth := m.Width - minWidth + 1

		// if width < len, 'subtract'(add) number to len and dont add padding
		if availWidth < 0 {
			minWidth += availWidth
			availWidth = 0
		}
		// append placeholder[len] - cursor, append padding
		v += style(string(p[1:minWidth]))
		v += style(strings.Repeat(" ", availWidth))
	} else {
		// if there is no width, the placeholder can be any length
		v += style(string(p[1:]))
	}

	return m.PromptStyle.Render(m.Prompt) + v
}

// Blink is a command used to initialize cursor blinking.
func Blink() tea.Msg {
	return cursor.Blink()
}

// Paste is a command for pasting from the clipboard into the text input.
func Paste() tea.Msg {
	str, err := clipboard.ReadAll()
	if err != nil {
		return pasteErrMsg{err}
	}
	return pasteMsg(str)
}

func clamp(v, low, high int) int {
	if high < low {
		low, high = high, low
	}
	return min(high, max(low, v))
}

// Deprecated.

// Deprecated: use [cursor.Mode].
//
//nolint:revive
type CursorMode int

//nolint:revive
const (
	// Deprecated: use [cursor.CursorBlink].
	CursorBlink = CursorMode(cursor.CursorBlink)
	// Deprecated: use [cursor.CursorStatic].
	CursorStatic = CursorMode(cursor.CursorStatic)
	// Deprecated: use [cursor.CursorHide].
	CursorHide = CursorMode(cursor.CursorHide)
)

func (c CursorMode) String() string {
	return cursor.Mode(c).String()
}

// Deprecated: use [cursor.Mode].
//
//nolint:revive
func (m Model) CursorMode() CursorMode {
	return CursorMode(m.Cursor.Mode())
}

// Deprecated: use cursor.SetMode().
//
//nolint:revive
func (m *Model) SetCursorMode(mode CursorMode) tea.Cmd {
	return m.Cursor.SetMode(cursor.Mode(mode))
}

func (m Model) completionView(offset int) string {
	var (
		value = m.value
		style = m.PlaceholderStyle.Inline(true).Render
	)

	if m.canAcceptSuggestion() {
		suggestion := m.matchedSuggestions[m.currentSuggestionIndex]
		if len(value) < len(suggestion) {
			return style(string(suggestion[len(value)+offset:]))
		}
	}
	return ""
}

func (m *Model) getSuggestions(sugs [][]rune) []string {
	suggestions := make([]string, len(sugs))
	for i, s := range sugs {
		suggestions[i] = string(s)
	}
	return suggestions
}

// AvailableSuggestions returns the list of available suggestions.
func (m *Model) AvailableSuggestions() []string {
	return m.getSuggestions(m.suggestions)
}

// MatchedSuggestions returns the list of matched suggestions.
func (m *Model) MatchedSuggestions() []string {
	return m.getSuggestions(m.matchedSuggestions)
}

// CurrentSuggestionIndex returns the currently selected suggestion index.
func (m *Model) CurrentSuggestionIndex() int {
	return m.currentSuggestionIndex
}

// CurrentSuggestion returns the currently selected suggestion.
func (m *Model) CurrentSuggestion() string {
	if m.currentSuggestionIndex >= len(m.matchedSuggestions) {
		return ""
	}

	return string(m.matchedSuggestions[m.currentSuggestionIndex])
}

// canAcceptSuggestion returns whether there is an acceptable suggestion to
// autocomplete the current value.
func (m *Model) canAcceptSuggestion() bool {
	return len(m.matchedSuggestions) > 0
}

// updateSuggestions refreshes the list of matching suggestions.
func (m *Model) updateSuggestions() {
	if !m.ShowSuggestions {
		return
	}

	if len(m.value) <= 0 || len(m.suggestions) <= 0 {
		m.matchedSuggestions = [][]rune{}
		return
	}

	matches := [][]rune{}
	for _, s := range m.suggestions {
		suggestion := string(s)

		if strings.HasPrefix(strings.ToLower(suggestion), strings.ToLower(string(m.value))) {
			matches = append(matches, []rune(suggestion))
		}
	}
	if !reflect.DeepEqual(matches, m.matchedSuggestions) {
		m.currentSuggestionIndex = 0
	}

	m.matchedSuggestions = matches
}

// nextSuggestion selects the next suggestion.
func (m *Model) nextSuggestion() {
	m.currentSuggestionIndex = (m.currentSuggestionIndex + 1)
	if m.currentSuggestionIndex >= len(m.matchedSuggestions) {
		m.currentSuggestionIndex = 0
	}
}

// previousSuggestion selects the previous suggestion.
func (m *Model) previousSuggestion() {
	m.currentSuggestionIndex = (m.currentSuggestionIndex - 1)
	if m.currentSuggestionIndex < 0 {
		m.currentSuggestionIndex = len(m.matchedSuggestions) - 1
	}
}

func (m Model) validate(v []rune) error {
	if m.Validate != nil {
		return m.Validate(string(v))
	}
	return nil
}



================================================
FILE: textinput/textinput_test.go
================================================
package textinput

import (
	"fmt"
	"strconv"
	"strings"
	"testing"
)

func Test_CurrentSuggestion(t *testing.T) {
	textinput := New()
	textinput.ShowSuggestions = true

	suggestion := textinput.CurrentSuggestion()
	expected := ""
	if suggestion != expected {
		t.Fatalf("Error: expected no current suggestion but was %s", suggestion)
	}

	textinput.SetSuggestions([]string{"test1", "test2", "test3"})
	suggestion = textinput.CurrentSuggestion()
	expected = ""
	if suggestion != expected {
		t.Fatalf("Error: expected no current suggestion but was %s", suggestion)
	}

	textinput.SetValue("test")
	textinput.updateSuggestions()
	textinput.nextSuggestion()
	suggestion = textinput.CurrentSuggestion()
	expected = "test2"
	if suggestion != expected {
		t.Fatalf("Error: expected first suggestion but was %s", suggestion)
	}

	textinput.Blur()
	if strings.HasSuffix(textinput.View(), "test2") {
		t.Fatalf("Error: suggestions should not be rendered when input isn't focused. expected \"> test\" but got \"%s\"", textinput.View())
	}
}

func Test_SlicingOutsideCap(t *testing.T) {
	textinput := New()
	textinput.Placeholder = "作業ディレクトリを指定してください"
	textinput.Width = 32
	textinput.View()
}

func ExampleValidateFunc() {
	creditCardNumber := New()
	creditCardNumber.Placeholder = "4505 **** **** 1234"
	creditCardNumber.Focus()
	creditCardNumber.CharLimit = 20
	creditCardNumber.Width = 30
	creditCardNumber.Prompt = ""
	// This anonymous function is a valid function for ValidateFunc.
	creditCardNumber.Validate = func(s string) error {
		// Credit Card Number should a string less than 20 digits
		// It should include 16 integers and 3 spaces
		if len(s) > 16+3 {
			return fmt.Errorf("CCN is too long")
		}

		if len(s) == 0 || len(s)%5 != 0 && (s[len(s)-1] < '0' || s[len(s)-1] > '9') {
			return fmt.Errorf("CCN is invalid")
		}

		// The last digit should be a number unless it is a multiple of 4 in which
		// case it should be a space
		if len(s)%5 == 0 && s[len(s)-1] != ' ' {
			return fmt.Errorf("CCN must separate groups with spaces")
		}

		// The remaining digits should be integers
		c := strings.ReplaceAll(s, " ", "")
		_, err := strconv.ParseInt(c, 10, 64)

		return err
	}
}



================================================
FILE: timer/timer.go
================================================
// Package timer provides a simple timeout component.
package timer

import (
	"sync/atomic"
	"time"

	tea "github.com/charmbracelet/bubbletea"
)

var lastID int64

func nextID() int {
	return int(atomic.AddInt64(&lastID, 1))
}

// Authors note with regard to start and stop commands:
//
// Technically speaking, sending commands to start and stop the timer in this
// case is extraneous. To stop the timer we'd just need to set the 'running'
// property on the model to false which cause logic in the update function to
// stop responding to TickMsgs. To start the model we'd set 'running' to true
// and fire off a TickMsg. Helper functions would look like:
//
//     func (m *model) Start() tea.Cmd
//     func (m *model) Stop()
//
// The danger with this approach, however, is that order of operations becomes
// important with helper functions like the above. Consider the following:
//
//     // Would not work
//     return m, m.timer.Start()
//
//	   // Would work
//     cmd := m.timer.start()
//     return m, cmd
//
// Thus, because of potential pitfalls like the ones above, we've introduced
// the extraneous StartStopMsg to simplify the mental model when using this
// package. Bear in mind that the practice of sending commands to simply
// communicate with other parts of your application, such as in this package,
// is still not recommended.

// StartStopMsg is used to start and stop the timer.
type StartStopMsg struct {
	ID      int
	running bool
}

// TickMsg is a message that is sent on every timer tick.
type TickMsg struct {
	// ID is the identifier of the timer that sends the message. This makes
	// it possible to determine which timer a tick belongs to when there
	// are multiple timers running.
	//
	// Note, however, that a timer will reject ticks from other timers, so
	// it's safe to flow all TickMsgs through all timers and have them still
	// behave appropriately.
	ID int

	// Timeout returns whether or not this tick is a timeout tick. You can
	// alternatively listen for TimeoutMsg.
	Timeout bool

	tag int
}

// TimeoutMsg is a message that is sent once when the timer times out.
//
// It's a convenience message sent alongside a TickMsg with the Timeout value
// set to true.
type TimeoutMsg struct {
	ID int
}

// Model of the timer component.
type Model struct {
	// How long until the timer expires.
	Timeout time.Duration

	// How long to wait before every tick. Defaults to 1 second.
	Interval time.Duration

	id      int
	tag     int
	running bool
}

// NewWithInterval creates a new timer with the given timeout and tick interval.
func NewWithInterval(timeout, interval time.Duration) Model {
	return Model{
		Timeout:  timeout,
		Interval: interval,
		running:  true,
		id:       nextID(),
	}
}

// New creates a new timer with the given timeout and default 1s interval.
func New(timeout time.Duration) Model {
	return NewWithInterval(timeout, time.Second)
}

// ID returns the model's identifier. This can be used to determine if messages
// belong to this timer instance when there are multiple timers.
func (m Model) ID() int {
	return m.id
}

// Running returns whether or not the timer is running. If the timer has timed
// out this will always return false.
func (m Model) Running() bool {
	if m.Timedout() || !m.running {
		return false
	}
	return true
}

// Timedout returns whether or not the timer has timed out.
func (m Model) Timedout() bool {
	return m.Timeout <= 0
}

// Init starts the timer.
func (m Model) Init() tea.Cmd {
	return m.tick()
}

// Update handles the timer tick.
func (m Model) Update(msg tea.Msg) (Model, tea.Cmd) {
	switch msg := msg.(type) {
	case StartStopMsg:
		if msg.ID != 0 && msg.ID != m.id {
			return m, nil
		}
		m.running = msg.running
		return m, m.tick()
	case TickMsg:
		if !m.Running() || (msg.ID != 0 && msg.ID != m.id) {
			break
		}

		// If a tag is set, and it's not the one we expect, reject the message.
		// This prevents the ticker from receiving too many messages and
		// thus ticking too fast.
		if msg.tag > 0 && msg.tag != m.tag {
			return m, nil
		}

		m.Timeout -= m.Interval
		return m, tea.Batch(m.tick(), m.timedout())
	}

	return m, nil
}

// View of the timer component.
func (m Model) View() string {
	return m.Timeout.String()
}

// Start resumes the timer. Has no effect if the timer has timed out.
func (m *Model) Start() tea.Cmd {
	return m.startStop(true)
}

// Stop pauses the timer. Has no effect if the timer has timed out.
func (m *Model) Stop() tea.Cmd {
	return m.startStop(false)
}

// Toggle stops the timer if it's running and starts it if it's stopped.
func (m *Model) Toggle() tea.Cmd {
	return m.startStop(!m.Running())
}

func (m Model) tick() tea.Cmd {
	return tea.Tick(m.Interval, func(_ time.Time) tea.Msg {
		return TickMsg{ID: m.id, tag: m.tag, Timeout: m.Timedout()}
	})
}

func (m Model) timedout() tea.Cmd {
	if !m.Timedout() {
		return nil
	}
	return func() tea.Msg {
		return TimeoutMsg{ID: m.id}
	}
}

func (m Model) startStop(v bool) tea.Cmd {
	return func() tea.Msg {
		return StartStopMsg{ID: m.id, running: v}
	}
}



==============================================