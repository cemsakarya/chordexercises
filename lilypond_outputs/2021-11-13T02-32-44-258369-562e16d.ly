%! abjad.LilyPondFile._get_format_pieces()
\version "2.22.0"
%! abjad.LilyPondFile._get_format_pieces()
\language "english"

#(set-global-staff-size 14)


\layout {

    \context {

        \Score

        \override BarNumber.stencil = ##f

        \override TextScript.staff-padding = 3

        \override TimeSignature.stencil = ##f

    }

    indent = 0

}
%! abjad.LilyPondFile._get_format_pieces()
\version "2.22.0"
%! abjad.LilyPondFile._get_format_pieces()
\language "english"

%! abjad.LilyPondFile._get_formatted_blocks()
\score
%! abjad.LilyPondFile._get_formatted_blocks()
{
    \context Score = "Score"
    <<
        \context Staff = "RH_Staff"
        {
            \context Voice = "RH_Voice"
            {
                c4
                d4
                e4
                f4
                g4
                a4
                b4
                c'4
                b4
                a4
                g4
                f4
                e4
                d4
                c4
            }
        }
    >>
%! abjad.LilyPondFile._get_formatted_blocks()
}