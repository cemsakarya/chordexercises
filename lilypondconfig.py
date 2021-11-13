preamble = r"""#(set-global-staff-size 14)


\layout {

    \context {

        \Score

        \override BarNumber.stencil = ##f

        \override TextScript.staff-padding = 3

        \override TimeSignature.stencil = ##f

    }

    indent = 0

}"""