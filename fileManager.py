from os import listdir
import os
from os.path import isfile, join


def empty_output_directory(mypath):
    filelist = [f for f in os.listdir(mypath)]
    for f in filelist:
        os.remove(os.path.join(mypath, f))


def return_pdf_name(mypath):
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

    if (len(onlyfiles) != 3):
        filelist = [f for f in os.listdir(mypath)]
        for f in filelist:
            os.remove(os.path.join(mypath, f))

    for i in onlyfiles:
        if i[-3:] == 'pdf':
            return os.path.join(mypath, i)
