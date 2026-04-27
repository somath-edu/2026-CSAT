#let exam_paper(
  title: "",
  school: "제이티중학교",
  year: "2026년 2학년 1학기 기말대비",
  subject: "모의고사 1회",
  body
) = {
  set page(
    paper: "a4",
    margin: (x: 15mm, y: 15mm),
  )

  set text(font: "Noto Serif KR", size: 10pt, lang: "ko")
  
  block(width: 100%, stroke: 1.5pt + black, inset: 0pt)[
    #grid(
      columns: (1fr, 120pt),
      block(inset: 15pt, stroke: (right: 1.5pt + black), width: 100%)[
        #set align(center)
        #text(size: 14pt, weight: "regular")[#year] \
        #v(5pt)
        #text(size: 28pt, weight: "bold", tracking: 0.3em)[#subject]
      ],
      grid(
        columns: (40pt, 1fr),
        rows: (35pt, 35pt),
        stroke: 1pt + black,
        align: center + horizon,
        block(fill: gray.lighten(90%), height: 100%, width: 100%, align(center + horizon)[#text(weight: "bold")[학교]]),
        align(center + horizon)[#text(size: 11pt)[#school]],
        block(fill: gray.lighten(90%), height: 100%, width: 100%, align(center + horizon)[#text(weight: "bold")[이름]]),
        []
      )
    )
  ]

  v(20pt)
  show: columns.with(2, gutter: 25pt)
  set math.equation(numbering: none)
  
  body
}

#let prob(num, content) = {
  block(width: 100%, breakable: false, inset: (bottom: 25pt))[
    #grid(
      columns: (25pt, 1fr),
      gutter: 5pt,
      text(weight: "bold", size: 12pt)[#num.],
      [
        #set text(size: 11pt)
        #content
      ]
    )
  ]
}
