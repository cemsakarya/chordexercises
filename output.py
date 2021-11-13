from scales import scales
from fileManager import return_pdf_name, empty_output_directory
import abjad
from lilypondconfig import preamble


def lilypond_output(tonic, mode, mypath):
    note = scales(tonic)
    score = abjad.illustrators.illustrate(note.scale(mode))
    lilypond_file = abjad.LilyPondFile(items=[preamble, score])
    empty_output_directory(mypath)
    abjad.show(lilypond_file, output_directory=mypath, should_open=False)

def note_output(tonic, scale):
    note = scales(tonic)
    return ' '.join([str(i) for i in note.scale_notes(scale)])