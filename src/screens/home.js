import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import CustomButton from '../components/customButton'

const NoteCard = ({ noteItem, setCurrentPage, setSelectedNote, deleteNote }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{noteItem.title}</Text>
      <Text>{noteItem.desc}</Text>
      <View style={styles.buttons}>
        <CustomButton 
          backgroundColor="#FFC300"
          color="#151D3B"
          text="Ubah"
          fontSize={12}
          width={100}
          onPress={() => { 
            setSelectedNote(noteItem)
            setCurrentPage('edit') 
          }}
        />
        <CustomButton 
          backgroundColor="#D82148"
          color="#fff"
          text="Hapus"
          fontSize={12}
          width={100}
          onPress={() => {deleteNote(noteItem.id)}}
        />
      </View>
    </View>
  )
}

const Home = ({ noteList, setCurrentPage, setSelectedNote, deleteNote }) => {
  return (
    <>
      <View style={styles.container}>
        <CustomButton 
          backgroundColor="#DDD"
          color="#203239"
          text="Tambahkan Note"
          width="100%"
          onPress={() => { setCurrentPage('add') }}
        />
        {noteList.length > 0 && (
          <FlatList 
            style={{marginTop: 5}}
            showsVerticalScrollIndicator={false}
            data={noteList}
            renderItem={({ item }) => (<NoteCard 
              noteItem={item} 
              setCurrentPage={setCurrentPage} 
              setSelectedNote={setSelectedNote}
              deleteNote={deleteNote} />
            )}
            keyExtractor={(noteItem) => noteItem.id}
          />)
        }
      </View>
      {!(noteList.length > 0) && (
        <View style={styles.emptyNote}>
          <Text>Tidak ada note</Text>
        </View>)
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#DDD',
    borderWidth: 2,
    borderRadius: 5,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#203239',
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  emptyNote: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Home