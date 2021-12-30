import io 
import random
import sqlite3
from sqlite3.dbapi2 import connect

SWE = 0
ENG = 1

#Read txt file
f = io.open("spanska.txt", "r",encoding='utf8')
lines = f.readlines()


#Open database
sqlite_connection = sqlite3.connect('spanska.db')
cursor = sqlite_connection.cursor()

create_table_cmd = """CREATE TABLE words (
word VARCHAR(50),
translation VARCHAR(50)
);"""
 
cursor.execute(create_table_cmd)
sqlite_connection.commit()
sqlite_connection.close()

class Word:
    def __init__(self, palabra, translation, example_sentence):
        self.palabra = palabra
        self.translation = translation
        self.translation_language = SWE
        self.example_sentence = example_sentence

    def check_if_correct(self, input):
        correct = False
        if input in self.palabra:
            correct = True
        return correct


def create_word_from_str(input: str):
    w = Word("","","")
    split_one = input.split(" - ")
    w.palabra = split_one[0]

    if "[en]" in split_one[1]:
        w.translation_language = ENG
    
    split_two = split_one[1].replace("[en] ", "").split(" (")
    w.translation = split_two[0]
    w.example_sentence = split_two[1].replace(")","")

    return w

words_to_check = []
for l in lines:
    w = create_word_from_str(l)
    words_to_check.append(w)

while len(words_to_check) > 0:
    w = words_to_check[random.randint(0,len(words_to_check)-1)]

    msg = "Översätt ordet \"" + w.translation + "\""
    if w.translation_language == ENG:
        msg = msg + " (engelska)"
    msg = msg + " till spanska:"
    print(msg)

    x = input()
    if w.check_if_correct(x):
        words_to_check.remove(w)
        print("Rätt! Ord kvar: " + str(len(words_to_check)))
    else:
        print("Fel! Rätt svar var: " + w.palabra)