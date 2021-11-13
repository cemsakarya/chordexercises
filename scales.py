import abjad


def make_scale(tonic, interval_segment):
    pitches = []
    pitch = abjad.NamedPitch(tonic)
    pitches.append(pitch)

    for interval in interval_segment:
        pitch = pitch + interval
        pitches.append(pitch)

    pitch_segment = abjad.PitchSegment(pitches)
    return pitch_segment


class scales:
    def __init__(self, tonic):
        self.tonic = tonic

        self.string_major = "M2 M2 m2 M2 M2 M2 m2"
        self.major_mode = abjad.IntervalSegment(self.string_major)

        self.string_minor = "M2 m2 M2 M2 m2 M2 M2"
        self.minor_mode = abjad.IntervalSegment(self.string_minor)

        self.string_dorian = "M2 m2 M2 M2 M2 m2 M2"
        self.dorian_mode = abjad.IntervalSegment(self.string_dorian)

    def major_pitch_segment(self):
        pitch_segment = make_scale(self.tonic, self.major_mode)
        return [abjad.Note(_, (1, 4)) for _ in pitch_segment]

    def reversed_major_pitch_segment(self):
        pitch_segment = make_scale(self.tonic, self.major_mode)
        return [abjad.Note(_, (1, 4)) for _ in reversed(pitch_segment)]

    def ascending_descending_major(self):
        notes = self.major_pitch_segment()
        descending = self.reversed_major_pitch_segment()
        descending = descending[1:]
        notes.extend(descending)
        return notes

    def scale(self, pitch_segment):
        if pitch_segment == 'major':
            notes = self.major_pitch_segment()
        elif pitch_segment == 'reversed_major':
            notes = self.reversed_major_pitch_segment()
        elif pitch_segment == 'ascending_descending_major':
            notes = self.ascending_descending_major()

        voice = abjad.Voice(notes, name="RH_Voice")
        staff = abjad.Staff([voice], name="RH_Staff")
        score = abjad.Score([staff], name="Score")
        return score

    def scale_notes(self, pitch_segment):
        if pitch_segment == 'major':
            notes = self.major_pitch_segment()
        elif pitch_segment == 'reversed_major':
            notes = self.reversed_major_pitch_segment()
        elif pitch_segment == 'ascending_descending_major':
            notes = self.ascending_descending_major()

        voice = abjad.Voice(notes, name="RH_Voice")
        return voice
