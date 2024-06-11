import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, StatusBar } from 'react-native'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

const CurrentPageWidget = ({ 
  currentPage, 
  noteList, 
  setCurrentPage,
  setSelectedNote,
  selectedNote,
  addNote, 
  editNote,
  deleteNote
}) => {
  switch (currentPage) {
    case 'home':
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          setSelectedNote={setSelectedNote}
          deleteNote={deleteNote}
        />
      )
    case 'add':
      return <AddNote addNote={addNote} setCurrentPage={setCurrentPage} />
    case 'edit':
      return (
        <EditNote 
          setCurrentPage={setCurrentPage} 
          selectedNote={selectedNote} 
          editNote={editNote}  
        /> 
      )
    default:
      return <Home setCurrentPage={setCurrentPage} />
  }
}

const App = () => {
  const initialNoteList = [
    {
      id: 1,
      title: 'Note Pertama',
      desc: 'Selamat datang di Note App!'
    },
    {
      id: 2,
      title: 'Penggunaan App',
      desc: 'Anda dapat menambahkan Note dengan menekan tombol paling atas'
    }
  ]

  const [currentPage, setCurrentPage] = useState('home')
  // untuk tau mana note yang dipencet saat edit atau hapus
  const [selectedNote, setSelectedNote] = useState()  
  const [noteList, setNoteList] = useState([])
  // console.log('noteList: ', noteList)

  // Load noteList dari async storage
  useEffect(() => {
    // Retrieving the array of objects
    getData('noteList').then((data) => {
      console.log('useEffect Load Data: ', data);

      setNoteList(data);
    });
  }, [])

  // Store noteList ke async storage
  useEffect(() => {
    storeData('noteList', noteList);
  }, [noteList]);

  const storeData = async(key, value) => {
    try {
      // tandai jika aplikasi sudah pernah dibuka
      await AsyncStorage.setItem('already-opened', 'true')
      
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (err) {
      console.log('storeData: ', err);
    }
  }

  const getData = async(key) => {
    try {
      const alreadyOpenend = await AsyncStorage.getItem('already-opened');

      // cek jika aplikasi sudah pernah dibuka
      if (alreadyOpenend === 'true') { // 'true' disimpan dalam bentuk string
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue) {
          return JSON.parse(jsonValue) 
        } else {
          return []
        }
      } else {  // aplikasi baru pertama kali dibuka
        // tampilkan initialNoteList
        return initialNoteList;
      }
    } catch (err) {
      console.log('getData: ', err);
    }
  }

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
  
    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc
      }
    ])
  }

  const editNote = (noteId, title, desc) => {
    const newNoteList = noteList.map((noteItem) => {
      if (noteItem.id === noteId) {
        noteItem.title = title;
        noteItem.desc = desc;
      }

      return noteItem;
    })

    setNoteList(newNoteList);
  }

  const deleteNote = (noteId) => {
    const newNoteList = noteList.filter((noteItem) => {
      return noteItem.id !== noteId;
    })

    setNoteList(newNoteList);
  }

  return (
    <>
      <StatusBar />
      <CurrentPageWidget
        currentPage={currentPage}
        noteList={noteList}
        setCurrentPage={setCurrentPage}
        setSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
        addNote={addNote}
        editNote={editNote}
        deleteNote={deleteNote}
      />
    </>
  )
}

export default App