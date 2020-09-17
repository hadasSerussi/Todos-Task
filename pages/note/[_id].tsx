
import NotesStore, { NotesList, Note, convertToItems } from '../../store/notes_store'
import { ItemsListView, NewItemBox } from '../new-note'
import { useState } from 'react'
import { observer, inject } from "mobx-react"
import React, { useContext } from 'react'
import baseUrl from '../../helpers/baseUrl'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useToasts } from 'react-toast-notifications'
import {useRouter} from 'next/router'





type Props = {
    dataStore?: NotesList;
  };

const Note_ =  inject("dataStore")(
    observer(({note},props: Props ) => { 
      let n = new Note();
      n = note
    const [ newNote, setNewNote ] = useState(n);
    const [ text, setText ] = useState(newNote.nameNote);

    const notesStore = props.dataStore;
    const { addToast } = useToasts();
    const router  = useRouter()



    async function updateNote(items){
        const res =   await fetch(`${baseUrl}/api/note/${newNote._id}`,{
            method:"POST",
          headers:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({
          nameNote:text,
          items
          })
        })

        const res2 = await res.json() 
        if(res2.error){
          addToast('Error... Pleas Try Again...', {
            appearance: 'error',
            autoDismiss: true,
        })
      }else{
        addToast('Updating Succefully...', {
          appearance: 'success',
          autoDismiss: true,
      })}
    }
    
    
    

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        newNote.nameNote = text || "";
        updateNote(newNote.items);
        // notesStore.updatNote(newNote);
        setText('');
        router.push('/');

    }


    function addItem(name: string) {
        let note = new Note();
        note._id = newNote._id;
        note.nameNote = newNote.nameNote;
        note.items = newNote.items;
        note.addItem(name);
        setNewNote(note);
    }

    function toggleItem(id: number) {
        let note = new Note();
        note._id = newNote._id;
        note.nameNote = newNote.nameNote;
        note.items = newNote.items;
        note.toggleItem(id);
        setNewNote(note);
    }

    return (
        <div className={styles.container}>
        <Head>
          <title>Todos</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h3 className={styles.title}>
            Welcome - <label className="todos" >Todos</label>
          </h3>
  
          <p className={styles.description}>
          Edit the note, create tasks and mark when done          </p>
  
          <div>
            
           <div>
                <input className="input-text"
                    type={newNote.nameNote}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div> 
            <div>
                <NewItemBox addItem={addItem}/>
            </div>
            <div>
                <ItemsListView items={newNote.items} toggleItem={toggleItem} />
            </div>
            <div className={styles.grid}>
                <div>
                    <button className="button-input" type={"submit"} onClick={handleSubmit}>Update</button>
                </div>
                <div>
                    <Link href= {`/`}><div className="button-input">Main Page</div></Link>
                </div>
            </div>

        </div>
        </main>
  
        <footer className={styles.footer}>
          <a
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>
        </footer>
      </div>
    )
} 
))




  export async function getStaticPaths() {

    const res =  await fetch(`${baseUrl}/api/notes`)
    const notes = await res.json()
    console.log(notes)

    const paths = notes.map((note) => `/note/${note._id}`)
  
    return { paths, fallback: false }
  }



  export async function getStaticProps({ params }) {
    const res =  await fetch(`${baseUrl}/api/note/${params._id}`)    
      
      const note = await res.json()
    let items = [];
    note.items.map(item=>{
      items.push({...item})
    })
    note.items = items;
    return { props: { note } }
  }
  
  export default Note_

