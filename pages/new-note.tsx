import React, { useState ,  useContext  } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { observer, inject } from "mobx-react"
// import styles from '../../styles/Home.module.css'
import  {  NotesList,Note, Item} from '../store/notes_store'
import baseUrl from '../helpers/baseUrl'
import { useToasts } from 'react-toast-notifications'
import {useRouter} from 'next/router'



type Props = {
    dataStore?: NotesList;
  };

export function NewItemBox({addItem}: { addItem: (_:string) => void}) {

    const [ text, setText ] = useState('');
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        addItem(text);
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <input className="input-text"
            placeholder="Add Task"
              type={"text"}
              value={text}
              onChange={(e) => setText(e.target.value)}
          />
            <button className={"delete"} type={"submit"}>Add</button>
        </form>
    )
}


const ItemView = observer(function ItemView({ item, toggleItem }: {
    item: Item,
    toggleItem: (itemId: number) => void,
}) {
    return (
        <li>
            <label className="label-input">
                <input 
                    type={"checkbox"}
                    checked={item.done}
                    onChange={() => toggleItem(item.id)} />
                {item.name}
            </label>


        </li>
    )
});

export const ItemsListView = observer(function ItemsListView({ items, toggleItem }: {
    items: Item[] ,
    toggleItem: (itemId: number) => void,
}) {
    return (
        <ul>
            {items.map(item => (
                <ItemView item={item} toggleItem={toggleItem}/>
            ))}
        </ul>
    )
});


 function App( props : Props) {

    const [ text, setText ] = useState('');
    const [ newNote, setNewNote ] = useState(new Note());

    const { addToast } = useToasts()

    const dataStore = props.dataStore;
    const router  = useRouter()


    async function createNote(items){

        const res =   await fetch(`${baseUrl}/api/notes`,{
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
            addToast('Creating Succefully...', {
                appearance: 'success',
                autoDismiss: true,
            })
        }
        return res2; 
    }



    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(newNote)
        newNote.nameNote = text;
        const res =await createNote(newNote.items);
        // dataStore.addNote(res);
        setText('');
        router.push('/');
    }

    function addItem(name: string) {
        newNote.addItem(name);
    }

    function toggleItem(id: number) {
        console.log("toggole item")
        newNote.toggleItem(id);
    }

    return (
        <div className={"container"}>
        <Head>
          <title>Todos</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={"main"}>
          <h3 className={"title"}>
          Welcome - <label className="todos" >Todos</label>
          </h3>
  
          <p className={"description"}>
          Create the note, create tasks and mark when done       
          </p>
  
          <div>

            <input className="input-text"
                    placeholder="Name Note"
                    type={"text"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <NewItemBox addItem={addItem}/>
                <ItemsListView items={newNote.items } toggleItem={toggleItem} />
                <div className={"grid"}>
                    <Link href= {`/`}><div className="button-input">Main Page</div></Link>
                    <button className="button-input" type={"submit"} onClick={handleSubmit}>Save</button>

                </div>
          </div>
        </main>
  
        <footer className={"footer"}>
          <a
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>
        </footer>
      </div>

    );
}


export default App;


export const CreateNote = inject('dataStore')(observer(App));

  
